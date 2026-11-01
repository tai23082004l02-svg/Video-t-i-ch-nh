"""Generate only the Inspection Paradox production assets; preserve older videos."""
from pathlib import Path
import json
import math
import os
import textwrap

import numpy as np
import onnxruntime as ort
import soundfile as sf
from kokoro_onnx import Kokoro

base = Path(__file__).resolve().parent
repo = base.parents[1]
root = Path(os.environ.get('REMOTION_PROJECT', str(repo / 'studio')))
spec = json.loads((repo / 'scripts/intuition-glitch/inspection-paradox.json').read_text())
for folder in ['public/audio', 'src', 'out']:
    (root / folder).mkdir(parents=True, exist_ok=True)
opts = ort.SessionOptions()
opts.intra_op_num_threads = 2
opts.inter_op_num_threads = 1
session = ort.InferenceSession(str(base / 'models/kokoro-v1.0.onnx'), sess_options=opts,
                             providers=['CPUExecutionProvider'])
tts = Kokoro.from_session(session, str(base / 'models/voices-v1.0.bin'))
parts = [np.zeros(4800, dtype=np.float32)]
pos = 4800
cues = []
for i, line in enumerate(spec['lines']):
    samples, sr = tts.create(line['text'], voice=spec['voice'], lang='en-us', speed=spec['speed'])
    assert sr == 24000 and np.isfinite(samples).all() and np.max(np.abs(samples)) > .001
    start = pos // 800
    end = math.ceil((pos + len(samples)) / 800)
    pause = 9 if i + 1 < len(spec['lines']) and line['scene'] != spec['lines'][i + 1]['scene'] else 5
    parts.extend([samples, np.zeros(end * 800 - pos - len(samples) + pause * 800, dtype=np.float32)])
    pos = (end + pause) * 800
    cues.append(dict(**line, start=start, end=end))
    print(f'{i+1}/{len(spec["lines"])} {line["scene"]}: {start/30:.2f}-{end/30:.2f}', flush=True)
main_duration = cues[-1]['end'] + 6
audio = np.concatenate(parts)
audio = np.pad(audio, (0, max(0, main_duration * 800 - len(audio))))[:main_duration * 800]
sf.write(root / 'public/audio/inspection-paradox-michael.wav', audio, 24000, subtype='PCM_16')
(root / 'src/inspectionParadoxData.ts').write_text(
    'export const cues = ' + json.dumps(cues) + ';\nexport const mainDuration = ' + str(main_duration) + ';\n')

def stamp(frame):
    ms = round(frame / 30 * 1000)
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'

outro = [dict(text='Smarter choices.', start=9, end=54),
         dict(text='A better future.', start=63, end=106),
         dict(text='Follow for more.', start=115, end=158)]
all_cues = cues + [dict(text=c['text'], start=main_duration+c['start']-9,
                        end=main_duration+c['end']-9) for c in outro]
srt = '\n\n'.join(f'{i}\n{stamp(c["start"])} --> {stamp(c["end"])}\n' +
                   '\n'.join(textwrap.wrap(c['text'], width=62)) for i, c in enumerate(all_cues, 1)) + '\n'
(root / 'out/intuition-glitch-inspection-paradox.srt').write_text(srt)
(root / 'out/inspection-paradox-timing.json').write_text(json.dumps(dict(mainDuration=main_duration, cues=all_cues), indent=2))
print(f'Total with trimmed outro: {(main_duration+182)/30:.2f}s')

from pathlib import Path
import json, math
import numpy as np
import soundfile as sf
import onnxruntime as ort
from kokoro_onnx import Kokoro
import os
tts_base=Path(__file__).resolve().parent
root=Path(os.environ.get('REMOTION_PROJECT', str(tts_base.parents[1] / 'studio')))
(root / 'public/audio').mkdir(parents=True, exist_ok=True)
(root / 'out').mkdir(parents=True, exist_ok=True)
(root / 'src').mkdir(parents=True, exist_ok=True)
opts=ort.SessionOptions();opts.intra_op_num_threads=2;opts.inter_op_num_threads=1
session=ort.InferenceSession(str(tts_base / 'models/kokoro-v1.0.onnx'),sess_options=opts,providers=['CPUExecutionProvider'])
k=Kokoro.from_session(session,str(tts_base / 'models/voices-v1.0.bin'))
lines=[
('hook','A I is not just changing how we work. It is changing how we spend.'),
('shop','Stores use A I to predict what you might buy, and what to show you next.'),
('temptation','That perfect recommendation? It can make an unplanned purchase feel like your idea.'),
('track','But the same technology can work for you.'),
('patterns','It can help categorize transactions and reveal spending patterns you missed.'),
('pause','Before you tap buy, pause. Does this fit your budget, or just your feed?'),
('end','Let A I help you make decisions. Keep the final choice yours.')]
parts=[np.zeros(7200,dtype=np.float32)];pos=7200;cues=[]
for kind,text in lines:
 a,sr=k.create(text,voice='am_michael',lang='en-us',speed=1.07)
 # Align boundaries to video frames, keeping a brief pause between thoughts.
 start=pos//800
 end=math.ceil((pos+len(a))/800)
 pad=(end*800-pos-len(a))+7200
 parts.extend([a,np.zeros(pad,dtype=np.float32)])
 cues.append(dict(kind=kind,text=text,start=start,end=end))
 pos=end*800+7200
nframes=math.ceil(pos/800)+24
audio=np.concatenate(parts); audio=np.pad(audio,(0,nframes*800-len(audio)))
sf.write(root/'public/audio/ai-spending-michael.wav',audio,24000,subtype='PCM_16')
(root/'src/aiSpendingCues.ts').write_text('export const cues = '+json.dumps(cues)+';\nexport const duration = '+str(nframes)+';\n')
def stamp(frame):
 ms=round(frame/30*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
 return f'{h:02}:{m:02}:{s:02},{ms:03}'
(root/'out/ai-changed-spending.srt').write_text('\n\n'.join(f'{i}\n{stamp(c["start"])} --> {stamp(c["end"])}\n{c["text"]}' for i,c in enumerate(cues,1))+'\n')
print(json.dumps(dict(seconds=nframes/30,cues=cues),indent=2))

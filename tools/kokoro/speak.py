"""Local Kokoro TTS. Official voices do not support Vietnamese."""
import argparse
from pathlib import Path
import numpy as np
import onnxruntime as ort
import soundfile as sf
from kokoro_onnx import Kokoro

base = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument('--text', default='Small daily habits can build a stronger financial future. Start with an amount you can sustain, and stay consistent.')
parser.add_argument('--voice', default='am_michael')
parser.add_argument('--lang', default='en-us')
parser.add_argument('--speed', type=float, default=1.0)
parser.add_argument('--output', type=Path, default=base / 'out' / 'kokoro-demo.wav')
args = parser.parse_args()
options = ort.SessionOptions()
options.intra_op_num_threads = 2
options.inter_op_num_threads = 1
session = ort.InferenceSession(str(base / 'models' / 'kokoro-v1.0.onnx'), sess_options=options, providers=['CPUExecutionProvider'])
kokoro = Kokoro.from_session(session, str(base / 'models' / 'voices-v1.0.bin'))
samples, rate = kokoro.create(args.text, voice=args.voice, speed=args.speed, lang=args.lang)
assert len(samples) > rate and np.isfinite(samples).all() and np.max(np.abs(samples)) > 0.001
args.output.parent.mkdir(parents=True, exist_ok=True)
sf.write(args.output, samples, rate, subtype='PCM_16')
print(f'Created {args.output}: {len(samples)/rate:.2f}s, {rate}Hz')

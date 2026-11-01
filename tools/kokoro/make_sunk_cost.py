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
('hook','Want to make a stupid decision? Keep paying for something that is failing you, just because you already paid for it.'),
('hook','You call it not giving up. But sometimes, you are turning one loss into two.'),
('movie','Imagine you spend twenty dollars on a movie ticket.'),
('movie','Thirty minutes in, you are bored. You want to leave.'),
('movie','Then comes the thought: I paid for this. I should stay.'),
('movie','But the theater will not refund your ticket because you suffer through another hour.'),
('cost','That money is gone either way. Your next hour is not.'),
('cost','This is the sunk cost trap: letting an unrecoverable past cost decide your next move.'),
('project','It happens with money. It also happens with time, effort, and pride.'),
('project','A project is not working. So you pour in another weekend, because you have already spent six months.'),
('project','Now the past becomes a reason to sacrifice even more of the future.'),
('nuance','But quitting is not automatically the smart choice. And persistence is not automatically a mistake.'),
('decision','The question is what happens from here.'),
('decision','What can staying still deliver? What will it cost? And what would leaving cost?'),
('reset','Try this: if you had not already invested in this, would you choose it today?'),
('reset','Then account for any real cost of changing direction.'),
('close','Your past investment can teach you. It cannot, by itself, make the next investment worthwhile.'),
('close','You do not recover yesterday by handing it tomorrow.')]
parts=[np.zeros(7200,dtype=np.float32)];pos=7200;cues=[]
for kind,text in lines:
 a,sr=k.create(text,voice='am_michael',lang='en-us',speed=1.0)
 # Align boundaries to video frames, keeping a brief pause between thoughts.
 start=pos//800
 end=math.ceil((pos+len(a))/800)
 pad=(end*800-pos-len(a))+7200
 parts.extend([a,np.zeros(pad,dtype=np.float32)])
 cues.append(dict(kind=kind,text=text,start=start,end=end))
 pos=end*800+7200
nframes=math.ceil(pos/800)+24
audio=np.concatenate(parts); audio=np.pad(audio,(0,nframes*800-len(audio)))
sf.write(root/'public/audio/sunk-cost-trap-michael.wav',audio,24000,subtype='PCM_16')
(root/'src/sunkCostCues.ts').write_text('export const cues = '+json.dumps(cues)+';\nexport const duration = '+str(nframes)+';\n')
def stamp(frame):
 ms=round(frame/30*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
 return f'{h:02}:{m:02}:{s:02},{ms:03}'
(root/'out/sunk-cost-trap.srt').write_text('\n\n'.join(f'{i}\n{stamp(c["start"])} --> {stamp(c["end"])}\n{c["text"]}' for i,c in enumerate(cues,1))+'\n')
(root/'out/sunk-cost-trap-script.md').write_text('# The Sunk Cost Trap — Do not hand yesterday your tomorrow.\n\n'+'\n\n'.join(text for _,text in lines)+'\n\n## Shared outro\n\nSmarter choices. A better future. Follow for more.\n')
print(json.dumps(dict(seconds=nframes/30,cues=cues),indent=2))

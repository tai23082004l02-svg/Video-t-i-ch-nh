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
('hook','There is a probability puzzle that has tripped up even mathematicians.'),
('hook','The arithmetic is simple. The difficult part is doubting an answer that feels obvious.'),
('pick','Imagine three doors. Behind one is a car. Behind the other two, goats.'),
('pick','You choose door one. But before it opens, the host steps in.'),
('rules','He knows where the car is. He must open another door showing a goat.'),
('rules','And he always offers you the chance to switch.'),
('reveal','He opens door three. A goat. Now only two doors remain.'),
('reveal','Do you keep your door, or take the other one?'),
('reveal','It feels like fifty-fifty. One car. Two doors. What could be missing?'),
('odds','But switching wins two-thirds of the time. Staying wins only one-third.'),
('odds','The trick is to look back at your first choice.'),
('first','At the start, your door had a one-in-three chance of hiding the car.'),
('first','The other two doors, together, had a two-in-three chance.'),
('first','The host cannot reveal a car. His choice is constrained by what he knows.'),
('cases','If your first pick is the car, switching loses.'),
('cases','But if your first pick is either goat, he removes the other goat.'),
('cases','Switching then takes you straight to the car.'),
('cases','Three equally likely starting positions. Switching wins in two of them.'),
('hundred','Still feels strange? Imagine one hundred doors.'),
('hundred','You pick one. The host opens ninety-eight others, all goats.'),
('hundred','Would you really trust your first guess over the one door he was forced to leave?'),
('hundred','Switching wins whenever your first guess was wrong. Here, that is ninety-nine times out of a hundred.'),
('lesson','Back to three doors. The same logic holds.'),
('lesson','Two doors remain. But they did not get there in the same way.'),
('lesson','The lesson is bigger than a game show.'),
('lesson','Information is not just what you see. It is how what you see was chosen.')]
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
sf.write(root/'public/audio/monty-hall-michael.wav',audio,24000,subtype='PCM_16')
(root/'src/montyHallCues.ts').write_text('export const cues = '+json.dumps(cues)+';\nexport const duration = '+str(nframes)+';\n')
def stamp(frame):
 ms=round(frame/30*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
 return f'{h:02}:{m:02}:{s:02},{ms:03}'
(root/'out/monty-hall.srt').write_text('\n\n'.join(f'{i}\n{stamp(c["start"])} --> {stamp(c["end"])}\n{c["text"]}' for i,c in enumerate(cues,1))+'\n')
(root/'out/monty-hall-script.md').write_text('# Monty Hall — Two doors. Unequal odds.\n\n'+'\n\n'.join(text for _,text in lines)+'\n\n## Shared outro\n\nSmarter choices. A better future. Follow for more.\n')
print(json.dumps(dict(seconds=nframes/30,cues=cues),indent=2))

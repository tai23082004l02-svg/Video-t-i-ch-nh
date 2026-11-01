"""Produce Michael narration and phoneme-aligned caption phrases for Birthday Paradox."""
from pathlib import Path
import json, math, os, re, textwrap
from difflib import SequenceMatcher
import numpy as np
import soundfile as sf
import onnxruntime as ort
from kokoro_onnx import Kokoro
base=Path(__file__).resolve().parent
repo=base.parents[1]
root=Path(os.environ.get('REMOTION_PROJECT', str(repo/'studio')))
spec=json.loads((repo/'scripts/intuition-glitch/birthday-paradox.json').read_text())
for folder in ('src','out','public/audio'):(root/folder).mkdir(parents=True,exist_ok=True)
opt=ort.SessionOptions();opt.intra_op_num_threads=2;opt.inter_op_num_threads=1
session=ort.InferenceSession(str(base/'models/kokoro-v1.0.onnx'),opt,providers=['CPUExecutionProvider'])
k=Kokoro.from_session(session,str(base/'models/voices-v1.0.bin'))
# Caption display uses digits; phonetic alignment uses the exact spoken form.
expand={'253':'two hundred and fifty-three','364':'three hundred and sixty-four','365':'three hundred and sixty-five','363':'three hundred and sixty-three','49.3%':'forty-nine point three percent','50.7%':'fifty point seven percent','97%':'ninety-seven percent'}
def spoken(s):
 for a,b in expand.items():s=s.replace(a,b)
 return s
parts=[np.zeros(7200,dtype=np.float32)];pos=7200;lines=[];captions=[]
for num,line in enumerate(spec['lines']):
 texts=line['parts'];text=line.get('speech',' '.join(texts))
 audio,sr,timing=k.create_timed(text,voice=spec['voice'],lang='en-us',speed=1.0,sentence_pause=.25,clause_pause=.12)
 assert sr==24000 and timing and np.isfinite(audio).all() and np.max(np.abs(audio))>.001
 start=pos//800;end=math.ceil((pos+len(audio))/800)
 actual=''.join(t.phoneme for t in timing)
 phon=[k.tokenizer.phonemize(spoken(t)) for t in texts]
 expected=' '.join(phon)
 matcher=SequenceMatcher(None,expected,actual,autojunk=False)
 assert matcher.ratio()>.84,(num,matcher.ratio(),expected,actual)
 mapping={}
 for tag,i,j,a,b in matcher.get_opcodes():
  for n in range(i,j+1):mapping[n]=round(a+(b-a)*(n-i)/max(1,j-i))
 offsets=[];at=0
 for ph in phon:
  offsets.append(at);at+=len(ph)+1
 boundaries=[]
 for at in offsets:
  index=min(len(timing)-1,mapping.get(at,0))
  boundaries.append(start+round(timing[index].start*30))
 for i,display in enumerate(texts):
  a=boundaries[i];b=boundaries[i+1] if i+1<len(texts) else end
  wrapped=textwrap.wrap(display,width=34,break_long_words=False,break_on_hyphens=False)
  assert len(wrapped)<=2,(display,wrapped)
  assert b>a,(num,i,a,b)
  captions.append(dict(start=a,end=b,text=display,lines=wrapped))
 lines.append(dict(scene=line['scene'],text=text,start=start,end=end))
 pause=round(line.get('pause',.3)*30)
 pad=end*800-pos-len(audio)+pause*800
 parts.extend([audio,np.zeros(pad,dtype=np.float32)]);pos=end*800+pause*800
 print(f'{num+1}/{len(spec["lines"])}: {end/30:.1f}s',flush=True)
duration=math.ceil(pos/800)+18
wave=np.concatenate(parts);wave=np.pad(wave,(0,duration*800-len(wave)))
sf.write(root/'public/audio/birthday-paradox-michael.wav',wave,24000,subtype='PCM_16')
prob=lambda n:1-math.prod((365-i)/365 for i in range(n))
assert abs(prob(23)-.507297234323985)<1e-12
assert 23*22//2==253 and prob(50)>.97
stats=dict(p23=prob(23),p50=prob(50),noMatch23=1-prob(23),pairs23=253)
(root/'src/birthdayParadoxData.ts').write_text('export const narration = '+json.dumps(lines)+';\nexport const captions = '+json.dumps(captions)+';\nexport const mainDuration = '+str(duration)+';\nexport const stats = '+json.dumps(stats)+';\n')
# Include the already-approved shared outro in the separately delivered SRT.
outro=(root/'src/sharedOutroCues.ts').read_text();oc=json.loads(outro.split('export const cues = ')[1].split(';')[0])
content_duration=lines[-1]['end']+6
outro_skip=9
full=[dict(start=c['start'],end=c['end'],text=' '.join(spec['lines'][i]['parts']),lines=textwrap.wrap(' '.join(spec['lines'][i]['parts']),width=60)) for i,c in enumerate(lines)]+[dict(start=c['start']+content_duration-outro_skip,end=c['end']+content_duration-outro_skip,text=c['text']) for c in oc]
def stamp(frame):
 ms=round(frame/30*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
 return f'{h:02}:{m:02}:{s:02},{ms:03}'
(root/'out/intuition-glitch-birthday-paradox.srt').write_text('\n\n'.join(f'{i}\n{stamp(c["start"])} --> {stamp(c["end"])}\n'+('\n'.join(c['lines']) if 'lines' in c else c['text']) for i,c in enumerate(full,1))+'\n')
(root/'out/intuition-glitch-birthday-paradox-monty-captions.srt').write_text((root/'out/intuition-glitch-birthday-paradox.srt').read_text())
(root/'out/intuition-glitch-birthday-paradox-script.md').write_text('# '+spec['title']+'\n\n'+'\n\n'.join(x['text'] for x in lines)+'\n\n## Approved outro\n\nSmarter choices. A better future. Follow for more.\n\n## Mathematical model\n\nIndependent birthdays, equally likely on 365 days; leap day ignored. P(shared) = 1 − ∏(365−k)/365 for k=0..n−1. At n=23: '+str(prob(23))+'. At n=50: '+str(prob(50))+'. Pair count does not make matching-pair events independent.\n')
print(json.dumps(dict(mainSeconds=duration/30,captionPhrases=len(captions),stats=stats),indent=2))

import React from 'react';
import {AbsoluteFill, Audio, Composition, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {cues, mainDuration} from './inspectionParadoxData';
import {SharedOutro, SHARED_OUTRO_DURATION} from './SharedOutro';

const cream='#f7f1e3', mint='#b9dfb4', peach='#edb99a', muted='#aebfb4', ink='#162c2b';
const ramp=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const sceneStart=(scene:string)=>cues.find(c=>c.scene===scene)!.start;
const Bus=({x,y,scale=1}:{x:number;y:number;scale?:number})=><g transform={`translate(${x},${y}) scale(${scale})`}>
 <rect x="-77" y="-45" width="154" height="80" rx="16" fill={mint}/>
 {[0,1,2].map(i=><rect key={i} x={-61+i*43} y="-30" width="33" height="28" rx="5" fill={ink}/>)}
 <path d="M-60 17H58" stroke={ink} strokeWidth="4"/><circle cx="-46" cy="38" r="14" fill={cream} stroke={ink} strokeWidth="8"/><circle cx="45" cy="38" r="14" fill={cream} stroke={ink} strokeWidth="8"/>
</g>;
const Person=({x,y,color=mint}:{x:number;y:number;color?:string})=><g transform={`translate(${x},${y})`}><circle cy="-14" r="8" fill={color}/><path d="M-12 19V5Q0-8 12 5V19" fill={color}/></g>;
const Pill=({children,color=mint}:{children:React.ReactNode;color?:string})=><div style={{display:'inline-block',padding:'17px 28px',border:`1px solid ${color}88`,borderRadius:18,fontSize:34,color,background:`${color}08`}}>{children}</div>;

const Timeline=({regular=false,people=false,f,ci}:{regular?:boolean;people?:boolean;f:number;ci:number})=>{
 const start=sceneStart(regular?'regular':people?'sampling':'uneven');
 const t=f-start;
 const positions=regular?[0,10,20]:[0,2,20];
 const phase=regular?ramp(f,cues[3].start,cues[3].end):ramp(f,cues[6].start,cues[6].end);
 const arrival=20*phase;
 return <svg width="880" height="790" viewBox="0 0 880 790">
  <text x="440" y="58" textAnchor="middle" fill={muted} fontSize="28">{regular?'PERFECTLY EVEN SERVICE':'A REPEATING 20-MINUTE CYCLE'}</text>
  <rect x="80" y="190" width={regular?360:72} height="132" fill={`${mint}20`} rx="9"/>
  <rect x={regular?440:152} y="190" width={regular?360:648} height="132" fill={`${peach}20`} rx="9"/>
  <path d="M80 260H800" stroke={muted} strokeWidth="3"/>
  {positions.map((p,i)=><g key={p}><path d={`M${80+p*36} 245v115`} stroke={cream} strokeWidth="2"/><text x={80+p*36} y="400" fill={cream} textAnchor="middle" fontSize="29">{regular?`${p} min`:p}</text><Bus x={80+p*36} y={160} scale={regular?.63:.4}/></g>)}
  {!regular?<text x="440" y="400" fill={muted} textAnchor="middle" fontSize="25">minutes into the cycle</text>:null}
  <text x={regular?260:116} y="303" fill={mint} textAnchor="middle" fontSize="30">{regular?'10 min':'2'}</text>
  <text x={regular?620:476} y="303" fill={peach} textAnchor="middle" fontSize="30">{regular?'10 min':'18 min'}</text>
  {people?<>
   {Array.from({length:20},(_,i)=>{const show=ramp(f,cues[10].start+i*3,cues[10].start+i*3+12);return <g key={i} opacity={show}><Person x={80+(i+.5)*36} y={485+(1-show)*20} color={i<2?mint:peach}/><path d={`M${80+(i+.5)*36} 430v18`} stroke={i<2?mint:peach} strokeWidth="2"/></g>})}
   <text x="440" y="575" fill={muted} textAnchor="middle" fontSize="30">20 arrivals · equally spaced in time</text>
   <g opacity={ramp(f,cues[11].start,cues[11].start+20)}><text x="230" y="675" fill={mint} textAnchor="middle" fontSize="64">2 people</text><text x="640" y="675" fill={peach} textAnchor="middle" fontSize="64">18 people</text></g>
   {ci>=12?<text x="440" y="758" textAnchor="middle" fill={cream} fontSize="44">50% of gaps → 90% of arrivals</text>:null}
  </>:regular?<>
   <Person x={80+arrival*36} y={475}/>
   <path d={`M${80+arrival*36} 435V417`} stroke={mint} strokeWidth="3"/>
   <text x="440" y="585" textAnchor="middle" fill={cream} fontSize="48">{ci>=4?'Average wait: 5 minutes':'Arrive anywhere along the line'}</text>
   <text x="440" y="663" textAnchor="middle" fill={muted} fontSize="31">{ci>=4?'Uniform arrival · independent of buses':'The wait depends on when you arrive'}</text>
  </>:<>
   <g opacity={ramp(t,15,40)}><Bus x={80+arrival*36} y={510}/><path d="M65 563H815" stroke={muted} strokeWidth="2" strokeDasharray="12 10"/></g>
   <text x="440" y="655" fill={cream} textAnchor="middle" fontSize="54">{ci>=7?'(2 + 18) ÷ 2 = 10 min':'Short gap. Then a long gap.'}</text>
   <text x="440" y="725" fill={muted} textAnchor="middle" fontSize="29">The average hides the uneven spacing</text>
  </>}
 </svg>;
};

const WaitDiagram=({f,ci}:{f:number;ci:number})=>{
 const long=ci>=14;const p=ramp(f,cues[long?14:13].start,cues[long?14:13].end);
 const total=long?18:2, x=110+p*660;
 return <svg width="880" height="800" viewBox="0 0 880 800">
 <text x="440" y="80" fill={long?peach:mint} textAnchor="middle" fontSize="42">{long?'THE 18-MINUTE GAP':'THE 2-MINUTE GAP'}</text>
 <rect x="110" y="230" width="660" height="130" rx="20" fill={long?`${peach}22`:`${mint}22`}/>
 <path d="M110 295H770" stroke={muted} strokeWidth="3"/><Bus x={110} y={200} scale={.7}/><Bus x={770} y={200} scale={.7}/>
 <Person x={x} y={420}/><path d={`M${x} 470H770`} stroke={long?peach:mint} strokeWidth="6"/>
 <text x="440" y="555" textAnchor="middle" fill={cream} fontSize="41">Remaining wait: {(total*(1-p)).toFixed(1)} min</text>
 <text x="440" y="682" textAnchor="middle" fill={long?peach:mint} fontSize="79">Average: {long?'9':'1'} {long?'minutes':'minute'}</text>
 <text x="440" y="753" textAnchor="middle" fill={muted} fontSize="29">Arrival is uniform within this gap</text>
 </svg>;
};

const Area=({f,ci}:{f:number;ci:number})=>{
 const p=ramp(f,cues[18].start,cues[18].end);const x=152+648*p,y=600-540*(1-p);
 return <svg width="880" height="840" viewBox="0 0 880 840">
 <text x="440" y="48" textAnchor="middle" fill={muted} fontSize="30">REMAINING WAIT AT EACH ARRIVAL TIME</text>
 <path d="M80 90V600H820" fill="none" stroke={muted} strokeWidth="2"/>
 <path d="M80 600V540L152 600Z" fill={`${mint}66`} stroke={mint} strokeWidth="3"/>
 <path d="M152 600V60L800 600Z" fill={`${peach}35`} stroke={peach} strokeWidth="3"/>
 {[0,2,20].map(n=><text key={n} x={80+n*36} y="647" textAnchor="middle" fill={cream} fontSize="30">{n}</text>)}
 <text x="440" y="702" textAnchor="middle" fill={muted} fontSize="29">Arrival time within the cycle (minutes)</text>
 <text x="145" y="100" fill={peach} fontSize="26">18 min</text><text x="30" y="555" fill={mint} fontSize="23">2</text>
 {ci<20?<><path d={`M${x} 600V${y}`} stroke={cream} strokeDasharray="8 8" strokeWidth="3"/><circle cx={x} cy={y} r="11" fill={cream}/></>:null}
 <text x="440" y="795" textAnchor="middle" fill={ci>=19?peach:cream} fontSize="39">{ci>=19?'Double the gap → four times the area':'The area adds up everyone’s waiting'}</text>
 </svg>;
};

const Main=()=>{
 const f=useCurrentFrame();const ci=Math.max(0,cues.findLastIndex(c=>f>=c.start));const cue=cues[ci],s=cue.scene;
 const t=f-sceneStart(s);const enter=ramp(t,0,15);
 let title:React.ReactNode,visual:React.ReactNode;
 if(s==='hook'){
  title=<>Every 10 minutes.<br/><span style={{color:peach}}>So why the wait?</span></>;
  const busP=ramp(f,cues[0].start,cues[0].end);const hand=interpolate(f,[0,cues[1].end],[0,330]);
  visual=<svg width="880" height="820" viewBox="0 0 880 820"><path d="M30 505H850" stroke={muted} strokeWidth="3"/><Bus x={-100+1050*busP} y={450} scale={1.5}/><Person x={665} y={535}/><path d="M745 535V320" stroke={cream} strokeWidth="7"/><rect x="695" y="290" width="100" height="90" rx="13" fill={mint}/><text x="745" y="346" textAnchor="middle" fill={ink} fontSize="29">BUS</text><circle cx="440" cy="165" r="100" fill="#213b34" stroke={mint} strokeWidth="3"/><path d="M440 165V100" stroke={cream} strokeWidth="6" transform={`rotate(${hand} 440 165)`}/><circle cx="440" cy="165" r="8" fill={peach}/><text x="440" y="690" textAnchor="middle" fill={cream} fontSize="96">{ci===0?'5 minutes?':'Not necessarily.'}</text></svg>;
 }else if(s==='regular'||s==='uneven'||s==='sampling'){
  title=s==='regular'?<>When the gaps<br/>are <span style={{color:mint}}>always equal.</span></>:s==='uneven'?<>Same average.<br/><span style={{color:peach}}>Different service.</span></>:<>You sample <span style={{color:peach}}>time.</span><br/>Not a list of gaps.</>;
  visual=<Timeline regular={s==='regular'} people={s==='sampling'} f={f} ci={ci}/>;
 }else if(s==='wait'){
  title=<>Where you land<br/><span style={{color:peach}}>changes your wait.</span></>;visual=<WaitDiagram f={f} ci={ci}/>;
 }else if(s==='calculation'){
  title=<>Average the waits<br/><span style={{color:mint}}>people experience.</span></>;
  const p=ramp(f,cues[16].start,cues[16].start+25);
  visual=<div style={{paddingTop:70,textAlign:'center'}}>
   <div style={{display:'flex',gap:25,justifyContent:'center'}}>{[{color:mint,p:'10%',wait:'1 min'},{color:peach,p:'90%',wait:'9 min'}].map(v=><div key={v.p} style={{flex:1,padding:'40px 15px',border:`1px solid ${v.color}77`,borderRadius:25}}><div style={{fontSize:77,color:v.color}}>{v.p}</div><div style={{fontSize:29,color:muted,marginTop:10}}>of arrivals</div><div style={{fontSize:55,marginTop:40}}>× {v.wait}</div></div>)}</div>
   <div style={{display:'flex',height:22,marginTop:45,borderRadius:20,overflow:'hidden'}}><div style={{width:'10%',background:mint}}/><div style={{width:'90%',background:peach}}/></div>
   <div style={{fontSize:43,marginTop:55}}>0.1 × 1 + 0.9 × 9</div>
   <div style={{fontSize:112,color:mint,marginTop:30,opacity:p,transform:`translateY(${(1-p)*15}px)`}}>8.2 minutes</div>
   <div style={{fontSize:34,marginTop:20,color:muted,opacity:p}}>10-minute average gap ≠ 5-minute average wait</div>
  </div>;
 }else if(s==='area'){
  title=<>Long gaps add<br/><span style={{color:peach}}>more waiting.</span></>;visual=<Area f={f} ci={ci}/>;
 }else if(s==='lesson'){
  title=ci===20?<>The <span style={{color:mint}}>inspection</span><br/><span style={{color:mint}}>paradox.</span></>:ci===21?<>A model.<br/><span style={{color:mint}}>With clear rules.</span></>:<>Change your arrival.<br/><span style={{color:mint}}>Change the sample.</span></>;
  visual=ci<22?<div style={{paddingTop:35}}>
   <svg width="880" height="380" viewBox="0 0 880 380"><rect x="60" y="100" width="76" height="160" fill={`${mint}44`} stroke={mint} rx="16"/><rect x="156" y="100" width="664" height="160" fill={`${peach}33`} stroke={peach} rx="16"/><circle cx={200+540*ramp(f,cues[20].start,cues[20].end)} cy="180" r="56" stroke={cream} strokeWidth="6" fill="none"/><text x="98" y="315" fill={mint} textAnchor="middle" fontSize="28">2 min</text><text x="488" y="315" fill={peach} textAnchor="middle" fontSize="28">18 min</text></svg>
   <div style={{fontSize:52,textAlign:'center',lineHeight:1.35,color:cream}}>{ci===20?<>Longer intervals occupy<br/><span style={{color:peach}}>more of your timeline.</span></>:<>Alternating 2 + 18 minute gaps<br/>Independent, uniform arrivals<br/>Every arriving passenger boards</>}</div>
   <div style={{textAlign:'center',marginTop:45}}><Pill>{ci===20?'More time → more chance to be found':'Illustrative model · not measured bus data'}</Pill></div>
  </div>:<div style={{textAlign:'center',paddingTop:45}}><svg width="880" height="430" viewBox="0 0 880 430"><rect x="280" y="35" width="320" height="350" rx="35" fill="#23443a" stroke={mint} strokeWidth="3"/><text x="440" y="111" textAnchor="middle" fill={muted} fontSize="28">LIVE ARRIVALS</text><text x="440" y="205" textAnchor="middle" fill={cream} fontSize="60">2 min</text><Bus x={440} y={295}/></svg><div style={{fontSize:49,lineHeight:1.5}}>A timetable or live tracker<br/><span style={{color:mint}}>changes when you arrive.</span></div><div style={{marginTop:45}}><Pill>Random arrival assumption no longer applies</Pill></div></div>;
 }else{
  title=<>Before trusting<br/><span style={{color:mint}}>an average…</span></>;
  visual=<div style={{textAlign:'center',paddingTop:55}}><div style={{fontSize:52,lineHeight:1.35}}>What is being averaged?<br/><span style={{color:peach}}>How are you being sampled?</span></div><svg width="880" height="330" viewBox="0 0 880 330">{[0,1,2,3].map(i=><g key={i}><rect x={110+i*175} y="80" width="140" height="100" rx="15" fill={i%2?`${peach}33`:`${mint}33`} stroke={i%2?peach:mint}/><text x={180+i*175} y="144" fill={cream} textAnchor="middle" fontSize="38">{i%2?'18':'2'}</text></g>)}<path d="M110 240H775" stroke={mint} strokeWidth="5"/><Person x={110+660*ramp(f,cues[24].start,cues[24].end)} y={282}/></svg><div style={{fontSize:54,lineHeight:1.5,opacity:ramp(f,cues[24].start,cues[24].start+20)}}>The timetable counts gaps.<br/><span style={{color:mint}}>Your day samples time.</span></div></div>;
 }
 return <AbsoluteFill style={{background:ink,color:cream,fontFamily:'Liberation Serif, serif',overflow:'hidden'}}>
  <Audio src={staticFile('audio/inspection-paradox-michael.wav')}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 32%,#b9dfb40e,transparent 70%)'}}/>
  <div style={{position:'absolute',top:100,left:60,right:60,textAlign:'center',fontSize:25,letterSpacing:5,color:muted}}>THE INTUITION GLITCH</div>
  <div style={{position:'absolute',top:225,left:85,right:85,textAlign:'center',fontSize:82,lineHeight:1.12,fontWeight:700,opacity:enter}}>{title}</div>
  <div style={{position:'absolute',left:100,top:550,width:880,opacity:enter,transform:`translateY(${(1-enter)*10}px)`}}>{visual}</div>
  <div data-caption style={{position:'absolute',left:50,right:50,bottom:150,padding:'27px 32px',minHeight:135,boxSizing:'border-box',border:'1px solid #778f7755',borderRadius:20,background:'#091113eb',fontSize:37,lineHeight:1.4,fontWeight:700,textAlign:'center',color:'white'}}>{cue.text}</div>
 </AbsoluteFill>;
};
const InspectionParadox=()=><AbsoluteFill>
 <Sequence durationInFrames={mainDuration}><Main/></Sequence>
 <Sequence from={mainDuration} durationInFrames={SHARED_OUTRO_DURATION-9}><Sequence from={-9}><SharedOutro/></Sequence></Sequence>
</AbsoluteFill>;
export const InspectionParadoxComposition=()=><Composition id="InspectionParadox" component={InspectionParadox} width={1080} height={1920} fps={30} durationInFrames={mainDuration+SHARED_OUTRO_DURATION-9}/>;

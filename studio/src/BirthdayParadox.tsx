import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {narration,captions,stats} from './birthdayParadoxData';
import {SharedOutro,SHARED_OUTRO_DURATION} from './SharedOutro';
const CONTENT_DURATION=narration[narration.length-1].end+6;
const OUTRO_SKIP=9;
const ENDING_DURATION=SHARED_OUTRO_DURATION-OUTRO_SKIP;
const cream='#f8f0df',mint='#b9dfb4',peach='#e6b398',muted='#b6c7ba',ink='#20392e';
const r=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const chance=(n:number)=>{let p=1;for(let i=0;i<n;i++)p*=(365-i)/365;return 1-p};
const pct=(n:number)=>(n*100).toFixed(1)+'%';
const begin=(s:string)=>narration.find(c=>c.scene===s)!.start;
const person=(x:number,y:number,k:number,scale=.85,color=mint,opacity=1)=><g key={k} transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}><circle cy="-20" r="11" fill={cream}/><path d="M-14-3Q0-10 14-3L19 30H-19Z" fill={color}/><path d="M-8 29V52M8 29V52" stroke={color} strokeWidth="9" strokeLinecap="round"/></g>;
const positions=Array.from({length:23},(_,i)=>({x:85+i%5*150,y:125+Math.floor(i/5)*128}));
const nodes=Array.from({length:23},(_,i)=>{const a=i*Math.PI*2/23-Math.PI/2;return{x:400+Math.cos(a)*283,y:390+Math.sin(a)*330}});
const edges=nodes.flatMap((p,i)=>nodes.slice(i+1).map(q=>({p,q})));
const Note=({children}:{children:React.ReactNode})=><div style={{fontSize:32,lineHeight:1.4,textAlign:'center',color:muted,marginTop:25}}>{children}</div>;
const Card=({children}:{children:React.ReactNode})=><div style={{padding:'42px 38px',border:'1px solid #94a887',borderRadius:24,background:'#b9dfb407',marginTop:25}}>{children}</div>;
const ProbabilityBreakdown=({frame}:{frame:number})=>{
 const resultAt=narration[22].start-3;
 const count=1+Math.floor(r(frame,begin('product')+15,resultAt-5)*22);
 const noMatch=1-chance(count);
 const rest=r(frame,begin('reveal'),begin('reveal')+28);
 const reveal=r(frame,narration[24].start-8,narration[24].start+5);
 const filled=r(frame,begin('reveal')+5,narration[24].start-3);
 const assembled=r(frame,narration[22].start-18,narration[22].start+22);
 return <svg width="800" height="1030" viewBox="0 0 800 1030">
  <g transform={`translate(400 ${110-30*assembled}) scale(${1-.2*assembled}) translate(-400 -110)`} opacity={1-.7*rest}>
   {[['365',110],['364',310],[count===3?'363':'…',500],[String(366-count),680]].map(([num,x],i)=><g key={i} opacity={(count>=i+1?1:0)*r(frame,begin('product')+i*12,begin('product')+i*12+15)}>{num==='…'?<text x={x} y="125" fill={cream} textAnchor="middle" fontSize="57">…</text>:<><text x={x} y="80" fill={cream} textAnchor="middle" fontSize="49">{num}</text><path d={`M${Number(x)-66} 100H${Number(x)+66}`} stroke={mint} strokeWidth="2"/><text x={x} y="155" fill={muted} textAnchor="middle" fontSize="49">365</text></>}{i<3&&count>=i+2?<text x={Number(x)+100} y="120" fill={mint} textAnchor="middle" fontSize="40">×</text>:null}</g>)}
  </g>
  <path d="M400 188V240M385 225L400 240L415 225" fill="none" stroke={mint} strokeWidth="3" opacity={assembled*(1-rest)}/>
  <g transform={`translate(400 ${475-155*rest}) scale(${1-.4*rest})`}>
   <text textAnchor="middle" fill={peach} fontWeight="700" fontSize="185">{pct(noMatch)}</text>
   <text textAnchor="middle" y="67" fill={muted} fontSize="33">NO SHARED BIRTHDAY</text>
  </g>
  <text x="400" y="424" textAnchor="middle" fill={cream} fontSize="46" opacity={rest}>100% − 49.3% =</text>
  <g opacity={reveal} transform={`translate(0 ${(1-reveal)*15})`}><text x="400" y="610" textAnchor="middle" fill={mint} fontWeight="700" fontSize="185">50.7%</text><text x="400" y="663" textAnchor="middle" fill={cream} fontSize="33">AT LEAST ONE SHARED BIRTHDAY</text></g>
  <rect x="20" y="733" width="760" height="90" rx="22" fill="#a2c29618"/>
  <clipPath id="probability-bar"><rect x="20" y="733" width="760" height="90" rx="22"/></clipPath>
  <g clipPath="url(#probability-bar)"><rect x="20" y="733" width={760*noMatch} height="90" fill={peach}/><rect x={20+760*noMatch} y="733" width={760*(1-noMatch)*filled} height="90" fill={mint}/></g>
  <text x="205" y="867" textAnchor="middle" fill={peach} fontSize="29">No match · {pct(noMatch)}</text>
  <text x="590" y="867" textAnchor="middle" fill={mint} fontSize="29" opacity={filled}>Shared birthday · 50.7%</text>
  {Array.from({length:23},(_,i)=>person(59+i*31,940,i,.35,i<count?mint:muted,i<count?1:.17))}
  <text x="400" y="1000" textAnchor="middle" fill={muted} fontSize="27">{count} people · 365 equally likely dates</text>
 </svg>;
};
const Main=()=>{
 const f=useCurrentFrame(),ci=Math.max(0,narration.findLastIndex(c=>f>=c.start)),cue=narration[ci],s=cue.scene,t=f-begin(s);
 let title:React.ReactNode,label='',body:React.ReactNode;
 if(s==='question'){
  title=<>How big a crowd<br/>would it take?</>;label='MAKE YOUR GUESS';
  body=<><svg width="800" height="760" viewBox="0 0 800 760"><rect x="35" y="55" width="730" height="650" rx="35" fill="#b9dfb407" stroke="#8b9f7b55"/>{Array.from({length:35},(_,i)=><rect key={i} x={75+i%7*96} y={140+Math.floor(i/7)*106} width="72" height="70" rx="8" fill="#b9dfb40a"/>)}<text x="400" y="468" fill={cream} fontSize="185" fontWeight="700" textAnchor="middle">{ci===0?'?':f<narration[1].start+42?'100?':'200?'}</text></svg></>;
 }else if(s==='room'||s==='you'){
  title=s==='room'?<>Just <span style={{color:mint}}>23 people.</span></>:<>Not just someone<br/>matching <span style={{color:mint}}>you.</span></>;label=s==='room'?'A SMALL ROOM. A BIG SURPRISE.':'THE QUESTION YOUR INTUITION MAY BE ANSWERING';
  body=<><svg width="800" height="760" viewBox="0 0 800 760"><path d="M20 35H780V740H20Z" fill="#b9dfb406" stroke="#88a08060" strokeWidth="2"/><path d="M20 740L90 675H715L780 740" fill="#b9dfb408"/>{s==='you'?positions.slice(1).map((p,i)=><line key={i} x1="85" y1="125" x2={p.x} y2={p.y} stroke={peach} strokeOpacity=".23" strokeWidth="2"/>):null}{positions.map((p,i)=>{const v=r(f,begin('room')+8+i*2,begin('room')+25+i*2);return person(p.x,p.y+(1-v)*20,i,.85,s==='you'&&i===0?peach:mint,v*(s==='you'&&i>0?.35:1))})}{s==='you'?<><rect x="180" y="15" width="440" height="69" rx="18" fill={cream}/><text x="400" y="60" textAnchor="middle" fill={ink} fontSize="30">“Who shares MY birthday?”</text></>:null}</svg></>;
 }else if(s==='pairs'){
  label='EVERY NEW PERSON ADDS COMPARISONS';title=<>The probability<br/>counts <span style={{color:mint}}>pairs.</span></>;
  const p=r(f,narration[10].start,narration[10].start+30),third=ci>=10;
  body=<><svg width="800" height="500" viewBox="0 0 800 500"><path d="M180 190L400 190" stroke={mint} strokeWidth="5"/><path d="M180 190L620 190M400 190L620 190" stroke={peach} strokeWidth="4" strokeDasharray="440" strokeDashoffset={440*(1-p)} opacity={third?1:0}/>{person(180,190,0,1.6)}{person(400,190,1,1.6)}{person(620,190,2,1.6,peach,third?r(f,narration[10].start,narration[10].start+18):.12)}<text x="400" y="397" textAnchor="middle" fill={mint} fontSize="78">{third?'3 possible pairs':'1 possible pair'}</text></svg><Note>{third?'The third person adds two new pairs.':'The second person creates the first pair.'}</Note></>;
 }else if(s==='network'){
  label='23 × 22 ÷ 2';title=<>A small crowd.<br/><span style={{color:mint}}>253 comparisons.</span></>;const count=Math.floor(r(t,12,105)*253);
  body=<><svg width="800" height="800" viewBox="0 0 800 800">{edges.slice(0,count).map((e,i)=><line key={i} x1={e.p.x} y1={e.p.y} x2={e.q.x} y2={e.q.y} stroke={mint} strokeOpacity=".105" strokeWidth="1.5"/>)}{nodes.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r="18" fill="#1b322b" stroke={mint}/><circle cx={p.x} cy={p.y-4} r="5.5" fill={cream}/><path d={`M${p.x-8} ${p.y+10}Q${p.x} ${p.y-4} ${p.x+8} ${p.y+10}`} fill={mint}/></g>)}<rect x="270" y="310" width="260" height="160" rx="24" fill="#162e25"/><text x="400" y="425" textAnchor="middle" fill={cream} fontWeight="700" fontSize="115">{count}</text></svg><Note>Possible pairs—not independent chances.</Note></>;
 }else if(s==='method'){
  label='THE EASIER ROUTE TO THE ANSWER';title=<>Calculate<br/><span style={{color:mint}}>the opposite.</span></>;
  body=<><div style={{marginTop:65,padding:35,borderRadius:24,border:'1px solid #a58c79',fontSize:45,textAlign:'center',color:peach}}>At least one shared birthday?</div><svg width="800" height="115" viewBox="0 0 800 115"><path d="M400 10V95M382 77L400 95L418 77" stroke={mint} strokeWidth="4" fill="none"/></svg><div style={{padding:38,borderRadius:24,background:cream,color:ink,fontSize:46,textAlign:'center',opacity:r(t,30,55)}}>Every birthday is different.</div><Note>Find the chance of no match.<br/>Then subtract it from 100%.</Note></>;
 }else if(s==='calendar'){
  label='ONE YEAR. 365 POSSIBLE DATES.';title=ci<=16?<>The first birthday<br/>can be <span style={{color:mint}}>any day.</span></>:<>Each new birthday<br/>has dates to avoid.</>;
  const occupied=ci<17?0:ci<19?1:2;
  body=<><svg width="800" height="780" viewBox="0 0 800 780">{Array.from({length:365},(_,i)=><g key={i}><circle cx={115+i%20*30} cy={55+Math.floor(i/20)*29} r="10" fill={i<occupied?peach:mint} opacity={i<occupied?1:.65}/>{i<occupied?<path d={`M${110+i%20*30} ${50+Math.floor(i/20)*29}l10 10m0-10l-10 10`} stroke={ink} strokeWidth="2"/>:null}</g>)}<text x="400" y="733" fill={mint} textAnchor="middle" fontSize="105">{365-occupied} / 365</text></svg></>;
 }else if(s==='product'||s==='reveal'){
  label='ONE CALCULATION. TWO SIDES.';
  title=s==='product'?<>Multiply the chances<br/>of <span style={{color:mint}}>no match.</span></>:<>One minus “no match.”<br/><span style={{color:mint}}>That’s the surprise.</span></>;
  body=<ProbabilityBreakdown frame={f}/>;
 }else if(s==='model'){
  label='THE ASSUMPTIONS BEHIND THE NUMBER';title=<>A simple model.<br/><span style={{color:mint}}>A precise result.</span></>;
  body=<div style={{marginTop:35}}>{[['Independent birthdays','One person’s date does not determine another’s.'],['365 equally likely dates','Every day has the same probability.'],['Leap day ignored','This is the classic calculation.']].map(([a,b],i)=><div key={a} style={{opacity:r(t,i*16,i*16+20)}}><Card><div style={{fontSize:47,color:mint}}>{a}</div><div style={{fontSize:33,color:muted,lineHeight:1.4,marginTop:14}}>{b}</div></Card></div>)}</div>;
 }else if(s==='curve'){
  const target=captions.find(c=>c.text==='the chance exceeds 97%.')!.start-2;label='ACROSS MANY ROOMS';title=ci===29&&f>=target?<>50 people.<br/><span style={{color:mint}}>Over 97%.</span></>:<>A probability.<br/><span style={{color:mint}}>Not a promise.</span></>;
  const n=ci===29?23+Math.floor(r(f,narration[29].start,target)*27):23;const pt=(i:number)=>({x:70+i/60*650,y:600-chance(i)*490});const d=pt(n);const ax=Math.min(580,Math.max(130,d.x-50)),ay=Math.max(15,d.y-65);
  body=<><svg width="800" height="740" viewBox="0 0 800 740" style={{marginTop:25}}>{[0,.25,.5,.75,1].map(p=><g key={p}><line x1="70" y1={600-p*490} x2="730" y2={600-p*490} stroke="#b9dfb422"/><text x="55" y={608-p*490} fill={muted} textAnchor="end" fontSize="23">{p*100}%</text></g>)}{[10,20,30,40,50,60].map(i=><text key={i} x={pt(i).x} y="642" fill={muted} textAnchor="middle" fontSize="24">{i}</text>)}<polyline points={Array.from({length:61},(_,i)=>`${pt(i).x},${pt(i).y}`).join(' ')} stroke={mint} strokeWidth="5" fill="none"/><line x1={d.x} x2={d.x} y1={d.y} y2="600" stroke={peach} strokeDasharray="8 7" strokeWidth="2"/><circle cx={d.x} cy={d.y} r="10" fill={peach}/><rect x={ax} y={ay} width="160" height="46" rx="12" fill={cream}/><text x={ax+80} y={ay+32} fill={ink} fontSize="30" textAnchor="middle">{pct(chance(n))}</text><text x="400" y="705" textAnchor="middle" fill={muted} fontSize="27">Number of people in the room</text></svg><Note>At least one shared birthday · classic 365-day model</Note></>;
 }else{
  label='THE INTUITION GLITCH';title=<>You counted people.<br/><span style={{color:mint}}>Probability counted pairs.</span></>;
  body=<><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:70}}><div style={{textAlign:'center'}}><div style={{fontSize:160,fontWeight:700}}>23</div><div style={{fontSize:29,color:muted}}>PEOPLE</div></div><svg width="115" height="90" viewBox="0 0 115 90"><path d="M5 45H105M83 23L105 45L83 67" stroke={mint} strokeWidth="4" fill="none"/></svg><div style={{textAlign:'center'}}><div style={{fontSize:160,color:mint,fontWeight:700}}>253</div><div style={{fontSize:29,color:muted}}>POSSIBLE PAIRS</div></div></div><svg width="800" height="420" viewBox="0 0 800 420" style={{marginTop:55}}>{Array.from({length:8},(_,i)=>{const x=90+i*88;return <g key={i}>{Array.from({length:7-i},(_,j)=><path key={j} d={`M${x} 350Q${(x+90+(i+j+1)*88)/2} ${50+j%3*55} ${90+(i+j+1)*88} 350`} fill="none" stroke={mint} strokeOpacity=".19"/>)}{person(x,350,i,.65)}</g>})}</svg></>;
 }
 const calculation=s==='product'||s==='reveal';
 const tall=['question','room','you','calendar','network'].includes(s);
 const bodyScale=calculation?1:tall?1.08:['pairs','method','curve','close'].includes(s)?1.12:1.1;
 const bodyTop=calculation?470:s==='model'?550:s==='curve'?520:s==='close'?580:tall?510:610;
 const bodyEntry=r(f,calculation?begin('product'):begin(s),(calculation?begin('product'):begin(s))+14);
 const sentence=captions.filter(c=>c.start>=cue.start&&c.end<=cue.end).map(c=>c.text).join(' ')||cue.text;
 return <AbsoluteFill data-birthday-frame style={{background:'#1c302b',color:cream,fontFamily:'Liberation Serif, serif',overflow:'hidden'}}><Audio src={staticFile('audio/birthday-paradox-michael.wav')}/><AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 35%,#b9dfb410,transparent 70%)'}}/><div style={{position:'absolute',left:'50%',transform:'translateX(-50%)',width:810,textAlign:'center',top:130,color:muted,fontSize:21,letterSpacing:3.8}}>THE INTUITION GLITCH</div><div style={{position:'absolute',left:'50%',transform:'translateX(-50%)',textAlign:'center',top:205,width:850}}><div style={{fontSize:21,letterSpacing:2.5,color:peach,marginBottom:20}}>{label}</div><div style={{fontSize:62,fontWeight:700,lineHeight:1.12}}>{title}</div></div><div style={{position:'absolute',left:'50%',top:bodyTop,width:800,height:1030,textAlign:'center',opacity:bodyEntry,transformOrigin:'top center',transform:`translateX(-50%) translateY(${(1-bodyEntry)*10}px) scale(${bodyScale})`}}>{body}</div><div data-birthday-caption style={{position:'absolute',left:50,right:50,bottom:150,padding:'27px 32px',minHeight:135,boxSizing:'border-box',border:'1px solid #778f7755',borderRadius:20,background:'#091113eb',fontSize:37,lineHeight:1.4,fontWeight:700,textAlign:'center'}}>{sentence}</div></AbsoluteFill>;
};
const BirthdayParadox=({uiOverlay=false}:{uiOverlay?:boolean})=><AbsoluteFill style={{background:'#162c2b'}}><Sequence durationInFrames={CONTENT_DURATION}><Main/></Sequence><Sequence from={CONTENT_DURATION} durationInFrames={ENDING_DURATION}><AbsoluteFill style={{background:'#162c2b'}}><AbsoluteFill style={{transform:'scale(.94)'}}><Sequence from={-OUTRO_SKIP}><SharedOutro/></Sequence></AbsoluteFill></AbsoluteFill></Sequence>{uiOverlay?<AbsoluteFill style={{pointerEvents:'none'}}><div style={{position:'absolute',left:900,top:0,width:180,height:1920,background:'#ff405040',borderLeft:'2px dashed #ff9898'}}/><div style={{position:'absolute',left:0,top:1440,width:1080,height:480,background:'#ff405040',borderTop:'2px dashed #ff9898'}}/><div style={{position:'absolute',left:0,top:0,width:1080,height:150,background:'#ff405025'}}/><div style={{position:'absolute',left:180,top:1240,width:720,height:200,border:'2px dashed #b9dfb4'}}/></AbsoluteFill>:null}</AbsoluteFill>;
export const BirthdayParadoxComposition=()=> <Composition id="BirthdayParadox" component={BirthdayParadox} durationInFrames={CONTENT_DURATION+ENDING_DURATION} width={1080} height={1920} fps={30}/>;

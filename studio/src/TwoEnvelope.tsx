import React from 'react';
import {AbsoluteFill, Audio, Composition, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {cues, mainDuration} from './twoEnvelopeData';
import {SharedOutro, SHARED_OUTRO_DURATION} from './SharedOutro';
const cream='#f7f1e3', mint='#b9dfb4', peach='#edb99a', muted='#aebfb4', ink='#162c2b';
const ramp=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const sceneStart=(s:string)=>cues.find(c=>c.scene===s)!.start;
const Env=({x,y,label='?',scale=1,open=0,selected=false}:{x:number;y:number;label?:string;scale?:number;open?:number;selected?:boolean})=><g transform={`translate(${x},${y}) scale(${scale})`}>
 <path d={`M-140 -70L0 ${-160*open-10}L140 -70`} fill="#365242" stroke={selected?mint:muted} strokeWidth="3"/>
 {open>0?<g transform={`translate(0,${-85*open})`}><rect x="-112" y="-105" width="224" height="145" rx="14" fill={cream}/><text x="0" y="-27" textAnchor="middle" fontSize="52" fill={ink}>{label}</text></g>:null}
 <rect x="-140" y="-70" width="280" height="170" rx="13" fill="#2a493c" stroke={selected?mint:muted} strokeWidth={selected?4:2}/>
 <path d="M-135 -65L0 25L135 -65M-135 95L-42 5M135 95L42 5" fill="none" stroke={selected?mint:muted} strokeWidth="2" strokeOpacity=".65"/>
 {!open?<text x="0" y="76" textAnchor="middle" fill={cream} fontSize="45">{label}</text>:null}
</g>;
const Note=({children}:{children:React.ReactNode})=><div style={{fontSize:32,lineHeight:1.4,textAlign:'center',color:muted,marginTop:28}}>{children}</div>;
const Arrow=({x=440,y=330,color=mint}:{x?:number;y?:number;color?:string})=><g transform={`translate(${x},${y})`}><path d="M-100 -15H100M80 -35L100 -15L80 5M100 35H-100M-80 15L-100 35L-80 55" stroke={color} fill="none" strokeWidth="4" strokeLinecap="round"/></g>;

const Temptation=({f,ci}:{f:number;ci:number})=><div style={{textAlign:'center'}}>
 <div style={{fontSize:28,letterSpacing:3,color:peach}}>THE PROPOSED ARGUMENT</div>
 <svg width="880" height="390" viewBox="0 0 880 390">
  <Env x={235} y={175} label="A" selected/><Env x={650} y={175} label={ci>=2?'2A or A/2':'?'} scale={1}/>
  <text x="235" y="340" fill={mint} textAnchor="middle" fontSize="30">YOUR ENVELOPE</text><text x="650" y="340" fill={muted} textAnchor="middle" fontSize="30">THE OTHER ONE</text>
 </svg>
 <div style={{display:'flex',gap:28,alignItems:'center',justifyContent:'center',opacity:ci>=2?1:.15}}>{['½ × 2A','½ × A/2'].map((t,i)=><React.Fragment key={t}><div style={{fontSize:50,padding:'25px 30px',border:'1px solid #8b9a78',borderRadius:20}}>{t}</div>{i===0?<span style={{fontSize:52}}>+</span>:null}</React.Fragment>)}</div>
 <div style={{fontSize:100,color:peach,marginTop:40,opacity:ci>=3?ramp(f,cues[3].start,cues[3].start+25):.1}}>= 1.25A?</div>
 <Note>The 50/50 weights are an assumption to examine.</Note>
</div>;

const Fixed=({f,ci}:{f:number;ci:number})=>{
 const show=ci>=7, mean=ci>=8;
 return <div style={{textAlign:'center'}}>
  <svg width="880" height="430" viewBox="0 0 880 430"><Env x={235} y={215} label="$10" selected open={1}/><Env x={650} y={215} label="$20" open={1}/><Arrow y={365}/></svg>
  <div style={{opacity:show?1:.15}}>{[{from:'Pick $10 → switch to $20',gain:'+$10',color:mint},{from:'Pick $20 → switch to $10',gain:'−$10',color:peach}].map((r,i)=><div key={r.from} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px 30px',borderTop:'1px solid #617e6b',fontSize:39,opacity:show?ramp(f,cues[7].start+i*45,cues[7].start+i*45+20):1}}><span>{r.from}</span><span style={{color:r.color,fontSize:55}}>{r.gain}</span></div>)}</div>
  <div style={{fontSize:59,color:mint,marginTop:30,opacity:mean?ramp(f,cues[8].start,cues[8].start+25):.12}}>Either envelope: E = $15</div>
  <Note>Fixed pair · equal chance to pick either envelope</Note>
 </div>;
};

const Mistake=({ci}:{ci:number})=><div style={{textAlign:'center',paddingTop:20}}>
 {ci===9?<>
  {[{a:'A = $10',other:'Other = $20',gain:'Gain $10',color:mint},{a:'A = $20',other:'Other = $10',gain:'Lose $10',color:peach}].map(v=><div key={v.a} style={{display:'flex',alignItems:'center',justifyContent:'space-between',border:'1px solid '+v.color+'88',padding:'40px 30px',borderRadius:22,marginBottom:32}}><div style={{fontSize:61,color:v.color}}>{v.a}</div><div style={{textAlign:'right',fontSize:37,lineHeight:1.5}}>{v.other}<br/>{v.gain}</div></div>)}
  <div style={{fontSize:56,lineHeight:1.4,marginTop:65}}>One letter.<br/><span style={{color:peach}}>Different values in the cases.</span></div>
 </>:<>
  <div style={{fontSize:64,padding:'35px',border:'2px solid '+mint,borderRadius:23}}>A = an observed amount</div>
  <svg width="880" height="240" viewBox="0 0 880 240"><path d="M440 35V100L220 200M440 100L660 200" stroke={muted} strokeWidth="3" fill="none"/></svg>
  <div style={{display:'flex',gap:35,justifyContent:'center'}}>{['Other = A/2','Other = 2A'].map(t=><div key={t} style={{flex:1,fontSize:43,padding:'28px 12px',border:'1px solid #8d9c7c',borderRadius:18}}>{t}<div style={{fontSize:64,color:peach,marginTop:35}}>P = ?</div></div>)}</div>
  <Note>Probabilities must be conditional on what you saw.</Note>
 </>}
</div>;

const Pairs=({ci}:{ci:number})=><svg width="880" height="790" viewBox="0 0 880 790">
 <text x="440" y="48" textAnchor="middle" fill={muted} fontSize="28">ORGANIZER CHOOSES A PAIR FIRST</text>
 {[0,1].map(i=><g key={i} opacity={ci>=12?1:.35}><rect x="50" y={100+i*320} width="780" height="280" rx="23" fill="#b9dfb406" stroke="#78917b"/><Env x={280} y={245+i*320} label={i===0?'$10':'$20'} open={1} scale={.75}/><Env x={600} y={245+i*320} label={i===0?'$20':'$40'} open={1} scale={.75}/><text x="440" y={355+i*320} fill={mint} textAnchor="middle" fontSize="35">50% chance of this pair</text></g>)}
 <text x="440" y="770" fill={cream} textAnchor="middle" fontSize="33">Then you pick either envelope at random.</text>
</svg>;

const States=({observed}:{observed?:number})=><div style={{textAlign:'center'}}>
 <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',fontSize:25,color:muted,letterSpacing:1,padding:'20px 0'}}> <span>PAIR</span><span>YOU SEE</span><span>OTHER</span></div>
 {[{pair:'$10 / $20',a:10,b:20},{pair:'$10 / $20',a:20,b:10},{pair:'$20 / $40',a:20,b:40},{pair:'$20 / $40',a:40,b:20}].map((r,i)=>{const active=observed===undefined||r.a===observed;return <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',alignItems:'center',height:108,borderTop:'1px solid #647e6e',background:active?'#b9dfb40b':'transparent',opacity:active?1:.18,fontSize:47}}><span style={{fontSize:35,color:muted}}>{r.pair}</span><span style={{color:mint}}>${r.a}</span><span style={{color:peach}}>${r.b}</span></div>})}
 <Note>{observed===undefined?'Each row has probability ¼ before you open.':`Keep only the rows consistent with seeing $${observed}.`}</Note>
</div>;

const Main=()=>{
 const f=useCurrentFrame(),ci=Math.max(0,cues.findLastIndex(c=>f>=c.start)),cue=cues[ci],s=cue.scene;
 const enter=ramp(f,sceneStart(s),sceneStart(s)+12);
 let title:React.ReactNode,visual:React.ReactNode;
 if(s==='hook'){
  title=<>Two envelopes.<br/><span style={{color:mint}}>Would you switch?</span></>;
  const p=ramp(f,cues[0].start+60,cues[0].end-15);
  visual=<svg width="880" height="850" viewBox="0 0 880 850"><Env x={235+15*p} y={275-20*p} scale={1.15} selected/><Env x={650} y={275} scale={1.15}/><Arrow y={540}/><text x="440" y="720" textAnchor="middle" fill={cream} fontSize="55">One amount is twice the other.</text></svg>;
 }else if(s==='temptation'){
  title=<>The tempting math:<br/><span style={{color:peach}}>“Always switch.”</span></>;visual=<Temptation f={f} ci={ci}/>;
 }else if(s==='loop'){
  title=<>Switch. Switch back.<br/><span style={{color:peach}}>Repeat forever?</span></>;
  const t=f-sceneStart(s),phase=(t%150)/150,p=ramp(phase,0,.65),back=Math.floor(t/150)%2===1;
  const a=back?1-p:p;
  visual=<svg width="880" height="850" viewBox="0 0 880 850"><Env x={235+415*a} y={280-60*Math.sin(p*Math.PI)} selected/><Env x={650-415*a} y={280+60*Math.sin(p*Math.PI)}/><Arrow y={560} color={peach}/><text x="440" y="700" textAnchor="middle" fill={peach} fontSize="66">Another “25% gain”?</text><text x="440" y="785" textAnchor="middle" fill={muted} fontSize="31">The money inside has not changed.</text></svg>;
 }else if(s==='fixed'){
  title=<>Keep the actual<br/><span style={{color:mint}}>money fixed.</span></>;visual=<Fixed f={f} ci={ci}/>;
 }else if(s==='mistake'){
  title=ci===9?<>What does <span style={{color:peach}}>A</span><br/>mean in each case?</>:<>After you look,<br/><span style={{color:mint}}>update the odds.</span></>;visual=<Mistake ci={ci}/>;
 }else if(s==='model'){
  title=<>Specify how<br/><span style={{color:mint}}>the pairs are made.</span></>;visual=<Pairs ci={ci}/>;
 }else if(s==='twenty'){
  title=<>You open it.<br/><span style={{color:mint}}>You see $20.</span></>;
  visual=<div><States observed={20}/><div style={{fontSize:47,textAlign:'center',marginTop:40,opacity:ci>=14?ramp(f,cues[14].start,cues[14].start+25):.12}}>½ × $10 + ½ × $40</div><div style={{fontSize:88,textAlign:'center',color:mint,marginTop:20,opacity:ci>=14?ramp(f,cues[14].start+25,cues[14].start+45):.12}}>= $25</div><Note>{ci>=15?'The 50/50 calculation is valid here.':'Two matching rows → equal conditional probabilities'}</Note></div>;
 }else if(s==='forty'){
  title=<>Same model.<br/><span style={{color:peach}}>Now you see $40.</span></>;
  visual=<div><States observed={40}/><div style={{textAlign:'center',fontSize:64,marginTop:35,color:peach}}>Other envelope: $20</div><div style={{textAlign:'center',fontSize:42,marginTop:35,color:muted,opacity:ci>=17?1:.15}}>$80 has probability 0 in this model.</div><Note>Two hypothetical amounts ≠ two equally likely amounts</Note></div>;
 }else if(s==='compare'){
  title=<>Before opening:<br/><span style={{color:mint}}>same expectation.</span></>;
  visual=<div><States/><div style={{textAlign:'center',fontSize:47,marginTop:35}}>(10 + 20 + 20 + 40) ÷ 4</div><div style={{textAlign:'center',fontSize:88,color:mint,marginTop:20}}>$22.50</div><Note>{ci===18?'The other column has the same four amounts.':'Opening reveals information. Switching alone does not.'}</Note></div>;
 }else{
  title=<>Before trusting<br/><span style={{color:mint}}>an expected value…</span></>;
  visual=<div style={{textAlign:'center'}}><svg width="880" height="360" viewBox="0 0 880 360"><Env x={235} y={215} label="?" selected/><Env x={650} y={215} label="?"/></svg>{['What is random?','What is fixed?','What information do I have?'].map((text,i)=><div key={text} style={{fontSize:i===2?49:58,color:i===1?peach:cream,padding:'22px 10px',borderTop:'1px solid #637c6b',opacity:ci>=21?ramp(f,cues[21].start+i*25,cues[21].start+i*25+20):.4}}>{text}</div>)}</div>;
 }
 return <AbsoluteFill style={{background:ink,color:cream,fontFamily:'Liberation Serif, serif',overflow:'hidden'}}>
  <Audio src={staticFile('audio/two-envelope-paradox-michael.wav')}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 35%,#b9dfb40e,transparent 70%)'}}/>
  <div style={{position:'absolute',top:95,left:60,right:60,textAlign:'center',fontSize:25,letterSpacing:5,color:muted}}>THE INTUITION GLITCH</div>
  <div style={{position:'absolute',top:225,left:65,right:65,textAlign:'center',fontSize:s==='close'?74:80,lineHeight:1.13,fontWeight:700,opacity:enter}}>{title}</div>
  <div style={{position:'absolute',left:100,top:535,width:880,opacity:enter,transform:`translateY(${(1-enter)*10}px)`}}>{visual}</div>
  <div style={{position:'absolute',left:50,right:50,bottom:150,padding:'27px 32px',minHeight:135,boxSizing:'border-box',border:'1px solid #778f7755',borderRadius:20,background:'#091113eb',fontSize:37,lineHeight:1.4,fontWeight:700,textAlign:'center',color:'white'}}>{cue.text}</div>
 </AbsoluteFill>;
};
const TwoEnvelope=()=><AbsoluteFill><Sequence durationInFrames={mainDuration}><Main/></Sequence><Sequence from={mainDuration} durationInFrames={SHARED_OUTRO_DURATION-9}><Sequence from={-9}><SharedOutro/></Sequence></Sequence></AbsoluteFill>;
export const TwoEnvelopeComposition=()=><Composition id="TwoEnvelope" component={TwoEnvelope} width={1080} height={1920} fps={30} durationInFrames={mainDuration+SHARED_OUTRO_DURATION-9}/>;

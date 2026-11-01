import React from 'react';
import {AbsoluteFill,Audio,Composition,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {cues,duration} from './minimumTrapCues';
const paper='#f6f0df',mint='#b4dfae',coral='#efaa90',muted='#b0bcb5';
const ramp=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const usd=(v:number)=>'$'+Math.round(v).toLocaleString('en-US');
const paths=[100,150].map(pay=>{let b=3000;let h=[b];while(b>.001){b=Math.max(0,b*1.02-pay);h.push(b)}return h});
const titleStyle:React.CSSProperties={fontSize:78,fontWeight:700,lineHeight:1.15,marginTop:28};
const labelStyle:React.CSSProperties={fontSize:25,letterSpacing:4,color:mint};
const Calm=()=>{
 const f=useCurrentFrame();const starts=[0,428,845,1135];const scene=f<428?0:f<845?1:f<1135?2:3;
 const enter=ramp(f,starts[scene],starts[scene]+15);const ends=[428,845,1135,duration];const exit=scene===3?1:1-ramp(f,ends[scene]-12,ends[scene]);
 const cue=[...cues].reverse().find(c=>f>=c.start)||cues[0];
 const interest=ramp(f,440,500),payment=ramp(f,565,610),breakdown=ramp(f,630,660);
 const balance=3000+60*interest-100*payment;
 const graph=ramp(f,984,1100);
 return <AbsoluteFill style={{background:['#152329','#252823','#1b292b','#222b25'][scene],color:paper,fontFamily:'Liberation Serif, serif',overflow:'hidden'}}>
 <Audio src={staticFile('audio/minimum-trap-michael.wav')}/>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 80% 20%,#94ba9b13,transparent 70%)'}}/>
 <div style={{position:'absolute',top:77,left:75,right:75,display:'flex',justifyContent:'space-between',fontSize:23,letterSpacing:3,color:muted}}><span>THE MINIMUM PAYMENT TRAP</span><span>{scene+1} / 4</span></div>
 <div style={{position:'absolute',top:170,left:75,width:65,height:3,background:mint}}/>
 <div style={{position:'absolute',left:75,right:75,top:235,opacity:enter*exit,transform:`translateY(${(1-enter)*12}px)`}}>
 {scene===0?<>
  <div style={labelStyle}>SMALL PAYMENT. LONG COMMITMENT.</div>
  <div style={titleStyle}>Still paying<br/>just the minimum?</div>
  <div style={{marginTop:85,width:880,height:485,borderRadius:36,padding:52,boxSizing:'border-box',background:'linear-gradient(120deg,#4a5260,#252d37)',border:'1px solid #7c858e',boxShadow:'0 30px 60px #0003',transform:`scale(${1+ramp(f,0,419)*.015})`,transformOrigin:'left center'}}>
   <div style={{fontSize:27,letterSpacing:5,display:'flex',justifyContent:'space-between'}}><span>CREDIT</span><span>•••• 2048</span></div>
   <div style={{height:60,width:85,borderRadius:10,background:'#dacb9b',marginTop:52}}/>
   <div style={{fontSize:104,fontWeight:700,marginTop:30,opacity:ramp(f,212,237)}}>$3,000</div>
   <div style={{fontSize:24,color:'#cad0d2',marginTop:5}}>ILLUSTRATIVE BALANCE</div>
  </div>
  <div style={{marginTop:60,display:'flex',alignItems:'center',gap:35,opacity:ramp(f,305,330)}}><div style={{fontSize:81,color:coral}}>24%</div><div style={{fontSize:31,lineHeight:1.4}}>APR<br/><span style={{color:muted,fontSize:26}}>2% monthly, in this example</span></div></div>
  <div style={{fontSize:29,color:muted,marginTop:35,opacity:ramp(f,94,115)}}>A current account can still carry long-term debt.</div>
 </>:scene===1?<>
  <div style={labelStyle}>FOLLOW ONE MONTH'S PAYMENT</div>
  <div style={titleStyle}>Where your<br/>$100 actually goes.</div>
  <div style={{marginTop:60,background:'#111b17',padding:'40px 45px',borderRadius:25,border:'1px solid #687464'}}>
   <div style={{fontSize:26,color:muted,letterSpacing:3}}>OUTSTANDING BALANCE</div>
   <div style={{fontSize:124,fontWeight:700,marginTop:15}}>{usd(balance)}</div>
   <div style={{display:'flex',justifyContent:'space-between',marginTop:20,fontSize:32}}><span style={{color:coral,opacity:interest}}>+$60 interest</span><span style={{color:mint,opacity:payment}}>−$100 payment</span></div>
  </div>
  <div style={{marginTop:65,opacity:breakdown}}>
   <div style={{fontSize:29,color:muted,marginBottom:25}}>YOUR $100 PAYMENT</div>
   <div style={{display:'flex',height:175,borderRadius:18,overflow:'hidden'}}><div style={{width:'60%',background:coral,color:'#322820',padding:25,boxSizing:'border-box'}}><div style={{fontSize:65}}>$60</div><div style={{fontSize:29}}>Interest</div></div><div style={{width:'40%',background:mint,color:'#203325',padding:25,boxSizing:'border-box'}}><div style={{fontSize:65}}>$40</div><div style={{fontSize:29}}>Principal</div></div></div>
   <div style={{fontSize:31,lineHeight:1.5,marginTop:30}}>Only $40 reduces the original $3,000.</div>
  </div>
  <div style={{marginTop:45,paddingTop:25,borderTop:'1px solid #718071',fontSize:31,color:coral,opacity:ramp(f,738,770)}}>Next month: interest applies again.</div>
 </>:scene===2?<>
  <div style={labelStyle}>A SMALL CHANGE IN THE PAYMENT</div>
  <div style={titleStyle}>Pay $50 more.<br/>Finish sooner.</div>
  <div style={{display:'flex',gap:30,marginTop:55}}>{[100,150].map((v,i)=><div key={v} style={{flex:1,padding:28,borderRadius:22,border:`1px solid ${i?mint:coral}`,background:'#ffffff05'}}><div style={{fontSize:62,color:i?mint:coral}}>${v}<span style={{fontSize:27}}>/mo</span></div><div style={{fontSize:37,marginTop:15,opacity:ramp(f,990,1020)}}>{i?'26':'47'} months</div></div>)}</div>
  <svg width="930" height="360" viewBox="0 0 930 360" style={{marginTop:65}}>{[0,1,2,3].map(i=><line key={i} x1="10" x2="910" y1={25+i*95} y2={25+i*95} stroke="#ffffff18"/>)}{paths.map((h,i)=><polyline key={i} points={h.slice(0,Math.max(1,Math.ceil(graph*h.length))).map((b,m)=>`${10+m/47*900},${25+(1-b/3000)*285}`).join(' ')} stroke={i?mint:coral} strokeWidth="7" fill="none"/>)}<text x="10" y="350" fill={muted} fontSize="24">Month 0</text><text x="785" y="350" fill={muted} fontSize="24">Month 47</text></svg>
  <div style={{fontSize:28,lineHeight:1.55,color:muted,marginTop:30}}>Fixed payments · $3,000 balance · 24% APR<br/>2% monthly interest; payments at month-end.<br/>No fees or new charges. Final payment varies.</div>
  <div style={{fontSize:25,color:muted,marginTop:20}}>Actual minimum-payment formulas vary by card.</div>
 </>:<>
  <div style={labelStyle}>TAKE THE NEXT STEP</div>
  <div style={titleStyle}>Smaller today.<br/>Longer tomorrow.</div>
  <div style={{marginTop:85,fontSize:43,lineHeight:1.5,color:muted}}>A payment that feels easier now<br/>can keep debt around for longer.</div>
  <div style={{marginTop:85,opacity:ramp(f,1253,1270),transform:`translateY(${(1-ramp(f,1253,1270))*12}px)`}}>
   <div style={{padding:'30px 0',borderBottom:'1px solid #718071',fontSize:53}}><span style={{color:mint}}>01</span>  Check your APR.</div>
   <div style={{padding:'35px 0',fontSize:53,opacity:ramp(f,1290,1310)}}><span style={{color:mint}}>02</span>  Pay extra when you can.</div>
  </div>
 </>}
 </div>
 <div style={{position:'absolute',left:55,right:55,bottom:155,minHeight:130,boxSizing:'border-box',padding:'30px 34px',background:'#080e11d9',border:'1px solid #6d807155',borderRadius:20,fontSize:38,fontWeight:700,lineHeight:1.4,textAlign:'center'}}>{cue.text}</div>
 <div style={{position:'absolute',bottom:76,left:75,right:75,fontSize:20,color:muted,textAlign:'center',letterSpacing:2}}>ILLUSTRATIVE MATH • ACTUAL CARD TERMS VARY</div>
 <div style={{position:'absolute',bottom:0,height:5,width:`${f/(duration-1)*100}%`,background:mint}}/>
 </AbsoluteFill>;
};
export const MinimumTrapCalmComposition=()=> <Composition id="MinimumTrapCalm" component={Calm} durationInFrames={duration} width={1080} height={1920} fps={30}/>;

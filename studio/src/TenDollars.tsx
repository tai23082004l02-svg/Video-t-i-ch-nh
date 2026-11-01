import React from 'react';
import {AbsoluteFill,Audio,Composition,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {cues,duration} from './tenDollarsCues';
const green='#a9f46a',orange='#ffae86',muted='#a5b9b4';
const cl=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const dollars=(n:number)=>'$'+Math.round(n).toLocaleString('en-US');
const Video=()=>{
 const f=useCurrentFrame();
 const c=[...cues].reverse().find(c=>f>=c.start)||cues[0];
 const kind=f<cues[0].start?'hook':c.kind;
 const progress=cl(f,cues[3].start,cues[4].end-15);
 const year=kind==='year'?cl(f,cues[3].start,cues[3].end)*1:1+cl(f,cues[4].start,cues[4].end-15)*9;
 const fade=cl(f,c.start,c.start+9);
 const words=c.text.split(' ');const wp=cl(f,c.start,c.end);
 return <AbsoluteFill style={{background:'#091b19',color:'#faf9ef',fontFamily:'Liberation Serif, serif'}}>
 <Audio src={staticFile('audio/ten-dollars-michael.wav')}/>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 80% 15%, #254d3b 0%, transparent 65%)'}}/>
 <div style={{position:'absolute',inset:0,opacity:.08,backgroundImage:'linear-gradient(#b0dcbe 1px, transparent 1px),linear-gradient(90deg,#b0dcbe 1px,transparent 1px)',backgroundSize:'108px 108px'}}/>
 <div style={{position:'absolute',top:78,left:70,right:70,display:'flex',justifyContent:'space-between',color:muted,fontSize:23,letterSpacing:3}}><span>MONEY / SMALL HABITS</span><span>01</span></div>
 <div style={{position:'absolute',top:155,left:70,width:60,height:5,background:green}}/>
 {kind==='hook'?<div style={{position:'absolute',left:70,right:70,top:300,transform:`translateY(${(1-fade)*20}px)`}}>
  <div style={{fontSize:30,color:green,letterSpacing:5}}>THE DAILY DECISION</div>
  <div style={{fontSize:280,fontWeight:900,letterSpacing:-17,lineHeight:1.25,marginTop:10}}><span style={{fontSize:130,color:green}}>$</span>10</div>
  <div style={{fontSize:75,fontWeight:700}}>a day.</div>
  <div style={{height:2,background:'#53684d',margin:'55px 0'}}/>
  <div style={{fontSize:78,lineHeight:1.2,fontWeight:800}}>Too small<br/>to matter<span style={{color:green}}>?</span></div>
 </div>:kind==='end'?<div style={{position:'absolute',left:70,right:70,top:285,opacity:fade}}>
  <div style={{fontSize:28,color:green,letterSpacing:4}}>KEEP THE JOY.</div>
  <div style={{fontSize:92,fontWeight:900,lineHeight:1.18,marginTop:40}}>Give some<br/>of your dollars<br/><span style={{color:green}}>a future.</span></div>
  <div style={{height:3,width:130,background:green,margin:'65px 0'}}/>
  <div style={{fontSize:38,lineHeight:1.6,color:'#d0ded3'}}>Choose an amount that fits.<br/>Make it a daily habit.</div>
  <div style={{marginTop:75,background:green,color:'#142516',padding:30,borderRadius:22,fontSize:36,fontWeight:800}}>What would you start with?</div>
 </div>:<>
 <div style={{position:'absolute',left:70,right:70,top:230}}>
  <div style={{fontSize:72,fontWeight:900,lineHeight:1.2}}>Same $10.<br/><span style={{color:green}}>Different choices.</span></div>
 </div>
 <div style={{position:'absolute',top:470,left:70,right:70,display:'flex',gap:28}}>
 {[false,true].map(save=><div key={String(save)} style={{boxSizing:'border-box',width:456,height:590,borderRadius:30,padding:32,background:save?'#203e2e':'#302e29',border:`2px solid ${save?'#577c43':'#665447'}`,overflow:'hidden',position:'relative'}}>
 <div style={{fontSize:29,fontWeight:800,color:save?green:orange}}>{save?'SAVE FOR LATER':'SPEND TODAY'}</div>
 <div style={{fontSize:24,color:muted,marginTop:15}}>{save?'Build a cushion':'Enjoy the moment'}</div>
 <div style={{position:'absolute',bottom:160,left:32,right:32,height:260}}>
 {Array.from({length:12},(_,i)=>{let cycle=((f+i*19)%110)/110;return <div key={i} style={{position:'absolute',left:(i%3)*115,top:save?220-Math.floor(i/3)*59:cycle*230,opacity:save?(progress>i/14?1:.15):1-cycle,width:96,height:48,borderRadius:7,background:save?green:orange,color:'#243525',fontSize:25,fontWeight:900,textAlign:'center',paddingTop:6,transform:`rotate(${save?0:i%2?9:-9}deg)`}}>$10</div>})}
 </div>
 <div style={{position:'absolute',left:32,bottom:40,fontSize:save?49:33,fontWeight:900,color:save?green:orange}}>{save?(kind==='split'||kind==='spend'?'DAY BY DAY':dollars(year*3650)):'MOMENTS'}</div>
 </div>)}
 </div>
 <div style={{position:'absolute',left:70,right:70,top:1130}}>
 {kind==='year'||kind==='decade'||kind==='math'?<>
 <div style={{display:'flex',justifyContent:'space-between',color:muted,fontSize:25}}><span>{kind==='year'?'YEAR 1':'THE LONG VIEW'}</span><span>{year.toFixed(1)} YEARS</span></div>
 <svg width="940" height="180" viewBox="0 0 940 180"><path d="M0 160 L940 160" stroke="#52684f" strokeWidth="2"/><path d={`M0 160 L${940*progress} ${160-140*progress}`} stroke={green} strokeWidth="7" fill="none"/><circle cx={940*progress} cy={160-140*progress} r="10" fill={green}/></svg>
 <div style={{fontSize:27,color:'#c6d5c9',marginTop:10}}>{kind==='year'?'$10 × 365 days = $3,650':'$10 × 365 days × 10 years = $36,500'}</div>
 <div style={{fontSize:23,color:muted,marginTop:22}}>Assumes daily saving and 365 days per year.<br/>Before interest. Not adjusted for inflation.</div>
 </>:<div style={{fontSize:43,color:'#c6d5c9',lineHeight:1.5}}>One choice feels small.<br/>Repeated choices add up.</div>}
 </div>
 </>}
 <div style={{position:'absolute',left:55,right:55,bottom:155,minHeight:140,boxSizing:'border-box',borderRadius:24,background:'#04100fe8',border:'1px solid #40584b',padding:'30px 35px',fontSize:35,fontWeight:700,lineHeight:1.45,textAlign:'center'}}>
 {words.map((w,i)=><span key={i} style={{color:i<=Math.floor(wp*words.length)?'#faf9ef':'#84978b'}}>{w}{' '}</span>)}
 </div>
 <div style={{position:'absolute',bottom:75,left:70,right:70,fontSize:20,color:muted,textAlign:'center',letterSpacing:2}}>SMALL HABITS. LONG-TERM THINKING.</div>
 <div style={{position:'absolute',bottom:0,height:7,width:`${f/(duration-1)*100}%`,background:green}}/>
 </AbsoluteFill>;
};
export const TenDollarsComposition=()=> <Composition id="TenDollars" component={Video} width={1080} height={1920} fps={30} durationInFrames={duration}/>;

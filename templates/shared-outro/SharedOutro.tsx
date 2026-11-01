import React from 'react';
import {AbsoluteFill,Audio,Composition,staticFile,useCurrentFrame,interpolate} from 'remotion';
import {cues,duration} from './sharedOutroCues';
export const SHARED_OUTRO_DURATION=duration;
export const SHARED_OUTRO_FPS=30;
const ramp=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
/** Put inside a Sequence or Series.Sequence to append to any 1080x1920, 30fps video. */
export const SharedOutro=({audio=true}:{audio?:boolean})=>{
 const f=useCurrentFrame();const first=ramp(f,cues[0].start-5,cues[0].start+15),second=ramp(f,cues[1].start-5,cues[1].start+15),follow=ramp(f,cues[2].start-5,cues[2].start+15);
 return <AbsoluteFill style={{background:'#162c2b',color:'#f7f1e3',fontFamily:'Liberation Serif, serif',overflow:'hidden'}}>
 {audio?<Audio src={staticFile('audio/shared-outro-michael.wav')}/>:null}
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 35%,#85bb8520,transparent 65%)'}}/>
 <div style={{position:'absolute',top:465,left:470,width:140,height:140,opacity:first,transform:`translateY(${(1-first)*12}px)`}}>
 <svg width="140" height="140" viewBox="0 0 140 140" fill="none"><circle cx="70" cy="70" r="64" stroke="#b9dfb4" strokeOpacity=".35" strokeWidth="2"/><path d="M37 89L59 67L75 80L104 48M82 48H104V70" stroke="#b9dfb4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>
 </div>
 <div style={{position:'absolute',top:690,left:70,right:70,textAlign:'center'}}>
 <div style={{fontSize:97,lineHeight:1.2,fontWeight:700,opacity:first,transform:`translateY(${(1-first)*15}px)`}}>Smarter choices.</div>
 <div style={{fontSize:97,lineHeight:1.2,fontWeight:700,marginTop:20,color:'#b9dfb4',opacity:second,transform:`translateY(${(1-second)*15}px)`}}>A better future.</div>
 <div style={{margin:'65px auto 0',width:120*second,height:2,background:'#b9dfb4',opacity:second}}/>
 <div style={{display:'inline-flex',alignItems:'center',gap:22,padding:'23px 43px',marginTop:65,borderRadius:60,border:'1px solid #b9dfb499',background:'#b9dfb40c',fontSize:43,opacity:follow,transform:`translateY(${(1-follow)*12}px)`}}><span>Follow for more</span><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 6V26M6 16H26" stroke="#b9dfb4" strokeWidth="2.5" strokeLinecap="round"/></svg></div>
 </div>
 </AbsoluteFill>;
};
export const SharedOutroComposition=()=> <Composition id="SharedOutro" component={SharedOutro} durationInFrames={duration} fps={30} width={1080} height={1920}/>;

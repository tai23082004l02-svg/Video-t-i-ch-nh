import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,staticFile,useCurrentFrame,interpolate} from 'remotion';
import {cues,duration as mainDuration} from './movingGoalpostsCues';
import {SharedOutro,SHARED_OUTRO_DURATION} from './SharedOutro';
const cream='#f8f0df',mint='#b9dfb4',peach='#e6b398',muted='#bfc2bc';
const r=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const Title=({label,children}:{label:string,children:React.ReactNode})=><><div style={{fontSize:25,letterSpacing:4,color:peach,marginBottom:27}}>{label}</div><div style={{fontSize:79,fontWeight:700,lineHeight:1.14}}>{children}</div></>;
const Person=({x=0,y=0,color=mint}:{x?:number,y?:number,color?:string})=><g transform={`translate(${x} ${y})`} stroke={color} strokeWidth="7" strokeLinecap="round" fill="none"><circle cx="0" cy="-105" r="17" fill={color} stroke="none"/><path d="M0-78V-37M0-65L-26-40M0-65L27-54M0-37L-22 0M0-37L24 0"/></g>;
const Bubble=({label,text,done=false,opacity=1,right=false}:{label:string,text:string,done?:boolean,opacity?:number,right?:boolean})=><div style={{marginLeft:right?120:0,marginRight:right?0:90,marginTop:25,padding:'28px 32px',borderRadius:24,background:right?'#c2d8bc':cream,color:'#2b3931',opacity,border:done?'2px solid #b9dfb4':'2px solid transparent'}}><div style={{display:'flex',justifyContent:'space-between',fontSize:23,letterSpacing:2,color:'#60705f'}}><span>{label}</span><span>{done?'✓ MET':''}</span></div><div style={{fontSize:38,lineHeight:1.35,marginTop:15}}>{text}</div></div>;
const Main=()=>{
 const f=useCurrentFrame(),ci=Math.max(0,cues.findLastIndex(c=>f>=c.start)),cue=cues[ci];
 const scene=ci<2?0:ci<7?1:ci<11?2:ci<14?3:ci<18?4:5;
 const starts=[0,cues[2].start,cues[7].start,cues[11].start,cues[14].start,cues[18].start];const enter=r(f,starts[scene],starts[scene]+16);
 const chase=r(f,cues[7].start,cues[10].end);let body:React.ReactNode;
 if(scene===0)body=<>
 <Title label="WHEN APPROVAL NEVER ARRIVES">What if<br/><span style={{color:mint}}>“enough”</span><br/>keeps changing?</Title>
 <div style={{marginTop:95,position:'relative',height:370}}><svg width="940" height="370" viewBox="0 0 940 370"><line x1="15" y1="310" x2="920" y2="310" stroke="#8c9a8760" strokeWidth="2"/><Person x={180+65*r(f,0,cues[1].end)} y={300}/><g transform={`translate(${600+80*r(f,0,cues[1].end)} 0)`}><path d="M0 310V100H155V310" fill="none" stroke={peach} strokeWidth="7"/><text x="77" y="78" fill={cream} textAnchor="middle" fontSize="26" letterSpacing="3">APPROVAL</text><path d="M8 140H147" stroke={peach} strokeWidth="3" strokeDasharray="12 10"/></g></svg></div>
 <div style={{fontSize:39,lineHeight:1.5,color:muted,marginTop:40}}>You move forward.<br/>The finish line moves away.</div>
 </>;
 else if(scene===1)body=<>
 <Title label="NOTICE HOW THE CONDITION CHANGES">First, explain.<br/>Then, prove it.</Title>
 <div style={{marginTop:55}}><Bubble label="THE CONDITION" text="Explain what happened, and we can move on." done={ci>=4}/><Bubble label="YOU RESPOND" text={ci<5?'You explain what happened.':'You explain. You provide proof.'} right opacity={r(f,cues[4].start,cues[4].start+20)}/><Bubble label="A NEW REQUIREMENT" text={ci<5?'An explanation isn’t enough. Show me proof.':'Now I’m questioning your motives.'} opacity={r(f,cues[4].start+30,cues[4].start+50)}/></div>
 <div style={{marginTop:40,color:peach,fontSize:37,lineHeight:1.4,opacity:r(f,cues[6].start,cues[6].start+20)}}>The requirement changes.<br/>The disagreement stays.</div>
 </>;
 else if(scene===2)body=<>
 <Title label="THE PATTERN HAS A NAME">Moving<br/><span style={{color:mint}}>the goalposts.</span></Title>
 <svg width="940" height="430" viewBox="0 0 940 430" style={{marginTop:75}}><path d="M25 350H920" stroke="#8c9a8780" strokeWidth="2"/><path d="M100 350H820" stroke="#8c9a8720" strokeWidth="25"/><Person x={120+330*chase} y={340}/><g transform={`translate(${440+270*chase} 0)`}><path d="M0 350V125H150V350" stroke={peach} strokeWidth="7" fill="none"/><path d="M6 170H144" stroke={peach} strokeWidth="3" strokeDasharray="12 9"/><text x="75" y="95" fill={cream} fontSize="25" textAnchor="middle">ENOUGH</text></g><path d="M470 395H700M685 384L700 395L685 406" stroke={peach} strokeWidth="3"/></svg>
 <div style={{fontSize:43,lineHeight:1.4,marginTop:40}}>You work harder.<br/><span style={{color:muted}}>But the rules keep moving.</span></div>
 <div style={{fontSize:32,color:peach,marginTop:35,opacity:r(f,cues[10].start,cues[10].start+20)}}>More explaining. More proving. Less certainty.</div>
 </>;
 else if(scene===3)body=<>
 <Title label="THE DISTINCTION THAT MATTERS">A new request<br/>isn’t always<br/><span style={{color:mint}}>manipulation.</span></Title>
 <div style={{marginTop:65,padding:'32px 35px',background:'#b9dfb411',border:'1px solid #90a28a',borderRadius:22}}><div style={{fontSize:29,color:mint,letterSpacing:2}}>A REASONABLE CHANGE</div><div style={{fontSize:38,lineHeight:1.4,marginTop:20}}>New information.<br/>A clear explanation.<br/>A standard you can understand.</div></div>
 <div style={{marginTop:30,padding:'32px 35px',background:'#e6b3980a',border:'1px solid #a88c7c',borderRadius:22,opacity:r(f,cues[13].start,cues[13].start+25)}}><div style={{fontSize:29,color:peach,letterSpacing:2}}>LOOK FOR THE REPEATED PATTERN</div><div style={{fontSize:38,lineHeight:1.4,marginTop:20}}>Agreements keep getting replaced.<br/>Effort is never acknowledged.</div></div>
 </>;
 else if(scene===4)body=<>
 <Title label="PAUSE BEFORE DEFENDING YOURSELF">Make the<br/><span style={{color:mint}}>standard clear.</span></Title>
 <div style={{marginTop:60,padding:'40px 38px',background:cream,color:'#2b3931',borderRadius:25,fontSize:44,lineHeight:1.4,opacity:r(f,cues[15].start-10,cues[15].start+15)}}>“What exactly would resolve this—and will that still count once I do it?”</div>
 <div style={{marginTop:40,fontSize:36,lineHeight:1.5,color:muted,opacity:r(f,cues[16].start,cues[16].start+25)}}>Put the agreement into clear words.<br/>If it changes, name the change.</div>
 <div style={{marginTop:40,padding:'30px 33px',borderLeft:`3px solid ${mint}`,fontSize:38,lineHeight:1.4,opacity:r(f,cues[17].start,cues[17].start+25)}}>“I met the condition we agreed on.<br/>I’m willing to discuss new concerns separately.”</div>
 </>;
 else body=<>
 <Title label="YOU CAN CHOOSE A DIFFERENT NEXT STEP">Not another<br/>explanation.<br/><span style={{color:mint}}>A clearer boundary.</span></Title>
 <div style={{marginTop:95,fontSize:46,lineHeight:1.5,color:muted}}>You don’t have to win<br/>an endless argument<br/>to deserve fair treatment.</div>
 <svg width="930" height="240" viewBox="0 0 930 240" style={{marginTop:40}}><path d="M20 190H900" stroke="#8b9b8760" strokeWidth="2"/><Person x={350} y={185}/><path d="M540 20V190" stroke={mint} strokeWidth="5"/><text x="580" y="115" fill={mint} fontSize="31">A CLEAR LIMIT</text></svg>
 </>;
 return <AbsoluteFill style={{background:['#262b31','#2b2d2c','#263330','#28302c','#202f2e','#24322d'][scene],color:cream,fontFamily:'Liberation Serif, serif',overflow:'hidden'}}><Audio src={staticFile('audio/moving-goalposts-michael.wav')}/><AbsoluteFill style={{background:'radial-gradient(ellipse at 80% 10%,#a9c1b013,transparent 70%)'}}/>
 <div style={{position:'absolute',left:70,top:75,color:muted,fontSize:23,letterSpacing:4}}>PSYCHOLOGY / WHEN ENOUGH KEEPS CHANGING</div><div style={{position:'absolute',top:168,left:70,width:65,height:3,background:mint}}/>
 <div style={{position:'absolute',top:235,left:70,right:70,opacity:enter,transform:`translateY(${(1-enter)*12}px)`}}>{body}</div>
 <div style={{position:'absolute',bottom:150,left:50,right:50,padding:'27px 32px',minHeight:140,boxSizing:'border-box',background:'#091113e8',border:'1px solid #7f927355',borderRadius:20,fontSize:37,lineHeight:1.4,fontWeight:700,textAlign:'center'}}>{cue.text}</div>
 <div style={{position:'absolute',bottom:72,left:70,right:70,textAlign:'center',fontSize:20,color:muted,letterSpacing:2}}>NOTICE THE PATTERN · CLARIFY THE AGREEMENT · SET A BOUNDARY</div>
 </AbsoluteFill>;
};
const MovingGoalposts=()=> <AbsoluteFill><Sequence durationInFrames={mainDuration}><Main/></Sequence><Sequence from={mainDuration} durationInFrames={SHARED_OUTRO_DURATION}><SharedOutro/></Sequence></AbsoluteFill>;
export const MovingGoalpostsComposition=()=> <Composition id="MovingGoalposts" component={MovingGoalposts} width={1080} height={1920} fps={30} durationInFrames={mainDuration+SHARED_OUTRO_DURATION}/>;

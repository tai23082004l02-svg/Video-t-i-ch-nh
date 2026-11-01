import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,staticFile,useCurrentFrame,interpolate} from 'remotion';
import {cues,duration as mainDuration} from './movingGoalpostsCues';
import {SharedOutro,SHARED_OUTRO_DURATION} from './SharedOutro';
const cream='#f8f0df',mint='#b9dfb4',peach='#e6b398',muted='#bcc8bd';
const r=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const Actor=({x,y=820,color,face=1,walk=0,talk=false,pose='normal',frame=0}:{x:number,y?:number,color:string,face?:number,walk?:number,talk?:boolean,pose?:string,frame?:number})=>{
 const step=Math.sin(frame*.24)*walk,blink=frame%137>132;const slump=pose==='tired'?12:0;
 const reaching=pose==='offer'||pose==='point';const stop=pose==='stop';
 return <g transform={`translate(${x} ${y})`}><ellipse cx="0" cy="12" rx="77" ry="15" fill="#020b0b45"/><g transform={`scale(${face} 1)`}>
 <path d={`M-25-90L${-27+step*30}-18L${-13+step*30}-7M25-90L${27-step*30}-18L${43-step*30}-7`} fill="none" stroke={color} strokeWidth="24" strokeLinecap="round"/>
 <g transform={`translate(0 ${slump})`}><path d="M-45-199Q0-220 45-199L52-91Q0-75-52-91Z" fill={color}/>
 <path d={`M-43-186Q-73-143 ${-60-step*13}-105`} fill="none" stroke={color} strokeWidth="24" strokeLinecap="round"/>
 <path d={stop?'M41-182L86-165L94-222':reaching?'M41-184L79-155L125-166':`M43-186Q73-143 ${62+step*13}-105`} fill="none" stroke={color} strokeWidth="24" strokeLinecap="round"/>
 <circle cx={stop?94:reaching?125:62+step*13} cy={stop?-225:reaching?-166:-100} r="14" fill={cream}/>
 <rect x="-13" y="-227" width="26" height="29" rx="9" fill={cream}/>
 <g transform={`rotate(${pose==='tired'?12:pose==='think'?-7:0} 0 -260)`}><ellipse cx="0" cy="-263" rx="46" ry="52" fill={cream}/><path d="M-43-272Q-40-323 0-317Q37-321 45-282Q18-300-10-287Z" fill="#536356"/>
 {blink?<path d="M2-270H11M24-270H33" stroke="#24392e" strokeWidth="3" strokeLinecap="round"/>:<><circle cx="8" cy="-270" r="3.5" fill="#24392e"/><circle cx="29" cy="-270" r="3.5" fill="#24392e"/></>}
 <path d={pose==='think'?'M2-281L14-278M23-278L34-282':'M1-281H14M23-281H35'} stroke="#24392e" strokeWidth="2.5" strokeLinecap="round"/>
 <path d="M24-261L31-254H23" fill="none" stroke="#967e69" strokeWidth="2"/>
 {talk?<ellipse cx="17" cy="-240" rx="9" ry={3+Math.abs(Math.sin(frame*.35))*5} fill="#66735f"/>:<path d={pose==='tired'?'M5-238Q17-248 29-240':'M7-241Q18-235 29-241'} fill="none" stroke="#66735f" strokeWidth="2.5" strokeLinecap="round"/>}
 </g></g></g></g>;
};
const Bubble=({x,y,w=440,text,side='right',color=cream,opacity=1}:{x:number,y:number,w?:number,text:string,side?:'left'|'right',color?:string,opacity?:number})=><div style={{position:'absolute',left:x,top:y,width:w,padding:'25px 28px',boxSizing:'border-box',borderRadius:24,background:color,color:'#263a30',fontSize:35,lineHeight:1.25,opacity,boxShadow:'0 10px 20px #0002',transform:`translateY(${(1-opacity)*9}px)`}}>{text}<div style={{position:'absolute',bottom:-18,left:side==='left'?Math.max(35,Math.min(w-60,300-x-18)):undefined,right:side==='right'?Math.max(35,Math.min(w-60,x+w-720-18)):undefined,width:0,height:0,borderLeft:'18px solid transparent',borderRight:'18px solid transparent',borderTop:`22px solid ${color}`}}/></div>;
const Sheet=({x,y,scale=1,check=false,rotation=0}:{x:number,y:number,scale?:number,check?:boolean,rotation?:number})=><g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}><rect x="-45" y="-58" width="90" height="116" rx="7" fill={cream} stroke="#a5b49d" strokeWidth="2"/><path d="M-25-30H25M-25-9H25M-25 12H11" stroke="#97aa92" strokeWidth="5"/>{check?<path d="M-15 33L-3 44L23 20" fill="none" stroke="#57805a" strokeWidth="5"/>:null}</g>;
const Main=()=>{
 const f=useCurrentFrame(),ci=Math.max(0,cues.findLastIndex(c=>f>=c.start)),cue=cues[ci];
 const scene=ci<2?0:ci<7?1:ci<11?2:ci<14?3:ci<18?4:5;
 const starts=[0,357,969,1590,2103,2763];const enter=r(f,starts[scene],starts[scene]+14);
 const approach=r(f,20,145);const showPaper=r(f,718,755);const handover=r(f,750,795);const chase=r(f,1048,1425);const leaving=r(f,2930,3045);
 let leftX=scene===0?130+170*approach:scene===2?210+220*chase:scene===5?330-120*leaving:300;
 let rightX=scene===2?640+110*chase:720;
 let leftPose=scene===1&&ci>=5?(f<785?'offer':'tired'):scene===2&&ci>=9?'tired':scene===4&&ci===14?'stop':scene===4&&ci>=16?'offer':scene===5?'stop':'normal';
 let rightPose=scene===1&&ci>=5?'think':scene===0||scene===1?'point':scene===4?'think':'normal';
 let leftTalk=scene===1&&(ci===4||ci===5)||scene===4&&ci>=15||scene===5&&ci===19;
 let rightTalk=scene===0&&f>150||scene===1&&(ci===3||ci>=5)||scene===3&&ci>=12;
 const title=[<>What if “enough”<br/>keeps changing?</>,<>You answer.<br/><span style={{color:mint}}>The demand changes.</span></>,<>Moving<br/><span style={{color:mint}}>the goalposts.</span></>,<>A new request isn’t<br/>always manipulation.</>,<>Pause.<br/><span style={{color:mint}}>Clarify the agreement.</span></>,<>A clearer boundary.<br/><span style={{color:mint}}>A different next step.</span></>][scene];
 return <AbsoluteFill style={{background:scene===3?'#29332e':'#20312f',color:cream,fontFamily:'Liberation Serif, serif',overflow:'hidden'}}>
 <Audio src={staticFile('audio/moving-goalposts-michael.wav')}/><AbsoluteFill style={{background:'radial-gradient(ellipse at 70% 30%,#b9dfb413,transparent 70%)'}}/>
 <div style={{position:'absolute',top:75,left:70,color:muted,fontSize:23,letterSpacing:4}}>PSYCHOLOGY / WHEN ENOUGH KEEPS CHANGING</div>
 <div style={{position:'absolute',left:70,top:168,width:65,height:3,background:mint}}/>
 <div style={{position:'absolute',top:228,left:70,right:70,fontSize:74,fontWeight:700,lineHeight:1.12,opacity:enter}}>{title}</div>
 <div style={{position:'absolute',left:70,top:440,width:940,height:950,opacity:enter}}>
 <svg width="940" height="950" viewBox="0 0 940 950">
 <path d="M20 835H920" stroke="#879d8650" strokeWidth="2"/>
 {scene!==2?<><rect x="28" y="350" width="190" height="245" rx="5" fill="#c5d3bd06" stroke="#b9dfb41c" strokeWidth="2"/><path d="M123 350V595M28 472H218" stroke="#b9dfb41c" strokeWidth="2"/><path d="M850 825V665M850 730Q800 675 806 643Q863 657 850 730M851 757Q905 703 903 680Q853 700 851 757" stroke="#8ca886" strokeWidth="5" fill="#8ca88615"/><path d="M820 825L810 780H888L880 825" fill="#748a6d55"/></>:null}
 {scene===2?<g transform={`translate(${500+170*chase} 0)`}><path d="M0 830V465H195V830" fill="none" stroke={peach} strokeWidth="7"/><path d="M8 530H187" stroke={peach} strokeWidth="4" strokeDasharray="15 10"/><text x="95" y="430" fill={cream} textAnchor="middle" fontSize="27" letterSpacing="3">ENOUGH</text></g>:null}
 {scene===5?<path d="M535 500V835" stroke={mint} strokeWidth="4" strokeDasharray={ci>=19?'':'10 8'}/>:null}
 <Actor x={leftX} color={mint} frame={f} walk={scene===0&&f<145&&f>20?.9:scene===2&&f>1048&&f<1425?.6:scene===5&&f>2930&&f<3045?.6:0} face={scene===5&&f>2930?-1:1} pose={leftPose} talk={leftTalk}/>
 <Actor x={rightX} color={peach} frame={f+49} face={-1} pose={rightPose} talk={rightTalk}/>
 {scene===1&&ci>=5&&ci<=6?<g opacity={showPaper*(ci===6?.5:1)}><Sheet x={425+180*handover} y={650} rotation={-8+16*handover} check/></g>:null}
 {scene===2&&ci>=9?[0,1,2].map((n)=><Sheet key={n} x={leftX+90+n*12} y={655-n*16} scale={.7} rotation={n*8-12}/>):null}
 {scene===3&&ci>=12?<g opacity={r(f,1724,1765)}><Sheet x={490} y={650} scale={1.4} check={ci===12} rotation={ci===13?-8:0}/></g>:null}
 {scene===4&&ci>=16?<g opacity={r(f,2386,2420)}><rect x="355" y="345" width="260" height="180" rx="18" fill={cream}/><text x="485" y="390" fill="#3b5945" textAnchor="middle" fontSize="24">AGREED STANDARD</text><path d="M380 425H590M380 460H560M380 495H550" stroke="#9aaf93" strokeWidth="5"/><path d="M565 495L580 510L607 478" stroke="#658b61" strokeWidth="6" fill="none"/></g>:null}
 </svg>
 {scene===0?<><Bubble x={430} y={70} w={440} color={peach} text={ci===0?'Just one more thing…':'That’s still not enough.'} opacity={r(f,145,170)}/><Bubble x={35} y={300} w={410} color={mint} side="left" text="I did what you asked." opacity={r(f,70,95)}/></>:null}
 {scene===1?<><Bubble x={435} y={45} w={450} color={peach} text={ci<=3?'Explain what happened, and we can move on.':ci===4?'An explanation isn’t enough. I need proof.':ci===5?'But what were your motives?':'There’s something else you need to do.'}/>{ci>=4?<Bubble x={30} y={285} w={425} side="left" color={mint} text={ci===4?'Here’s what happened.':ci===5?'Here’s the proof.':'What would be enough?'} opacity={r(f,cues[4].start,cues[4].start+18)}/>:null}</>:null}
 {scene===2?<><Bubble x={430} y={30} w={460} color={peach} text="One more thing…"/><Bubble x={20} y={230} w={420} side="left" color={mint} text={ci>=9?'Maybe I should explain again…':'I met that requirement.'} opacity={r(f,1048,1070)}/></>:null}
 {scene===3?<><Bubble x={415} y={40} w={490} color={peach} text={ci<13?'There’s new information. Let me explain why it matters.':'Actually, now you also need to…'} opacity={r(f,1724,1750)}/><Bubble x={20} y={250} w={430} side="left" color={mint} text={ci<13?'Let’s understand what changed.':'But we agreed on something else.'} opacity={r(f,1780,1805)}/><div style={{position:'absolute',bottom:20,left:0,right:0,textAlign:'center',fontSize:32,color:ci<13?mint:peach}}>{ci<13?'A change can have a clear reason.':'Look for repeated replacement of clear agreements.'}</div></>:null}
 {scene===4?<><Bubble x={35} y={35} w={820} side="left" color={mint} text={ci<15?'Let’s pause and clarify what would resolve this.':ci===15?'What exactly would resolve this—and will that still count once I do it?':ci===16?'Let’s put the agreement into clear words.':'I met the condition we agreed on. We can discuss new concerns separately.'}/>{ci>=16?<div style={{position:'absolute',bottom:10,left:0,right:0,textAlign:'center',color:mint,fontSize:32}}>Name the agreement. Name the change.</div>:null}</>:null}
 {scene===5?<><Bubble x={435} y={50} w={440} color={peach} text="But there’s one more thing…" opacity={1-r(f,2930,3010)*.75}/><Bubble x={20} y={270} w={450} side="left" color={mint} text="We can discuss that separately." opacity={r(f,2909,2930)}/><div style={{position:'absolute',bottom:5,left:0,right:0,textAlign:'center',fontSize:34,color:mint,opacity:r(f,2909,2940)}}>Fair treatment does not require endless proof.</div></>:null}
 </div>
 <div style={{position:'absolute',left:50,right:50,bottom:150,padding:'27px 32px',minHeight:140,boxSizing:'border-box',borderRadius:20,border:'1px solid #7f927355',background:'#091113ed',fontSize:37,lineHeight:1.4,fontWeight:700,textAlign:'center'}}>{cue.text}</div>
 <div style={{position:'absolute',left:70,right:70,bottom:72,color:muted,fontSize:20,textAlign:'center',letterSpacing:2}}>NOTICE THE PATTERN · CLARIFY THE AGREEMENT · SET A BOUNDARY</div>
 </AbsoluteFill>;
};
const Animated=()=> <AbsoluteFill><Sequence durationInFrames={mainDuration}><Main/></Sequence><Sequence from={mainDuration} durationInFrames={SHARED_OUTRO_DURATION}><SharedOutro/></Sequence></AbsoluteFill>;
export const MovingGoalpostsAnimatedComposition=()=> <Composition id="MovingGoalpostsAnimated" component={Animated} width={1080} height={1920} fps={30} durationInFrames={mainDuration+SHARED_OUTRO_DURATION}/>;

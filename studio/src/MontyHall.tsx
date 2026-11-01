import React from 'react';
import {AbsoluteFill,Audio,Composition,Sequence,staticFile,useCurrentFrame,interpolate} from 'remotion';
import {cues,duration as mainDuration} from './montyHallCues';
import {SharedOutro,SHARED_OUTRO_DURATION} from './SharedOutro';
const paper='#f7f0de',mint='#b9dfb4',gold='#e6c795',muted='#b8c7bc',coral='#e5a38a';
const r=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const Car=({size=130}:{size?:number})=><svg width={size} height={size*.65} viewBox="0 0 160 104" fill="none" stroke={mint} strokeWidth="5" strokeLinejoin="round"><path d="M18 67L27 40H129L143 67V86H18V67Z" fill="#b9dfb426"/><path d="M40 40L52 17H105L120 40M26 66H137M56 19L47 40M101 19L110 40"/><circle cx="44" cy="85" r="13" fill="#142722"/><circle cx="121" cy="85" r="13" fill="#142722"/><path d="M28 55H45M114 55H132"/></svg>;
const Goat=({size=105}:{size?:number})=><svg width={size} height={size} viewBox="0 0 110 110" fill="none" stroke={paper} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M38 36Q16 12 31 8L45 30M72 36Q94 12 79 8L65 30M36 39L13 34L22 52L37 55M74 39L97 34L88 52L73 55"/><path d="M36 35Q55 24 74 35L70 77L55 92L40 77Z" fill="#f7f0de18"/><path d="M47 91L55 105L63 91M49 72L55 77L61 72M44 51H47M63 51H66"/></svg>;
const Door=({n,open=false,car=false,selected=false,prob='',small=false}:{n:number,open?:boolean,car?:boolean,selected?:boolean,prob?:string,small?:boolean})=>{
 const w=small?180:268,h=small?250:415;
 return <div style={{width:w,textAlign:'center',flexShrink:0}}><div style={{height:small?25:44,fontSize:small?20:27,color:mint,letterSpacing:2}}>{selected?'YOUR PICK':''}</div><div style={{height:h,position:'relative',borderRadius:small?12:20,border:`${selected?3:1}px solid ${selected?mint:'#839084'}`,background:'#0b1717',overflow:'hidden',boxSizing:'border-box'}}>
 <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:15}}>{car?<Car size={small?110:155}/>:<Goat size={small?75:120}/>}<div style={{fontSize:small?20:27,color:car?mint:paper}}>{car?'CAR':'GOAT'}</div></div>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(110deg,#485850,#293b35)',border:'9px solid #526456',boxSizing:'border-box',transform:open?'perspective(750px) rotateY(-102deg)':'none',transformOrigin:'left center',backfaceVisibility:'hidden'}}><div style={{position:'absolute',inset:small?15:25,border:'1px solid #b5c4ac55',borderRadius:3}}/><div style={{fontSize:small?51:85,position:'absolute',top:'22%',left:0,right:0,color:gold}}>{n}</div><div style={{position:'absolute',right:small?12:22,top:'61%',width:small?10:15,height:small?10:15,borderRadius:'50%',background:gold}}/></div>
 </div><div style={{minHeight:small?24:65,marginTop:small?8:20,fontSize:small?23:54,color:mint,fontWeight:700}}>{prob}</div></div>;
};
const Heading=({label,children}:{label:string,children:React.ReactNode})=><><div style={{color:gold,fontSize:25,letterSpacing:4,marginBottom:25}}>{label}</div><div style={{fontSize:78,fontWeight:700,lineHeight:1.14}}>{children}</div></>;
const Main=()=>{
 const f=useCurrentFrame();const ci=Math.max(0,cues.findLastIndex(c=>f>=c.start));const cue=cues[ci];const kind=cue.kind;const table=['pick','rules','reveal','odds','first'].includes(kind);const view=kind==='hook'?'hook':table?'table':kind;
 const starts={hook:0,table:cues[2].start,cases:cues[14].start,hundred:cues[18].start,lesson:cues[22].start};
 const enter=r(f,starts[view],starts[view]+18);const rewind=ci===11||ci===12;const open=f>=cues[6].start+20&&!rewind;const showOdds=f>=cues[9].start;const selected=f>=cues[3].start;
 let content:React.ReactNode;
 if(view==='hook')content=<>
 <Heading label="A TEST OF INTUITION">The obvious answer<br/>can be <span style={{color:coral}}>wrong.</span></Heading>
 <div style={{marginTop:95,display:'flex',justifyContent:'center',gap:30,transform:`scale(${.96+.04*r(f,0,cues[1].end)})`}}>{[1,2,3].map(n=><Door key={n} n={n}/>)}</div>
 <div style={{fontSize:39,color:muted,textAlign:'center',marginTop:30}}>Simple arithmetic.<br/>A surprisingly stubborn illusion.</div>
 </>;
 else if(view==='table')content=<>
 <Heading label="THE MONTY HALL PROBLEM">{kind==='pick'?<>One car.<br/>Make your choice.</>:kind==='rules'?<>The host knows<br/>what you don’t.</>:kind==='reveal'?<>Two doors remain.<br/><span style={{color:gold}}>Stay—or switch?</span></>:kind==='odds'?<>Same two doors.<br/><span style={{color:mint}}>Unequal chances.</span></>:<>Look back at<br/>your first choice.</>}</Heading>
 <div style={{marginTop:70,display:'flex',justifyContent:'center',gap:30}}><Door n={1} selected={selected} prob={showOdds?'⅓':''}/><Door n={2} prob={rewind?'⅓':showOdds?'⅔':''}/><Door n={3} open={open} prob={rewind?'⅓':''}/></div>
 {kind==='pick'?<div style={{fontSize:35,color:muted,textAlign:'center',marginTop:30}}>One car. Two goats.<br/>Each door starts with the same chance.</div>:kind==='rules'?<div style={{padding:'25px 30px',border:'1px solid #8c9f7a',borderRadius:20,fontSize:32,lineHeight:1.65,marginTop:20}}>He knows the prize locations.<br/>He always opens another door with a goat.<br/>He always offers the switch.</div>:kind==='reveal'?<div style={{textAlign:'center',marginTop:25}}><div style={{fontSize:95,color:gold,opacity:ci>=8?1:.2}}>50 / 50?</div><div style={{fontSize:32,color:muted,marginTop:20}}>Take a moment. What would you do?</div></div>:kind==='odds'?<div style={{display:'flex',gap:25,justifyContent:'center',marginTop:20,fontSize:37}}><div style={{padding:'24px 35px',border:'1px solid #8f9d86',borderRadius:18}}>STAY · 1 in 3</div><div style={{padding:'24px 35px',background:mint,color:'#20382b',borderRadius:18}}>SWITCH · 2 in 3</div></div>:<div style={{fontSize:34,lineHeight:1.5,textAlign:'center',marginTop:15,color:muted}}>{ci===11?'Your original choice: 1 in 3.':ci===12?'The other two doors together: 2 in 3.':'The host is not opening a door at random.'}<div style={{marginTop:20,color:mint}}>His knowledge shapes what you see.</div></div>}
 </>;
 else if(view==='cases')content=<>
 <Heading label="KEEP YOUR ORIGINAL PICK FIXED">Three ways<br/>the game can start.</Heading>
 <div style={{fontSize:29,color:muted,marginTop:35}}>You pick door 1. Then you always switch.</div>
 <div style={{display:'flex',padding:'30px 0 20px',fontSize:24,color:muted,gap:15}}><div style={{width:140}}>CAR AT</div><div style={{width:390}}>AFTER THE HOST REVEALS A GOAT</div><div style={{flex:1,textAlign:'right'}}>RESULT</div></div>
 {[0,1,2].map((row)=>{const active=ci>=14+row;const host=row===2?2:3;const target=host===3?2:3;return <div key={row} style={{display:'flex',alignItems:'center',gap:25,padding:'30px 20px',borderTop:'1px solid #61786b',opacity:active?1:.2,background:active?'#b9dfb407':'transparent'}}><div style={{width:115,fontSize:28,color:gold}}>Door {row+1}</div><div style={{display:'flex',gap:15,flex:1}}>{[1,2,3].map(n=><div key={n} style={{width:140,textAlign:'center',padding:'15px 0',border:`1px solid ${n===target?mint:'#718274'}`,borderRadius:12,background:n===host?'#0003':'transparent'}}><div style={{fontSize:22,marginBottom:12,color:n===1?gold:muted}}>{n===1?'PICK':n===host?'OPEN':'SWITCH'}</div><div style={{height:62,display:'flex',alignItems:'center',justifyContent:'center'}}>{n===row+1?<Car size={86}/>:<Goat size={60}/>}</div><div style={{fontSize:22,marginTop:8}}>Door {n}</div></div>)}</div><div style={{width:110,fontSize:32,color:row===0?coral:mint,textAlign:'right'}}>{row===0?'LOSE':'WIN'}</div></div>})}
 <div style={{fontSize:46,color:mint,marginTop:45,textAlign:'center',opacity:r(f,cues[17].start,cues[17].start+20)}}>Switching wins 2 of 3 equally likely starts.</div>
 </>;
 else if(view==='hundred'){
 const opened=ci>=19?r(f,cues[19].start+30,cues[19].end):0;content=<>
 <Heading label="MAKE THE PATTERN IMPOSSIBLE TO MISS">Now imagine<br/><span style={{color:mint}}>100 doors.</span></Heading>
 <div style={{display:'grid',gridTemplateColumns:'repeat(10, 1fr)',gap:10,marginTop:65}}>{Array.from({length:100},(_,i)=>{const eliminated=i!==0&&i!==99&&(i-1)/98<opened;return <div key={i} style={{height:46,borderRadius:5,border:`1px solid ${i===0?gold:i===99&&ci>=19?mint:'#8d9f8a'}`,background:eliminated?'#0a1715':i===0?'#8c7442':i===99&&ci>=19?'#769568':'#43594a',opacity:eliminated?.25:1,textAlign:'center',lineHeight:'46px',fontSize:20,color:paper}}>{eliminated?'×':i+1}</div>})}</div>
 <div style={{display:'flex',gap:30,marginTop:50}}><div style={{flex:1,padding:25,border:'1px solid #9b8c64',borderRadius:18}}><div style={{fontSize:27,color:gold}}>YOUR FIRST PICK</div><div style={{fontSize:66,marginTop:15}}>1%</div></div><div style={{flex:1,padding:25,border:'1px solid #91b08a',borderRadius:18,opacity:ci>=20?1:.15}}><div style={{fontSize:27,color:mint}}>SWITCHING WINS</div><div style={{fontSize:66,color:mint,marginTop:15}}>99%</div></div></div>
 <div style={{fontSize:32,lineHeight:1.5,color:muted,marginTop:30}}>The host reveals 98 goats.<br/>Your initial guess is wrong 99% of the time.</div>
 </>;
 }
 else content=<>
 <Heading label="WHAT THE PUZZLE REALLY REVEALS">Two doors.<br/><span style={{color:mint}}>Different histories.</span></Heading>
 <div style={{display:'flex',justifyContent:'center',gap:65,marginTop:70}}><Door n={1} selected prob="⅓"/><Door n={2} prob="⅔"/></div>
 <div style={{marginTop:35,padding:'30px 35px',borderLeft:`3px solid ${mint}`,fontSize:44,lineHeight:1.4,opacity:r(f,cues[24].start,cues[24].start+20)}}>Information is not just<br/><span style={{color:muted}}>what you see.</span><br/>It is how it was chosen.</div>
 </>;
 return <AbsoluteFill style={{background:view==='cases'?'#252b27':view==='hundred'?'#20302c':'#18292b',color:paper,fontFamily:'Liberation Serif, serif',overflow:'hidden'}}>
 <Audio src={staticFile('audio/monty-hall-michael.wav')}/>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 80% 20%,#b9dfb412,transparent 70%)'}}/>
 <div style={{position:'absolute',top:75,left:70,color:muted,fontSize:23,letterSpacing:4}}>PROBABILITY / THE MONTY HALL PROBLEM</div><div style={{position:'absolute',left:70,top:168,width:65,height:3,background:mint}}/>
 <div style={{position:'absolute',top:235,left:70,right:70,opacity:enter,transform:`translateY(${(1-enter)*12}px)`}}>{content}</div>
 <div style={{position:'absolute',left:50,right:50,bottom:150,padding:'27px 32px',minHeight:135,boxSizing:'border-box',border:'1px solid #778f7755',borderRadius:20,background:'#091113eb',fontSize:37,lineHeight:1.4,fontWeight:700,textAlign:'center'}}>{cue.text}</div>
 <div style={{position:'absolute',bottom:72,left:70,right:70,color:muted,fontSize:20,textAlign:'center',letterSpacing:2}}>THE HOST KNOWS · ALWAYS REVEALS A GOAT · ALWAYS OFFERS A SWITCH</div>
 </AbsoluteFill>;
};
const MontyHall=()=> <AbsoluteFill><Sequence durationInFrames={mainDuration}><Main/></Sequence><Sequence from={mainDuration} durationInFrames={SHARED_OUTRO_DURATION}><SharedOutro/></Sequence></AbsoluteFill>;
export const MontyHallComposition=()=> <Composition id="MontyHall" component={MontyHall} width={1080} height={1920} fps={30} durationInFrames={mainDuration+SHARED_OUTRO_DURATION}/>;

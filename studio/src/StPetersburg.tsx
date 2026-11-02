import React from 'react';
import {AbsoluteFill, Audio, Composition, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {cues, mainDuration} from './stPetersburgData';
import {SharedOutro, SHARED_OUTRO_DURATION} from './SharedOutro';

const cream='#f7f1e3', mint='#b9dfb4', peach='#edb99a', muted='#aebfb4', ink='#162c2b';
const ramp=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const sceneStart=(s:string)=>cues.find(c=>c.scene===s)!.start;
const money=(n:number)=>'$'+n.toLocaleString('en-US');
const Coin=({x,y,face='H',r=52,flip=1}:{x:number;y:number;face?:string;r?:number;flip?:number})=><g transform={`translate(${x},${y}) scale(${Math.max(.08,Math.abs(flip))},1)`}>
 <circle r={r} fill={face==='H'?mint:peach} stroke={cream} strokeWidth="2"/>
 <circle r={r-8} fill="none" stroke={ink} strokeOpacity=".4" strokeWidth="2"/>
 <text textAnchor="middle" y={r*.32} fill={ink} fontSize={r*.95} fontWeight="700">{face}</text>
</g>;
const Ticket=({amount,scale=1}:{amount:string;scale?:number})=><svg width={600*scale} height={270*scale} viewBox="0 0 600 270"><rect x="15" y="15" width="570" height="240" rx="25" fill="#26483c" stroke={mint} strokeWidth="3"/><path d="M15 80H585M15 190H585" stroke={mint} strokeOpacity=".3"/><text x="300" y="64" textAnchor="middle" fill={muted} fontSize="24" letterSpacing="4">ONE PLAY</text><text x="300" y="164" textAnchor="middle" fill={cream} fontSize="88">{amount}</text><text x="300" y="230" textAnchor="middle" fill={muted} fontSize="25">WHAT WOULD YOU PAY?</text></svg>;
const Note=({children}:{children:React.ReactNode})=><div style={{fontSize:32,color:muted,lineHeight:1.4,textAlign:'center',marginTop:28}}>{children}</div>;

const Rules=({f,ci}:{f:number;ci:number})=>{
 const active=ci===2?0:ci===3?1:2;
 return <svg width="880" height="830" viewBox="0 0 880 830">
  <text x="440" y="48" fill={muted} textAnchor="middle" fontSize="29">STOP AT THE FIRST HEAD</text>
  {[0,1,2].map((n)=>{const cueIndex=n===2?4:3;const show=ci===2?n===0?1:.15:n<=active?1:.15;const p=ramp(f,cues[cueIndex].start+(n===1?48:0),cues[cueIndex].start+(n===1?68:20));return <g key={n} opacity={show}>
   <rect x="55" y={105+n*185} width="770" height="155" rx="20" fill={n===active?'#b9dfb40c':'#b9dfb405'} stroke="#627e6c"/>
   {Array.from({length:n+1},(_,i)=><React.Fragment key={i}><Coin x={155+i*135} y={180+n*185} face={i===n?'H':'T'} r={48} flip={i===n&&ci===cueIndex&&p<1?Math.cos(p*Math.PI*4):1}/>{i<n?<path d={`M${216+i*135} ${180+n*185}h20`} stroke={muted} strokeWidth="2"/>:null}</React.Fragment>)}
   <text x="700" y={198+n*185} fill={mint} textAnchor="middle" fontSize="63">{money(2**(n+1))}</text>
  </g>})}
  <text x="440" y="746" fill={cream} textAnchor="middle" fontSize="40">{ci>=5?'Net result = prize − entry fee':'Independent tosses · fair coin'}</text>
  <text x="440" y="804" fill={muted} textAnchor="middle" fontSize="28">{ci>=5?'All prizes shown are before the entry fee':'T = tails · H = heads'}</text>
 </svg>;
};

const Odds=({f,ci}:{f:number;ci:number})=><div style={{paddingTop:20}}>
 <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',textAlign:'center',fontSize:26,color:muted,letterSpacing:1,paddingBottom:22}}><span>PRIZE</span><span>PROBABILITY</span><span>CONTRIBUTION</span></div>
 {[2,4,8].map((n,i)=>{const visible=ci>=7||i===0;const p=ci>=8?ramp(f,cues[8].start+i*18,cues[8].start+i*18+18):0;return <div key={n} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',alignItems:'center',textAlign:'center',height:150,borderTop:'1px solid #637e6c',opacity:visible?1:.16}}><div style={{fontSize:68,color:mint}}>{money(n)}</div><div style={{fontSize:51}}>× 1/{n}</div><div style={{fontSize:68,color:peach,opacity:.12+.88*p}}>= $1</div></div>})}
 <div style={{borderTop:'1px solid #637e6c',textAlign:'center',fontSize:58,padding:'28px 0',letterSpacing:15,color:muted}}>⋮</div>
 <Note>{ci>=8?'Every stopping point adds the same $1.':'Probability shrinks as the prize grows.'}</Note>
</div>;

const InfinitySum=({f,ci}:{f:number;ci:number})=>{
 const n=2+Math.floor(ramp(f,cues[9].start,cues[9].end)*16);
 return <div style={{textAlign:'center',paddingTop:25}}>
  <svg width="880" height="440" viewBox="0 0 880 440">
   {Array.from({length:18},(_,i)=>{const row=Math.floor(i/6),col=i%6;const show=i<n;return <g key={i} opacity={show?1:.1}><rect x={75+col*125} y={35+row*125} width="105" height="100" rx="14" fill="#2a493a" stroke={mint}/><text x={127.5+col*125} y={100+row*125} fill={mint} textAnchor="middle" fontSize="42">$1</text></g>})}
   <path d="M827 183l25 25-25 25" fill="none" stroke={mint} strokeWidth="4"/>
  </svg>
  <div style={{fontSize:65,marginTop:10}}>$1 + $1 + $1 + …</div>
  <div style={{fontSize:137,lineHeight:1.1,color:mint,marginTop:35,opacity:ci>=10?ramp(f,cues[10].start,cues[10].start+20):0}}>∞</div>
  <Note>No upper limit in the ideal game</Note>
 </div>;
};

const Typical=({f,ci}:{f:number;ci:number})=>{
 const p=ramp(f,cues[12].start,cues[12].start+25);
 return <div style={{textAlign:'center',paddingTop:10}}>
  <svg width="880" height="500" viewBox="0 0 880 500">
   {Array.from({length:8},(_,i)=>{const value=i<4?'$2':i<6?'$4':i===6?'$8':'>$8';const highlight=ci===11?false:ci===12?i<6:i<7;return <g key={i} opacity={ci===11?.5:.3+.7*p}><rect x={55+i%4*200} y={45+Math.floor(i/4)*210} width="170" height="175" rx="22" fill={highlight?'#2d4c3d':'#273a34'} stroke={i===7?peach:mint} strokeWidth={highlight?3:1}/><text x={140+i%4*200} y={154+Math.floor(i/4)*210} fill={i===7?peach:cream} textAnchor="middle" fontSize="53">{value}</text></g>})}
   <text x="440" y="488" fill={muted} textAnchor="middle" fontSize="29">8 equal-probability slices of the game</text>
  </svg>
  <div style={{fontSize:70,marginTop:40,color:ci>=13?mint:cream}}>{ci===11?'Finite prize, almost surely.':ci===12?'3 in 4: $4 or less':'7 in 8: $8 or less'}</div>
  <Note>{ci===11?'Infinite expectation ≠ an infinite individual prize':'The rare tail keeps extending beyond this grid.'}</Note>
 </div>;
};

const RareTail=({f,ci}:{f:number;ci:number})=>{
 const p=ramp(f,cues[15].start,cues[15].start+30);
 return <div style={{textAlign:'center'}}>
  <svg width="880" height="255" viewBox="0 0 880 255">
   {Array.from({length:20},(_,i)=><Coin key={i} x={65+i%10*83} y={65+Math.floor(i/10)*120} face={i===19?'H':'T'} r={31}/>)}
   <text x="440" y="250" fill={muted} textAnchor="middle" fontSize="27">19 tails, then the first head</text>
  </svg>
  <div style={{fontSize:84,color:mint,marginTop:50,opacity:ci>=15?p:.15}}>$1,048,576</div>
  <div style={{fontSize:43,marginTop:25,opacity:ci>=15?p:.15}}>× 1 / 1,048,576</div>
  <div style={{fontSize:88,color:peach,marginTop:40,opacity:ci>=16?ramp(f,cues[16].start,cues[16].start+20):.1}}>= $1</div>
  <Note>{ci===14?'Larger prizes. Smaller probabilities.':'One exact stopping point: first head on toss 20'}</Note>
 </div>;
};

const Wallet=({f,ci}:{f:number;ci:number})=>{
 const p=ramp(f,cues[18].start,cues[18].start+55);
 return <div style={{textAlign:'center'}}>
  {ci<19?<><svg width="880" height="530" viewBox="0 0 880 530">
   <rect x="170" y="130" width="540" height="300" rx="45" fill="#355242" stroke={mint} strokeWidth="3"/>
   {[0,1,2].map(i=><g key={i} transform={`translate(${ci>=18?-p*70:0},${ci>=18?-p*85:0})`} opacity={ci>=18?1-p*.65:1}><rect x={255+i*55} y={75-i*17} width="190" height="220" rx="12" fill={cream} stroke={ink} strokeWidth="3"/><text x={350+i*55} y={185-i*17} textAnchor="middle" fill={ink} fontSize="50">$</text></g>)}
   <rect x="170" y="220" width="540" height="210" rx="35" fill="#355242" stroke={mint} strokeWidth="3"/><rect x="560" y="260" width="200" height="105" rx="18" fill={ink} stroke={mint} strokeWidth="3"/><circle cx="600" cy="312" r="12" fill={peach}/>
   <text x="440" y="505" textAnchor="middle" fill={cream} fontSize="39">One ticket. Real consequences.</text>
  </svg><div style={{fontSize:51,lineHeight:1.35,marginTop:35}}>Money you need<br/><span style={{color:peach}}>is not spare money.</span></div></>:<>
   <svg width="880" height="550" viewBox="0 0 880 550"><path d="M100 65V455H810" stroke={muted} strokeWidth="2" fill="none"/><path d="M110 435C165 190 325 100 790 85" stroke={mint} strokeWidth="7" fill="none"/><text x="450" y="520" fill={muted} textAnchor="middle" fontSize="30">Wealth</text><text x="115" y="45" fill={muted} fontSize="30">Utility (illustrative)</text><path d="M175 455V270M640 455V93" stroke={peach} strokeWidth="3" strokeDasharray="8 9"/><circle cx="175" cy="270" r="10" fill={peach}/><circle cx="640" cy="93" r="10" fill={peach}/></svg>
   <div style={{fontSize:50,lineHeight:1.35,marginTop:20}}>Value depends on<br/><span style={{color:mint}}>wealth and preferences.</span></div>
   <Note>One possible utility curve · not a universal rule</Note>
  </>}
 </div>;
};

const Capped=({f,ci}:{f:number;ci:number})=>{
 const p=ramp(f,cues[21].start,cues[21].start+35);
 return <div style={{textAlign:'center',paddingTop:20}}>
  <div style={{border:'2px solid '+peach,padding:'20px',borderRadius:18,fontSize:45,color:peach}}>Maximum prize: $1,024</div>
  <svg width="880" height="225" viewBox="0 0 880 225"><text x="440" y="28" textAnchor="middle" fill={muted} fontSize="24">First head on toss</text><path d="M100 50H780" stroke={peach} strokeWidth="4"/>{[0,1,2,3,4,5,6,7].map(i=><g key={i}><rect x={115+i*85} y={170-Math.min(120,15*2**i)} width="58" height={Math.min(120,15*2**i)} fill={mint} rx="5"/><text x={144+i*85} y="207" textAnchor="middle" fill={muted} fontSize="24">{i+7}</text></g>)}</svg>
  <div style={{fontSize:32,color:muted,display:'grid',gridTemplateColumns:'1fr 1.1fr .5fr',paddingBottom:20}}><span>FIRST HEAD</span><span>CONTRIBUTION</span><span>TOTAL</span></div>
  <div style={{display:'grid',gridTemplateColumns:'1fr 1.1fr .5fr',alignItems:'center',fontSize:40,borderTop:'1px solid #637e6c',padding:'25px 0'}}><span>Tosses 1–9</span><span>9 × $1</span><span style={{color:mint}}>$9</span></div>
  <div style={{display:'grid',gridTemplateColumns:'1fr 1.1fr .5fr',alignItems:'center',fontSize:37,borderTop:'1px solid #637e6c',padding:'25px 0'}}><span>Toss 10 or later</span><span>$1,024 × 1/512</span><span style={{color:mint}}>$2</span></div>
  <div style={{fontSize:105,marginTop:30,color:mint,opacity:ci>=21?p:.12}}>$11</div>
  <Note>Expected payout · before the entry fee</Note>
 </div>;
};

const Main=()=>{
 const f=useCurrentFrame(),ci=Math.max(0,cues.findLastIndex(c=>f>=c.start)),cue=cues[ci],s=cue.scene;
 const enter=ramp(f,sceneStart(s),sceneStart(s)+12);
 let title:React.ReactNode,visual:React.ReactNode;
 if(s==='hook'){
  title=<>An infinite average.<br/><span style={{color:peach}}>Your ticket price?</span></>;
  const p=ramp(f,cues[0].start,cues[0].end);
  visual=<div style={{textAlign:'center',paddingTop:20}}><svg width="880" height="350" viewBox="0 0 880 350"><Coin x={440} y={175} r={125} flip={ci===0&&p<.25?Math.cos(p*8*Math.PI):1}/></svg><Ticket amount={ci===0?p<.33?'$10?':p<.66?'$100?':'Your savings?':'One coin.'}/><Note>What is an infinite expectation worth to you?</Note></div>;
 }else if(s==='rules'){
  title=<>Keep flipping.<br/><span style={{color:mint}}>Stop at heads.</span></>;visual=<Rules f={f} ci={ci}/>;
 }else if(s==='odds'){
  title=<>The prize grows.<br/><span style={{color:peach}}>The odds shrink.</span></>;visual=<Odds f={f} ci={ci}/>;
 }else if(s==='infinity'){
  title=<>Each possibility<br/>adds <span style={{color:mint}}>one dollar.</span></>;visual=<InfinitySum f={f} ci={ci}/>;
 }else if(s==='typical'){
  title=<>Infinite expectation.<br/><span style={{color:mint}}>Usually a small prize.</span></>;visual=<Typical f={f} ci={ci}/>;
 }else if(s==='tail'){
  title=<>Rare enough to miss.<br/><span style={{color:peach}}>Huge enough to matter.</span></>;visual=<RareTail f={f} ci={ci}/>;
 }else if(s==='wallet'){
  title=ci<19?<>The arithmetic<br/><span style={{color:mint}}>is not your wallet.</span></>:<>Same dollars.<br/><span style={{color:mint}}>Different value.</span></>;visual=<Wallet f={f} ci={ci}/>;
 }else if(s==='cap'){
  title=<>Cap the prize.<br/><span style={{color:peach}}>Change the game.</span></>;visual=<Capped f={f} ci={ci}/>;
 }else{
  title=<>A mathematical average.<br/><span style={{color:mint}}>A personal decision.</span></>;
  visual=<div style={{textAlign:'center',paddingTop:30}}><Ticket amount="Your price?"/><div style={{fontSize:61,lineHeight:1.4,marginTop:70}}>The average can be <span style={{color:mint}}>infinite.</span><br/>Your wallet is <span style={{color:peach}}>finite.</span></div><div style={{fontSize:39,color:muted,lineHeight:1.4,marginTop:60,opacity:ramp(f,cues[24].start,cues[24].start+20)}}>Expected money is one question.<br/>What you can risk is another.</div></div>;
 }
 return <AbsoluteFill style={{background:ink,color:cream,fontFamily:'Liberation Serif, serif',overflow:'hidden'}}>
  <Audio src={staticFile('audio/st-petersburg-paradox-michael.wav')}/>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 35%,#b9dfb40e,transparent 70%)'}}/>
  <div style={{position:'absolute',top:95,left:60,right:60,textAlign:'center',fontSize:25,letterSpacing:5,color:muted}}>THE INTUITION GLITCH</div>
  <div data-title style={{position:'absolute',top:225,left:65,right:65,textAlign:'center',fontSize:s==='tail'||s==='typical'||s==='close'?71:80,lineHeight:1.13,fontWeight:700,opacity:enter}}>{title}</div>
  <div data-visual style={{position:'absolute',left:100,top:535,width:880,opacity:enter,transform:`translateY(${(1-enter)*10}px)`}}>{visual}</div>
  <div data-caption style={{position:'absolute',left:50,right:50,bottom:150,padding:'27px 32px',minHeight:135,boxSizing:'border-box',border:'1px solid #778f7755',borderRadius:20,background:'#091113eb',fontSize:37,lineHeight:1.4,fontWeight:700,textAlign:'center',color:'white'}}>{cue.text}</div>
 </AbsoluteFill>;
};
const StPetersburg=()=><AbsoluteFill>
 <Sequence durationInFrames={mainDuration}><Main/></Sequence>
 <Sequence from={mainDuration} durationInFrames={SHARED_OUTRO_DURATION-9}><Sequence from={-9}><SharedOutro/></Sequence></Sequence>
</AbsoluteFill>;
export const StPetersburgComposition=()=><Composition id="StPetersburg" component={StPetersburg} width={1080} height={1920} fps={30} durationInFrames={mainDuration+SHARED_OUTRO_DURATION-9}/>;

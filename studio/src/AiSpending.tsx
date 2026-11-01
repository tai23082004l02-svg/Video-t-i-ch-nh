import React from 'react';
import {AbsoluteFill,Audio,Composition,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {cues,duration} from './aiSpendingCues';
const mint='#b9dfb4',peach='#edb79d',cream='#f7f1e3';
const r=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const Icon=({type,color='#233d38',size=110}:{type:string,color?:string,size?:number})=><svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">{type==='bag'?<><path d="M22 35h56l5 50H17l5-50Z"/><path d="M35 38V25a15 15 0 0 1 30 0v13"/></>:type==='headphones'?<><path d="M18 58V44a32 32 0 0 1 64 0v14"/><rect x="13" y="50" width="18" height="34" rx="7"/><rect x="69" y="50" width="18" height="34" rx="7"/></>:type==='cup'?<><path d="M20 35h48v30a20 20 0 0 1-40 0V35M68 40h8a12 12 0 0 1 0 24h-8M17 89h60M33 13v10M50 10v13"/></>:<><rect x="16" y="22" width="68" height="56" rx="10"/><path d="M18 41h64M30 61h18"/></>}</svg>;
const Title=({label,children}:{label:string,children:React.ReactNode})=><><div style={{fontSize:26,letterSpacing:4,color:mint}}>{label}</div><div style={{fontSize:81,lineHeight:1.13,fontWeight:700,marginTop:27}}>{children}</div></>;
const Panel=({children,style={}}:{children:React.ReactNode,style?:React.CSSProperties})=><div style={{background:cream,color:'#243b35',borderRadius:30,padding:35,boxSizing:'border-box',...style}}>{children}</div>;
const Video=()=>{
 const f=useCurrentFrame();const bounds=[0,cues[1].start,cues[3].start,cues[5].start,duration];const scene=f<bounds[1]?0:f<bounds[2]?1:f<bounds[3]?2:3;
 const local=f-bounds[scene];const enter=r(local,0,17);const leave=scene===3?1:1-r(f,bounds[scene+1]-12,bounds[scene+1]);const cue=[...cues].reverse().find(c=>f>=c.start)||cues[0];
 const shop=r(f,cues[1].start+25,cues[2].start+40);const categorize=r(f,cues[4].start,cues[4].end-10);
 return <AbsoluteFill style={{background:['#162c2b','#2b2b29','#1b302b','#262f2c'][scene],color:cream,fontFamily:'Liberation Serif, serif',overflow:'hidden'}}>
 <Audio src={staticFile('audio/ai-spending-michael.wav')}/>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 80% 15%,#a0cbae15,transparent 70%)'}}/>
 <div style={{position:'absolute',left:75,top:78,color:'#b3c1b7',fontSize:24,letterSpacing:4}}>MONEY IN THE AGE OF AI</div>
 <div style={{position:'absolute',top:168,left:75,width:70,height:3,background:mint}}/>
 <div style={{position:'absolute',top:235,left:75,right:75,opacity:enter*leave,transform:`translateY(${(1-enter)*15}px)`}}>
 {scene===0?<>
 <Title label="THE CHANGE IS ALREADY HERE">AI is changing<br/><span style={{color:mint}}>how we spend.</span></Title>
 <div style={{position:'relative',marginTop:80,height:680}}>
 <Panel style={{position:'absolute',left:180,top:0,width:540,height:610,border:'8px solid #77897c',padding:38}}>
 <div style={{width:100,height:12,background:'#6e8177',borderRadius:20,margin:'0 auto 35px'}}/>
 <div style={{fontSize:27,color:'#6d8075',letterSpacing:3}}>YOUR DAILY FEED</div>
 <div style={{display:'flex',justifyContent:'center',padding:'30px 0',background:'#dae4d2',borderRadius:20,marginTop:25}}><Icon type="bag" size={165}/></div>
 <div style={{fontSize:38,marginTop:25}}>Picked for you.</div><div style={{height:13,width:'80%',background:'#b6c7b7',borderRadius:8,marginTop:25}}/><div style={{height:13,width:'50%',background:'#d0dacb',borderRadius:8,marginTop:16}}/>
 </Panel>
 {['headphones','cup','card'].map((type,i)=><Panel key={type} style={{position:'absolute',left:[0,680,30][i],top:[100,200,430][i],padding:24,opacity:r(local,25+i*20,50+i*20),transform:`translateY(${(1-r(local,25+i*20,50+i*20))*25}px)`}}><Icon type={type} size={105}/></Panel>)}
 </div>
 <div style={{fontSize:34,color:'#bac9be'}}>Not just your work. Your wallet, too.</div>
 </>:scene===1?<>
 <Title label="PERSONALIZED SHOPPING">The next thing<br/>you “need.”</Title>
 <div style={{display:'flex',gap:24,marginTop:80}}>{[['headphones','$89'],['bag','$64'],['cup','$24']].map(([type,price],i)=><Panel key={type} style={{flex:1,padding:25,opacity:.35+.65*r(shop,i*.2,i*.2+.25),transform:`translateY(${(1-r(shop,i*.2,i*.2+.25))*30}px)`}}><div style={{textAlign:'center',padding:'25px 0'}}><Icon type={type} size={135}/></div><div style={{fontSize:25,color:'#5b7467',marginTop:20}}>FOR YOU</div><div style={{fontSize:54,marginTop:15}}>{price}</div></Panel>)}</div>
 <div style={{marginTop:65,padding:'30px 35px',border:'1px solid #899780',borderRadius:22,fontSize:38,lineHeight:1.4,opacity:r(f,cues[2].start,cues[2].start+25)}}>A relevant recommendation<br/>can become an unplanned purchase.</div>
 <div style={{fontSize:29,color:'#b8c4b8',marginTop:40}}>Illustrative products and prices.</div>
 </>:scene===2?<>
 <Title label="TURN THE TECHNOLOGY AROUND">See where<br/><span style={{color:mint}}>your money goes.</span></Title>
 <Panel style={{marginTop:65,padding:40}}>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:27,color:'#5b7467'}}><span>MONTHLY SPENDING</span><span>DEMO</span></div>
 <div style={{fontSize:78,marginTop:18}}>$1,240</div>
 {[['Shopping',480,'#7b9c7a'],['Groceries',420,'#a8b999'],['Dining',340,'#d4aa8f']].map(([name,v,color],i)=><div key={name} style={{marginTop:32}}><div style={{display:'flex',justifyContent:'space-between',fontSize:32}}><span>{name}</span><span style={{opacity:r(categorize,i*.2,i*.2+.3)}}>${v}</span></div><div style={{height:20,borderRadius:10,background:'#dce2d4',marginTop:15}}><div style={{height:'100%',borderRadius:10,width:`${Number(v)/480*100*r(categorize,i*.2,i*.2+.3)}%`,background:String(color)}}/></div></div>)}
 </Panel>
 <div style={{marginTop:45,display:'flex',alignItems:'center',gap:28,opacity:r(categorize,.65,.95)}}><div style={{fontSize:65,color:mint}}>↗</div><div style={{fontSize:35,lineHeight:1.4}}>Patterns become easier to spot.<br/><span style={{color:'#b8c4b8',fontSize:28}}>Illustrative categories, not real account data.</span></div></div>
 </>:<>
 <Title label="BEFORE YOU TAP BUY">Your budget.<br/><span style={{color:mint}}>Your decision.</span></Title>
 <Panel style={{marginTop:80,padding:40}}><div style={{fontSize:28,color:'#5b7467',letterSpacing:3}}>A QUICK CHECK</div><div style={{fontSize:49,lineHeight:1.3,marginTop:35}}>Does this fit my budget?</div><div style={{height:1,background:'#afc0ae',margin:'30px 0'}}/><div style={{fontSize:43,color:'#6d7e6a'}}>Or just my feed?</div></Panel>
 <div style={{marginTop:65,background:mint,color:'#223b2b',borderRadius:22,textAlign:'center',padding:28,fontSize:41,fontWeight:700,opacity:r(local,30,55)}}>Pause before you purchase.</div>
 <div style={{fontSize:43,lineHeight:1.45,marginTop:60,opacity:r(f,cues[6].start,cues[6].start+25)}}>Let AI help.<br/>Keep the final choice yours.</div>
 </>}
 </div>
 <div style={{position:'absolute',left:55,right:55,bottom:155,minHeight:135,padding:'28px 32px',boxSizing:'border-box',background:'#080e10dc',border:'1px solid #70877255',borderRadius:20,fontSize:38,lineHeight:1.35,fontWeight:700,textAlign:'center'}}>{cue.text.replaceAll('A I','AI')}</div>
 <div style={{position:'absolute',bottom:75,left:75,right:75,textAlign:'center',fontSize:21,color:'#b2c3b7',letterSpacing:2}}>SMARTER TOOLS. MORE INTENTIONAL CHOICES.</div>
 <div style={{position:'absolute',bottom:0,height:5,width:`${f/(duration-1)*100}%`,background:mint}}/>
 </AbsoluteFill>;
};
export const AiSpendingComposition=()=> <Composition id="AiSpending" component={Video} width={1080} height={1920} fps={30} durationInFrames={duration}/>;

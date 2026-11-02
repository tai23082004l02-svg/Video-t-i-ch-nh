import {StPetersburgComposition} from './StPetersburg';
import {InspectionParadoxComposition} from './InspectionParadox';
import {BirthdayParadoxComposition} from './BirthdayParadox';
import {SunkCostComposition} from './SunkCost';
import {MovingGoalpostsAnimatedComposition} from './MovingGoalpostsAnimated';
import {MovingGoalpostsComposition} from './MovingGoalposts';
import {MontyHallComposition} from './MontyHall';
import {SharedOutroComposition} from './SharedOutro';
import {AiSpendingComposition} from './AiSpending';
import {MinimumTrapCalmComposition} from './MinimumTrapCalm';
import {MinimumTrapComposition} from './MinimumTrap';
import {TenDollarsComposition} from './TenDollars';
import {FinanceStoryComposition} from './FinanceStory';
import React from 'react';
import {AbsoluteFill, Composition, registerRoot, useCurrentFrame, interpolate} from 'remotion';
const FinanceDemo = () => {
 const frame = useCurrentFrame();
 const progress = interpolate(frame,[0,75],[0,1],{extrapolateRight:'clamp'});
 return <AbsoluteFill style={{backgroundColor:'#071526',color:'white',padding:90,fontFamily:'sans-serif',justifyContent:'center'}}>
  <div style={{fontSize:26,color:'#52e0af',letterSpacing:5}}>TÀI CHÍNH CÁ NHÂN</div>
  <h1 style={{fontSize:76,margin:'30px 0'}}>Tích lũy hôm nay<br/>Vững vàng ngày mai</h1>
  <div style={{display:'flex',alignItems:'flex-end',height:200,gap:30}}>{[70,110,135,170,200].map((h,i)=><div key={i} style={{height:h*progress,width:130,backgroundColor:'#52e0af',borderRadius:12}}/>)}</div>
  <p style={{fontSize:26,color:'#b0bfd3'}}>Biểu đồ minh họa • Không phải dữ liệu thị trường</p>
 </AbsoluteFill>;
};
registerRoot(()=><><StPetersburgComposition/><InspectionParadoxComposition/><BirthdayParadoxComposition/><SunkCostComposition/><MovingGoalpostsAnimatedComposition/><MovingGoalpostsComposition/><MontyHallComposition/><SharedOutroComposition/><AiSpendingComposition/><MinimumTrapCalmComposition/><MinimumTrapComposition/><TenDollarsComposition/><FinanceStoryComposition/><Composition id="FinanceDemo" component={FinanceDemo} durationInFrames={120} fps={30} width={1920} height={1080}/></>);

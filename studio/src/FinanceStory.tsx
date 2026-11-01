import React from 'react';
import {AbsoluteFill,Composition,interpolate,useCurrentFrame} from 'remotion';
const mint='#64efc1', coral='#ff987d';
const captions=[
[0,4,'100.000 đồng mỗi ngày. Nhỏ thật không?'],
[4,8,'Cùng một khoản tiền, hai cách sử dụng.'],
[8,13,'Một bên đổi lấy trải nghiệm hôm nay.'],
[13,18,'Một bên được giữ lại, đều đặn mỗi ngày.'],
[18,23,'Sau 10 năm, khoản để dành đạt 365 triệu đồng.'],
[23,27,'Chưa tính lãi, lạm phát hay những ngày bỏ lỡ.'],
[27,32,'Không cần bỏ hết niềm vui. Hãy dành một phần cho tương lai.']
] as const;
const clamp=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const money=(n:number)=>Math.round(n).toLocaleString('vi-VN');
export const FinanceStory=()=>{
 const f=useCurrentFrame(),t=f/30;
 const p=clamp(f,240,660),year=p*10,total=p*365000000;
 const intro=t<4,end=t>=27;
 const caption=captions.find(([a,b])=>t>=a&&t<b)?.[2];
 const appear=clamp(f,0,22);
 return <AbsoluteFill style={{background:'#07141e',color:'#f6faf9',fontFamily:'Noto Sans, sans-serif',overflow:'hidden'}}>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 90% 20%, #153b43 0%, transparent 60%)'}}/>
  <div style={{position:'absolute',inset:0,opacity:.12,backgroundImage:'linear-gradient(#69b5ac 1px, transparent 1px), linear-gradient(90deg, #69b5ac 1px, transparent 1px)',backgroundSize:'90px 90px'}}/>
  <div style={{position:'absolute',top:65,left:65,right:65,display:'flex',justifyContent:'space-between',fontSize:21,letterSpacing:3,color:'#a6b8bc'}}><span>GÓC NHÌN TÀI CHÍNH</span><span>01 / THÓI QUEN</span></div>
  {intro?<div style={{position:'absolute',top:285,left:65,right:65,opacity:appear,transform:`translateY(${(1-appear)*45}px)`}}>
   <div style={{fontSize:28,color:mint,letterSpacing:5}}>MỘT KHOẢN NHỎ.</div>
   <div style={{fontSize:139,fontWeight:900,letterSpacing:-8,lineHeight:1.3,marginTop:25}}>100.000<span style={{fontSize:50,color:mint,letterSpacing:0}}>đ</span></div>
   <div style={{fontSize:58,fontWeight:700}}>mỗi ngày</div>
   <div style={{height:3,background:mint,width:700*clamp(f,20,85),marginTop:50}}/>
   <div style={{fontSize:70,lineHeight:1.3,marginTop:60,fontWeight:800}}>10 năm sau,<br/>bạn thấy gì?</div>
  </div>:end?<div style={{position:'absolute',top:290,left:65,right:65}}>
   <div style={{fontSize:28,color:mint,letterSpacing:4}}>BẮT ĐẦU TỪ MỘT LỰA CHỌN</div>
   <div style={{fontSize:82,fontWeight:900,lineHeight:1.25,marginTop:45}}>Vui hôm nay.<br/><span style={{color:mint}}>Có quỹ cho<br/>ngày mai.</span></div>
   <div style={{fontSize:33,lineHeight:1.6,color:'#c5d4d7',marginTop:55}}>Chọn mức để dành phù hợp.<br/>Đều đặn quan trọng hơn hoàn hảo.</div>
   <div style={{marginTop:65,background:mint,color:'#07141e',borderRadius:24,padding:'28px 30px',fontSize:35,fontWeight:800}}>Bạn sẽ bắt đầu với bao nhiêu?</div>
  </div>:<>
   <div style={{position:'absolute',top:160,left:65,right:65}}><div style={{fontSize:62,fontWeight:900,lineHeight:1.25}}>Cùng 100.000đ/ngày.<br/><span style={{color:mint}}>Hai hành trình.</span></div></div>
   <div style={{position:'absolute',top:380,left:65,right:65,display:'flex',gap:24}}>
    {[false,true].map(save=><div key={String(save)} style={{width:363,height:660,padding:28,borderRadius:28,background:save?'#102f31':'#242931',border:`2px solid ${save?'#2b7260':'#55453f'}`,position:'relative',overflow:'hidden'}}>
     <div style={{fontSize:26,color:save?mint:coral,fontWeight:800}}>{save?'ĐỂ DÀNH':'CHI TIÊU'}</div>
     <div style={{fontSize:22,color:'#bdc9cc',marginTop:15}}>{save?'Cho ngày mai':'Cho hôm nay'}</div>
     <div style={{position:'absolute',bottom:180,left:28,right:28,height:300}}>
      {Array.from({length:14},(_,i)=>{const cycle=((f-120+i*17)%100+100)%100;return <div key={i} style={{position:'absolute',left:15+(i%4)*73,top:save?300-Math.floor(i/4)*56-50*p:cycle*3,opacity:save?(p>i/17?1:.12):1-cycle/100,width:58,height:37,borderRadius:7,background:save?mint:coral,transform:`rotate(${save?0:i%2?12:-12}deg)`,color:'#17352e',fontSize:19,textAlign:'center',fontWeight:900,paddingTop:5}}>₫</div>})}
     </div>
     <div style={{position:'absolute',bottom:35,left:28,right:20}}>
      <div style={{fontSize:save?42:33,fontWeight:900,color:save?mint:coral}}>{save?`${money(total/1000000)} triệu`:'Trải nghiệm'}</div>
      <div style={{fontSize:21,color:'#b8c7ca',marginTop:10}}>{save?'Số tiền giữ lại':'Giá trị đã tận hưởng'}</div>
     </div>
    </div>)}
   </div>
   <div style={{position:'absolute',top:1100,left:65,right:65}}>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:24,color:'#c0d0d2'}}><span>NĂM {year.toFixed(1).replace('.',',')}</span><span>10 NĂM</span></div>
    <div style={{height:9,background:'#294047',borderRadius:8,marginTop:18}}><div style={{width:`${p*100}%`,height:9,borderRadius:8,background:mint}}/></div>
    <div style={{fontSize:22,lineHeight:1.6,marginTop:35,color:'#a6b8bc'}}>{t>=23?'Giả định: 365 ngày/năm × 10 năm.\nKhông tính lãi, lạm phát; để dành đủ mỗi ngày.':'100.000 × 365 × 10 = 365.000.000 đồng'}</div>
   </div>
  </>}
  <div style={{position:'absolute',bottom:155,left:50,right:50,minHeight:130,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:22,background:'#030a10e8',border:'1px solid #33474e',padding:'20px 30px',fontSize:34,fontWeight:600,textAlign:'center',lineHeight:1.45}}>{caption}</div>
  <div style={{position:'absolute',bottom:80,left:65,right:65,color:'#81999e',fontSize:19,textAlign:'center'}}>MÔ PHỎNG GIÁO DỤC • KHÔNG PHẢI DỰ BÁO LỢI NHUẬN</div>
  <div style={{position:'absolute',bottom:0,left:0,width:`${f/959*100}%`,height:7,background:mint}}/>
 </AbsoluteFill>;
};
export const FinanceStoryComposition=()=> <Composition id="FinanceStory" component={FinanceStory} width={1080} height={1920} fps={30} durationInFrames={960}/>;

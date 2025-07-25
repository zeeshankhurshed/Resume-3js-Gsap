import React, { useRef } from 'react';

const GlowCard = ({card,children,index}) => {
    const cardRef=useRef([]);

    const handleMouseMove=(index)=>(e)=>{
        const card=cardRef.current[index];
        if(!card) return;
        // get mouse positon rlatitive to card
        const rect=card.getBoundingClientRect();
        const mouseX=e.clientX - rect.left - rect.width / 2;
        const mouseY=e.clientX - rect.top - rect.width / 2;
        
        //calc the angle for th center of the card
        let angle =Math.atan2(mouseY,mouseX) * (180 / Math.PI);
        angle=(angle + 360) % 360;
        
        card.style.setProperty('--start', angle + 60)
    }
  return (
    <div ref={(el)=>(cardRef.current[index]=el)} onMouseMove={handleMouseMove(index)} className='card card-border rounded-xl p-10 mb-5 break-inside-avoid-column'>
      <div className="glow"/>
      <div className='flex items-center gap-1 mb-5'>
        {Array.from({length:5}, (_, i) => (
            <img src='/images/star.png' key={i} alt="star" className='size-5' />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white text-sm">{card.review}</p>
      </div>
      {children}
    </div>
  );
}

export default GlowCard;

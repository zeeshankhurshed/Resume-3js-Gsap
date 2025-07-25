import React from 'react';
import TitleHeader from './TitleHeader';
import { testimonials } from '../constants';
import GlowCard from './GlowCard';

const Testimonials = () => {
  return (
    <section id='testimonials' className='flex flex-center section-padding'>
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title={'What People Say About Me?'} sub={"Client Feedback Highlights"}/>


        <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
            {testimonials.map(({imgPath,name,mentions,review},index)=>(
                <GlowCard card={{review}} key={index}>
                    <div className="flex items-center gap-3">
                    <div>
                    <img src={imgPath} alt="tetimonial.name" />
                    </div>
                    </div>
                    <p className='font-bold'>{name}</p>
                    <p className='text-white'>{mentions}</p>
                </GlowCard>
            ))}
            </div>
              </div>
    </section>
  );
}

export default Testimonials;

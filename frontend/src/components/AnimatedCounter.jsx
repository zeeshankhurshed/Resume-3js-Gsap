import React from "react";
import { counterItems } from '../constants';
import CountUp from 'react-countup';

const AnimatedCounter = () => {
  return (
    <div id="counter" className="padding-x-lg xl:mt-0 mt-32">

      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center items-center"
          >
            <div className="counter-number text-white text-5xl font-bold mb-2">
              <CountUp end={item.value} suffix={item.suffix} duration={2} />
            </div>
            <div className="text-white text-lg text-center">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  
  );
};

export default AnimatedCounter;

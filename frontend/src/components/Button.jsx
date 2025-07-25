import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text = "See my Work", className = "", id = "", to = "/" }) => {
  return (
    <div id={id} className="inline-block">
      <Link to={to} className="cta-wrapper inline-block">
        <div className={`cta-button group relative flex justify-center items-center px-6 py-4 rounded-lg bg-black overflow-hidden ${className}`}>
          
          {/* Expanding Circle */}
          <div className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-white 
            transition-all duration-500 ease-in-out group-hover:w-12 group-hover:h-12 group-hover:right-4 z-0">
          </div>

          {/* Button Text */}
          <span className="relative z-10 uppercase text-sm text-black hover:text-white transition-all duration-300 ease-in-out group-hover:translate-x-[-0.75rem]">
            {text}
          </span>

          {/* Arrow Wrapper */}
          <div className="arrow-wrapper absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full flex justify-center items-center z-10 transition-all duration-500 ease-in-out group-hover:bg-white text-black">
            <img
              src="/images/arrow-down.svg"
              alt="arrow"
              className="size-5 mr-1.5 transform transition-transform duration-500 ease-in-out group-hover:translate-y-0 translate-y-2 animate-bounce"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Button;

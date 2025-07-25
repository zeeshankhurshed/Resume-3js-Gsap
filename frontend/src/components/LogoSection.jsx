import React from 'react';
import { logoIconsList } from '../constants';

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img src={icon.imgPath} alt={icon.name || 'tech-logo'} />
    </div>
  );
};

const LogoSection = () => {
  return (
    <div className="md:my-20 my-10 relative">
      <div className="gradient-edge" />
      <div className="gradient-edge" />

      <div className="margquee h-50">
        <div className="marquee-box md:gap-12 gap-5">
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`first-${icon.name || `icon-${index}`}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`second-${icon.name || `icon-${index}`}-${index}`} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSection;

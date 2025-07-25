import React from "react";
import TitleHeader from "./TitleHeader";
import { techStackIcons, techStackImgs } from "../constants";
import TechIcon from "./Models/TechLogos/TechIcon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TechStack = () => {

useGSAP(()=>{
    gsap.fromTo('.tech-card',{y:50,opacity:0},{
        y:0,
        opacity:1,
        duration:1,
        ease:"power2.inOut",
        stagger:0.2,
        scrollTrigger:{
            trigger:'#skills',
            start:'top center'
        }
    })
},[])

  return (
    <section id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="My Preferred Tech Stack"
          sub="👓 The Skills I Bring to the Table"
        />

        <div className="tech-grid">
          {techStackIcons.map((icon) => (
            <div
              key={icon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg relative"
            >
              {/* Animated Background */}
              <div className="tech-card-animated-bg" />

              {/* Main Content */}
              <div className="tech-card-content">
                {/* 3D Icon */}
                <div className="tech-icon-wrapper">
                  <TechIcon model={icon} />
                </div>

                {/* Label */}
                <div className="padding-x w-full">
                  <p className="text-xs">{icon.name}</p>
                </div>
              </div>
            </div>
          ))}
          {/* {techStackImgs.map((icon)=>(
            <div key={icon.name} className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg">
                <div className="tech-card-animated-bg"/>
                <div className="tech-card-content">
                    <div className="tech-icon-wrapper">
                        <img src={icon.imgPath} alt="" />
                    </div>
                    <div className="padding-x w-full">{icon.name}</div>
                </div>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

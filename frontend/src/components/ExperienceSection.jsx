import React, { useRef } from "react";
import TitleHeader from "./TitleHeader";
import { expCards } from "../constants";
import GlowCard from "./GlowCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Animate left GlowCards
      gsap.utils.toArray(".timeline-card").forEach((card) => {
        const glowCard = card.querySelector(".glow-card");
        if (glowCard) {
          gsap.from(glowCard, {
            xPercent: -100,
            opacity: 0,
            transformOrigin: "left left",
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: glowCard,
              start: "top 80%",
            },
          });
        }
      });

      // Animate timeline vertical line scaling
      gsap.to(".timeline", {
        transformOrigin: "bottom bottom",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top center",
          end: "70% center",
          onUpdate: (self) => {
            gsap.to(".timeline", {
              scaleY: 1 - self.progress,
            });
          },
        },
      });

      // Animate middle logo only
      gsap.utils.toArray(".expAnimate").forEach((el) => {
        gsap.from(el, {
          xPercent:0,
          opacity: 0,
          // x: -50,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: el,
            start: "bottom 60%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5 max-w-7xl mx-auto">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div
                key={card.title}
                className="timeline-card exp-card-wrapper flex xl:flex-row flex-col gap-10 items-start justify-center"
              >
                {/* Left: GlowCard */}
                <div className="xl:w-2/6 w-full relative z-10 glow-card">
                  <GlowCard card={card}>
                    <div>
                      <img
                        src={card.imgPath}
                        alt="exp-img"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </GlowCard>
                </div>

                {/* Right: Timeline + Content */}
                <div className="xl:w-4/6 w-full">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline">
                        <div className="gradient-line w-1 h-full" />
                      </div>
                    </div>

                    {/* Split this part: Animate only logo */}
                    <div className="flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="expAnimate timeline-logo">
                        <img src={card.logoPath} alt="logo" />
                      </div>

                      {/* Keep this part still */}
                      <div className="text-content">
                        <h1 className="font-semibold text-3xl">
                          {card.title}
                        </h1>
                        <p className="my-5 text-white-50">🗓️ {card.date}</p>
                        <p className="text-[#839CB5] italic">
                          Responsibilities
                        </p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map((res, index) => (
                            <li key={index} className="text-lg">
                              {res}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

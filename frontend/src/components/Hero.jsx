import { words } from "../constants";
import HeroExperience from "./HeroModels/HeroExperience";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import AnimatedCounter from "./AnimatedCounter";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h2",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power2.inOut",
      }
    );
  }, []);
  return (
    <section id="hero" className="relative ">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background" />
      </div>

      <div className="hero-layout">
        {/* Left Hero content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7 ">
            <div className="hero-text ">
              <h2 className="">
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={`${word.text}-${index}`}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-3 md:p-2 p-1 rounded-full bg-white"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
                <span className="block md:hidden">into Real Project that <br /> Deliver Results</span>
              </h2>
              <h2 className="hidden md:block">into Real Projects</h2>
              <h2 className="hidden md:block">that Deliver Results</h2>
            </div>
            <p className="text-white md:text-xl relative z-10 pointer-events-none !text-xs w-full md:w-1/3">
              Hi, I'm Zeeshan, a develpoper based in Islamabad Pakistan with a
              passion for crafting innovative solutions. With a focus on web
              development, I bring ideas to life through code, creating seamless
              user experiences and impactful digital products.
            </p>
           {/* <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            /> */}
            <a href="#counter" id="counter" className="md:w-80 md:h-16 w-60 h-12 bg-white text-black flex justify-center items-center rounded-lg opacity-95 hover:opacity-75">See My Work</a>
          </div>
        </header>

        {/* right 3d model */}

        <figure>
          <div className="hero-3d-layout mt-12 md:mt-0">
            <HeroExperience />
          </div>
        </figure>
      </div>
      <AnimatedCounter />
    </section>
  );
};

export default Hero;

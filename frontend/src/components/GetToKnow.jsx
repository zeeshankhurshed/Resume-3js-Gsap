"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);

  useGSAP(() => {
    gsap.from(headingRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(subHeadingRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.4,
      ease: "power2.out",
    });

    gsap.from(badgeRef.current, {
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.8,
      ease: "back.out(1.7)",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="container mx-auto px-6 py-16">
      {/* About Me Heading */}
      <div className="text-center mb-12">
        <p
          ref={headingRef}
          className="inline-block px-4 py-1 text-lg font-medium bg-blue-500  rounded-md"
        >
          About Me
        </p>
        <h2
          ref={subHeadingRef}
          className="text-3xl md:text-4xl font-bold text-white mt-4"
        >
          Know Me More
        </h2>
      </div>

      {/* Experience Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Left Text */}
        <div ref={textRef} className="md:w-[65%]">
          <p className="font-semibold text-sm text-gray-300 mb-4 text-justify">
            💼 Passionate Next.js | React.js | React Native | TypeScript | MERN
            Stack Maestro 🚀 Bootstrap & Tailwind CSS Whisperer 💪 Freelancer
            Extraordinaire | 📚💡 Eternal Learner 🔧 WordPress | MongoDB |
            PostgreSQL (pgAdmin4) | GSAP | Three.js / React Three Fiber.
          </p>

          <p className="text-sm text-gray-200 first-letter:text-5xl first-letter:font-extrabold first-letter:text-indigo-600 first-letter:float-left first-letter:mr-3 text-justify">
            Are you looking for a developer who can transform your ideas into
            cutting-edge, responsive, and visually stunning web and mobile
            applications? Look no further! With hands-on expertise in Next.js,
            React Native, and the full MERN stack, I bring your visions to
            life—pixel by pixel, component by component. I specialize in
            crafting seamless user interfaces using HTML, CSS, Bootstrap, and
            Tailwind CSS, and I thrive on integrating animation magic with GSAP
            and immersive 3D experiences with Three.js/Fiber. Whether you're
            working with PostgreSQL or MongoDB, I ensure efficient, scalable
            data solutions that power robust applications. 🔥 Let’s team up and
            create something truly extraordinary!
          </p>
        </div>

        {/* Right Badge */}
        <div ref={badgeRef} className="md:w-[35%] flex justify-center">
          <div className="text-center space-y-4">
            <div className="w-[150px] h-[150px] bg-indigo-600 rounded-full flex justify-center items-center shadow-2xl">
              <h2 className="text-white text-5xl font-bold">04</h2>
            </div>
            <p className="text-sm text-gray-200">
              Years of{" "}
              <span className="text-indigo-400 font-semibold">
                Experience
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

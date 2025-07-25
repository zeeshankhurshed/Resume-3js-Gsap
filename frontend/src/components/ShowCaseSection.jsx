import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger)
const ShowCaseSection = () => {
    const sectionRef=useRef(null);
    const project1Ref=useRef(null);
    const project2Ref=useRef(null);
    const project3Ref=useRef(null);

    
    useGSAP(()=>{
        const projects=[project1Ref.current,project2Ref.current,project3Ref.current]
        projects.forEach((card,index)=>{
        gsap.fromTo(
            card,
            {
                y:50,opacity:0
            },
            {
                y:0,
                opacity:1,
                duration:1,
                delay:0.3 * (index + 1), 
                scrollTrigger:{
                    trigger:card,
                    start:'top bottom-=100'
                }
            }
        )
    })
   
       gsap.fromTo(sectionRef.current,
        {opacity:0},
         {opacity:1,duration:1.5},
        )
    },[])

  return (
    <section id='work' ref={sectionRef} className='app-showcase'>
      <div className="w-full">
        <div className="showcaselayout">
            {/* left */}
            <div className="first-project-wrapper" ref={project1Ref}>
                <div className="image-wrapper">
                    <img src="/images/project1.png" alt="Ryde" />
                </div>
                <div className="text-content">
                    <h2 className='text-xl'>On-Deman Rides Made Simple with a Powerfl, User-Friendly App called Ryde</h2>
                    <p className="text-white md:text-sm">An app build with React Native, Expo, & TailwindCSS for a fase, user-friendly experience.</p>
                </div>
            </div>
            {/* right */}

            <div className="project-list-wrapper overflow-hidden">
                <div className="project" ref={project2Ref}>
                    <div className='image-wrapper bg-[#ffefdb]'>
                        <img src="/images/project2.png" alt="Lib Mangement Platform" />
                    </div>
                    <h2 className='text-sm'>Library Management Platment</h2>
                </div>

                <div className="project" ref={project3Ref}>
                    <div className='image-wrapper bg-[#ffe7eb]'>
                        <img src="/images/project3.png" alt="Yc Directory" />
                    </div>
                    <h2 className='text-sm'>YC Directory - A startup ShowCase App</h2>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

export default ShowCaseSection;

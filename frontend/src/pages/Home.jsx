import React from 'react';
import Hero from '../components/Hero';
import ShowCaseSection from '../components/ShowCaseSection';
import LogoSection from '../components/LogoSection';
import FeatureCards from '../components/FeatureCards';
import ExperienceSection from '../components/ExperienceSection';
import TechStack from '../components/TechStack';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import VideoSection from '../components/VideoSection';

const Home = () => {
  return (
    <div>
      <Hero/>
      <VideoSection/>
      {/* <ShowCaseSection/> */}
      <LogoSection/>
      <FeatureCards/>
      <ExperienceSection/>
      <TechStack/>
      <Testimonials/>
      <Contact/>
    </div>
  );
}

export default Home;

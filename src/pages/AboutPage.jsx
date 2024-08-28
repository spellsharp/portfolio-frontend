import React from "react";
import AboutSkillsSection from "../components/AboutSkillsSection";
import AboutHeroSection from "../components/AboutHeroSection";
import AboutEducationSection from "../components/AboutEducationSection";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div>
      <section>
        <AboutHeroSection />
      </section>
      
      <section>
        <AboutSkillsSection />
      </section>
      
      <section>
        <AboutEducationSection />
      </section>
    </div>
  );
};

export default AboutPage;

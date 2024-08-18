import React from "react";
import SkillsSection from "../components/SkillsSection";
import AboutHeroSection from "../components/AboutHeroSection";
import AboutEducationSection from "../components/AboutEducationSection";
const AboutPage = () => {
  return (
    <div className="pb-20">
      <section>
      <AboutHeroSection />
      </section>
      
      <section>
        <AboutEducationSection />
      </section>

      <br />
      <br />
      <br />

      <section>
        <SkillsSection />
      </section>
      
      <br />
      <br />
      <br />
    </div>
  );
};

export default AboutPage;

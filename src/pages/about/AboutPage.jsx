import React from "react";
import AboutSkillsSection from "./SkillsSection";
import AboutHeroSection from "./HeroSection";
import AboutEducationSection from "./EducationSection";
import Footer from "../../components/misc/Footer";

const AboutPage = () => {
  return (
    <div>
      <AboutHeroSection />
      <AboutSkillsSection />
      <AboutEducationSection />
      <Footer />
    </div>
  );
};

export default AboutPage;

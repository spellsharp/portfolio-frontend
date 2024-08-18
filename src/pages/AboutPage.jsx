import React from "react";
import SkillsSection from "../components/AboutSkillsSection";
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
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default AboutPage;

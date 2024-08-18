import React from "react";
import SkillsSection from "../components/SkillsSection";
import TimeLine from "../components/TimeLine";
import timelineData from "../content/timeline.json";
import AboutHeroSection from "../components/AboutHeroSection";

const AboutPage = () => {
  return (
    <div className="pb-20">
      <section>
      <AboutHeroSection />
      </section>
      <section className="bg-section py-10">
        <SkillsSection />
      </section>
      <br />
      <br />
      <br />
      <section>
        <TimeLine data={timelineData} />
      </section>
      <br />
      <br />
      <br />
    </div>
  );
};

export default AboutPage;

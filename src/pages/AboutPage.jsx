import React from "react";
import About from "../assets/sharan_mic.jpg";
import SkillsSection from "../components/SkillsSection";
import TimeLine from "../components/TimeLine";
import aboutData from "../content/about.json";
import timelineData from "../content/timeline.json";
import ImageBlob from "../components/ImageBlob";

const AboutPage = () => {
  return (
    <div className="pb-20">
      <section className="flex min-h-screen items-center justify-center">
        <div className="bg-default px-10 min-h-[80vh]">
          <div className="mx-auto max-w-5xl py-20">
            <div className="flex md:flex-col sm:flex-col flex-col lg:flex-row justify-between lg:space-x-20 md:space-x-10 sm:space-x-10 space-x-10 mx-auto">
              <div className="h-auto w-auto py-5 mx-auto">
                <ImageBlob src={About} />
              </div>
              <div className="mx-auto">
                <br />
                <div className="flex flex-col space-y-2 lg:max-w-7xl sm:max-w-full lg:text-lg md:text-md md:max-w-4xl sm:text-md sm:-ml-10 -ml-10 text-md ">
                  {aboutData.map((data, index) => {
                    return (
                      <div key={index}>
                        <div>{data}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
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

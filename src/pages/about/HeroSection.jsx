import React, { useEffect, useState } from 'react';
import '../../styles/Parallax.css';
import aboutData from '../../content/about.json';
import Typewriter from 'typewriter-effect';

const HeroSection = () => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setData(aboutData.default);
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <section className="flex items-center lg:justify-center md:justify-center sm:justify-start justify-start parallax parallax1">
        <div className="mx-5">
          <br />
          <div className={`lg:w-[1000px] md:w-[700px] sm:w-[${width}px] w-[${width}px] flex flex-col justify-start space-y-4 lg:max-w-6xl sm:max-w-full lg:text-lg md:text-md md:max-w-4xl sm:text-md text-md`}>
            <div>
              <div className="text-3xl font-semibold lg:text-5xl md:text-5xl sm:text-4xl py-2">
                Hey! I'm Sharan
              </div>
              <div className="text-xl font-semibold lg:text-2xl md:text-3xl sm:text-2xl pt-5">
                I'm just
                <span className="lg:text-5xl md:text-5xl sm:text-3xl text-3xl text-blue-500">
                  <Typewriter
                    options={{
                      strings: [
                        "an ENGINEER.",
                        "an ML Enthusiast.",
                        "a DATA SCIENTIST.",
                        "a SINGER.",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </div>
            </div>
            {data.map((text, index) => (
              <div key={index}>
                <div>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
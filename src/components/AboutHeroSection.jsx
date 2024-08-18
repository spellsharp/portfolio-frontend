import React, { useEffect, useState } from 'react';
import '../styles/Parallax.css';
import aboutData from '../content/about.json';

const Parallax = () => {
  const [data, setData] = useState([]);
  const [animatedText, setAnimatedText] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [displayInterval, setDisplayInterval] = useState();

  const updateDataBasedOnWidth = () => {
    if (window.innerWidth <= 400) {
      setData(aboutData.xs);
      setWidth(window.innerWidth);
      console.log(width);
      setDisplayInterval(10);
    }
    else if (window.innerWidth <= 760) {
      setData(aboutData.sm);
      setWidth(window.innerWidth);
      console.log(width);
      setDisplayInterval(10);
    } else {
      setData(aboutData.lg);
      setWidth(window.innerWidth);
      console.log(width);
      setDisplayInterval(1);
    }
  };

  useEffect(() => {
    updateDataBasedOnWidth();
    window.addEventListener('resize', updateDataBasedOnWidth);
    return () => {
      window.removeEventListener('resize', updateDataBasedOnWidth);
    };
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setAnimatedText([]);
      data.forEach((item, index) => {
        let text = '';
        let charIndex = 0;
        const interval = setInterval(() => {
          text += item[charIndex];
          setAnimatedText((prev) => {
            const newAnimatedText = [...prev];
            newAnimatedText[index] = text;
            return newAnimatedText;
          });
          charIndex++;
          if (charIndex === item.length) {
            clearInterval(interval);
          }
        }, displayInterval);
      });
    }
  }, [data]);

  return (
    <div>
      <section className="flex items-center lg:justify-center md:justify-center sm:justify-start justify-start parallax parallax1 lg:pt-0 md:pt-0 sm:pt-48">
        <div className="mx-5">
          <br />
          <div className={`h-[500px] lg:w-[1000px] md:w-[700px] sm:w-[${width}px] w-[${width}px] flex flex-col justify-start space-y-4 lg:max-w-6xl sm:max-w-full lg:text-lg md:text-md md:max-w-4xl sm:text-md text-md`}>
            <h1 className="lg:text-4xl md:text-2xl sm:text-2xl text-2xl font-medium pt-10 lg:pb-10 md:pb-10 sm:pb-2 pb-2">
              About me
            </h1>
            {animatedText.map((text, index) => (
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

export default Parallax;
import React, { useEffect, useState } from 'react';
import '../styles/Parallax.css';
import aboutData from '../content/about.json';
import Name from '../components/Name';

const Parallax = () => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [displayInterval, setDisplayInterval] = useState();

  const adjustAccWidth = () => {
    if (window.innerWidth <= 400) {
      setWidth(window.innerWidth);
      console.log(width);
      setDisplayInterval(10);
    }
    else if (window.innerWidth <= 760) {
      setWidth(window.innerWidth);
      console.log(width);
      setDisplayInterval(10);
    } else {
      setWidth(window.innerWidth);
      console.log(width);
      setDisplayInterval(1);
    }
  };

  useEffect(() => {
    setData(aboutData.default);
    adjustAccWidth();
    window.addEventListener('resize', adjustAccWidth);
    return () => {
      window.removeEventListener('resize', adjustAccWidth);
    };
  }, []);

  return (
    <div>
      <section className="flex items-center lg:justify-center md:justify-center sm:justify-start justify-start parallax parallax1 lg:pt-0 md:pt-0 sm:pt-48">
        <div className="mx-5">
          <br />
          <div className={`lg:w-[1000px] md:w-[700px] sm:w-[${width}px] w-[${width}px] flex flex-col justify-start space-y-4 lg:max-w-6xl sm:max-w-full lg:text-lg md:text-md md:max-w-4xl sm:text-md text-md`}>
            <div>
            <Name />
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

export default Parallax;
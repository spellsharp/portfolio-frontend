import React from 'react';
import '../styles/Parallax.css';
import aboutData from '../content/about.json';

const Parallax = () => {
  return (
    <div>
      <section className="flex items-center justify-center parallax parallax1">
        <div className="mx-5">
            <br />
            <div className="flex flex-col space-y-4 lg:max-w-6xl sm:max-w-full lg:text-lg md:text-md md:max-w-4xl sm:text-md text-md ">
                <h1 className="lg:text-4xl md:text-2xl sm:text-2xl text-2xl font-medium">
                    About me
                </h1>
                {aboutData.map((data, index) => {
                    return (
                        <div key={index}>
                        <div>{data}</div>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Parallax;
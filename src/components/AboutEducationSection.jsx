// import React, { useEffect, useState } from 'react';
import '../styles/Parallax.css';
import TimeLine from '../components/TimeLine'
import timelineData from '../content/timeline.json';

const Parallax = () => {
  return (
    <section className="flex flex-col items-center lg:justify-center md:justify-center sm:justify-start justify-start parallax parallax2">
        <TimeLine data={timelineData} />
    </section>
  );
};

export default Parallax;
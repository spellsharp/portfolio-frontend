// import React, { useEffect, useState } from 'react';
import '../styles/Parallax.css';
import SkillTiles from './SkillTiles'

const Parallax = () => {
  return (
    <div className='flex items-center justify-center'>
    <section className="flex flex-col items-start lg:justify-center md:justify-center sm:justify-start justify-start parallax parallax3">
        <SkillTiles />
    </section>
    </div>
  );
};

export default Parallax;
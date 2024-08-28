// import React, { useEffect, useState } from 'react';
import '../styles/Parallax.css';
import SkillTiles from './SkillTiles'
import { FaArrowRight } from 'react-icons/fa';

const Parallax = () => {
  return (
    <div className='flex items-center justify-center pt-28'>
    <section className="flex flex-col items-start lg:justify-center md:justify-center sm:justify-start justify-start parallax parallax3">
        <SkillTiles />
        <a href='/projects' className='flex space-x-2 items-center justify-center hover:scale-105 hover:text-blue-500 transition-all duration-500'>
          <div>Check out my projects</div>
          <FaArrowRight size={20} />
        </a>
    </section>
    </div>
  );
};

export default Parallax;
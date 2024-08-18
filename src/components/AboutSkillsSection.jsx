// import React, { useEffect, useState } from 'react';
import '../styles/Parallax.css';
import SkillTiles from './SkillTiles'

const Parallax = () => {
  return (
    <section className="flex flex-col items-center lg:justify-center md:justify-center sm:justify-start justify-start parallax parallax3">
        <SkillTiles />
    </section>
  );
};

export default Parallax;
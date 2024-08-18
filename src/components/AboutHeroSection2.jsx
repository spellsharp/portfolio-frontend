import React from 'react';
import { Parallax } from 'react-parallax';
import Sharan from '../assets/about_collage.png';

const AboutHeroSection = () => {
  return (
    <div>
      <Parallax bgImage={Sharan} strength={500}>
        <div className='h-[50vh]'>
          <h1>
            
          </h1>
        </div>
      </Parallax>
      <div style={{ height: '500px', padding: '50px' }}>
        <h1>Regular Content Section</h1>
        <p>This is some regular content below the parallax section.</p>
      </div>
    </div>
  );
};

export default AboutHeroSection;

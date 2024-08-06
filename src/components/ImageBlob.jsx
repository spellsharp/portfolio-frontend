import React, { useState, useEffect } from 'react';
import '../styles/ImageBlob.css'; // Import the CSS file

const ImageBlob = ({ src }) => {
  const [coordinates, setCoordinates] = useState('50% 50% 50% 50% / 50% 50% 50% 50%');

  const random = (min, max) => Math.floor(min + Math.random() * (max - min));
  const remain = (n) => 100 - n;

  useEffect(() => {
    let r = [];
    for (let i = 0; i < 4; i++) {
      let n = random(0, 100);
      r.push(n);
      r.push(remain(n));
    }

    let newCoordinates = `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[6]}% ${r[7]}% ${r[5]}%`;
    setCoordinates(newCoordinates);
  }, []);

  return (
    <>
      <div
        id="blob"
        className="blob-container lg:h-[350px] lg:w-[350px] md:h-[400px] md:w-[400px] sm:h-[250px] sm:w-[250px] h-[300px] w-[300px] shadow-[0_0_25px_1px_rgba(59,130,246,0.60)]"
        style={{ 
          borderRadius: coordinates,
        }}
      >
        <div
          style={{
            backgroundImage: `url(${src})`,
            height: '100%',
            width: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
      </div>
    </>
  );
};

export default ImageBlob;

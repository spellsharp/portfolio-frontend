import React, { useState, useEffect } from 'react';
import '../styles/ImageBlob.css'; // Import the CSS file

const ImageBlob = ({ src, imgsize=200 }) => {
  const [rotation, setRotation] = useState(0);
  const [coordinates, setCoordinates] = useState('50% 50% 50% 50% / 50% 50% 50% 50%');

  const random = (min, max) => Math.floor(min + Math.random() * (max - min));
  const remain = (n) => 100 - n;

  const createBlob = () => {
    setRotation(rotation + 40);

    let r = [];
    for (let i = 0; i < 4; i++) {
      let n = random(0, 100);
      r.push(n);
      r.push(remain(n));
    }

    let newCoordinates = `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}% / ${r[4]}% ${r[6]}% ${r[7]}% ${r[5]}%`;
    setCoordinates(newCoordinates);
  };

  useEffect(() => {
    createBlob();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="container">
      <div
        id="blob"
        className={`blob-container h-[${imgsize}px] w-[${imgsize}px] shadow-[0_0_25px_1px_rgba(59,130,246,0.60)]`}
        style={{ borderRadius: coordinates }}
      >
        <div
          style={{
            backgroundImage: `url(${src})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ImageBlob;

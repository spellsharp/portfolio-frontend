import React from 'react'
import Typewriter from "typewriter-effect/";
import { useEffect, useState } from "react";

const Name = () => {
    const [isHovered, setIsHovered] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsHovered(false);
        }, 200);
    }, []);

  return (
    <>
    <div className="text-3xl font-semibold lg:text-5xl md:text-5xl sm:text-4xl py-2">
        Hey! I'm Sharan
    </div>
    <div className="text-xl font-semibold lg:text-2xl md:text-3xl sm:text-2xl pt-5">
        I'm just
        <span className="lg:text-5xl md:text-5xl sm:text-3xl text-3xl text-blue-500">
        <Typewriter
            options={{
            strings: [
                "an ENGINEER.",
                "an ML Enthusiast.",
                "a DATA SCIENTIST.",
                "a SINGER.",
            ],
            autoStart: true,
            loop: true,
            }}
        />
        </span>
    </div>
    </>
  )
}

export default Name
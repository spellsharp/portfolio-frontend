import React from "react";

import { Tilt } from "react-tilt";

const ProjectCard = ({ image, title, description, date }) => {
  return (
    <Tilt>
      <div className="relative rounded-md overflow-hidden border border-white border-opacity-10 shadow-black shadow-lg">
        <img
          className="h-80 rounded-md w-full z-10"
          src={image}
          alt="placeholder"
        />
        <div className="absolute bottom-0 flex-col text-left w-full bg-[#292929b0] p-5 transform transition-all duration-300 opacity-100">
          <h1 className="text-white text-xl font-medium">{title}</h1>
          <p className="text-slate-300">{description}</p>
          <p className="text-white text-sm font-medium">{date}</p>
        </div>
      </div>
    </Tilt>
  );
};

export default ProjectCard;

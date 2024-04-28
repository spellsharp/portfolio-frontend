import React from "react";
import ReactCardFlip from "react-card-flip";
import { Tilt } from "react-tilt";

const ProjectCardFront = ({ image, title, description, date }) => {
  return (
    <Tilt>
      <div className="relative rounded-md overflow-hidden border border-white border-opacity-10 shadow-black shadow-lg">
        <img
          className="h-80 rounded-md w-full z-10"
          src={image}
          alt="placeholder"
        />
        <div className="absolute bottom-0 pt-10 flex-col text-left w-full bg-[#292929b0] p-5 transform transition-all duration-300 opacity-100">
          <h1 className="text-white text-xl font-medium">{title}</h1>
        </div>
      </div>
    </Tilt>
  );
};

const ProjectCardBack = ({
  title,
  description,
  date,
  techStack,
  github,
  link,
}) => {
  return (
    <Tilt>
      <div className="h-80 rounded-md overflow-hidden border border-white border-opacity-10 shadow-black shadow-lg">
        <div className="bg-[#292929b0] p-5 h-full flex flex-col justify-between">
          <h1 className="text-white text-xl font-medium">{title}</h1>
          <p className="text-slate-300">{description}</p>

          <br />
          <p className="text-white text-sm font-medium">{date}</p>
          <p className="text-white text-sm font-medium">
            Tech Stack: {techStack}
          </p>
          <div className="flex justify-between mt-5">
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="text-white font-medium text-center hover:bg-blue-500 hover:bg-opacity-10 hover:shadow-[0_0_15px_1px_rgba(59,130,246,0.30)] rounded-full p-1 transition-all duration-300 ease-in-out"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

const ProjectCard = ({ project }) => {
  const { image, title, description, date, techStack, github } = project;

  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div onClick={() => setIsFlipped(!isFlipped)} className="cursor-pointer">
        <ProjectCardFront
          image={image}
          title={title}
          description={description}
          date={date}
        />
      </div>
      <div onClick={() => setIsFlipped(!isFlipped)} className="cursor-pointer">
        <ProjectCardBack
          title={title}
          description={description}
          date={date}
          techStack={techStack}
          github={github}
        />
      </div>
    </ReactCardFlip>
  );
};

export default ProjectCard;

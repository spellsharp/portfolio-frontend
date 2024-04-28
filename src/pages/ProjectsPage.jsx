import React from "react";
import ProjectCard from "../components/ProjectCard";
import Lane from "../assets/lane_detection.jpeg";
import Garbage from "../assets/garbage_classification.png";
import NumberPlate from "../assets/anpr.jpeg";
import Academize from "../assets/academize.jpeg";
import Trasheroo from "../assets/trasheroo.png";
import HVM from "../assets/hvm.png"

const ProjectsPage = () => {
  const projects = [
    {
      title: "Number Plate Recognition",
      date: "Present",
      description: "A number plate recognition system that recognizes number plates from images using object detection, GAN enhancement and OCR.",
      image: NumberPlate,
      techStack: "OpenCV, YOLO, Tesseract, GANs",
      // github: "",
    },
    {
      title: "Autonomous Driver Assistance",
      date: "April 2024",
      description: "A driver assistance system containing lane detection, object detection, drowsy driver, and collision warning.",
      image: Lane,
      techStack: "OpenCV, YOLO, Tesseract, GANs",
      github: "https://github.com/spellsharp/Synapse2.0",
    },
    {
      title: "Garbage Classification",
      date: "April 2024",
      description: "A garbage classification system that classifies garbage into a number of categories.",
      image: Garbage,
      techStack: "OpenCV, YOLO, PyTorch",
    },
    {
      title: "Hospital Visitor Management",
      date: "October 2023",
      description: "Made a visitor management system for AIMS Hospital, Kochi.",
      image: HVM,
      techStack: "React, Node.js, Django",
      github: "https://github.com/spellsharp/HVM_Backend",
    },
    {
      title: "Trasheroo",
      date: "March 2023",
      description: "A mobile app that enables users to volunteer for garbage collection drives.",
      image: Trasheroo,
      techStack: "Flutter, Firebase",
      github: "https://github.com/spellsharp/Trasheroo"
    },
    {
      title: "Academize",
      date: "February 2023",
      description: "A platform that helps teachers keep track of their students' academic progress.",
      image: Academize,
      github: "https://github.com/spellsharp/progress_tracker",
      techStack: "React, Node.js, Django"
    }
  ];
  // const { image, title, description, date, techStack, github, link } = project;
  return (
    <div className="min-h-[76vh] max-w-6xl mx-auto mt-10 p-4">
        <h1 className="lg:text-4xl md:text-2xl sm:text-2xl text-2xl font-medium">
          Projects
        </h1>
        
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id}>
              <ProjectCard
                project={project}
              />
            </div>
          ))}
        </div>
        <br />
        <br />
      </div>
  );
};

export default ProjectsPage;

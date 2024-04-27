import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const ExtracurricularsPage = ({ tag = "Music" }) => {
  const [extracurriculars, setExtracurriculars] = useState([]);
  useEffect(() => {
    const getExtracurriculars = () => {
      const url = "http://localhost:8000/api/extracurricular/?tags=" + tag;
      axios.get(url).then((response) => {
        setExtracurriculars(response.data);
        console.log(response.data);
      });
    };

    getExtracurriculars();
  }, [tag]);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 p-4">
        <h1 className="text-white lg:text-4xl mb-5 md:text-2xl sm:text-xl font-medium">
          Extracurriculars
        </h1>
        <div className="mb-16 text-white lg:text-xl md: text-sm sm:text-xs">
          Category:
          <span className="ml-3 text-gray-950 font-medium lg:text-xl p-2 border border-white w-fit rounded-full bg-gray-200">
            {tag}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {extracurriculars.map((extracurricular) => (
            <div key={extracurricular.id}>
              <ProjectCard
                image={extracurricular.image}
                title={extracurricular.title}
                description={extracurricular.description}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExtracurricularsPage;

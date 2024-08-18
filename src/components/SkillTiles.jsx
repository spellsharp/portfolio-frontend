import React from "react";
import {
  NextjsOriginal,
  FigmaOriginal,
  TailwindcssOriginal,
  Css3Original,
  JavascriptOriginal,
  PytorchOriginal,
  TensorflowOriginal,
  FlaskOriginal,
  PythonOriginal,
  DjangoPlain,
  ReactOriginal,
  PandasOriginal,
  NumpyOriginal,
  KerasOriginal,
  ScikitlearnOriginal,
  OpencvOriginal,
} from "devicons-react";

import { Tilt } from "react-tilt";

const skillData = [
  {
    type: "Machine Learning",
    icons: [
      {
        name: "PyTorch",
        icon: <PytorchOriginal size={100} />,
        level: 5,
      },
      {
        name: "Pandas",
        icon: <PandasOriginal size={100} />,
        level: 8,
      },
      {
        name: "Numpy",
        icon: <NumpyOriginal size={100} />,
        level: 7,
      },
      {
        name: "Scikit-learn",
        icon: <ScikitlearnOriginal size={100} />,
        level: 8,
      },
      {
        name: "OpenCV",
        icon: <OpencvOriginal size={100} />,
        level: 3,
      }
    ],
  },
  {
    type: "Frontend",
    icons: [
      {
        name: "ReactJS",
        icon: <ReactOriginal size={100} />,
        level: 7,
      },
      {
        name: "JavaScript",
        icon: <JavascriptOriginal size={100} />,
        level: 3,
      },
      {
        name: "CSS",
        icon: <Css3Original size={100} />,
        level: 9,
      },
      {
        name: "TailwindCSS",
        icon: <TailwindcssOriginal size={100} />,
        level: 9,
      },
      {
        name: "NextJS",
        icon: <NextjsOriginal size={100} />,
        level: 6,
      },
      {
        name: "Figma",
        icon: <FigmaOriginal size={100} />,
        level: 8,
      },
    ],
  },
  {
    type: "Backend",
    icons: [
      {
        name: "Python",
        icon: <PythonOriginal size={100} />,
        level: 8,
      },
      {
        name: "Django",
        icon: <DjangoPlain color="green" size={100} />,
        level: 7,
      },
      {
        name: "Flask",
        icon: <FlaskOriginal size={100} />,
        level: 4,
      },
    ],
  },
];

const levelToColor = {
  1: "239,68,68,0.3",
  2: "239,68,68,0.3",
  3: "239,68,68,0.3",
  4: "234,179,8,0.3",
  5: "234,179,8,0.3",
  6: "234,179,8,0.3",
  7: "34,197,94,0.3",
  8: "34,197,94,0.3",
  9: "34,197,94,0.3",
  10: "34,197,94,0.3"
}

const SkillTiles = () => {
  return (
    <div>
      <div className="min-h-[100vh] px-10 pt-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex lg:justify-start md:justify-start justify-center lg:text-4xl md:text-2xl sm:text-2xl text-2xl font-medium">
            Skills & Interests
          </div>
          <div className="pt-4 flex space-x-5">
            <div className="flex space-x-2 justify-start items-center">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div>Beginner</div>
            </div>
            <div className="flex space-x-2 justify-start items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div>Intermediate</div>
            </div>
            <div className="flex space-x-2 justify-start items-center">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>Proficient</div>
            </div>
          </div>
          <div className="pt-2">
            {skillData.map((skillGroup, index) => (
              <>
                <br />
                <br />
                <div className="text-xl">{skillGroup.type}</div>
                <br />
                <div
                  className="grid grid-cols-2 text-red-500 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                  key={index}
                >
                  {skillGroup.icons.map((skill, index) => (
                    <Tilt>
                      <div
                        className={`bg-default shadow-[0_0_15px_1px_rgba(0,0,0,1)] hover:shadow-[0_0_15px_1px_rgba(${levelToColor[skill.level]})] transition-all duration-350 ease-in-out rounded-lg p-2 w-fit h-fit`}
                        key={index}
                        title={skill.name}
                      >
                        {skill.icon}
                      </div>
                    </Tilt>
                  ))}
                </div>
              </>
            ))}
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default SkillTiles;

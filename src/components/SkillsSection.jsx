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
} from "devicons-react";

import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: true, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const skillData = [
  {
    type: "Frontend",
    icons: [
      {
        name: "ReactJS",
        icon: <ReactOriginal size={100} />,
      },
      {
        name: "JavaScript",
        icon: <JavascriptOriginal size={100} />,
      },
      {
        name: "CSS",
        icon: <Css3Original size={100} />,
      },
      {
        name: "TailwindCSS",
        icon: <TailwindcssOriginal size={100} />,
      },
      {
        name: "NextJS",
        icon: <NextjsOriginal size={100} />,
      },
      {
        name: "Figma",
        icon: <FigmaOriginal size={100} />,
      },
    ],
  },
  {
    type: "Backend",
    icons: [
      {
        name: "Python",
        icon: <PythonOriginal size={100} />,
      },
      {
        name: "Django",
        icon: <DjangoPlain color="green" size={100} />,
      },
      {
        name: "Flask",
        icon: <FlaskOriginal size={100} />,
      },
    ],
  },
  {
    type: "Machine Learning",
    icons: [
      {
        name: "Tensorflow",
        icon: <TensorflowOriginal size={100} />,
      },
      {
        name: "PyTorch",
        icon: <PytorchOriginal size={100} />,
      },
      {
        name: "Keras",
        icon: <KerasOriginal size={100} />,
      },
      {
        name: "Pandas",
        icon: <PandasOriginal size={100} />,
      },
      {
        name: "Numpy",
        icon: <NumpyOriginal size={100} />,
      },
    ],
  },
];

const SkillsSection = () => {
  return (
    <div>
      <div className="bg-default min-h-[80vh] px-10">
        <div className="mx-auto max-w-5xl">
          <div className="lg:text-4xl md:text-2xl sm:text-2xl text-2xl font-medium">
            Skills & Interests
          </div>
          <div className="pt-5">
            {skillData.map((skillGroup) => (
              <>
                <br />
                <br />
                <div className="text-xl">{skillGroup.type}</div>
                <br />
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                  key={skillGroup.type}
                >
                  {skillGroup.icons.map((skill) => (
                    <Tilt options={defaultOptions}>
                      <div
                        className="bg-default shadow-[0_0_15px_1px_rgba(59,130,246,0.30)] rounded-lg p-2 w-fit h-fit"
                        key={skill.name}
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

export default SkillsSection;

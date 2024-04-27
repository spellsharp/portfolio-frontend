import React from "react";
import NotFound from "../assets/not_found.svg";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex lg:flex-row md:flex-col sm:flex-col-reverse flex-col-reverse justify-center mx-auto max-w-7xl">
        <img src={NotFound} className="lg:h-screen md:h-[70vh]"></img>
        <div className="mx-auto my-auto px-10 py-10">
          <div className="lg:text-5xl md:text-5xl sm:text-3xl text-3xl font-bold">
            Oops!
          </div>
          <div className="lg:text-3xl md:text-3xl sm:text-lg text-lg">
            You must have fallen into a wormhole...
          </div>
          <br />
          <div className="lg:text-xl md:text-xl sm:texl-sm text-sm">
            Let's go back{" "}
            <a href="/">
              <button className="ml-2 shadow-[0_0_15px_1px_rgba(59,130,246,0.60)] p-3 rounded-xl border border-white hover:bg-blue-500 hover:border-opacity-0 hover:transition-all duration-500 ease-in-out">
                home
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;

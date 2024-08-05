import Typewriter from "typewriter-effect/";
import Sharan from "../assets/sharan.jpg";
import DownloadCV from "../services/DownloadCV";
import ImageBlob from "../components/ImageBlob";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsHovered(false);
    }, 200);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <section className="flex drop-shadow-lg mt-20">
          <div className="flex flex-col-reverse lg:flex-row sm:flex-col-reverse md:flex-col-reverse mx-auto items-center lg:space-x-48 md:space-x-20">
            <div className="lg:text-left md:text-center sm:text-center text-center px-5">
              <div className="text-2xl lg:text-3xl md:text-3xl sm:text-2xl mt-10">
                Hey there!
              </div>
              <br />
              <div className="text-3xl font-semibold lg:text-5xl md:text-5xl sm:text-4xl py-2">
                You're looking at
              </div>
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="text-4xl lg:text-6xl md:text-6xl sm:text-4xl font-bold text-blue-500">
                  Shri
                  <span
                    className={`${
                      isHovered ? "text-blue-400" : ""
                    } transition-all duration-500 ease-in-out`}
                  >
                    sharan
                  </span>
                  yan
                </div>
                <div className="text-4xl lg:text-6xl md:text-6xl sm:text-4xl font-bold text-blue-500">
                  Vasu
                </div>
              </div>

              <div className="text-xl font-semibold lg:text-2xl md:text-3xl sm:text-2xl pt-5">
                I'm just
                <span className="lg:text-5xl md:text-5xl sm:text-3xl text-3xl text-blue-500">
                  <Typewriter
                    options={{
                      strings: [
                        "an ENGINEER.",
                        "an ML student.",
                        "a SINGER.",
                        "a GAMER.",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </div>
              <div className="flex flex-col justify-center lg:justify-start lg:flex-row md:flex-row sm:flex-col py-5">
                <button
                  onClick={() => DownloadCV()}
                  className="sm:mx-auto lg:mx-0 md:mx-0 mx-auto lg:p-3 lg:text-xl md:p-2 md:text-2xl sm:p-2 sm:text-xl max-w-fit p-2 text-xl shadow-[0_0_15px_1px_rgba(59,130,246,0.60)] border bg-blue-500 rounded-md border-white bg-opacity-0 lg:border-opacity-100 hover:bg-blue-500 hover:border-opacity-0 hover:transition-all duration-500 ease-in-out"
                >
                  Curriculum Vitae
                </button>
              </div>
            </div>
            <div className="flex mx-auto">
              <div>
                <ImageBlob src={Sharan} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full">
          <Footer />
      </div>
    </>
  );
};

export default HomePage;

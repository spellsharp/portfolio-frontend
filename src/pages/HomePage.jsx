import Sharan from "../assets/sharan_mic.jpg";
import ImageBlob from "../components/ImageBlob";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-2">
        <section className="flex drop-shadow-lg mt-20">
          <div className="flex flex-col lg:flex-row sm:flex-col md:flex-col mx-auto items-center lg:space-x-12 md:space-x-12 sm:space-x-0 space-x-0">
            <div className="w-auto">
              <div className="mx-auto lg:px-32 md:px-32 sm:px-0 px-0">
                <ImageBlob src={Sharan} />
              </div>
            </div>
            <div className="lg:text-left md:text-center sm:text-center text-center px-5">
              <br />
              <div className="lg:text-6xl md:text-6xl sm:text-2xl text-2xl font-semibold mb-2">Welcome to my Portfolio</div> 
              <div className="lg:text-2xl md:text-2xl sm:text-sm text-sm lg:max-w-3xl md:max-w-2xl sm:max-w-xs max-w-xs">I'm a passionate student of ML & Data Science. But I also delve in web development. This is one such side-quest ;)</div>
              <div className="flex flex-col justify-center lg:justify-start lg:flex-row md:flex-row sm:flex-col py-5">
                <a
                  href="/about"
                  className="sm:mx-auto lg:mx-0 md:mx-0 mx-auto lg:p-4 lg:text-xl md:p-4 md:text-2xl sm:p-3 sm:text-xl max-w-fit p-3 text-xl shadow-[0_0_15px_1px_rgba(59,130,246,0.60)] border bg-blue-500 rounded-md border-white bg-opacity-0 lg:border-opacity-100 hover:bg-blue-500 hover:border-opacity-0 hover:transition-all duration-500 ease-in-out"
                >
                  About me
                </a>
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

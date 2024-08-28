import React from "react";
import Collaborate from "../../assets/contact/collaboration.svg";
import Footer from "../../components/misc/Footer";

import SocialMediaHandles from "../../components/contact/SocialMediaHandles";

const ContactPage = () => {
  return (
    <>
    <div className="min-h-screen flex lg:flex-row lg:space-x-5 md:flex-col md:space-y-3 sm:flex-col sm:space-y-3 flex-col space-y-3 justify-center items-center">
      <div className="mt-20 flex flex-col text-center lg:text-5xl md:text-5xl sm:text-3xl text-3xl items-center max-w-3xl">
        <div className="font-semibold">Let's work on something together!</div>
        <img src={Collaborate} alt="Collaborate" className="lg:w-1/2 md:w-1/2 sm:w-full" />
      </div>
      <SocialMediaHandles />
    </div>
    <Footer />
  </>
  );
};

export default ContactPage;

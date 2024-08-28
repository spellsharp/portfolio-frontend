import React from "react";
import Collaborate from "../../assets/contact/collaboration.svg";

import ContactSocialMediaHandles from "../../components/contact/ContactSocialMediaHandles";

const ContactPage = () => {
  return (
    <>
    <div className="min-h-screen flex lg:flex-row lg:space-x-5 md:flex-col md:space-y-3 sm:flex-col sm:space-y-3 flex-col space-y-3 justify-center items-center">
      <div className="mt-20 flex flex-col text-center text-5xl items-center max-w-3xl">
        <div className="font-semibold">Let's work on something together!</div>
        <img src={Collaborate} alt="Collaborate" className="w-1/2" />
      </div>
      <ContactSocialMediaHandles />
    </div>
  </>
  );
};

export default ContactPage;

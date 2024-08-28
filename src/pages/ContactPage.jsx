import React from "react";
import { useState } from "react";
import Collaborate from "../assets/collaboration.svg";
import Footer from "../components/Footer";
import ContactSocialMediaHandles from "../components/ContactSocialMediaHandles";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you for contacting me! I will get back to you soon.");
    
  };

  return (
    <>
    <div className="min-h-screen mt-20 flex lg:flex-row lg:space-x-5 md:flex-col md:space-y-3 sm:flex-col sm:space-y-3 flex-col space-y-3 justify-center items-center">
      <div className="flex flex-col text-center text-5xl items-center max-w-3xl">
        <div className="font-semibold">Let's work on something together!</div>
        <img src={Collaborate} alt="Collaborate" className="w-1/2" />
      </div>
      <ContactSocialMediaHandles />
    </div>
    <section>
      <Footer />
    </section>
  </>
  );
};

export default ContactPage;

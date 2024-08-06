import React from "react";
import { useState } from "react";
import Collaborate from "../assets/collaboration.svg";

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
    <div className="min-h-screen mt-20 flex lg:flex-row lg:space-x-5 md:flex-col md:space-y-3 sm:flex-col sm:space-y-3 flex-col space-y-3 justify-center items-center">
      <div className="flex flex-col text-center text-5xl items-center pt-20 max-w-3xl">
        <div className="font-semibold">Let's work on something together!</div>
        <img src={Collaborate} alt="Collaborate" className="w-1/2" />
      </div>
      <div>
        <form className="max-w-2xl mx-auto border border-white border-opacity-10 p-10 rounded-xl m-2 shadow-[0_0_15px_1px_rgba(59,130,246,0.60)]">
          <div className="text-4xl font-semibold w-full mx-auto text-center">
            Contact me!
          </div>
          <br />
          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-medium text-white"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-4 py-2 bg-default border border-white border-opacity-10 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-2 bg-default border border-white border-opacity-10 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-lg font-medium text-white"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 border border-white border-opacity-10 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-default"
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message"
              required
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
              }}
            ></textarea>
          </div>
          <div className="w-full text-center">
            <button
              onSubmit={() => handleSubmit()}
              className="p-2 text-sm max-w-fit border bg-blue-500 rounded-md border-white bg-opacity-0 hover:bg-blue-500 hover:border-opacity-0 hover:transition-all duration-500 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
        <br />
        <br />
      </div>
    </div>
  );
};

export default ContactPage;

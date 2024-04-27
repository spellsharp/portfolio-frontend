import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/SharanLogo.png";
import { Link } from "react-router-dom";
import DownloadCV from "../services/DownloadCV";

export const navLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/about",
    title: "About",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "wormhole",
    title: "Wormhole"
  }
];

const Navbar = () => {
  const [active, setActive] = useState();
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="bg-default text-white font-bold w-full flex py-6 justify-between items-center navbar">
      <div>
        <div className="ml-5 lg:text-6xl md:text-6xl sm:text-4xl text-4xl font-bold flex items-center">
          <img src={Logo} alt="Logo" className="lg:w-16 lg:h-14 md:w-16 md:h-14 sm:w-14 sm:h-12 h-14 w-12  mb-1 -mr-1" />
          haran<span className="ml-1 text-blue-500">.</span>
        </div>
      </div>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-xl hover:underline hover:shadow-[0_0_15px_1px_rgba(59,130,246,0.30)] hover:bg-blue-500 hover:bg-opacity-20 rounded-full underline-offset-4 transition-all ease-in-out duration-500 ${
              active === nav.title ? "text-underline" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-5" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className="sm:hidden md:hidden flex flex-1 justify-end items-center px-1">
        <FaBars
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        <div
          className={`${
            !toggle
              ? "hidden"
              : "flex bg-default bg-opacity-95 shadow-2xl border border-white border-opacity-10 z-10"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 w-fit rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

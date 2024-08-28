import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UnderlineLink = styled.a`
  display: inline-block;
  position: relative;
  text-decoration: none;
  color: white;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

export const navLinks = [
  {
    id: "/",
    title: "Home",
    target: "_self"
  },
  {
    id: "/about",
    title: "About",
    target: "_self"
  },
  {
    id: "/projects",
    title: "Projects",
    target: "_self"
  },
  {
    id: "/contact",
    title: "Contact",
    target: "_self"
  },
  {
    id: "/wormhole",
    title: "Wormhole",
    target: "_self"
  },
  {
    id: "https://www.overleaf.com/read/tzrpndxvfxzk#b7e43f",
    title: "Resume",
    target: "_blank"
  }
];

const Navbar = () => {
  const [active, setActive] = useState();
  const [toggle, setToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 865;

  return (
    <nav className="absolute top-0 text-white font-bold w-full flex py-6 justify-between items-center navbar">
      <div>
        <Link to="/" className="nav-link">
          <div className="ml-5 lg:text-5xl md:text-5xl sm:text-4xl text-4xl font-bold flex items-center tracking-wide">
            Sharan<span className="ml-1 text-blue-500">.</span>
          </div>
        </Link>
      </div>
      {isMobile ? (
        <FaBars
          className="w-[35px] h-[33px] pr-4 object-contain"
          onClick={() => setToggle(!toggle)}
        />
      ) : (
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-xl hover:underline hover:shadow-[0_0_15px_1px_rgba(59,130,246,0.30)] hover:bg-blue-500 hover:bg-opacity-20 rounded-full underline-offset-4 transition-all ease-in-out duration-500 ${
                active === nav.title ? "text-underline" : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-5 hover:shadow-[0_0_15px_1px_rgba(59,130,246,0.30)] hover:bg-blue-500" : "mr-10"}`}
              onClick={() => {setActive(nav.title); setToggle(!toggle)}}
            >
              <UnderlineLink className="hover:scale-x-110 duration-500 transition-all" target={nav.target} href={`${nav.id}`}>{nav.title}</UnderlineLink>

            </li>
          ))}
        </ul>
      )}
      {isMobile && toggle && (
        <div
          className={`flex bg-default bg-opacity-95 shadow-[0_0_15px_1px_rgba(59,130,246,0.3)] border border-white border-opacity-10 z-10 px-10 py-5 bg-black-gradient absolute top-20 right-0 mx-4 my-2 w-fit rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-center items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-medium cursor-pointer text-md ${
                  active === nav.title ? "underline" : ""
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => {setActive(nav.title); setToggle(!toggle)}}
              >
                <Link to={`${nav.id}`} className="nav-link">
                {`${nav.title}`}
                </Link>

              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

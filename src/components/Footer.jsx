import { Footer } from "flowbite-react";
import {
  BsDiscord,
  BsGithub,
  BsInstagram,
  BsTelegram,
  BsTwitter,
} from "react-icons/bs";
import Logo from "../assets/SharanLogo.png";

const FooterComponent = () => {
  return (
    <Footer container className="p-0">
      <div className="w-full bg-section p-5 h-fit border-t-2 border-blue-300 border-opacity-5">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <a href="/">
            <div className="text-xl font-bold flex">
              <img src={Logo} alt="Logo" className="w-6 h-6" />
              haran<span className="items-end ml-1 text-blue-500">.</span>
            </div>
          </a>
          <div className="mt-4 flex space-x-6 sm:mt-0 items-center text-3xl">
            <Footer.Icon className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out" href="https://discordapp.com/users/1037190174939037807" target='_blank' icon={BsDiscord} />
            <Footer.Icon className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out" href="https://instagram.com/ssv_myself" target="_blank" icon={BsInstagram} />
            <Footer.Icon className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out" href="https://twitter.com/shrisharanyan" target='_blank' icon={BsTwitter} />
            <Footer.Icon className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out" href="https://github.com/spellsharp" target="_blank"  icon={BsGithub} />
            <Footer.Icon className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out" href="https://t.me/ssv_myself" target="_blank" icon={BsTelegram} />
          </div>
        </div>
        <div className="w-full sm:flex sm:items-center sm:justify-between pt-5">
          <p>Made by Shrisharanyan Vasu</p>
          
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;

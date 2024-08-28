import { Footer } from "flowbite-react";
import {
  BsDiscord,
  BsGithub,
  BsInstagram,
  BsTelegram,
  BsTwitter,
  BsLinkedin,
} from "react-icons/bs";
import { FaKaggle } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Footer container className="p-0">
      <div className="w-full bg-section p-5 h-fit border-t-2 border-blue-300 border-opacity-5">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <a href="/">
            <div className="text-xl font-bold flex">
              Sharan<span className="items-end ml-1 text-blue-500">.</span>
            </div>
          </a>
          <div className="mt-4 flex space-x-6 sm:mt-0 items-center text-3xl">
            <Footer.Icon
              className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out"
              href="https://linkedin.com/in/shrisharanyan"
              target="_blank"
              icon={BsLinkedin}
            />
            <Footer.Icon
              className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out"
              href="https://discordapp.com/users/1037190174939037807"
              target="_blank"
              icon={BsDiscord}
            />
            <Footer.Icon
              className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out"
              href="https://instagram.com/ssv_myself"
              target="_blank"
              icon={BsInstagram}
            />
            <Footer.Icon
              className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out"
              href="https://twitter.com/shrisharanyan"
              target="_blank"
              icon={BsTwitter}
            />
            <Footer.Icon
              className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out"
              href="https://github.com/spellsharp"
              target="_blank"
              icon={BsGithub}
            />
            <Footer.Icon
              className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out"
              href="https://kaggle.com/spellsharp"
              target="_blank"
              icon={FaKaggle}
            />
            <Footer.Icon
              className="hover:text-blue-400 hover:transition-all duration-500 ease-in-out"
              href="https://t.me/ssv_myself"
              target="_blank"
              icon={BsTelegram}
            />
          </div>
        </div>
        <div className="w-full sm:flex sm:items-center sm:justify-between pt-5">
          <div>Made by <Link href='/'><span className="text-blue-500 font-medium">Shrisharanyan Vasu</span></Link></div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;

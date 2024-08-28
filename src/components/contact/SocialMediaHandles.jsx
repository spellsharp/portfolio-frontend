import React from 'react'
import { FaEnvelope, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaShareAlt, FaKaggle } from 'react-icons/fa'

const SocialMediaHandles = () => {
  return (
    <div className='flex flex-col space-y-4'>
        <div className="flex space-x-3 items-center">
            <a href="mailto:shrisharanyan.vasu@gmail.com" target="_blank" rel="noreferrer" className="lg:text-4xl md:text-4xl sm:text-xl text-xl text-blue-500">
                <FaEnvelope />
            </a>
            <div className='lg:text-lg md:text-lg sm:text-sm text-sm font-semibold'><span className='text-gray-400 font-normal'>shrisharanyan.vasu@gmail.com</span></div>
        </div>
        <div className='flex space-x-3 items-center'>
            <div className="flex items-center space-x-3 lg:text-4xl md:text-4xl sm:text-xl text-xl text-blue-500">
                <FaShareAlt />
                <div className='lg:text-lg md:text-lg sm:text-sm text-sm font-semibold text-white'>Socials: </div>
            </div>
            <div className="flex justify-center space-x-4 text-gray-400">
                <a href="https://twitter.com/shrisharanyan" target="_blank" rel="noreferrer" className="lg:text-4xl md:text-4xl sm:text-xl text-xl hover:text-blue-500 transition-all duration-500">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com/ssv_myself" target="_blank" rel="noreferrer" className="lg:text-4xl md:text-4xl sm:text-xl text-xl hover:text-blue-500 transition-all duration-500">
                    <FaInstagram />
                </a>
                <a href="https://linkedin.com/in/shrisharanyan" target="_blank" rel="noreferrer" className="lg:text-4xl md:text-4xl sm:text-xl text-xl hover:text-blue-500 transition-all duration-500">
                    <FaLinkedin />
                </a>
                <a href="https://kaggle.com/spellsharp" target="_blank" rel="noreferrer" className="lg:text-4xl md:text-4xl sm:text-xl text-xl hover:text-blue-500 transition-all duration-500">
                    <FaKaggle />
                </a>
                <a href="https://github.com/spellsharp" target="_blank" rel="noreferrer" className="lg:text-4xl md:text-4xl sm:text-xl text-xl hover:text-blue-500 transition-all duration-500">
                    <FaGithub />
                </a>
            </div>
        </div>
    </div>
  )
}

export default SocialMediaHandles
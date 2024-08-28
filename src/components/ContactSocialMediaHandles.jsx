import React from 'react'
import { FaEnvelope, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaShareAlt } from 'react-icons/fa'

const ContactSocialMediaHandles = () => {
  return (
    <div className='flex flex-col space-y-10'>
        <div className="flex space-x-3 justify-center items-center">
            <a href="mailto:shrisharanyan.vasu@gmail.com" target="_blank" rel="noreferrer" className="text-4xl text-blue-500">
                <FaEnvelope />
            </a>
            <div className='text-lg font-semibold'>Email: <span className='text-gray-400 font-normal'>shrisharanyan.vasu@gmail.com</span></div>
        </div>
        <div className='flex space-x-3 items-center'>
            <div className="flex items-center space-x-3 text-4xl text-blue-500">
                <FaShareAlt />
                <div className='text-lg font-semibold text-white'>Social Handles: </div>
            </div>
            <div className="flex justify-center space-x-4 text-gray-400">
                <a href="https://twitter.com/shrisharanyan" target="_blank" rel="noreferrer" className="text-4xl hover:text-blue-500 transition-all duration-500">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com/ssv_myself" target="_blank" rel="noreferrer" className="text-4xl hover:text-blue-500 transition-all duration-500">
                    <FaInstagram />
                </a>
                <a href="https://linkedin.com/in/shrisharanyan" target="_blank" rel="noreferrer" className="text-4xl hover:text-blue-500 transition-all duration-500">
                    <FaLinkedin />
                </a>
                <a href="https://github.com/spellsharp" target="_blank" rel="noreferrer" className="text-4xl hover:text-blue-500 transition-all duration-500">
                    <FaGithub />
                </a>
            </div>
        </div>
        <a
          href="https://www.overleaf.com/read/tzrpndxvfxzk#b7e43f"
          target="_blank"
          className="sm:mx-auto mb-5 lg:mx-0 md:mx-0 mx-auto lg:p-3 lg:text-xl md:p-2 md:text-2xl sm:p-2 sm:text-xl max-w-fit p-2 text-xl shadow-[0_0_15px_1px_rgba(59,130,246,0.60)] border bg-blue-500 rounded-md border-white bg-opacity-0 lg:border-opacity-100 hover:bg-blue-500 hover:border-opacity-0 hover:transition-all duration-500 ease-in-out"
        >
          Curriculum Vitae
        </a>
    </div>
  )
}

export default ContactSocialMediaHandles
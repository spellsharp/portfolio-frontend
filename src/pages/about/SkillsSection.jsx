import '../../styles/Parallax.css';
import SkillTiles from '../../components/projects/SkillTiles'
import { FaArrowRight } from 'react-icons/fa';

const SkillsSection = () => {
  return (
    <div className='flex items-center justify-center lg:py-10 md:py-10 sm:py-28 py-28'>
    <div className="flex flex-col items-start lg:justify-center md:justify-center sm:justify-start justify-start">
        <SkillTiles />
        <a href='/projects' className='flex space-x-2 items-center justify-center hover:scale-105 text-blue-500 hover:text-white transition-all duration-500'>
          <div>Check out my projects</div>
          <FaArrowRight size={20} />
        </a>
    </div>
    </div>
  );
};

export default SkillsSection;
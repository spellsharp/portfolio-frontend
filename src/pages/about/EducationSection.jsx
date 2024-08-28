import '../../styles/Parallax.css';
import TimeLine from '../../components/about/TimeLine'
import timelineData from '../../content/timeline.json';

const EducationSection = () => {
  return (
    <section className="flex flex-col items-center lg:justify-center md:justify-center sm:justify-start justify-start lg:py-10 md:py-10 sm:py-28 py-28">
        <TimeLine data={timelineData} />
    </section>
  );
};

export default EducationSection;
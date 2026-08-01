import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowRight,
  FiArrowUpRight,
  FiExternalLink,
} from "react-icons/fi";
import { SiKaggle } from "react-icons/si";

const map = {
  mail: FiMail,
  github: FiGithub,
  linkedin: FiLinkedin,
  x: FiTwitter,
  kaggle: SiKaggle,
  arrow: FiArrowRight,
  arrowUpRight: FiArrowUpRight,
  external: FiExternalLink,
};

const Icon = ({ name, size = 18, className = "" }) => {
  const Glyph = map[name];
  if (!Glyph) return null;
  return <Glyph size={size} className={className} aria-hidden="true" />;
};

export default Icon;

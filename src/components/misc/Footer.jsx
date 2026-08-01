import Icon from "./Icons";
import { profile, socials } from "../../content/site";

const Footer = () => (
  <footer className="mt-24 border-t border-rule-soft">
    <div className="mx-auto flex max-w-page flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
      <div className="text-sm text-faint">
        © {new Date().getFullYear()} {profile.name}
      </div>
      <div className="flex items-center gap-5">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={s.label}
            className="text-faint transition-colors duration-200 hover:text-accent"
          >
            <Icon name={s.icon} size={17} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;

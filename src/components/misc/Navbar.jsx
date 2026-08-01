import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { profile } from "../../content/site";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/research", label: "Research" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }) =>
  [
    "text-[15px] transition-colors duration-200 hover:text-ink",
    isActive ? "text-ink" : "text-muted",
  ].join(" ");

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 nav-surface border-b border-rule-soft backdrop-blur-md">
      <nav className="mx-auto flex max-w-page items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-serif text-xl tracking-tight text-ink"
        >
          {profile.short}
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="text-[15px] text-muted transition-colors duration-200 hover:text-ink"
          >
            CV
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-rule text-muted"
          >
            {open ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-rule-soft px-6 pb-5 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 text-[15px] ${
                      isActive ? "text-ink" : "text-muted"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="block py-2 text-[15px] text-muted"
              >
                CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

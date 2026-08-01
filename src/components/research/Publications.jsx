import Icon from "../misc/Icons";
import { Section } from "../misc/Layout";
import { publications, profile } from "../../content/site";

/**
 * Renders the author list with the site owner emphasised and any equal-first
 * authors marked, per the usual convention on academic pages.
 */
const AuthorList = ({ authors, equalContribution = [] }) => {
  const names = authors.split(",").map((n) => n.trim());
  const marked = equalContribution.length > 0;

  return (
    <>
      <p className="mt-2 max-w-prose text-[15px] text-muted">
        {names.map((name, i) => (
          <span key={name}>
            <span className={name === profile.name ? "font-medium text-ink" : ""}>
              {name}
            </span>
            {equalContribution.includes(name) && (
              <sup className="text-accent">*</sup>
            )}
            {i < names.length - 1 && ", "}
          </span>
        ))}
      </p>
      {marked && (
        <p className="mt-1 text-sm text-faint">
          <span className="text-accent">*</span> Equal contribution.
        </p>
      )}
    </>
  );
};

/**
 * Renders only entries that actually have a title, so an incomplete citation
 * never ships. Returns nothing at all if none are ready.
 */
const Publications = () => {
  const ready = publications.filter((p) => p.title);
  if (ready.length === 0) return null;

  return (
    <Section title="Publications">
      <ol className="border-t border-rule-soft">
        {ready.map((p) => (
          <li key={p.title} className="border-b border-rule-soft py-6">
            <h3 className="max-w-prose text-lg leading-snug">{p.title}</h3>
            {p.authors && (
              <AuthorList
                authors={p.authors}
                equalContribution={p.equalContribution}
              />
            )}
            <p className="mt-1 text-[15px] text-accent">
              {p.venue}
              {p.year ? `, ${p.year}` : ""}
            </p>
            {p.note && (
              <p className="mt-2 max-w-prose text-sm text-faint">{p.note}</p>
            )}
            {p.links?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-5">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent transition-opacity hover:opacity-70"
                  >
                    {l.label}
                    <Icon name="arrowUpRight" size={14} />
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
};

export default Publications;

import Icon from "../misc/Icons";
import { Section } from "../misc/Layout";
import { publications } from "../../content/site";

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
              <p className="mt-2 max-w-prose text-[15px] text-muted">
                {p.authors}
              </p>
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

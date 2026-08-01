import Icon from "../misc/Icons";
import { FigurePlaceholder } from "../misc/Placeholder";

const ResearchEntry = ({ item }) => (
  <article
    id={item.slug}
    className="grid scroll-mt-24 gap-8 border-b border-rule-soft py-12 md:grid-cols-[300px_1fr] md:gap-12"
  >
    {/* self-start stops the frame stretching to the height of the text column,
        which would leave dead space under the image. */}
    <div className="self-start overflow-hidden rounded-md border border-rule">
      <div
        className={`aspect-[4/3] ${
          item.imageFit === "contain" ? "bg-white p-6" : ""
        }`}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.imageAlt ?? item.title}
            loading="lazy"
            className={`h-full w-full ${
              item.imageFit === "contain" ? "object-contain" : "object-cover"
            }`}
          />
        ) : (
          <FigurePlaceholder kind={item.figure} />
        )}
      </div>
    </div>

    <div>
      <div className="eyebrow mb-3">
        {item.venue} · {item.period}
      </div>
      <h2 className="text-2xl md:text-[28px]">{item.title}</h2>

      <div className="mt-5 space-y-4 max-w-prose text-muted">
        {item.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      {item.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-5">
          {item.links.map((l) => (
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
    </div>
  </article>
);

export default ResearchEntry;

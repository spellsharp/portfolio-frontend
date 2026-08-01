import { Link } from "react-router-dom";
import { Container, Section } from "../../components/misc/Layout";
import Icon from "../../components/misc/Icons";
import { PortraitPlaceholder } from "../../components/misc/Placeholder";
import { profile, research, experience } from "../../content/site";

const HomePage = () => (
  <Container>
    {/* Hero */}
    <section className="grid gap-10 pb-16 pt-20 md:grid-cols-[1fr_220px] md:items-start md:pt-28">
      <div>
        <div className="eyebrow mb-5">
          {profile.role} · {profile.org}
        </div>
        <h1 className="text-4xl leading-[1.1] md:text-6xl">{profile.name}</h1>
        <p className="mt-6 max-w-prose text-lg text-muted">{profile.tagline}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 border-b border-accent pb-0.5 text-[15px] text-accent transition-opacity hover:opacity-70"
          >
            Selected work
            <Icon name="arrow" size={15} />
          </Link>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[15px] text-muted transition-colors hover:text-ink"
          >
            Curriculum vitae
            <Icon name="arrowUpRight" size={14} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 text-[15px] text-muted transition-colors hover:text-ink"
          >
            Email
            <Icon name="mail" size={14} />
          </a>
        </div>
      </div>

      <div className="order-first w-32 overflow-hidden rounded-md border border-rule md:order-none md:w-full">
        <div className="aspect-square">
          {profile.portrait ? (
            <img
              src={profile.portrait}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <PortraitPlaceholder />
          )}
        </div>
      </div>
    </section>

    {/* Selected work */}
    <Section title="Selected work">
      <ul className="divide-y divide-rule-soft border-y border-rule-soft">
        {research.map((item) => (
          <li key={item.slug}>
            <Link
              to={`/research#${item.slug}`}
              className="group grid gap-2 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8"
            >
              <div>
                <h3 className="text-xl transition-colors group-hover:text-accent md:text-[22px]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-prose text-[15px] text-muted">
                  {item.summary}
                </p>
              </div>
              <div className="font-mono text-xs text-faint md:text-right">
                {item.period}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>

    {/* Now */}
    <Section title="Currently">
      <div className="grid gap-8 md:grid-cols-2">
        {experience.slice(0, 2).map((e) => (
          <div key={e.org}>
            <div className="font-mono text-xs text-faint">{e.period}</div>
            <h3 className="mt-2 text-lg">{e.role}</h3>
            <div className="text-[15px] text-accent">{e.org}</div>
            <p className="mt-2 text-[15px] text-muted">{e.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  </Container>
);

export default HomePage;

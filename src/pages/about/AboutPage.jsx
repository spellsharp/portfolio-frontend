import { Container, PageHeader, Section } from "../../components/misc/Layout";
import {
  profile,
  experience,
  education,
  skills,
  beyond,
} from "../../content/site";

const Entry = ({ primary, secondary, secondaryUrl, period, detail }) => (
  <div className="grid gap-1 border-b border-rule-soft py-6 md:grid-cols-[130px_1fr] md:gap-8">
    <div className="pt-1 font-mono text-xs text-faint">{period}</div>
    <div>
      <h3 className="text-lg">{primary}</h3>
      <div className="text-[15px] text-accent">
        {secondaryUrl ? (
          <a
            href={secondaryUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
          >
            {secondary}
          </a>
        ) : (
          secondary
        )}
      </div>
      {detail && <p className="mt-2 max-w-prose text-[15px] text-muted">{detail}</p>}
    </div>
  </div>
);

const AboutPage = () => (
  <Container>
    <PageHeader eyebrow="About" title="Background" />

    <Section>
      <div className="max-w-prose space-y-5 text-[17px] text-muted">
        {profile.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>

    <Section title="Research interests">
      <ul className="flex flex-wrap gap-2">
        {profile.interests.map((i) => (
          <li key={i} className="tag">
            {i}
          </li>
        ))}
      </ul>
    </Section>

    <Section title="Experience">
      <div className="border-t border-rule-soft">
        {experience.map((e) => (
          <Entry
            key={`${e.org}-${e.role}`}
            primary={e.role}
            secondary={e.org}
            secondaryUrl={e.orgUrl}
            period={e.period}
            detail={e.detail}
          />
        ))}
      </div>
    </Section>

    <Section title="Education">
      <div className="border-t border-rule-soft">
        {education.map((e) => (
          <Entry
            key={e.degree}
            primary={e.degree}
            secondary={e.org}
            period={e.period}
          />
        ))}
      </div>
    </Section>

    <Section title="Beyond research">
      <div className="space-y-14">
        {beyond.map((entry) => (
          <div key={entry.title}>
            <h3 className="mb-5 text-2xl">{entry.title}</h3>
            <div className="max-w-prose space-y-5 text-[17px] text-muted">
              {entry.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {entry.highlights.length > 0 && (
              <dl className="mt-8 border-t border-rule-soft">
                {entry.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="grid gap-1 border-b border-rule-soft py-4 md:grid-cols-[260px_1fr] md:gap-8"
                  >
                    <dt className="text-[15px] text-ink">{h.label}</dt>
                    <dd className="text-[15px] text-muted">{h.detail}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        ))}
      </div>
    </Section>

    <Section title="Technical">
      <div className="grid gap-10 md:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group}>
            <h3 className="mb-4 text-base">{s.group}</h3>
            <ul className="space-y-2 text-[15px] text-muted">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  </Container>
);

export default AboutPage;

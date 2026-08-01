import { Container, PageHeader, Section } from "../../components/misc/Layout";
import Icon from "../../components/misc/Icons";
import { profile, socials } from "../../content/site";

const ContactPage = () => (
  <Container>
    <PageHeader
      eyebrow="Contact"
      title="Get in touch"
      lead="Open to conversations about clinical machine learning, medical imaging, and open-source scientific tooling."
    />

    <Section>
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex items-center gap-3 font-serif text-2xl text-ink transition-colors hover:text-accent md:text-4xl"
      >
        {profile.email}
        <Icon name="arrowUpRight" size={22} />
      </a>
    </Section>

    <Section title="Elsewhere">
      <ul className="border-t border-rule-soft">
        {socials
          .filter((s) => !s.href.startsWith("mailto:"))
          .map((s) => (
            <li key={s.label} className="border-b border-rule-soft">
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-4 text-[15px] text-muted transition-colors hover:text-ink"
              >
                <span className="flex items-center gap-3">
                  <Icon name={s.icon} size={16} />
                  {s.label}
                </span>
                <Icon
                  name="arrowUpRight"
                  size={15}
                  className="text-faint transition-colors group-hover:text-accent"
                />
              </a>
            </li>
          ))}
      </ul>
    </Section>
  </Container>
);

export default ContactPage;

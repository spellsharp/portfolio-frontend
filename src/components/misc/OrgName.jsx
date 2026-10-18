const linkClass =
  "underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70";

const OrgLink = ({ name, url }) =>
  url ? (
    <a href={url} target="_blank" rel="noreferrer" className={linkClass}>
      {name}
    </a>
  ) : (
    name
  );

/**
 * An organisation name, linked when a URL is known. Entries spanning more than
 * one organisation pass `orgs` and render as "A · B", each linked separately.
 */
const OrgName = ({ org, orgUrl, orgs }) => {
  if (!orgs?.length) return <OrgLink name={org} url={orgUrl} />;
  return orgs.map((o, i) => (
    <span key={o.name}>
      {i > 0 && " · "}
      <OrgLink name={o.name} url={o.url} />
    </span>
  ));
};

export default OrgName;

/**
 * Post-build prerender. Runs after `react-scripts build` (npm "postbuild").
 *
 * CRA ships one empty index.html, so crawlers that don't execute JavaScript
 * (Bing in part, link previews, AI crawlers) see no content. This writes one
 * HTML file per route with its own <head> (title, description, canonical,
 * Open Graph, JSON-LD) and the page text inside #root. React's createRoot
 * replaces that text on load, so the live app is unchanged.
 *
 * Also emits sitemap.xml, llms.txt and 404.html. Content comes from
 * src/content/site.js — the single source of truth — never duplicated here.
 */

import { build } from "esbuild";
import { readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createRequire } from "node:module";

const SITE = "https://shrisharanyan.com";
const BUILD = "build";
const require = createRequire(import.meta.url);

// --- Load site.js; image imports resolve to their file names ---------------

const imageStub = {
  name: "image-stub",
  setup(b) {
    b.onLoad({ filter: /\.(jpe?g|png|webp|svg|gif|pdf)$/ }, (args) => ({
      contents: `export default ${JSON.stringify(basename(args.path))};`,
      loader: "js",
    }));
  },
};

const bundled = await build({
  entryPoints: ["src/content/site.js"],
  bundle: true,
  write: false,
  platform: "node",
  format: "cjs",
  plugins: [imageStub],
  logLevel: "silent",
});
const mod = { exports: {} };
new Function("module", "exports", "require", bundled.outputFiles[0].text)(
  mod,
  mod.exports,
  require
);
const { profile, research, publications, experience, education, skills, beyond, socials } =
  mod.exports;

// Map an imported file name to CRA's hashed URL, e.g. cardiac.jpg -> /static/media/cardiac.1a2b3c.jpg
const manifest = JSON.parse(readFileSync(join(BUILD, "asset-manifest.json"), "utf8")).files;
const assetUrl = (name) => {
  if (!name) return null;
  const dot = name.lastIndexOf(".");
  const re = new RegExp(`/${name.slice(0, dot)}\\.[0-9a-f]+\\${name.slice(dot)}$`);
  return Object.values(manifest).find((u) => re.test(u)) || null;
};

// --- HTML helpers ------------------------------------------------------------

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const a = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
const p = (text) => `<p>${esc(text)}</p>`;
const ul = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const section = (title, inner) =>
  `<section class="py-14"><h2 class="eyebrow mb-8">${esc(title)}</h2>${inner}</section>`;

const profileLinks = socials.filter((s) => !s.href.startsWith("mailto:")).map((s) => s.href);
const ogImage = `${SITE}/og-image.jpg`;

// Third-person summary for metadata; the site's own tagline is first-person.
const summary = `${profile.name} is a deep learning researcher at ${profile.org} working on medical imaging: congenital heart disease classification, cardiac segmentation and ulcerative colitis grading.`;

// --- JSON-LD -----------------------------------------------------------------

const person = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: profile.name,
  alternateName: [profile.short, profile.name.split(" ")[0]],
  url: `${SITE}/`,
  image: ogImage,
  jobTitle: profile.role,
  description: summary,
  worksFor: { "@type": "Organization", name: profile.org, url: profile.orgUrl },
  alumniOf: education.map((e) => ({
    "@type": "EducationalOrganization",
    name: e.org,
  })),
  knowsAbout: profile.interests,
  sameAs: profileLinks,
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: profile.name,
  publisher: { "@id": `${SITE}/#person` },
};

const articles = publications
  .filter((pub) => pub.title)
  .map((pub) => ({
    "@type": "ScholarlyArticle",
    headline: pub.title,
    author: pub.authors.split(",").map((n) =>
      n.trim() === profile.name
        ? { "@id": `${SITE}/#person` }
        : { "@type": "Person", name: n.trim() }
    ),
    datePublished: pub.year,
    publisher: pub.venue,
    url: pub.links[0]?.href,
  }));

// --- Shared chrome -----------------------------------------------------------

const NAV = [
  ["/", "Home"],
  ["/research", "Research"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

const chrome = (main) => `<div class="mx-auto max-w-page px-6 md:px-10">
<nav>${NAV.map(([href, label]) => a(href, label)).join(" · ")}</nav>
<main>${main}</main>
<footer>${socials.map((s) => a(s.href, s.label)).join(" · ")}</footer>
</div>`;

// --- Page bodies -------------------------------------------------------------

const homeBody = () => {
  const portrait = assetUrl(profile.portrait);
  return chrome(`
<header class="pt-16">
<p>${esc(profile.role)} · ${a(profile.orgUrl, profile.org)}</p>
<h1>${esc(profile.name)}</h1>
${p(profile.tagline)}
<p>${a("/research", "Research")} · ${a(profile.resume, "CV")} · ${a(`mailto:${profile.email}`, "Email")}</p>
${portrait ? `<img src="${portrait}" alt="${esc(profile.name)}" width="400" height="400">` : ""}
</header>
${section(
  "Selected work",
  ul(research.map((r) => `${a(`/research#${r.slug}`, r.title)} — ${esc(r.summary)}`))
)}
${section(
  "Currently",
  ul(experience.map((e) => `${esc(e.role)}, ${esc(e.org)} (${esc(e.period)})`))
)}`);
};

const researchBody = () =>
  chrome(`
<header class="pt-16">
<h1>Selected work</h1>
${p("Machine learning applied to clinical imaging, and the scientific ML infrastructure that supports it.")}
</header>
${research
  .map((r) => {
    const img = assetUrl(r.image);
    return `<article id="${esc(r.slug)}" class="py-14">
<h2>${esc(r.title)}</h2>
<p>${esc(r.venue)} · ${esc(r.period)}</p>
${img ? `<img src="${img}" alt="${esc(r.imageAlt)}">` : ""}
${p(r.summary)}
${r.body.map(p).join("\n")}
<p>${r.tags.map(esc).join(" · ")}</p>
${r.links.length ? `<p>${r.links.map((l) => a(l.href, l.label)).join(" · ")}</p>` : ""}
</article>`;
  })
  .join("\n")}
${section(
  "Publications",
  ul(
    publications
      .filter((pub) => pub.title)
      .map(
        (pub) =>
          `<strong>${esc(pub.title)}</strong>. ${esc(pub.authors)}. ${esc(pub.venue)}, ${esc(
            pub.year
          )}. ${pub.links.map((l) => a(l.href, l.label)).join(" · ")}`
      )
  )
)}`);

const aboutBody = () =>
  chrome(`
<header class="pt-16"><h1>Background</h1></header>
${profile.bio.map(p).join("\n")}
${section("Research interests", ul(profile.interests.map(esc)))}
${section(
  "Experience",
  ul(
    experience.map(
      (e) => `<strong>${esc(e.role)}</strong>, ${esc(e.org)} (${esc(e.period)}). ${esc(e.detail)}`
    )
  )
)}
${section(
  "Education",
  ul(education.map((e) => `${esc(e.degree)}, ${esc(e.org)} (${esc(e.period)})`))
)}
${section(
  "Beyond research",
  beyond
    .map(
      (b) =>
        `<h3>${esc(b.title)}</h3>${b.body.map(p).join("")}${
          b.highlights.length
            ? ul(b.highlights.map((h) => `${esc(h.label)}: ${esc(h.detail)}`))
            : ""
        }`
    )
    .join("\n")
)}
${section(
  "Technical",
  ul(skills.map((s) => `${esc(s.group)}: ${s.items.map(esc).join(", ")}`))
)}`);

const contactBody = () =>
  chrome(`
<header class="pt-16">
<h1>Get in touch</h1>
${p("Open to conversations about clinical machine learning, medical imaging, and open-source scientific tooling.")}
<p>${a(`mailto:${profile.email}`, profile.email)}</p>
</header>
${section("Elsewhere", ul(socials.map((s) => a(s.href, s.label))))}`);

const notFoundBody = () =>
  chrome(`<header class="pt-16"><h1>Page not found</h1><p>${a("/", "Back to home")}</p></header>`);

// --- Routes ------------------------------------------------------------------

const routes = [
  {
    path: "/",
    file: "index.html",
    title: `${profile.name} — Deep Learning Researcher, Medical Imaging`,
    description: summary,
    body: homeBody,
    jsonld: [person, website, { "@type": "ProfilePage", url: `${SITE}/`, mainEntity: { "@id": `${SITE}/#person` } }],
    priority: "1.0",
  },
  {
    path: "/research",
    file: "research.html",
    title: `Research — ${profile.name}`,
    description: `Research and publications by ${profile.name}: congenital heart disease segmentation (STACOM, MICCAI 2026), CT/MR–ultrasound registration (ASMUS, MICCAI 2026), ulcerative colitis grading and the Fourier Neural Operator in DeepChem.`,
    body: researchBody,
    jsonld: [person, ...articles],
    priority: "0.9",
  },
  {
    path: "/about",
    file: "about.html",
    title: `About — ${profile.name}`,
    description: `Background of ${profile.name}: experience at ${profile.org}, Project MONAI and DeepChem (GSoC 2025), B.Tech CSE (AI) at Amrita Vishwa Vidyapeetham, and Carnatic music.`,
    body: aboutBody,
    jsonld: [{ "@type": "ProfilePage", url: `${SITE}/about`, mainEntity: person }],
    priority: "0.8",
  },
  {
    path: "/contact",
    file: "contact.html",
    title: `Contact — ${profile.name}`,
    description: `Contact ${profile.name} about clinical machine learning, medical imaging, and open-source scientific tooling.`,
    body: contactBody,
    jsonld: [person],
    priority: "0.5",
  },
];

// --- Write HTML --------------------------------------------------------------

const template = readFileSync(join(BUILD, "index.html"), "utf8")
  // Drop the template's generic tags; each page gets its own below.
  .replace(/<title>[\s\S]*?<\/title>/, "")
  .replace(/<meta name="description"[^>]*>/g, "")
  .replace(/<meta property="og:[^"]*"[^>]*>/g, "")
  .replace(/<meta name="twitter:[^"]*"[^>]*>/g, "");

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: build/index.html has no empty <div id="root"></div>');
}

const head = ({ title, description, path, jsonld, noindex }) => {
  const url = `${SITE}${path === "/" ? "/" : path}`;
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    noindex ? `<meta name="robots" content="noindex">` : `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${path === "/" ? "profile" : "website"}">`,
    `<meta property="og:site_name" content="${esc(profile.name)}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(profile.name)}, ${esc(profile.role)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:site" content="@shrisharanyan">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
  ];
  if (jsonld?.length) {
    const graph = JSON.stringify({ "@context": "https://schema.org", "@graph": jsonld });
    tags.push(`<script type="application/ld+json">${graph.replace(/</g, "\\u003c")}</script>`);
  }
  return tags.join("");
};

const render = (route) =>
  template
    .replace("</head>", `${head(route)}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${route.body()}</div>`);

for (const route of routes) writeFileSync(join(BUILD, route.file), render(route));

writeFileSync(
  join(BUILD, "404.html"),
  render({
    path: "/404",
    title: `Page not found — ${profile.name}`,
    description: "This page does not exist.",
    body: notFoundBody,
    noindex: true,
  })
);

// --- sitemap.xml -------------------------------------------------------------

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(BUILD, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url><loc>${SITE}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`
  )
  .join("\n")}
</urlset>
`
);

// --- llms.txt (https://llmstxt.org) ------------------------------------------

writeFileSync(
  join(BUILD, "llms.txt"),
  `# ${profile.name}

> ${summary} Also known as ${profile.short}.

${profile.bio.join("\n\n")}

## Pages

- [Home](${SITE}/): overview and current work
- [Research](${SITE}/research): projects and publications
- [About](${SITE}/about): experience, education, skills
- [Contact](${SITE}/contact): email and profiles

## Publications

${publications
  .filter((pub) => pub.title)
  .map((pub) => `- [${pub.title}](${pub.links[0]?.href}): ${pub.authors}. ${pub.venue}, ${pub.year}.`)
  .join("\n")}

## Research

${research.map((r) => `- ${r.title} (${r.venue}, ${r.period}): ${r.summary}`).join("\n")}

## Experience

${experience.map((e) => `- ${e.role}, ${e.org} (${e.period}): ${e.detail}`).join("\n")}

## Education

${education.map((e) => `- ${e.degree}, ${e.org} (${e.period})`).join("\n")}

## Profiles

${socials.map((s) => `- ${s.label}: ${s.href.replace("mailto:", "")}`).join("\n")}
`
);

console.log(
  `prerender: wrote ${routes.map((r) => r.file).join(", ")}, 404.html, sitemap.xml, llms.txt`
);

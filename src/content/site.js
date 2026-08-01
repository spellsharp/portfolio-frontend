/**
 * Single source of truth for every page's content.
 * Swap `image` fields to a real asset import to replace the generated SVG placeholders.
 */

export const profile = {
  name: "Shrisharanyan Vasu",
  short: "Sharan",
  role: "Healthcare AI Engineer",
  org: "MaitriLabs",
  orgUrl: "",
  location: "India",
  email: "shrisharanyan.vasu@gmail.com",
  resume: "https://www.overleaf.com/read/tzrpndxvfxzk#b7e43f",
  // Drop in a headshot (e.g. `import portrait from "../assets/home/portrait.jpg"`)
  // and set `portrait` to it — until then a generated SVG stands in.
  portrait: null,
  tagline:
    "I build machine learning systems for clinical problems — cardiac imaging, gastrointestinal disease grading, and scientific ML infrastructure.",
  bio: [
    "I'm a healthcare AI engineer at MaitriLabs, where I work on machine learning for clinical imaging. Most of my time goes to problems where the model has to hold up against messy, low-volume, expert-annotated medical data rather than clean benchmarks.",
    "My work has centred on cardiology — congenital heart disease classification and cardiac structure segmentation — and on gastroenterology, grading ulcerative colitis severity from endoscopic imaging. Both are settings where calibration and failure behaviour matter as much as headline accuracy.",
    "Alongside the clinical work, I care about the scientific ML tooling underneath it. In Google Summer of Code 2025 I implemented the Fourier Neural Operator and integrated it into DeepChem, an open-source library used widely across computational chemistry and the life sciences.",
    "I contribute to the MONAI Ultrasound Working Group, where a recent collaboration led to a paper at the ASMUS workshop at MICCAI. My work has also appeared at STACOM, MICCAI's workshop on statistical atlases and computational modelling of the heart. Working in the open, on shared infrastructure that other groups build clinical research on, is the part of this field I find most worth the effort.",
  ],
  interests: [
    "Medical image segmentation",
    "Ultrasound / MONAI",
    "Clinical model evaluation & calibration",
    "Neural operators / scientific ML",
    "Open-source research tooling",
  ],
};

export const research = [
  {
    slug: "chd",
    title: "Congenital heart disease classification and cardiac segmentation",
    venue: "MaitriLabs",
    period: "2025 — present",
    figure: "cardiac",
    summary:
      "Deep learning pipelines for cardiac imaging: classifying congenital heart disease and segmenting cardiac structures from volumetric scans.",
    body: [
      "Congenital heart disease is heterogeneous and comparatively rare, which makes it a hard supervised learning target — the label space is broad and the per-class data is thin. I work on classification models for CHD alongside segmentation of cardiac structures, since accurate structural delineation is what makes downstream diagnostic signals interpretable to a clinician.",
      "The engineering emphasis is on evaluation that doesn't flatter the model: reporting sensitivity, specificity, precision and AUROC together rather than a single accuracy figure, and treating segmentation quality as a multi-metric question (Dice, IoU, boundary distance) instead of a single overlap score.",
    ],
    tags: ["Cardiology", "Segmentation", "Classification", "3D imaging"],
    links: [],
  },
  {
    slug: "ibd-uc",
    title: "Ulcerative colitis severity grading from endoscopy",
    venue: "MaitriLabs",
    period: "2025 — present",
    figure: "endoscopy",
    summary:
      "AI-assisted grading of inflammatory bowel disease severity, learning the ordinal structure of clinical endoscopic scores.",
    body: [
      "Endoscopic severity in ulcerative colitis is scored on an ordinal clinical scale, and inter-rater disagreement between endoscopists is a known problem. That makes it a task where a model is genuinely useful — as a consistency layer — but also one where naive multi-class training throws away the ordering information in the labels.",
      "The work covers grading models over endoscopic imaging, with attention to how the model behaves near clinically meaningful decision boundaries (for example, the remission/active threshold) rather than only in aggregate.",
    ],
    tags: ["Gastroenterology", "Ordinal grading", "Endoscopy"],
    links: [],
  },
  {
    slug: "fno-deepchem",
    title: "Fourier Neural Operator in DeepChem",
    venue: "Google Summer of Code 2025 · DeepChem",
    period: "2025",
    figure: "spectral",
    summary:
      "Built the Fourier Neural Operator and integrated it into DeepChem's model library as a maintained, documented contribution.",
    body: [
      "Neural operators learn mappings between function spaces rather than between fixed-size vectors, which lets a single trained model solve a family of PDEs across resolutions. The Fourier Neural Operator does this by parameterising the integral kernel directly in the frequency domain.",
      "For GSoC 2025 I implemented the FNO and integrated it into DeepChem, an open-source library for deep learning in chemistry, biology and materials science. Landing a model in a library like DeepChem is as much an interface problem as a modelling one — it had to fit existing abstractions, ship with tests and documentation, and be maintainable by people other than me.",
    ],
    tags: ["Neural operators", "Scientific ML", "Open source", "PyTorch"],
    links: [
      { label: "DeepChem", href: "https://github.com/deepchem/deepchem" },
      { label: "GSoC 2025", href: "https://summerofcode.withgoogle.com/" },
    ],
  },
];

/**
 * Publications. An entry renders only once it has a `title` — this keeps a
 * half-filled citation from ever reaching the live site. Fill in the ASMUS
 * paper's title, author list, year and link to publish it.
 */
export const publications = [
  {
    title: "",
    authors: "",
    venue: "ASMUS Workshop, MICCAI",
    year: "",
    note: "Collaboration through the MONAI Ultrasound Working Group.",
    links: [],
  },
  {
    title: "",
    authors: "",
    venue: "STACOM Workshop, MICCAI",
    year: "",
    note: "",
    links: [],
  },
];

export const experience = [
  {
    role: "Contributor",
    org: "MONAI Ultrasound Working Group",
    period: "2025 — present",
    detail:
      "Contributing to open-source ultrasound tooling in MONAI; collaborative work published at the ASMUS workshop at MICCAI.",
  },
  {
    role: "Healthcare AI Engineer",
    org: "MaitriLabs",
    period: "2025 — present",
    detail:
      "Machine learning for clinical imaging — congenital heart disease classification, cardiac segmentation, and ulcerative colitis severity grading.",
  },
  {
    role: "Open Source Contributor",
    org: "DeepChem · Google Summer of Code",
    period: "2025",
    detail:
      "Implemented the Fourier Neural Operator and integrated it into DeepChem's model library, with tests and documentation.",
  },
  {
    role: "Member",
    org: "amFOSS",
    period: "2023 — 2026",
    detail:
      "Active member of one of India's leading free and open-source software clubs; project work, mentoring and event organisation.",
  },
];

export const education = [
  {
    degree: "B.Tech, Computer Science & Engineering (Artificial Intelligence)",
    org: "Amrita Vishwa Vidyapeetham, Amritapuri",
    period: "2022 — 2026",
  },
  {
    degree: "Higher Secondary",
    org: "P.S. Senior Secondary School, Chennai",
    period: "2022",
  },
];

export const skills = [
  {
    group: "Modelling",
    items: [
      "PyTorch",
      "MONAI",
      "Segmentation (U-Net, VNet, SwinUNETR)",
      "Neural operators",
      "Vision transformers",
    ],
  },
  {
    group: "Practice",
    items: [
      "Experiment tracking (W&B)",
      "Clinical evaluation metrics",
      "Distributed / SLURM training",
      "Reproducible pipelines",
    ],
  },
  {
    group: "Engineering",
    items: ["Python", "NumPy / SciPy", "React", "Docker", "Git"],
  },
];

export const socials = [
  { label: "Email", href: "mailto:shrisharanyan.vasu@gmail.com", icon: "mail" },
  { label: "GitHub", href: "https://github.com/spellsharp", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shrisharanyan",
    icon: "linkedin",
  },
  { label: "X", href: "https://twitter.com/shrisharanyan", icon: "x" },
  { label: "Kaggle", href: "https://kaggle.com/spellsharp", icon: "kaggle" },
];

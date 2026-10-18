/**
 * Single source of truth for every page's content.
 * Swap `image` fields to a real asset import to replace the generated SVG placeholders.
 */

import cardiacFigure from "../assets/research/cardiac.jpg";
import colitisFigure from "../assets/research/ulcerative-colitis.jpg";
import gsocLogo from "../assets/research/gsoc.png";
import portrait from "../assets/home/portrait-v3.webp";

export const profile = {
  name: "Shrisharanyan Vasu",
  short: "Sharan",
  role: "Deep Learning Researcher — Healthcare",
  org: "Maitri-Labs",
  orgUrl: "https://maitri-labs.ai",
  location: "India",
  email: "shrisharanyan.vasu@gmail.com",
  resume: "https://www.overleaf.com/read/ygvtrprfqxyq#277c2c",
  portrait,
  tagline:
    "I build deep learning models for medical imaging and contribute to the open-source tools behind them.",
  bio: [
    "I'm a deep learning researcher at Maitri-Labs. I work on medical imaging models trained on small datasets labelled by clinicians.",
    "I've worked on congenital heart disease classification and cardiac segmentation, and on grading ulcerative colitis from endoscopy. In both, I care about calibration and failure cases as much as accuracy.",
    "I also work on open-source scientific ML. For Google Summer of Code 2025, I added the Fourier Neural Operator to DeepChem.",
    "I contribute to Project MONAI's Ultrasound Working Group, where a collaboration led to a paper at the ASMUS workshop at MICCAI 2026. I've also published at STACOM, MICCAI's workshop on cardiac modelling.",
  ],
  interests: [
    "Medical image segmentation",
    "Ultrasound / Project MONAI",
    "Clinical model evaluation & calibration",
    "Neural operators / scientific ML",
    "Open-source research tooling",
  ],
};

export const research = [
  {
    slug: "chd",
    title: "Congenital heart disease classification and cardiac segmentation",
    venue: "Maitri-Labs",
    period: "2025 — present",
    figure: "cardiac",
    image: cardiacFigure,
    imageAlt:
      "Multi-planar cardiac CT views with labelled chamber segmentations alongside a 3D reconstruction of the heart",
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
    venue: "Maitri-Labs",
    period: "2025 — present",
    figure: "endoscopy",
    image: colitisFigure,
    imageAlt:
      "Endoscopic view of colonic mucosa showing erythema and areas of mucosal bleeding",
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
    image: gsocLogo,
    imageAlt: "Google Summer of Code logo",
    // A logo, not a scan — letterbox it rather than cropping to fill.
    imageFit: "contain",
    summary:
      "Built the Fourier Neural Operator and integrated it into DeepChem's model library as a maintained, documented contribution.",
    body: [
      "Neural operators learn mappings between function spaces rather than between fixed-size vectors, which lets a single trained model solve a family of PDEs across resolutions. The Fourier Neural Operator does this by parameterising the integral kernel directly in the frequency domain.",
      "For GSoC 2025 I implemented the FNO and integrated it into DeepChem, an open-source library for deep learning in chemistry, biology and materials science. Landing a model in a library like DeepChem is as much an interface problem as a modelling one — it had to fit existing abstractions, ship with tests and documentation, and be maintainable by people other than me.",
    ],
    tags: ["Neural operators", "Scientific ML", "Open source", "PyTorch"],
    links: [
      { label: "DeepChem", href: "https://github.com/deepchem/deepchem" },
      {
        label: "GSoC 2025 project",
        href: "https://summerofcode.withgoogle.com/archive/2025/projects/pCUg5nMr",
      },
    ],
  },
];

/**
 * Publications. An entry renders only once it has a `title` — this keeps a
 * half-filled citation from ever reaching the live site.
 */
export const publications = [
  {
    title:
      "Beyond In-Distribution Metrics: A Systematic Out-of-Distribution Evaluation of Congenital Heart Disease Segmentation",
    authors:
      "Aniketh Vijesh, Shrisharanyan Vasu, Abhijit Ramesh, Clare Pomeroy-Ward, Harikrishnan Anil Maya, Sarin Xavier, Mahesh Kappanayil, Gilad Gressel",
    equalContribution: ["Aniketh Vijesh", "Shrisharanyan Vasu"],
    venue: "STACOM Workshop, MICCAI",
    year: "2026",
    note: "",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2609.17068" }],
  },
  {
    title:
      "Global to Local Registration: Transferring Pretrained Registration Models to CT/MR–Ultrasound via Anatomical Supervision",
    authors:
      "Gabriella d'Albenzio, Mengting Liu, Shixing Ma, Chunna Yang, Yuhao Wei, Shrisharanyan Vasu, Aniketh Vijesh, Xihan Ma, Zachary P. Taylor, Tanmoy Sarkar Pias, Basar Demir, Miklós Gyöngy, Yasin Ceran, Marc Niethammer, Tina Kapur, Stephen R. Aylward, Gabor Fichtinger, Zhe Min, Mirabela Rusu",
    venue: "ASMUS Workshop, MICCAI",
    year: "2026",
    note: "Collaboration through the Project MONAI Ultrasound Working Group.",
    links: [
      {
        label: "Paper",
        href: "https://papers.miccai.org/miccai-2026-sat/ASMUS_058.html",
      },
    ],
  },
];

export const experience = [
  {
    role: "Deep Learning Researcher — Healthcare",
    org: "Maitri-Labs",
    orgUrl: "https://maitri-labs.ai",
    period: "2025 — present",
    detail:
      "Medical imaging models for congenital heart disease classification, cardiac segmentation and ulcerative colitis grading.",
  },
  {
    role: "Contributor",
    org: "Project MONAI — Ultrasound Working Group",
    orgUrl: "https://project-monai.github.io/",
    period: "2025 — present",
    detail:
      "Open-source ultrasound tooling in Project MONAI. Our joint work was published at the ASMUS workshop at MICCAI 2026.",
  },
  {
    role: "Open Source Contributor",
    org: "DeepChem · Google Summer of Code",
    orgs: [
      { name: "DeepChem", url: "https://deepchem.io" },
      {
        name: "Google Summer of Code",
        url: "https://summerofcode.withgoogle.com/archive/2025/projects/pCUg5nMr",
      },
    ],
    period: "2025",
    detail:
      "Added the Fourier Neural Operator to DeepChem's model library, with tests and documentation.",
  },
  {
    role: "Alumni Member",
    org: "amFOSS",
    orgUrl: "https://amfoss.in/",
    period: "2023 — 2026",
    detail:
      "Student-run free and open-source software club at Amrita Vishwa Vidyapeetham, and one of India's most active; project work, mentoring and event organisation.",
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
      "Project MONAI",
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

/**
 * Life outside the lab. Kept factual and achievement-led rather than
 * devotional — this reads to a technical audience.
 */
export const beyond = [
  {
    title: "Carnatic music",
    body: [
      "I'm a performing Carnatic vocalist. I train under Vidwan Sri Palghat Ramprasad in concert performance and vocal health technique, and continue to learn from his senior disciple Sri Rohith Chandrasekhar.",
      "Over the past few years I've accompanied my teacher as vocal support across India and abroad, and presented concerts in and beyond Chennai. The discipline transfers in both directions, between the music and the research.",
    ],
    highlights: [
      {
        label: "Vocal support, international",
        detail:
          "Madhuradhwani · SASTRA Satsangh · Surabharati Sanskrit Foundation · Karpahavalli, Australia",
      },
      {
        label: "Concerts",
        detail: "Sarvani Sangeetha Sabha · Margazhi Sangeetha Upasana",
      },
      {
        label: "Young Indian Cultural Ambassador (YICA)",
        detail: "Birmingham Tyagaraja Festival, 2026",
      },
    ],
  },
  {
    title: "Hobbies",
    body: [
      "Mostly games. I'm drawn to long-form, atmospheric worlds — Elden Ring, Red Dead Redemption 2, The Witcher 3 — and to indie games that do a great deal with very little: INSIDE, Hollow Knight, Dead Cells.",
      "The rest of my time outside work goes to the gym.",
    ],
    highlights: [],
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

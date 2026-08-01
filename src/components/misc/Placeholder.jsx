/**
 * Generated, theme-aware SVG stand-ins used wherever a real asset hasn't been
 * supplied yet. Every one of these is replaced by passing a real `src` through
 * the corresponding field in src/content/site.js.
 */

const Frame = ({ children, label }) => (
  <svg
    viewBox="0 0 320 240"
    role="img"
    aria-label={label}
    className="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect width="320" height="240" fill="var(--bg-raised)" />
    <g stroke="var(--rule)" strokeWidth="0.5">
      {Array.from({ length: 15 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 16} x2="320" y2={i * 16} />
      ))}
      {Array.from({ length: 20 }, (_, i) => (
        <line key={`v${i}`} x1={i * 16} y1="0" x2={i * 16} y2="240" />
      ))}
    </g>
    {children}
  </svg>
);

/* Cardiac: concentric contours suggesting a segmented chamber boundary. */
const Cardiac = () => (
  <Frame label="Cardiac segmentation figure placeholder">
    <g fill="none" stroke="var(--accent)" strokeOpacity="0.55">
      {[1, 0.78, 0.56, 0.34].map((s, i) => (
        <path
          key={i}
          d={`M160 ${196 - (1 - s) * 30}
              c${-52 * s} ${-30 * s} ${-72 * s} ${-64 * s} ${-72 * s} ${-92 * s}
              a${36 * s} ${36 * s} 0 0 1 ${72 * s} ${-24 * s}
              a${36 * s} ${36 * s} 0 0 1 ${72 * s} ${24 * s}
              c0 ${28 * s} ${-20 * s} ${62 * s} ${-72 * s} ${92 * s}z`}
          strokeWidth={1.4 - i * 0.2}
        />
      ))}
    </g>
    <circle cx="160" cy="118" r="3" fill="var(--accent)" />
  </Frame>
);

/* Endoscopy: circular field of view with graded severity bands. */
const Endoscopy = () => (
  <Frame label="Endoscopic grading figure placeholder">
    <circle
      cx="160"
      cy="120"
      r="76"
      fill="none"
      stroke="var(--rule)"
      strokeWidth="1"
    />
    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M160 120 m-${68 - i * 16} 0 a${68 - i * 16} ${68 - i * 16} 0 0 1 ${
          (68 - i * 16) * 2
        } 0`}
        fill="none"
        stroke="var(--accent)"
        strokeOpacity={0.2 + i * 0.18}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    ))}
    <g fill="var(--ink-faint)" fontFamily="monospace" fontSize="9">
      <text x="96" y="212">
        0
      </text>
      <text x="152" y="212">
        1
      </text>
      <text x="208" y="212">
        2
      </text>
    </g>
  </Frame>
);

/* Spectral: frequency-domain bands, nodding at the Fourier layer. */
const Spectral = () => (
  <Frame label="Fourier neural operator figure placeholder">
    <g stroke="var(--accent)" strokeLinecap="round">
      {Array.from({ length: 26 }, (_, i) => {
        const h = Math.abs(Math.sin(i * 0.55)) * 70 * Math.exp(-i / 16) + 4;
        return (
          <line
            key={i}
            x1={40 + i * 10}
            y1={160}
            x2={40 + i * 10}
            y2={160 - h}
            strokeWidth="3"
            strokeOpacity={0.75 - i * 0.02}
          />
        );
      })}
    </g>
    <line
      x1="32"
      y1="160"
      x2="296"
      y2="160"
      stroke="var(--rule)"
      strokeWidth="1"
    />
  </Frame>
);

const figures = { cardiac: Cardiac, endoscopy: Endoscopy, spectral: Spectral };

export const FigurePlaceholder = ({ kind }) => {
  const Fig = figures[kind] ?? Spectral;
  return <Fig />;
};

/* Portrait: abstract bust, deliberately neutral until a real headshot lands. */
export const PortraitPlaceholder = () => (
  <svg
    viewBox="0 0 200 200"
    role="img"
    aria-label="Portrait placeholder"
    className="h-full w-full"
  >
    <rect width="200" height="200" fill="var(--bg-raised)" />
    <circle cx="100" cy="78" r="30" fill="var(--rule)" />
    <path d="M40 178c0-33 27-58 60-58s60 25 60 58z" fill="var(--rule)" />
    <text
      x="100"
      y="196"
      textAnchor="middle"
      fontFamily="monospace"
      fontSize="8"
      fill="var(--ink-faint)"
    >
      photo pending
    </text>
  </svg>
);

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * An interactive MLP. This is not a decorative graph — every frame runs a real
 * forward pass (tanh activations) whose input vector is the pointer position,
 * and what's drawn is the actual signal: edge opacity tracks |w * a| and node
 * fill tracks |activation|.
 *
 * Pointer moves the input, click resamples the weights, and with no pointer it
 * drives itself on a slow Lissajous path so the page is never static.
 */

const LAYERS = [4, 7, 7, 3];
const NODE_R = 5.5;

/* Deterministic RNG so a given seed always yields the same network. */
const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const buildNetwork = (seed) => {
  const rand = mulberry32(seed);
  const weights = [];
  const biases = [];
  for (let l = 0; l < LAYERS.length - 1; l++) {
    const rows = [];
    for (let j = 0; j < LAYERS[l + 1]; j++) {
      const row = [];
      for (let i = 0; i < LAYERS[l]; i++) row.push(rand() * 2.4 - 1.2);
      rows.push(row);
    }
    weights.push(rows);
    biases.push(Array.from({ length: LAYERS[l + 1] }, () => rand() * 0.6 - 0.3));
  }
  return { weights, biases };
};

const forward = (input, net) => {
  const acts = [input];
  for (let l = 0; l < net.weights.length; l++) {
    const prev = acts[l];
    const out = net.weights[l].map((row, j) => {
      let z = net.biases[l][j];
      for (let i = 0; i < row.length; i++) z += row[i] * prev[i];
      return Math.tanh(z);
    });
    acts.push(out);
  }
  return acts;
};

const readTheme = (el) => {
  const cs = getComputedStyle(el);
  return {
    accent: cs.getPropertyValue("--accent").trim() || "#0f6b63",
    ink: cs.getPropertyValue("--ink").trim() || "#1a1a1a",
    faint: cs.getPropertyValue("--ink-faint").trim() || "#8a8a84",
    rule: cs.getPropertyValue("--rule").trim() || "rgba(0,0,0,.12)",
  };
};

/* Colours come from CSS vars, which may be hex or rgb(); normalise to rgba(). */
const withAlpha = (color, alpha) => {
  const c = color.trim();
  if (c.startsWith("#")) {
    const h = c.slice(1);
    const full =
      h.length === 3
        ? h
            .split("")
            .map((x) => x + x)
            .join("")
        : h;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }
  if (c.startsWith("rgb(")) return c.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  if (c.startsWith("rgba(")) return c.replace(/[\d.]+\)$/, `${alpha})`);
  return c;
};

const NeuralNet = () => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const netRef = useRef(buildNetwork(7));
  const seedRef = useRef(7);
  const [seedLabel, setSeedLabel] = useState(7);

  const resample = useCallback(() => {
    const next = (seedRef.current * 1103515245 + 12345) >>> 8;
    seedRef.current = next;
    netRef.current = buildNetwork(next);
    setSeedLabel(next % 9973);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    // Null in environments without canvas support (and under jsdom in tests);
    // bail out rather than taking the page down with it.
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let theme = readTheme(wrap);
    let raf = 0;
    let w = 0;
    let h = 0;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // The palette changes when the theme toggle flips data-theme.
    const mo = new MutationObserver(() => {
      theme = readTheme(wrap);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const nodePositions = () => {
      const padX = Math.min(72, w * 0.12);
      const usableW = w - padX * 2;
      return LAYERS.map((count, l) => {
        const x = padX + (usableW * l) / (LAYERS.length - 1);
        const gap = Math.min(34, (h - 40) / Math.max(...LAYERS));
        const total = (count - 1) * gap;
        return Array.from({ length: count }, (_, i) => ({
          x,
          y: h / 2 - total / 2 + i * gap,
        }));
      });
    };

    const start = performance.now();

    const frame = (now) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      const p = pointerRef.current;
      // Idle: trace a slow Lissajous figure so the network keeps moving.
      const nx = p.active ? p.x : Math.sin(t * 0.31);
      const ny = p.active ? p.y : Math.cos(t * 0.23);

      const input = [
        nx,
        ny,
        Math.sin(t * 0.6) * 0.8,
        Math.cos(t * 0.44 + nx) * 0.8,
      ];
      const acts = forward(input, netRef.current);
      const pos = nodePositions();

      // Edges, drawn strongest-signal-last so the live path reads on top.
      for (let l = 0; l < netRef.current.weights.length; l++) {
        const rows = netRef.current.weights[l];
        for (let j = 0; j < rows.length; j++) {
          for (let i = 0; i < rows[j].length; i++) {
            const wgt = rows[j][i];
            const signal = wgt * acts[l][i];
            const mag = Math.min(1, Math.abs(signal));
            const a = pos[l][i];
            const b = pos[l + 1][j];

            ctx.strokeStyle = withAlpha(
              mag > 0.18 ? theme.accent : theme.faint,
              0.06 + mag * 0.5
            );
            ctx.lineWidth = 0.4 + mag * 1.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // A travelling pulse shows direction of flow on live connections.
            if (!reduced && mag > 0.3) {
              const speed = 0.35 + mag * 0.5;
              const phase = ((t * speed + (i * 0.37 + j * 0.19)) % 1 + 1) % 1;
              const dir = signal >= 0 ? phase : 1 - phase;
              ctx.beginPath();
              ctx.arc(
                a.x + (b.x - a.x) * dir,
                a.y + (b.y - a.y) * dir,
                1.1 + mag * 1.5,
                0,
                Math.PI * 2
              );
              ctx.fillStyle = withAlpha(theme.accent, 0.25 + mag * 0.6);
              ctx.fill();
            }
          }
        }
      }

      // Nodes
      for (let l = 0; l < pos.length; l++) {
        for (let i = 0; i < pos[l].length; i++) {
          const a = acts[l][i];
          const mag = Math.min(1, Math.abs(a));
          const { x, y } = pos[l][i];

          ctx.beginPath();
          ctx.arc(x, y, NODE_R + mag * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = withAlpha(theme.accent, 0.1 + mag * 0.75);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, NODE_R + mag * 3.2, 0, Math.PI * 2);
          ctx.strokeStyle = withAlpha(theme.ink, 0.18);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        active: true,
      };
    };
    const onPointerLeave = () => {
      pointerRef.current = { ...pointerRef.current, active: false };
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="border-y border-rule-soft py-10">
      <div
        ref={wrapRef}
        className="relative h-[260px] w-full cursor-crosshair touch-none select-none"
        onClick={resample}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Interactive diagram of a small neural network running a live forward pass; pointer position drives the input layer"
          className="block h-full w-full"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          {LAYERS.join(" → ")} · tanh · seed {seedLabel}
        </div>
        <button
          type="button"
          onClick={resample}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
        >
          Move your cursor · click to resample weights
        </button>
      </div>
    </div>
  );
};

export default NeuralNet;

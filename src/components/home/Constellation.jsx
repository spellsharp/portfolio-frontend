import { useEffect, useRef } from "react";

/**
 * A draggable constellation of nodes. Deliberately not a valid network — just
 * proximity-linked dots of varying size.
 *
 * Each node is a damped spring anchored to its home position, and every edge is
 * a softer spring at its rest length, so dragging one node tugs its neighbours
 * and releasing it springs back with an underdamped bounce.
 */

const COUNT = 34;
const LINK_DIST = 0.26; // in normalised units
const MAX_LINKS = 4;

const HOME_K = 90; // anchor stiffness
const HOME_C = 6; // anchor damping -> zeta ~0.32, visibly bouncy
const EDGE_K = 14; // neighbour coupling
const EDGE_C = 1.4;

const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const buildGraph = (seed) => {
  const rand = mulberry32(seed);
  const nodes = [];

  // Jittered grid: keeps them spread out instead of clumping like pure random.
  const cols = 8;
  const rows = Math.ceil(COUNT / cols);
  for (let i = 0; i < COUNT; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    nodes.push({
      hx: (c + 0.5 + (rand() - 0.5) * 0.85) / cols,
      hy: (r + 0.5 + (rand() - 0.5) * 0.9) / rows,
      r: 1.8 + rand() * rand() * 7.5, // skewed small, a few large
      phase: rand() * Math.PI * 2,
      drift: 0.4 + rand() * 0.7,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    });
  }

  const edges = [];
  const linkCount = new Array(nodes.length).fill(0);
  const pairs = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].hx - nodes[j].hx;
      const dy = nodes[i].hy - nodes[j].hy;
      const d = Math.hypot(dx, dy);
      if (d < LINK_DIST) pairs.push({ i, j, d });
    }
  }
  pairs.sort((a, b) => a.d - b.d);
  for (const p of pairs) {
    if (linkCount[p.i] >= MAX_LINKS || linkCount[p.j] >= MAX_LINKS) continue;
    edges.push({ i: p.i, j: p.j, rest: p.d });
    linkCount[p.i]++;
    linkCount[p.j]++;
  }

  // No stragglers: anything still unlinked joins its nearest neighbour, so a
  // lone dot never floats unattached.
  for (let i = 0; i < nodes.length; i++) {
    if (linkCount[i] > 0) continue;
    let best = -1;
    let bestD = Infinity;
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const d = Math.hypot(nodes[i].hx - nodes[j].hx, nodes[i].hy - nodes[j].hy);
      if (d < bestD) {
        bestD = d;
        best = j;
      }
    }
    if (best !== -1) {
      edges.push({ i, j: best, rest: bestD });
      linkCount[i]++;
      linkCount[best]++;
    }
  }
  return { nodes, edges };
};

const readTheme = (el) => {
  const cs = getComputedStyle(el);
  return {
    accent: cs.getPropertyValue("--accent").trim() || "#0f6b63",
    ink: cs.getPropertyValue("--ink").trim() || "#1a1a1a",
    faint: cs.getPropertyValue("--ink-faint").trim() || "#8a8a84",
  };
};

const withAlpha = (color, alpha) => {
  const c = color.trim();
  if (c.startsWith("#")) {
    const h = c.slice(1);
    const full =
      h.length === 3
        ? h.split("").map((x) => x + x).join("")
        : h;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }
  if (c.startsWith("rgb("))
    return c.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  if (c.startsWith("rgba(")) return c.replace(/[\d.]+\)$/, `${alpha})`);
  return c;
};

const Constellation = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { nodes, edges } = buildGraph(24601);
    let theme = readTheme(wrap);
    let w = 0;
    let h = 0;
    let raf = 0;
    let dragIndex = -1;
    let hoverIndex = -1;
    const pointer = { x: 0, y: 0, inside: false };
    let lastDrag = { x: 0, y: 0, t: 0 };

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Home position in pixels, including the slow idle breathing offset.
    const homeOf = (n, t) => {
      const amp = reduced ? 0 : 5 * n.drift;
      return {
        x: n.hx * w + Math.sin(t * 0.35 * n.drift + n.phase) * amp,
        y: n.hy * h + Math.cos(t * 0.28 * n.drift + n.phase) * amp,
      };
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const first = w === 0;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first) {
        for (const n of nodes) {
          n.x = n.hx * w;
          n.y = n.hy * h;
        }
      }
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const mo = new MutationObserver(() => {
      theme = readTheme(wrap);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const pick = (px, py) => {
      let best = -1;
      let bestD = 22; // generous grab radius for small dots
      for (let i = 0; i < nodes.length; i++) {
        const d = Math.hypot(nodes[i].x - px, nodes[i].y - py);
        if (d < Math.max(bestD, nodes[i].r + 12) && d < bestD + nodes[i].r) {
          bestD = d;
          best = i;
        }
      }
      return best;
    };

    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const t = now / 1000;

      // ---- physics ----
      for (let i = 0; i < nodes.length; i++) {
        if (i === dragIndex) continue;
        const n = nodes[i];
        const home = homeOf(n, t);
        // Anchor spring, scaled by size: big nodes feel heavier and lag.
        const mass = 0.6 + n.r * 0.09;
        n.vx += ((home.x - n.x) * HOME_K - n.vx * HOME_C) * (dt / mass);
        n.vy += ((home.y - n.y) * HOME_K - n.vy * HOME_C) * (dt / mass);
      }

      // Edge springs: neighbours get dragged along, then settle.
      for (const e of edges) {
        const a = nodes[e.i];
        const b = nodes[e.j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1e-4;
        const rest = e.rest * Math.hypot(w, h) * 0.72;
        const ext = len - rest;
        const ux = dx / len;
        const uy = dy / len;
        const relV = (b.vx - a.vx) * ux + (b.vy - a.vy) * uy;
        const f = ext * EDGE_K + relV * EDGE_C;
        if (e.i !== dragIndex) {
          a.vx += f * ux * dt;
          a.vy += f * uy * dt;
        }
        if (e.j !== dragIndex) {
          b.vx -= f * ux * dt;
          b.vy -= f * uy * dt;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        if (i === dragIndex) continue;
        nodes[i].x += nodes[i].vx * dt;
        nodes[i].y += nodes[i].vy * dt;
      }

      // ---- draw ----
      ctx.clearRect(0, 0, w, h);

      for (const e of edges) {
        const a = nodes[e.i];
        const b = nodes[e.j];
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        const rest = e.rest * Math.hypot(w, h) * 0.72;
        const strain = Math.min(1, Math.abs(len - rest) / (rest || 1));
        const live =
          e.i === dragIndex ||
          e.j === dragIndex ||
          e.i === hoverIndex ||
          e.j === hoverIndex;

        ctx.strokeStyle = live
          ? withAlpha(theme.accent, 0.5 - strain * 0.25)
          : withAlpha(theme.faint, 0.32 - strain * 0.18);
        ctx.lineWidth = live ? 1.1 : 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const live = i === dragIndex || i === hoverIndex;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + (live ? 1.6 : 0), 0, Math.PI * 2);
        ctx.fillStyle = live
          ? withAlpha(theme.accent, 0.95)
          : withAlpha(theme.accent, 0.3 + Math.min(0.45, n.r / 14));
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const localPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onPointerDown = (e) => {
      const p = localPos(e);
      const idx = pick(p.x, p.y);
      if (idx === -1) return;
      dragIndex = idx;
      nodes[idx].vx = 0;
      nodes[idx].vy = 0;
      lastDrag = { x: p.x, y: p.y, t: performance.now() };
      canvas.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      const p = localPos(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.inside = true;

      if (dragIndex !== -1) {
        nodes[dragIndex].x = p.x;
        nodes[dragIndex].y = p.y;
        lastDrag = { x: p.x, y: p.y, t: performance.now() };
      } else {
        hoverIndex = pick(p.x, p.y);
        canvas.style.cursor = hoverIndex === -1 ? "default" : "grab";
      }
    };

    const onPointerUp = (e) => {
      if (dragIndex === -1) return;
      // Carry the throw velocity into the release so a flick overshoots.
      const p = localPos(e);
      const dt = Math.max(16, performance.now() - lastDrag.t) / 1000;
      const n = nodes[dragIndex];
      n.vx = Math.max(-1800, Math.min(1800, (p.x - lastDrag.x) / dt));
      n.vy = Math.max(-1800, Math.min(1800, (p.y - lastDrag.y) / dt));
      dragIndex = -1;
      canvas.style.cursor = "grab";
    };

    const onPointerLeave = () => {
      pointer.inside = false;
      hoverIndex = -1;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[300px] w-full touch-none select-none">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Decorative constellation of connected dots that can be dragged"
        className="block h-full w-full"
      />
      <div className="pointer-events-none absolute bottom-0 right-0 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        drag a node
      </div>
    </div>
  );
};

export default Constellation;

"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/**
 * A distinct AI brain: a recognisable brain silhouette (glowing accent outline
 * + internal gyri folds) with synapses firing along it, seated on an "AI" chip
 * whose circuit traces radiate outward with signal pulses. "AI at the core."
 */
export function BrainChipCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const accent = () =>
      getComputedStyle(root).getPropertyValue("--accent").trim() || site.accent;

    // Right half of a brain outline, top-centre → down → bottom-centre (R units)
    const halfOutline: [number, number][] = [
      [0.0, -0.62],
      [0.16, -0.86],
      [0.42, -0.95],
      [0.72, -0.87],
      [0.97, -0.62],
      [1.13, -0.27],
      [1.15, 0.08],
      [1.02, 0.4],
      [0.83, 0.62],
      [0.64, 0.75],
      [0.44, 0.86],
      [0.24, 0.86],
      [0.12, 0.78],
      [0.06, 0.92],
      [0.0, 0.97],
    ];

    // Internal gyri (folds), right side — mirrored for the left
    const halfGyri: [number, number][][] = [
      [
        [0.22, -0.5],
        [0.36, -0.24],
        [0.24, 0.02],
        [0.38, 0.28],
        [0.26, 0.54],
      ],
      [
        [0.54, -0.62],
        [0.68, -0.3],
        [0.56, 0.0],
        [0.7, 0.3],
        [0.54, 0.58],
      ],
      [
        [0.86, -0.34],
        [0.96, -0.02],
        [0.84, 0.26],
        [0.94, 0.5],
      ],
    ];

    type Node = { x: number; y: number; pulse: number; edge: number[] };
    type Trace = { pts: { x: number; y: number }[]; len: number; offset: number; sp: number };
    type Signal = { a: number; b: number; t: number; sp: number };

    let W = 0,
      H = 0,
      dpr = 1,
      raf = 0,
      lastSpawn = 0;
    let outline: { x: number; y: number }[] = [];
    let gyri: { x: number; y: number }[][] = [];
    let nodes: Node[] = [];
    let traces: Trace[] = [];
    let signals: Signal[] = [];
    let chip = { x: 0, y: 0, s: 0 };
    let cx = 0,
      cy = 0,
      SX = 0,
      SY = 0;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function hexA(hex: string, a: number) {
      const h = hex.replace("#", "");
      if (h.length !== 6) return `rgba(37,99,235,${a})`;
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    }

    const P = (x: number, y: number) => ({ x: cx + x * SX, y: cy + y * SY });

    const build = () => {
      const S = Math.min(W, H) * 0.36;
      SX = S * 1.12;
      SY = S * 0.92;
      cx = W / 2;
      cy = H * 0.4;

      // full outline: right half then mirrored left half
      const full: [number, number][] = [...halfOutline];
      for (let i = halfOutline.length - 2; i >= 1; i--)
        full.push([-halfOutline[i][0], halfOutline[i][1]]);
      outline = full.map(([x, y]) => P(x, y));

      // gyri (both sides)
      gyri = [];
      for (const g of halfGyri) {
        gyri.push(g.map(([x, y]) => P(x, y)));
        gyri.push(g.map(([x, y]) => P(-x, y)));
      }

      // nodes = every other outline point + gyri joints
      nodes = [];
      for (let i = 0; i < outline.length; i += 2)
        nodes.push({ ...outline[i], pulse: 0, edge: [] });
      for (const g of gyri)
        for (let i = 0; i < g.length; i += 1)
          nodes.push({ ...g[i], pulse: 0, edge: [] });

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].edge = nodes
          .map((n, j) => ({ j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
          .filter((o) => o.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
          .map((o) => o.j);
      }

      // chip at the base of the brain (the stem sits on it)
      const chipS = Math.max(28, S * 0.42);
      chip = {
        x: cx,
        y: Math.min(cy + SY * 0.97 + chipS * 0.5, H - chipS / 2 - 12),
        s: chipS,
      };

      // circuit traces from chip → panel edges
      traces = [];
      const half = chip.s / 2;
      const targets = [
        [-1, 0],
        [1, 0],
        [-1, 1],
        [1, 1],
        [0, 1],
      ];
      for (let i = 0; i < targets.length; i++) {
        const [gx, gy] = targets[i];
        const sx = chip.x + (gx === 0 ? rand(-half, half) : gx * half);
        const sy = chip.y + (gy === 0 ? rand(-half, half) : gy * half);
        const pts = [{ x: sx, y: sy }];
        if (gx !== 0) {
          const midX = sx + gx * rand(W * 0.14, W * 0.3);
          pts.push({ x: midX, y: sy });
          pts.push({ x: midX, y: sy + (gy ? 1 : rand(-1, 1) < 0 ? -1 : 1) * rand(H * 0.1, H * 0.28) });
        } else {
          const midY = sy + rand(H * 0.1, H * 0.22);
          pts.push({ x: sx, y: midY });
          pts.push({ x: sx + (rand(-1, 1) < 0 ? -1 : 1) * rand(W * 0.1, W * 0.3), y: midY });
        }
        // keep every point inside the panel
        for (const p of pts) {
          p.x = Math.min(Math.max(p.x, 5), W - 5);
          p.y = Math.min(Math.max(p.y, 5), H - 5);
        }
        let len = 0;
        for (let k = 1; k < pts.length; k++)
          len += Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y);
        traces.push({ pts, len, offset: rand(0, 1), sp: rand(0.16, 0.3) });
      }
      signals = [];
    };

    const smoothClosed = (pts: { x: number; y: number }[]) => {
      ctx.beginPath();
      ctx.moveTo((pts[pts.length - 1].x + pts[0].x) / 2, (pts[pts.length - 1].y + pts[0].y) / 2);
      for (let i = 0; i < pts.length; i++) {
        const cur = pts[i];
        const nxt = pts[(i + 1) % pts.length];
        ctx.quadraticCurveTo(cur.x, cur.y, (cur.x + nxt.x) / 2, (cur.y + nxt.y) / 2);
      }
      ctx.closePath();
    };

    const smoothOpen = (pts: { x: number; y: number }[]) => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    };

    const spawn = () => {
      if (signals.length > 9) return;
      const a = Math.floor(Math.random() * nodes.length);
      const es = nodes[a].edge;
      if (!es.length) return;
      const b = es[Math.floor(Math.random() * es.length)];
      signals.push({ a, b, t: 0, sp: rand(0.02, 0.035) });
      nodes[a].pulse = 1;
    };

    const tracePoint = (tr: Trace, f: number) => {
      const target = f * tr.len;
      let acc = 0;
      for (let k = 1; k < tr.pts.length; k++) {
        const seg = Math.hypot(tr.pts[k].x - tr.pts[k - 1].x, tr.pts[k].y - tr.pts[k - 1].y);
        if (acc + seg >= target) {
          const u = (target - acc) / seg;
          return {
            x: tr.pts[k - 1].x + (tr.pts[k].x - tr.pts[k - 1].x) * u,
            y: tr.pts[k - 1].y + (tr.pts[k].y - tr.pts[k - 1].y) * u,
          };
        }
        acc += seg;
      }
      return tr.pts[tr.pts.length - 1];
    };

    const frame = (ts: number) => {
      const acc = accent();
      ctx.clearRect(0, 0, W, H);

      // ---- circuit traces (behind) ----
      for (const tr of traces) {
        ctx.strokeStyle = hexA(acc, 0.16);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let k = 1; k < tr.pts.length; k++) ctx.lineTo(tr.pts[k].x, tr.pts[k].y);
        ctx.stroke();
        const end = tr.pts[tr.pts.length - 1];
        ctx.fillStyle = hexA(acc, 0.5);
        ctx.fillRect(end.x - 2.5, end.y - 2.5, 5, 5);
        const f = (ts * 0.001 * tr.sp + tr.offset) % 1;
        const p = tracePoint(tr, f);
        ctx.fillStyle = acc;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- brain fill + glow outline ----
      smoothClosed(outline);
      ctx.fillStyle = hexA(acc, 0.05);
      ctx.fill();
      ctx.save();
      ctx.shadowColor = hexA(acc, 0.55);
      ctx.shadowBlur = 14;
      ctx.strokeStyle = acc;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();

      // ---- gyri folds ----
      ctx.strokeStyle = hexA(acc, 0.42);
      ctx.lineWidth = 1.3;
      for (const g of gyri) {
        smoothOpen(g);
        ctx.stroke();
      }

      // ---- synapses ----
      if (ts - lastSpawn > 240) {
        spawn();
        lastSpawn = ts;
      }
      const next: Signal[] = [];
      for (const s of signals) {
        s.t += s.sp;
        const a = nodes[s.a];
        const b = nodes[s.b];
        if (!a || !b) continue;
        if (s.t >= 1) {
          b.pulse = 1;
          continue;
        }
        next.push(s);
        const x = a.x + (b.x - a.x) * s.t;
        const y = a.y + (b.y - a.y) * s.t;
        ctx.fillStyle = acc;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      signals = next;

      // ---- nodes ----
      for (const n of nodes) {
        if (n.pulse > 0) {
          ctx.strokeStyle = acc;
          ctx.globalAlpha = n.pulse * 0.55;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.5 + (1 - n.pulse) * 7, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          n.pulse -= 0.02;
        }
        ctx.fillStyle = n.pulse > 0.05 ? acc : hexA(acc, 0.65);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- chip ----
      const beat = (Math.sin(ts / 600) + 1) / 2;
      const s = chip.s;
      const half = s / 2;
      ctx.fillStyle = hexA(acc, 0.1 + beat * 0.07);
      ctx.beginPath();
      ctx.arc(chip.x, chip.y, s * 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = acc;
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 4; i++) {
        const off = -half + (half * 2 * (i + 0.5)) / 4;
        for (const [dx, dy, ex, ey] of [
          [off, -half, off, -half - 6],
          [off, half, off, half + 6],
          [-half, off, -half - 6, off],
          [half, off, half + 6, off],
        ] as const) {
          ctx.beginPath();
          ctx.moveTo(chip.x + dx, chip.y + dy);
          ctx.lineTo(chip.x + ex, chip.y + ey);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "#17191E";
      ctx.strokeStyle = acc;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(chip.x - half, chip.y - half, s, s, 8);
      else ctx.rect(chip.x - half, chip.y - half, s, s);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = acc;
      ctx.font = `700 ${Math.round(s * 0.4)}px 'Schibsted Grotesk','IBM Plex Sans',sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AI", chip.x, chip.y + 1);
      ctx.textBaseline = "alphabetic";
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return false;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      return true;
    };

    const step = (ts: number) => {
      if (!W || canvas.width < 4) {
        if (!resize()) {
          raf = requestAnimationFrame(step);
          return;
        }
      }
      frame(ts);
      raf = requestAnimationFrame(step);
    };

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }
    resize();
    raf = requestAnimationFrame(step);
    const kick = setTimeout(() => resize(), 150);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(kick);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

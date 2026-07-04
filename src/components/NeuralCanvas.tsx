"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/** Hero "neural signal" animation — nodes drift, connect, signals pulse, milestone hubs labelled. */
export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const accent = () =>
      getComputedStyle(root).getPropertyValue("--accent").trim() || site.accent;

    let W = 0,
      H = 0,
      dpr = 1;
    type Node = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      pulse: number;
      hub: boolean;
      labelBelow?: boolean;
      year?: string;
      event?: string;
      founded?: boolean;
    };
    type Signal = { a: number; b: number; t: number; sp: number };
    const nodes: Node[] = [];
    let signals: Signal[] = [];
    let lastSpawn = 0;
    let raf = 0;
    const mouseN = { x: null as number | null, y: null as number | null };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      nodes.length = 0;
      // Jittered grid so the 15 nodes spread across the whole canvas
      // instead of clumping (keeps hub labels from overlapping too).
      const cols = 5;
      const rows = 3;
      const mx = 0.05; // horizontal margin (fraction of W)
      const my = 0.08; // vertical margin (fraction of H)
      const gw = (W * (1 - 2 * mx)) / cols;
      const gh = (H * (1 - 2 * my)) / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = W * mx + gw * (c + 0.5);
          const cy = H * my + gh * (r + 0.5);
          nodes.push({
            x: cx + rand(-0.32, 0.32) * gw,
            y: cy + rand(-0.32, 0.32) * gh,
            r: rand(2, 3.2),
            vx: rand(-0.14, 0.14),
            vy: rand(-0.14, 0.14),
            pulse: 0,
            hub: false,
          });
        }
      }
      const milestones = [
        { year: "1999", event: "Established", founded: true },
        { year: "2000s", event: "E-governance at scale" },
        { year: "2014", event: "ISO 27001" },
        { year: "2017", event: "CMMI" },
        { year: "2020", event: "Curioversity" },
        { year: "2026", event: "AI Generation" },
      ];
      const chosen = [0, 3, 5, 8, 11, 13]
        .filter((i) => nodes[i])
        .sort((a, b) => nodes[a].x - nodes[b].x);
      chosen.forEach((idx, k) => {
        const n = nodes[idx];
        const m = milestones[k];
        if (!m) return;
        n.hub = true;
        n.r = 5;
        n.labelBelow = k % 2 === 1;
        n.vx *= 0.2;
        n.vy *= 0.2;
        n.year = m.year;
        n.event = m.event;
        n.founded = !!m.founded;
      });
    };

    const thresh = () => Math.min(W, H) * 0.58;

    const spawn = () => {
      const t = thresh();
      const cand: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.hypot(dx, dy) < t) cand.push([i, j]);
        }
      if (!cand.length) return;
      const e = cand[Math.floor(Math.random() * cand.length)];
      const dir = Math.random() < 0.5;
      signals.push({
        a: dir ? e[0] : e[1],
        b: dir ? e[1] : e[0],
        t: 0,
        sp: rand(0.006, 0.011),
      });
    };

    const frame = (ts: number) => {
      const acc = accent();
      const t = thresh();
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 8 || n.x > W - 8) n.vx *= -1;
        if (n.y < 8 || n.y > H - 8) n.vy *= -1;
        if (n.pulse > 0) n.pulse -= 0.02;
      }
      if (ts - lastSpawn > 500 && signals.length < 6) {
        spawn();
        lastSpawn = ts;
      }
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < t) {
            ctx.strokeStyle = "rgba(23,25,30," + ((1 - d / t) * 0.2).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      if (mouseN.x != null && mouseN.y != null) {
        for (const n of nodes) {
          const dx = mouseN.x - n.x;
          const dy = mouseN.y - n.y;
          const dd = Math.hypot(dx, dy);
          if (dd < 150) {
            ctx.strokeStyle = acc;
            ctx.globalAlpha = (1 - dd / 150) * 0.5;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouseN.x, mouseN.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
        ctx.fillStyle = acc;
        ctx.beginPath();
        ctx.arc(mouseN.x, mouseN.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      signals = signals.filter((s) => {
        s.t += s.sp;
        const A = nodes[s.a];
        const B = nodes[s.b];
        if (!A || !B) return false;
        if (s.t >= 1) {
          B.pulse = 1;
          return false;
        }
        return true;
      });
      for (const n of nodes) {
        if (n.pulse > 0) {
          ctx.strokeStyle = acc;
          ctx.globalAlpha = n.pulse * 0.55;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 3 + 7 * (1 - n.pulse), 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = n.hub ? acc : "#17191E";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.hub) {
          ctx.fillStyle = "#F5F4EF";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r - 2, 0, Math.PI * 2);
          ctx.fill();
        }
        if (n.year) {
          ctx.textAlign = "center";
          const below = n.labelBelow;
          ctx.font = "600 12px 'IBM Plex Mono', ui-monospace, monospace";
          const yy = below ? n.y + n.r + 16 : n.y - n.r - 20;
          ctx.fillStyle = "#3A3D43";
          ctx.fillText(n.year, n.x, yy);
          if (n.event) {
            ctx.font = "500 8.5px 'IBM Plex Mono', ui-monospace, monospace";
            const label = n.event.toUpperCase();
            const tw = ctx.measureText(label).width;
            const ph = 15;
            const pw = tw + 16;
            const rx = n.x - pw / 2;
            const ry = below ? yy + 6 : yy - 12 - ph;
            ctx.fillStyle = "#3A3D43";
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(rx, ry, pw, ph, ph / 2);
            else ctx.rect(rx, ry, pw, ph);
            ctx.fill();
            ctx.fillStyle = "#FBFAF7";
            ctx.textBaseline = "middle";
            ctx.fillText(label, n.x, ry + ph / 2 + 0.5);
            ctx.textBaseline = "alphabetic";
          }
        }
      }
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
      if (nodes.length === 0) build();
      frame(performance.now());
      return true;
    };

    canvas.onmousemove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseN.x = e.clientX - r.left;
      mouseN.y = e.clientY - r.top;
    };
    canvas.onmouseleave = () => {
      mouseN.x = null;
      mouseN.y = null;
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

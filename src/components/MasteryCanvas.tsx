"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/**
 * "Most startups are learning to engineer. We already did."
 *
 * Two capability-vs-time curves:
 *  - Bohniman (accent): already risen and holding at the top — mastered long ago.
 *  - Startups (muted, dashed): still climbing, head advancing then looping —
 *    perpetually learning, never reaching the plateau.
 */
export function MasteryCanvas() {
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
      dpr = 1,
      raf = 0;

    const padX = 10;
    const padY = 30;

    const xOf = (t: number) => padX + t * (W - 2 * padX);
    const yOf = (v: number) => H - padY - v * (H - 2 * padY);

    // Bohniman: rises fast, plateaus high (~0.9). Mastered.
    const masterV = (t: number, ts: number) =>
      0.12 + 0.8 * (1 - Math.exp(-5 * t)) + Math.sin(ts / 700 + t * 5) * 0.008;

    // Startups: climbs slower, tops out lower (~0.6), with a learning wobble.
    const learnV = (t: number, ts: number) =>
      0.08 + 0.52 * (1 - Math.exp(-3 * t)) + Math.sin(ts / 240 + t * 22) * 0.02;

    function hexA(hex: string, a: number) {
      const h = hex.replace("#", "");
      if (h.length !== 6) return `rgba(37,99,235,${a})`;
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    }

    const SAMPLES = 64;

    const buildPath = (
      vfn: (t: number, ts: number) => number,
      ts: number,
      tMax: number
    ) => {
      const p = new Path2D();
      const pts: { x: number; y: number }[] = [];
      const n = Math.max(2, Math.round(SAMPLES * tMax));
      for (let i = 0; i <= n; i++) {
        const t = (i / n) * tMax;
        pts.push({ x: xOf(t), y: yOf(vfn(t, ts)) });
      }
      p.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        p.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      const lp = pts[pts.length - 1];
      p.lineTo(lp.x, lp.y);
      return { path: p, end: lp };
    };

    const frame = (ts: number) => {
      const acc = accent();
      ctx.clearRect(0, 0, W, H);

      // faint grid baseline + top guide
      ctx.strokeStyle = "rgba(23,25,30,0.06)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 3; g++) {
        const gy = padY + (g * (H - 2 * padY)) / 3;
        ctx.beginPath();
        ctx.moveTo(padX, gy);
        ctx.lineTo(W - padX, gy);
        ctx.stroke();
      }

      // ---- Startups (muted, dashed), animated learning head ----
      const period = 6000;
      const hp = 0.06 + ((ts % period) / period) * 0.9; // head 0.06 → 0.96, loops
      const learn = buildPath(learnV, ts, hp);

      ctx.save();
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = "rgba(120,122,120,0.55)";
      ctx.lineWidth = 1.4;
      ctx.lineJoin = "round";
      ctx.stroke(learn.path);
      ctx.restore();

      // learning head — hollow dot
      ctx.fillStyle = "#FBFAF7";
      ctx.strokeStyle = "#9A9A90";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(learn.end.x, learn.end.y, 3.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // "STARTUPS · LEARNING" label following the head
      ctx.font = "500 8.5px 'IBM Plex Mono', ui-monospace, monospace";
      ctx.fillStyle = "#9A9A90";
      ctx.textAlign = learn.end.x > W * 0.6 ? "right" : "left";
      const lx = learn.end.x > W * 0.6 ? learn.end.x - 8 : learn.end.x + 8;
      ctx.fillText("STARTUPS · LEARNING", lx, learn.end.y - 8);

      // ---- Bohniman (accent), fully drawn, plateaued ----
      const master = buildPath(masterV, ts, 1);

      // area under accent line
      const area = new Path2D(master.path);
      area.lineTo(master.end.x, H - padY);
      area.lineTo(xOf(0), H - padY);
      area.closePath();
      const grad = ctx.createLinearGradient(0, padY, 0, H - padY);
      grad.addColorStop(0, hexA(acc, 0.2));
      grad.addColorStop(1, hexA(acc, 0.02));
      ctx.fillStyle = grad;
      ctx.fill(area);

      ctx.strokeStyle = acc;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.stroke(master.path);

      // steady pulse at the top — already there
      const pulse = (Math.sin(ts / 360) + 1) / 2;
      ctx.fillStyle = acc;
      ctx.globalAlpha = 0.16 + pulse * 0.22;
      ctx.beginPath();
      ctx.arc(master.end.x, master.end.y, 5 + pulse * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(master.end.x, master.end.y, 3.4, 0, Math.PI * 2);
      ctx.fill();

      // "BOHNIMAN · MASTERED" label at the plateau
      ctx.font = "600 8.5px 'IBM Plex Mono', ui-monospace, monospace";
      ctx.fillStyle = acc;
      ctx.textAlign = "right";
      ctx.fillText("BOHNIMAN · MASTERED", master.end.x - 10, master.end.y - 10);
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

"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/** Track-record layered "neural inference" net — activation front sweeps left→right. */
export function NetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const accent = () =>
      getComputedStyle(root).getPropertyValue("--accent").trim() || site.accent;

    const layers = [4, 6, 6, 3];
    let W = 0,
      H = 0,
      dpr = 1,
      raf = 0;
    let pts: { x: number; y: number }[][] = [];

    const build = () => {
      pts = [];
      const padX = 30,
        padY = 22,
        L = layers.length;
      for (let i = 0; i < L; i++) {
        const n = layers[i];
        const x = padX + (i * (W - 2 * padX)) / (L - 1);
        const col: { x: number; y: number }[] = [];
        for (let k = 0; k < n; k++) {
          const y = n === 1 ? H / 2 : padY + (k * (H - 2 * padY)) / (n - 1);
          col.push({ x, y });
        }
        pts.push(col);
      }
    };

    const frame = (ts: number) => {
      const acc = accent();
      const L = layers.length;
      const period = 3200;
      const front = ((ts % period) / period) * (L - 1 + 0.6) - 0.3;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < L - 1; i++) {
        const band = Math.max(0, 1 - Math.abs(front - (i + 0.5)) / 0.7);
        for (const a of pts[i])
          for (const b of pts[i + 1]) {
            ctx.strokeStyle = "rgba(23,25,30,0.07)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (band > 0.03) {
              ctx.strokeStyle = acc;
              ctx.globalAlpha = band * 0.45;
              ctx.lineWidth = 1.3;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
      }
      for (let i = 0; i < L; i++) {
        const act = Math.max(0, 1 - Math.abs(front - i) / 0.85);
        for (const p of pts[i]) {
          if (act > 0.03) {
            ctx.fillStyle = acc;
            ctx.globalAlpha = act * 0.22;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4 + 8 * act, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
          ctx.fillStyle = act > 0.4 ? acc : "#CBC8BE";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.3 + 1.8 * act, 0, Math.PI * 2);
          ctx.fill();
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
      build();
      frame(performance.now());
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

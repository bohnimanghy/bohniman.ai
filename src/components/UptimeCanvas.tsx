"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/**
 * Live uptime / throughput monitor — a scrolling line+area chart with faint
 * grid, a moving leading pulse, and a value that holds high with small dips.
 * Reads as "systems running live, reliably" — fitting the track record.
 */
export function UptimeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const accent = () =>
      getComputedStyle(root).getPropertyValue("--accent").trim() || site.accent;

    const L = 56; // number of samples across the width
    const values: number[] = [];
    let target = 0.82;
    let phase = 0; // 0..1 sub-step scroll offset
    let last = 0;
    let W = 0,
      H = 0,
      dpr = 1,
      raf = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const nextValue = () => {
      // Smooth random walk that holds high, with the odd dip.
      target += rand(-0.06, 0.06);
      if (Math.random() < 0.06) target -= rand(0.1, 0.22); // occasional dip
      target = Math.min(0.97, Math.max(0.5, target));
      const prev = values.length ? values[values.length - 1] : target;
      return prev * 0.72 + target * 0.28;
    };

    const seed = () => {
      values.length = 0;
      target = 0.82;
      for (let i = 0; i < L; i++) values.push(nextValue());
    };

    const yOf = (v: number, pad: number) => H - pad - v * (H - 2 * pad);

    const frame = (ts: number) => {
      if (!last) last = ts;
      const dt = Math.min(64, ts - last);
      last = ts;
      const acc = accent();
      const padX = 4;
      const padY = 26;
      const step = (W - 2 * padX) / (L - 2);
      const speed = dt / 900; // advance one sample every ~900ms

      phase += speed;
      while (phase >= 1) {
        phase -= 1;
        values.push(nextValue());
        if (values.length > L) values.shift();
      }

      ctx.clearRect(0, 0, W, H);

      // faint horizontal grid
      ctx.strokeStyle = "rgba(23,25,30,0.06)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 3; g++) {
        const gy = padY + (g * (H - 2 * padY)) / 3;
        ctx.beginPath();
        ctx.moveTo(padX, gy);
        ctx.lineTo(W - padX, gy);
        ctx.stroke();
      }

      // build the smooth line path (midpoint quadratic smoothing)
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < values.length; i++) {
        const x = padX + (i - phase) * step;
        pts.push({ x, y: yOf(values[i], padY) });
      }

      const linePath = new Path2D();
      linePath.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        linePath.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      const lastP = pts[pts.length - 1];
      linePath.lineTo(lastP.x, lastP.y);

      // area fill under the line
      const area = new Path2D(linePath);
      area.lineTo(lastP.x, H - padY);
      area.lineTo(pts[0].x, H - padY);
      area.closePath();
      const grad = ctx.createLinearGradient(0, padY, 0, H - padY);
      grad.addColorStop(0, hexA(acc, 0.22));
      grad.addColorStop(1, hexA(acc, 0.02));
      ctx.fillStyle = grad;
      ctx.fill(area);

      // the line
      ctx.strokeStyle = acc;
      ctx.lineWidth = 1.8;
      ctx.lineJoin = "round";
      ctx.stroke(linePath);

      // leading pulse dot (last real sample near the right edge)
      const lead = pts[pts.length - 2] ?? lastP;
      const pulse = (Math.sin(ts / 320) + 1) / 2;
      ctx.fillStyle = acc;
      ctx.globalAlpha = 0.18 + pulse * 0.22;
      ctx.beginPath();
      ctx.arc(lead.x, lead.y, 5 + pulse * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(lead.x, lead.y, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    // "#RRGGBB" + alpha → rgba()
    function hexA(hex: string, a: number) {
      const h = hex.replace("#", "");
      if (h.length !== 6) return `rgba(37,99,235,${a})`;
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return false;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (values.length === 0) seed();
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

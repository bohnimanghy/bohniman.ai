"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/**
 * Throughput band — glowing packets stream left→right along parallax lanes,
 * leaving fading trails. A "systems that keep running" motif, distinct from the
 * plasma FlowCanvas.
 */
export function StreamCanvas() {
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
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    type Packet = {
      lane: number;
      x: number;
      sp: number;
      len: number;
      r: number;
      bright: boolean;
    };
    const LANES = 7;
    let packets: Packet[] = [];

    const laneY = (lane: number) => {
      // Lanes spread across the middle band, edges kept clear.
      const top = H * 0.22;
      const span = H * 0.56;
      return top + (span * lane) / (LANES - 1);
    };

    const build = () => {
      packets = [];
      const count = Math.max(26, Math.floor(W / 34));
      for (let i = 0; i < count; i++) {
        const bright = Math.random() < 0.14;
        packets.push({
          lane: Math.floor(rand(0, LANES)),
          x: rand(-0.2, 1.2) * W,
          sp: rand(0.3, 1.15) * (bright ? 1.5 : 1),
          len: rand(26, 90) * (bright ? 1.4 : 1),
          r: bright ? rand(1.8, 2.6) : rand(0.7, 1.5),
          bright,
        });
      }
    };

    const frame = () => {
      const acc = accent();
      ctx.clearRect(0, 0, W, H);

      // faint lane rails
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      for (let l = 0; l < LANES; l++) {
        const y = laneY(l);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      for (const p of packets) {
        p.x += p.sp * (dpr === 1 ? 1.4 : 1.4);
        if (p.x - p.len > W) {
          p.x = rand(-0.25, -0.02) * W;
          p.lane = Math.floor(rand(0, LANES));
        }
        const y = laneY(p.lane);

        // trail
        const grad = ctx.createLinearGradient(p.x - p.len, y, p.x, y);
        grad.addColorStop(0, "rgba(240,83,28,0)");
        grad.addColorStop(1, acc);
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.r;
        ctx.globalAlpha = p.bright ? 0.9 : 0.55;
        ctx.beginPath();
        ctx.moveTo(p.x - p.len, y);
        ctx.lineTo(p.x, y);
        ctx.stroke();

        // head glow
        ctx.globalAlpha = 1;
        ctx.fillStyle = p.bright ? "#FFD9C6" : acc;
        if (p.bright) {
          ctx.shadowColor = acc;
          ctx.shadowBlur = 12;
        }
        ctx.beginPath();
        ctx.arc(p.x, y, p.r + (p.bright ? 0.8 : 0), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
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

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => resize());
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }
    resize();
    raf = requestAnimationFrame(frame);
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
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}

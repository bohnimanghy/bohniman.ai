"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/**
 * A trained neural network running live inference: data packets stream in at
 * the inputs and cascade forward layer-by-layer, lighting neurons as they
 * arrive and firing a confident pulse at the output. Reads as "our AI already
 * works in production" — the track-record message, not a chart.
 */
export function ForwardPassCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const accent = () =>
      getComputedStyle(root).getPropertyValue("--accent").trim() || site.accent;

    const layers = [3, 5, 5, 2];
    let W = 0,
      H = 0,
      dpr = 1,
      raf = 0,
      lastSpawn = 0,
      last = 0;

    type Neuron = { x: number; y: number; pulse: number };
    type Packet = { li: number; from: number; to: number; t: number; sp: number };

    let cols: Neuron[][] = [];
    let packets: Packet[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      cols = [];
      const padX = 30;
      const padY = 26;
      const L = layers.length;
      for (let i = 0; i < L; i++) {
        const n = layers[i];
        const x = padX + (i * (W - 2 * padX)) / (L - 1);
        const col: Neuron[] = [];
        for (let k = 0; k < n; k++) {
          const y = n === 1 ? H / 2 : padY + (k * (H - 2 * padY)) / (n - 1);
          col.push({ x, y, pulse: 0 });
        }
        cols.push(col);
      }
    };

    const spawnInput = () => {
      if (packets.length > 44) return;
      const from = Math.floor(Math.random() * cols[0].length);
      cols[0][from].pulse = 1;
      const to = Math.floor(Math.random() * cols[1].length);
      packets.push({ li: 0, from, to, t: 0, sp: rand(0.012, 0.02) });
    };

    function hexA(hex: string, a: number) {
      const h = hex.replace("#", "");
      if (h.length !== 6) return `rgba(37,99,235,${a})`;
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    }

    const frame = (ts: number) => {
      if (!last) last = ts;
      last = ts;
      const acc = accent();
      ctx.clearRect(0, 0, W, H);

      // static connections (faint)
      ctx.strokeStyle = "rgba(23,25,30,0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i < cols.length - 1; i++) {
        for (const a of cols[i])
          for (const b of cols[i + 1]) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
      }

      // spawn new inputs steadily
      if (ts - lastSpawn > 520) {
        spawnInput();
        lastSpawn = ts;
      }

      // advance packets, draw them + their active edge
      const next: Packet[] = [];
      for (const p of packets) {
        p.t += p.sp;
        const a = cols[p.li][p.from];
        const b = cols[p.li + 1][p.to];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;

        // glowing active edge behind the packet
        ctx.strokeStyle = acc;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (p.t >= 1) {
          b.pulse = 1;
          // cascade forward to the next layer
          if (p.li + 2 < cols.length) {
            const fan = 1 + (Math.random() < 0.4 ? 1 : 0);
            for (let f = 0; f < fan; f++) {
              const to = Math.floor(Math.random() * cols[p.li + 2].length);
              next.push({ li: p.li + 1, from: p.to, to, t: 0, sp: rand(0.012, 0.02) });
            }
          }
        } else {
          next.push(p);
          // packet dot
          ctx.fillStyle = acc;
          ctx.beginPath();
          ctx.arc(x, y, 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      packets = next;

      // neurons
      for (let i = 0; i < cols.length; i++) {
        for (const n of cols[i]) {
          if (n.pulse > 0) n.pulse -= 0.02;
          const isOutput = i === cols.length - 1;
          if (n.pulse > 0) {
            ctx.strokeStyle = acc;
            ctx.globalAlpha = n.pulse * 0.5;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 5 + (1 - n.pulse) * (isOutput ? 12 : 8), 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
          // fill: lights accent while active
          const lit = n.pulse > 0.05;
          ctx.fillStyle = lit ? acc : "#17191E";
          ctx.beginPath();
          ctx.arc(n.x, n.y, isOutput ? 5 : 4, 0, Math.PI * 2);
          ctx.fill();
          if (isOutput) {
            // hollow ring so outputs read as "results" (matches page bg)
            ctx.fillStyle = "#F5F4EF";
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // input glow halo
      for (const n of cols[0]) {
        if (n.pulse > 0.05) {
          ctx.fillStyle = hexA(acc, n.pulse * 0.18);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 9, 0, Math.PI * 2);
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

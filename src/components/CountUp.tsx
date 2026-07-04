"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  target: number;
  suffix?: string;
  className?: string;
  /** text shown before animation / for no-JS SSR */
  initial?: string;
};

export function CountUp({ target, suffix = "", className, initial }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(initial ?? `${target}${suffix}`);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (done.current) return;
      done.current = true;
      const dur = 1150;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setText(Math.round(target * eased) + suffix);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) {
            run();
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix]);

  return (
    <div ref={ref} className={className}>
      {text}
    </div>
  );
}

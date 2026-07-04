"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ProductIcon } from "./ProductIcon";
import { StatusBadge } from "./StatusBadge";
import { products } from "@/lib/site";

export function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
    >
      <Link
        href="/#products"
        aria-expanded={open}
        className={`group relative flex items-center gap-1.5 text-[14px] font-medium tracking-[0.01em] transition-colors ${
          open ? "text-ink" : "text-[#5A5E66] hover:text-ink"
        }`}
      >
        Products
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`mt-[1px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span
          className={`absolute -bottom-[6px] left-0 h-[2px] rounded-full bg-accent transition-all duration-300 ease-out ${
            open ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>

      {/* dropdown */}
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="w-[680px] overflow-hidden rounded-2xl border border-line bg-canvas-soft shadow-[0_24px_60px_-24px_rgba(23,25,30,0.35)]">
          <div className="grid grid-cols-2 gap-px bg-line">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                onClick={() => setOpen(false)}
                className="group/item flex gap-3.5 bg-canvas-soft p-4 transition-colors hover:bg-white"
              >
                <span className="mt-0.5 inline-block shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                  <ProductIcon slug={p.slug} />
                </span>
                <span className="min-w-0">
                  <span className="mb-1 flex items-center gap-2">
                    <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-ink">
                      {p.name}
                    </span>
                    <StatusBadge status={p.status} />
                  </span>
                  <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-mono">
                    {p.category}
                  </span>
                  <span className="block text-[13px] leading-[1.5] text-muted">
                    {p.features
                      .slice(0, 3)
                      .map((f) => f.title)
                      .join(" · ")}
                  </span>
                </span>
              </Link>
            ))}
            {/* trailing cell: view all */}
            <Link
              href="/#products"
              onClick={() => setOpen(false)}
              className="flex flex-col justify-center bg-canvas-soft p-4 transition-colors hover:bg-white"
            >
              <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-ink">
                All products
              </span>
              <span className="mt-1 inline-flex items-center gap-2 text-[13px] font-medium" style={{ color: "color-mix(in oklab,var(--accent),black 18%)" }}>
                Five products, one standard{" "}
                <span className="font-mono">&rarr;</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";
import { HillsCanvas } from "./HillsCanvas";
import { site, products, yearsSince, productHref } from "@/lib/site";

export function Footer() {
  const years = yearsSince();
  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#14161B", color: "#EDECE6" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "-15%",
          left: "-8%",
          width: "65%",
          height: "130%",
          background:
            "radial-gradient(circle at 42% 42%,rgba(37,99,235,0.18),rgba(96,165,250,0.06) 42%,transparent 62%)",
          filter: "blur(28px)",
          animation: "glowDrift 18s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[60%]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom,transparent,#000 42%)",
          maskImage: "linear-gradient(to bottom,transparent,#000 42%)",
        }}
      >
        <HillsCanvas />
      </div>
      <div className="relative z-[1] mx-auto max-w-[1240px] px-6 pt-[92px] md:px-10">
        {/* CTA */}
        <div className="grid grid-cols-1 items-end gap-14 border-none pb-20 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-14">
          <div>
            <div
              className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.18em]"
              style={{ color: "color-mix(in oklab,var(--accent),white 18%)" }}
            >
              03 / Custom work
            </div>
            <h2 className="m-0 font-display text-[clamp(32px,4vw,50px)] font-bold leading-[1.05] tracking-[-0.01em] text-[#F6F5EF] text-balance">
              Need something custom?
            </h2>
          </div>
          <div>
            <p className="m-0 mb-[26px] max-w-[52ch] text-[18px] leading-[1.62] text-[#B7BAC0]">
              We also build bespoke software and AI solutions — the same team
              behind our products, for hire on your hardest problems.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-[9px] rounded-[10px] bg-accent px-6 py-[14px] text-[15px] font-semibold text-[#0A1417] transition-transform hover:-translate-y-[2px]"
            >
              Explore services <span className="font-mono">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-12 border-t border-white/10 py-[52px] md:grid-cols-[minmax(0,1.4fr)_1fr_1fr]">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3">
              <Logo color="#F6F5EF" />
            </Link>
            <p className="m-0 mb-4 max-w-[38ch] text-[15px] leading-[1.6] text-[#9A9EA6]">
              {site.legalName} · Est. {site.founded}. Enabling business flow for{" "}
              {years} years.
            </p>
            <p className="m-0 max-w-[34ch] text-[14px] leading-[1.6] text-[#7C808A]">
              {site.address}
            </p>
          </div>

          <div>
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7C808A]">
              Products
            </div>
            <div className="flex flex-col gap-3">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={productHref(p)}
                  target={p.externalUrl ? "_blank" : undefined}
                  rel={p.externalUrl ? "noopener" : undefined}
                  className="text-[15px] text-[#C7CAD0] transition-colors hover:text-accent"
                >
                  {p.name} — {p.category}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7C808A]">
              Contact
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="text-[15px] text-[#C7CAD0] transition-colors hover:text-accent"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="text-[15px] text-[#C7CAD0] transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 py-6 pb-[30px]">
          <span className="font-mono text-[12px] text-[#7C808A]">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </span>
          <span className="font-mono text-[11px] tracking-[0.12em] text-[#6A6E78]">
            CMMI L3 · ISO 27001 · EST. {site.founded}
          </span>
        </div>
      </div>
    </footer>
  );
}

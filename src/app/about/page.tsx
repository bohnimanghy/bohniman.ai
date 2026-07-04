import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { yearsSince, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bohniman Systems — 26 years of government-grade engineering, now building AI products for events, education, health, restaurants and Indic languages.",
};

const milestones = [
  { year: "1999", event: "Established", body: "Bohniman Systems founded in Guwahati." },
  { year: "2000s", event: "E-governance at scale", body: "Mission-critical systems for government departments." },
  { year: "2014", event: "ISO 27001", body: "First in Northeast India to be certified." },
  { year: "2017", event: "CMMI Level 3", body: "Appraised processes for repeatable delivery." },
  { year: "2020", event: "Curioversity", body: "Our education platform goes live." },
  { year: "2026", event: "AI generation", body: "AI products across five industries." },
];

export default function AboutPage() {
  const years = yearsSince();
  return (
    <>
      {/* hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1240px] px-6 pb-16 pt-16 md:px-10 md:pt-20">
          <div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
            About Bohniman
          </div>
          <h1 className="m-0 mb-8 max-w-[18ch] font-display text-[clamp(38px,5.2vw,64px)] font-bold leading-[1.04] tracking-[-0.015em] text-ink text-balance">
            {years} years of proof. Now pointed at AI.
          </h1>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <p className="m-0 text-[19px] leading-[1.6] text-muted">
              Since {site.founded}, {site.legalName.replace(" Pvt Ltd", "")} has
              engineered mission-critical systems for governments — the kind
              where downtime isn&apos;t an option and every record matters. We
              digitized 2 crore citizen records, powered education departments
              and delivered World Bank projects.
            </p>
            <p className="m-0 text-[19px] leading-[1.6] text-muted">
              Most startups are learning to engineer. We already did. That
              discipline — CMMI Level 3, ISO 27001, 250+ projects with a 100%
              delivery record — is now the foundation for AI products built for
              real operational problems.
            </p>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="border-b border-line bg-canvas-soft">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 px-6 md:grid-cols-4 md:px-10">
          {[
            { n: `${years}+`, l: "Years engineering" },
            { n: "250+", l: "Projects · 100% delivered" },
            { n: "CMMI L3", l: "Appraised processes" },
            { n: "2 Cr", l: "Citizen records digitized" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`py-10 ${i < 3 ? "md:border-r md:border-line-soft" : ""} ${
                i % 2 === 0 ? "pr-6" : "pl-6"
              } md:px-8`}
            >
              <div className="mb-[14px] font-display text-[clamp(22px,2.4vw,34px)] font-bold leading-none tracking-[-0.02em] text-ink">
                {s.n}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-mono">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10">
          <div className="mb-12 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
            The road so far
          </div>
          <div className="border-t border-line">
            {milestones.map((m) => (
              <Reveal
                key={m.year}
                className="grid grid-cols-1 gap-4 border-b border-line py-8 md:grid-cols-[160px_200px_1fr] md:items-baseline md:gap-10"
              >
                <div className="font-display text-[26px] font-bold tracking-[-0.01em] text-ink">
                  {m.year}
                </div>
                <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                  {m.event}
                </div>
                <div className="text-[17px] leading-[1.6] text-muted">
                  {m.body}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <h2 className="m-0 max-w-[20ch] font-display text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-0.01em] text-ink text-balance">
              Want the same discipline on your problem?
            </h2>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-[10px] bg-ink px-6 py-[14px] text-[15px] font-medium text-canvas transition-colors hover:bg-[#2A2D34]"
            >
              Talk to us <span className="font-mono">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

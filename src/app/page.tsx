import Link from "next/link";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { NetCanvas } from "@/components/NetCanvas";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { StatusBadge } from "@/components/StatusBadge";
import { SamagamHubIcon, ProductIcon } from "@/components/ProductIcon";
import { products, yearsSince } from "@/lib/site";

export default function Home() {
  const years = yearsSince();
  const flagship = products.find((p) => p.flagship)!;
  const grid = products.filter((p) => !p.flagship);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#EAE8DF 1px,transparent 1px),linear-gradient(90deg,#EAE8DF 1px,transparent 1px)",
            backgroundSize: "54px 54px",
            WebkitMaskImage:
              "radial-gradient(130% 90% at 82% 8%,#000 0%,transparent 70%)",
            maskImage:
              "radial-gradient(130% 90% at 82% 8%,#000 0%,transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-6 pb-[84px] pt-[24px] md:px-10">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
            {/* left */}
            <div>
              <div className="mb-[30px] flex flex-wrap items-center gap-[14px] font-mono text-[12px] uppercase tracking-[0.16em] text-mono">
                <span className="h-[7px] w-[7px] rounded-full bg-accent" />
                <span className="text-ink">Bohniman Systems</span>
                <span className="text-[#C9C6BC]">/</span>
                <span>Guwahati, India</span>
                <span className="text-[#C9C6BC]">/</span>
                <span>Est. 1999</span>
              </div>
              <h1 className="m-0 mb-[26px] font-display text-[clamp(40px,5.4vw,68px)] font-bold leading-[1.04] tracking-[-0.015em] text-ink text-balance">
                AI products, built on {years} years of proof.
              </h1>
              <p className="m-0 mb-[38px] max-w-[53ch] text-[19px] leading-[1.6] text-muted">
                We spent {years} years engineering mission-critical systems for
                governments. Now that same discipline powers AI products for
                events, restaurants, health, education and Indic languages.
              </p>
              <div className="flex flex-wrap items-center gap-[26px]">
                <Link
                  href="#products"
                  className="group inline-flex items-center gap-[9px] text-[15px] font-medium"
                  style={{ color: "color-mix(in oklab,var(--accent),black 18%)" }}
                >
                  Explore products{" "}
                  <span className="font-mono transition-all group-hover:translate-x-[5px]">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>

            {/* right : neural signal animation */}
            <div>
              <div
                className="relative w-full"
                style={{ height: "min(46vw,460px)", minHeight: 350 }}
              >
                <NeuralCanvas />
              </div>
              <div className="mt-[14px] flex items-center gap-[9px] font-mono text-[11px] uppercase tracking-[0.14em] text-[#9A9A90]">
                <span
                  className="h-[7px] w-[7px] rounded-full bg-accent"
                  style={{ animation: "pulseDot 2.4s ease-in-out infinite" }}
                />
                <span>
                  1999 &rarr; {new Date().getFullYear()} · neural signal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CREDENTIALS BAND ============ */}
      <section className="border-b border-line bg-canvas-soft">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <Reveal className="flex flex-wrap items-baseline gap-5 border-b border-[#EDEBE2] py-[26px]">
            <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Trusted across
            </span>
            <span className="text-[15px] text-muted">
              Government · Events · Education · Health · Restaurants ·
              Indic-language AI
            </span>
          </Reveal>
          <Reveal className="grid grid-cols-2 md:grid-cols-5">
            <div className="border-b border-line-soft py-10 pr-[26px] md:border-b-0 md:border-r">
              <CountUp
                target={years}
                suffix="+"
                initial={`${years}+`}
                className="mb-[14px] font-display text-[clamp(19px,2vw,29px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink"
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-mono">
                Years engineering
              </div>
            </div>
            <div className="border-b border-line-soft py-10 md:border-b-0 md:border-r md:px-[26px]">
              <CountUp
                target={250}
                suffix="+"
                initial="250+"
                className="mb-[14px] font-display text-[clamp(19px,2vw,29px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink"
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-mono">
                Projects · 100% delivered
              </div>
            </div>
            <div className="border-b border-line-soft py-10 md:border-b-0 md:border-r md:px-[26px]">
              <div className="mb-[14px] font-display text-[clamp(19px,2vw,29px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
                CMMI&nbsp;L3
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-mono">
                Appraised processes
              </div>
            </div>
            <div className="border-b border-line-soft py-10 md:border-b-0 md:border-r md:px-[26px]">
              <div className="mb-[14px] font-display text-[clamp(19px,2vw,29px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
                ISO&nbsp;27001
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-mono">
                First in NE India
              </div>
            </div>
            <div className="py-10 md:pl-[26px]">
              <CountUp
                target={2}
                suffix=" Cr"
                initial="2 Cr"
                className="mb-[14px] font-display text-[clamp(19px,2vw,29px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink"
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-mono">
                Citizen records digitized
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PRODUCTS ============ */}
      <section id="products" className="border-b border-line">
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10">
          <Reveal className="max-w-[760px]">
            <div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
              01 / Products
            </div>
            <h2 className="m-0 mb-[18px] font-display text-[clamp(30px,3.6vw,46px)] font-bold leading-[1.1] tracking-[-0.01em] text-ink">
              Five products. One engineering standard.
            </h2>
            <p className="m-0 max-w-[56ch] text-[18px] leading-[1.6] text-muted">
              Purpose-built SaaS for the industries we know deeply — with AI at
              the core, not bolted on.
            </p>
          </Reveal>

          {/* flagship */}
          <Reveal
            delay={0.05}
            className="group mt-[52px] grid grid-cols-1 items-center gap-12 rounded-2xl p-6 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:p-10"
            style={{
              border: "1px solid color-mix(in oklab,var(--accent) 24%,#E2E0D7)",
              background: "color-mix(in oklab,var(--accent) 5%,#FCFBF8)",
            }}
          >
            <div>
              <div className="mb-[22px] flex flex-wrap items-center gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mono">
                  {flagship.category} · Flagship
                </span>
                <StatusBadge status={flagship.status} size="lg" />
              </div>
              <div className="flex items-center gap-[18px]">
                <span className="inline-block transition-transform duration-[380ms] group-hover:scale-110">
                  <SamagamHubIcon />
                </span>
                <h3 className="m-0 font-display text-[clamp(34px,4vw,48px)] font-bold leading-none tracking-[-0.01em] text-ink">
                  {flagship.name}
                </h3>
              </div>
            </div>
            <div>
              <p className="m-0 mb-6 text-[18px] leading-[1.62] text-[#3F434A]">
                {flagship.description}
              </p>
              <Link
                href={`/products/${flagship.slug}`}
                className="group/link inline-flex items-center gap-[9px] text-[15px] font-medium"
                style={{ color: "color-mix(in oklab,var(--accent),black 18%)" }}
              >
                Explore {flagship.name}{" "}
                <span className="font-mono transition-all group-hover/link:translate-x-[5px]">
                  &rarr;
                </span>
              </Link>
            </div>
          </Reveal>

          {/* grid of 4 */}
          <Reveal
            delay={0.1}
            className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:border-l"
          >
            {grid.map((p) => (
              <div
                key={p.slug}
                className="group border-b border-line p-9 transition-colors hover:bg-[#FBFAF6] sm:border-r"
              >
                <div className="mb-[22px] flex items-center justify-between gap-3">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-mono">
                    {p.category}
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="mb-3 flex items-center gap-[14px]">
                  <span className="inline-block transition-transform duration-[380ms] group-hover:scale-110">
                    <ProductIcon slug={p.slug} />
                  </span>
                  <h3 className="m-0 font-display text-[27px] font-semibold tracking-[-0.01em] text-ink">
                    {p.name}
                  </h3>
                </div>
                <p className="m-0 mb-[22px] text-[15.5px] leading-[1.6] text-[#5A5E66]">
                  {p.tagline}
                </p>
                {p.status === "COMING SOON" ? (
                  <span className="inline-flex items-center gap-2 font-sans text-[14px] font-medium text-[#A6A399]">
                    In development
                  </span>
                ) : (
                  <Link
                    href={`/products/${p.slug}`}
                    className="group/link inline-flex items-center gap-2 text-[14px] font-medium"
                    style={{
                      color: "color-mix(in oklab,var(--accent),black 18%)",
                    }}
                  >
                    Learn more{" "}
                    <span className="font-mono transition-all group-hover/link:translate-x-[4px]">
                      &rarr;
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ TRACK RECORD ============ */}
      <section id="about" className="border-b border-line">
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10">
          <Reveal className="grid grid-cols-1 items-center gap-[60px] md:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.85fr)]">
            <div>
              <div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
                02 / Track record
              </div>
              <h2 className="m-0 font-display text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.08] tracking-[-0.01em] text-ink text-balance">
                Most startups are learning to engineer.
                <br />
                <span className="text-accent">We already did.</span>
              </h2>
            </div>
            <div>
              <div
                className="relative w-full overflow-hidden rounded-xl border border-[#E4E2D9]"
                style={{ height: 296, background: "#FBFAF7" }}
              >
                <NetCanvas />
              </div>
              <div className="mt-[14px] flex items-center gap-[9px] font-mono text-[11px] uppercase tracking-[0.14em] text-mono">
                <span
                  className="h-[7px] w-[7px] rounded-full bg-accent"
                  style={{ animation: "pulseDot 2.4s ease-in-out infinite" }}
                />
                Neural inference · live
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="mt-14 grid grid-cols-1 border-t border-line md:grid-cols-3"
          >
            {[
              {
                n: "01",
                h: "Government-grade engineering",
                p: (
                  <>
                    {years} years of mission-critical delivery — including
                    digitizing 2 crore citizen records and powering education
                    departments and World Bank projects.
                  </>
                ),
              },
              {
                n: "02",
                h: "Process maturity that ships",
                p: "CMMI Level 3 appraised, ISO 27001 certified — the first in Northeast India. 250+ projects delivered, every one successful.",
              },
              {
                n: "03",
                h: "AI where it matters",
                p: "We build AI into products that solve real operational problems — events, kitchens, clinics, classrooms and 22 Indic languages.",
              },
            ].map((pillar, i) => (
              <div
                key={pillar.n}
                className={`px-0 pb-2 pt-9 md:pr-[34px] ${
                  i > 0 ? "md:pl-[34px]" : ""
                } ${i < 2 ? "md:border-r md:border-line" : ""}`}
              >
                <div className="mb-5 font-mono text-[13px] text-accent">
                  {pillar.n}
                </div>
                <h3 className="m-0 mb-[14px] font-display text-[23px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">
                  {pillar.h}
                </h3>
                <p className="m-0 text-[16px] leading-[1.62] text-muted">
                  {pillar.p}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}

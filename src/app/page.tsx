import Link from "next/link";
import Image from "next/image";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { FlowCanvas } from "@/components/FlowCanvas";
import { StreamCanvas } from "@/components/StreamCanvas";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { StatusBadge } from "@/components/StatusBadge";
import { BookmanchHubIcon, ProductIcon } from "@/components/ProductIcon";
import {
  products,
  yearsSince,
  caseStudies,
  featuredPress,
  pressItems,
  productHref,
} from "@/lib/site";

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

      {/* ============ FLOW DIVIDER (business flow) ============ */}
      <section
        aria-label="Enabling business flow"
        className="relative h-[clamp(230px,27vh,310px)] overflow-hidden border-b border-line"
        style={{ background: "#0E1013" }}
      >
        <FlowCanvas />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,#0E1013 0%,rgba(14,16,19,0) 22%,rgba(14,16,19,0) 78%,#0E1013 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.3em]"
            style={{ color: "color-mix(in oklab,var(--accent),white 20%)" }}
          >
            Since 1999
          </span>
          <div className="font-display text-[clamp(27px,3.6vw,46px)] font-bold leading-none tracking-[-0.02em] text-[#F6F5EF] text-balance">
            Enabling business flow.
          </div>
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
                  <BookmanchHubIcon />
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
                    href={productHref(p)}
                    target={p.externalUrl ? "_blank" : undefined}
                    rel={p.externalUrl ? "noopener" : undefined}
                    className="group/link inline-flex items-center gap-2 text-[14px] font-medium"
                    style={{
                      color: "color-mix(in oklab,var(--accent),black 18%)",
                    }}
                  >
                    {p.externalUrl ? "Visit site" : "Learn more"}{" "}
                    <span className="font-mono transition-all group-hover/link:translate-x-[4px]">
                      {p.externalUrl ? <>&#8599;</> : <>&rarr;</>}
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
              <Image
                src="/illustrations/ai-vibe-coding.svg"
                alt="Engineer building AI-powered software"
                width={799}
                height={756}
                priority
                className="h-auto w-full max-w-[440px] md:ml-auto"
              />
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

      {/* ============ PROOF / CASE STUDIES ============ */}
      <section
        id="cases"
        className="border-b border-line"
        style={{ background: "#FAF9F3" }}
      >
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10">
          <Reveal className="max-w-[860px]">
            <div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
              03 / Proof
            </div>
            <h2 className="m-0 mb-[18px] font-display text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink text-balance">
              Not slideware. Systems that ran at state scale.
            </h2>
            <p className="m-0 max-w-[64ch] text-[18px] leading-[1.62] text-muted">
              Our products inherit {years} years of mission-critical delivery —
              biometric identity, crore-scale digitization and distributed
              workflows that already run in the field. A selection of the record.
            </p>
          </Reveal>

          <div className="mt-14 flex flex-col gap-[26px]">
            {caseStudies.map((c) => (
              <Reveal
                key={c.title}
                delay={0.05}
                className="group grid grid-cols-1 items-start gap-12 rounded-2xl border border-line p-8 transition-[border-color,box-shadow] duration-300 hover:border-[color-mix(in_oklab,var(--accent)_32%,#E2E0D7)] hover:shadow-[0_18px_44px_-30px_rgba(20,22,27,0.4)] md:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] md:p-10"
                style={{ background: "#FCFBF8" }}
              >
                <div>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-[14px]">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mono">
                      {c.sector}
                    </span>
                    <span className="rounded-full border border-[#DDD9CE] px-[11px] py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#54585F]">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="m-0 mb-4 font-display text-[clamp(23px,2.4vw,30px)] font-bold leading-[1.12] tracking-[-0.02em] text-ink text-balance">
                    {c.title}
                  </h3>
                  <p className="m-0 mb-[22px] max-w-[52ch] text-[16px] leading-[1.62] text-muted">
                    {c.body}
                  </p>
                  <div className="flex items-baseline gap-[10px] border-t border-[#EDEBE2] pt-[18px]">
                    <span className="shrink-0 font-mono text-[12px] text-accent">
                      &rarr;
                    </span>
                    <span className="text-[14px] leading-[1.5] text-[#3F434A]">
                      {c.link}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 border-l border-t border-[#E7E4DA]">
                    {c.stats.map((s) => (
                      <div
                        key={s.label}
                        className="border-b border-r border-[#E7E4DA] px-5 py-[22px]"
                      >
                        <div className="font-display text-[32px] font-bold leading-none tracking-[-0.02em] text-ink">
                          {s.value}
                        </div>
                        <div className="mt-[9px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-mono">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 font-mono text-[11px] tracking-[0.06em] text-[#9A9E96]">
                    {c.meta}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={0.1}
            className="mt-[30px] text-[13px] text-[#9A9E96]"
          >
            Client identities withheld under confidentiality. Named references
            available on request.
          </Reveal>
        </div>
      </section>

      {/* ============ THROUGHPUT BAND (proof → press) ============ */}
      <section
        aria-label="Proven at state scale"
        className="relative h-[clamp(230px,27vh,310px)] overflow-hidden border-t border-line"
        style={{ background: "#0E1013" }}
      >
        <StreamCanvas />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,#0E1013 0%,rgba(14,16,19,0) 24%,rgba(14,16,19,0) 76%,#0E1013 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.3em]"
            style={{ color: "color-mix(in oklab,var(--accent),white 20%)" }}
          >
            250+ projects · every one delivered
          </span>
          <div className="font-display text-[clamp(27px,3.6vw,46px)] font-bold leading-none tracking-[-0.02em] text-[#F6F5EF] text-balance">
            Reliability, at state scale.
          </div>
        </div>
      </section>

      {/* ============ NEWS ROOM ============ */}
      <section
        id="news"
        className="border-b border-line"
        style={{ background: "#FCFBF8" }}
      >
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10">
          <Reveal className="max-w-[920px]">
            <div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
              04 / News Room
            </div>
            <h2 className="m-0 mb-[18px] font-display text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink text-balance">
              In the press.
            </h2>
            <p className="m-0 max-w-[60ch] text-[18px] leading-[1.62] text-muted">
              National and regional coverage of the work — from state-scale
              citizen systems to AI decoding Assam&rsquo;s literary heritage.
            </p>
          </Reveal>

          {/* featured */}
          <Reveal delay={0.05} className="mt-[52px]">
            <a
              href={featuredPress.href}
              target="_blank"
              rel="noopener"
              className="group grid grid-cols-1 overflow-hidden rounded-[18px] border border-line no-underline transition-[border-color,box-shadow] duration-300 hover:border-[color-mix(in_oklab,var(--accent)_34%,#E2E0D7)] hover:shadow-[0_22px_50px_-34px_rgba(20,22,27,0.45)] md:grid-cols-2"
              style={{ background: "#FAF9F3" }}
            >
              <div
                className="relative flex min-h-[340px] flex-col justify-between overflow-hidden p-11"
                style={{
                  background:
                    "linear-gradient(150deg,#1B1D22,#232730 60%,#14161B)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(37,99,235,0.10) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.10) 1px,transparent 1px)",
                    backgroundSize: "26px 26px",
                    WebkitMaskImage:
                      "radial-gradient(120% 100% at 78% 12%,#000,transparent 72%)",
                    maskImage:
                      "radial-gradient(120% 100% at 78% 12%,#000,transparent 72%)",
                  }}
                />
                <div className="relative flex items-center gap-[10px]">
                  <span
                    className="h-[7px] w-[7px] rounded-full bg-accent"
                    style={{
                      boxShadow:
                        "0 0 0 4px color-mix(in oklab,var(--accent) 26%,transparent)",
                    }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#C9C7BE]">
                    {featuredPress.tag}
                  </span>
                </div>
                <div className="relative">
                  <div className="font-display text-[clamp(40px,4vw,60px)] font-bold leading-none tracking-[-0.02em] text-[#F6F5EF]">
                    {featuredPress.stat}
                  </div>
                  <div className="mt-3 max-w-[30ch] font-mono text-[11px] uppercase leading-[1.5] tracking-[0.12em] text-mono">
                    {featuredPress.statLabel}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-[26px] p-11">
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-[13px] font-semibold tracking-[0.01em] text-ink">
                      {featuredPress.source}
                    </span>
                    <span className="h-[3px] w-[3px] rounded-full bg-[#C4C1B7]" />
                    <span className="font-mono text-[12px] text-mono">
                      {featuredPress.year}
                    </span>
                  </div>
                  <h3 className="m-0 mb-[18px] font-display text-[clamp(24px,2.6vw,33px)] font-bold leading-[1.14] tracking-[-0.02em] text-ink text-balance">
                    {featuredPress.title}
                  </h3>
                  <p className="m-0 max-w-[50ch] text-[16px] leading-[1.62] text-muted">
                    {featuredPress.body}
                  </p>
                </div>
                <span className="inline-flex items-center gap-[9px] text-[14px] font-medium text-accent">
                  Read the coverage{" "}
                  <span className="font-mono transition-all group-hover:translate-x-[5px]">
                    &rarr;
                  </span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* list */}
          <div className="mt-[26px] border-t border-[#E7E4DA]">
            {pressItems.map((item) => (
              <Reveal key={item.href} delay={0.05}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className="group grid grid-cols-1 items-center gap-4 border-b border-[#E7E4DA] px-4 py-7 no-underline transition-colors hover:bg-[#F4F2EA] md:grid-cols-[170px_minmax(0,1fr)_auto] md:gap-7"
                >
                  <div className="flex flex-col gap-[6px]">
                    <span className="text-[14px] font-semibold text-ink">
                      {item.source}
                    </span>
                    <span className="font-mono text-[11.5px] tracking-[0.06em] text-[#9A9E96]">
                      {item.date}
                    </span>
                  </div>
                  <h4 className="m-0 font-display text-[clamp(18px,1.7vw,21px)] font-semibold leading-[1.3] tracking-[-0.01em] text-[#25272D] text-balance">
                    {item.title}
                  </h4>
                  <span className="hidden justify-self-end font-mono text-[15px] text-[#B4B2A8] transition-colors group-hover:text-accent md:inline">
                    &rarr;
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* press contact */}
          <Reveal
            delay={0.05}
            className="mt-11 flex flex-wrap items-center justify-between gap-7 rounded-[14px] border border-line px-[30px] py-[26px]"
            style={{ background: "#FAF9F3" }}
          >
            <div className="flex flex-col gap-1">
              <span className="font-display text-[17px] font-semibold text-ink">
                Press &amp; media enquiries
              </span>
              <span className="text-[14.5px] text-[#6E7178]">
                For interviews, briefings or a media kit, reach the
                communications desk.
              </span>
            </div>
            <a
              href="mailto:press@bohniman.com"
              className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-[9px] bg-ink px-[22px] py-3 text-[14px] font-medium text-[#F5F4EF] no-underline transition-colors hover:bg-[#2A2D34]"
            >
              press@bohniman.com{" "}
              <span className="font-mono">&rarr;</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

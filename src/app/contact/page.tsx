import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Bohniman team about our AI products or bespoke software and AI engineering.",
};

export default function ContactPage() {
  return (
    <section>
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* left */}
          <div>
            <div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
              Contact
            </div>
            <h1 className="m-0 mb-6 font-display text-[clamp(34px,4.4vw,54px)] font-bold leading-[1.05] tracking-[-0.015em] text-ink text-balance">
              Let&apos;s build something that lasts.
            </h1>
            <p className="m-0 mb-10 max-w-[46ch] text-[18px] leading-[1.6] text-muted">
              Whether it&apos;s one of our products or a bespoke system, tell us
              what you need. The same team behind our products will get back to
              you.
            </p>

            <div className="flex flex-col gap-6 border-t border-line pt-8">
              <div>
                <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mono">
                  Email
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[17px] text-ink transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mono">
                  Phone
                </div>
                <a
                  href={site.phoneHref}
                  className="text-[17px] text-ink transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mono">
                  Office
                </div>
                <p className="m-0 max-w-[34ch] text-[16px] leading-[1.6] text-muted">
                  {site.address}
                </p>
              </div>
            </div>
          </div>

          {/* right : form */}
          <div className="rounded-2xl border border-line bg-canvas-soft p-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

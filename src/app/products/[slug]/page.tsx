import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StatusBadge } from "@/components/StatusBadge";
import { SamagamHubIcon, ProductIcon } from "@/components/ProductIcon";
import { Reveal } from "@/components/Reveal";
import { products, getProduct } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — ${product.category}`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      {/* hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1240px] px-6 pb-16 pt-16 md:px-10 md:pt-20">
          <Link
            href="/#products"
            className="mb-10 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-mono transition-colors hover:text-accent"
          >
            <span className="font-mono">&larr;</span> Products
          </Link>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mono">
              {product.category}
            </span>
            <StatusBadge status={product.status} size="lg" />
          </div>
          <div className="mb-7 flex items-center gap-5">
            <span className="inline-block">
              {product.flagship ? (
                <SamagamHubIcon />
              ) : (
                <ProductIcon slug={product.slug} />
              )}
            </span>
            <h1 className="m-0 font-display text-[clamp(40px,6vw,72px)] font-bold leading-none tracking-[-0.015em] text-ink">
              {product.name}
            </h1>
          </div>
          <p className="m-0 max-w-[62ch] text-[19px] leading-[1.6] text-muted">
            {product.description}
          </p>
          {product.status !== "COMING SOON" && (
            <div className="mt-9 flex flex-wrap items-center gap-[26px]">
              <a
                href="mailto:hello@bohniman.com"
                className="group inline-flex items-center gap-[9px] text-[15px] font-medium"
                style={{ color: "color-mix(in oklab,var(--accent),black 18%)" }}
              >
                Talk to the team{" "}
                <span className="font-mono transition-all group-hover:translate-x-[5px]">
                  &rarr;
                </span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* features */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10">
          <Reveal className="mb-12 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
            Capabilities
          </Reveal>
          <Reveal className="grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:border-l">
            {product.features.map((f) => (
              <div
                key={f.title}
                className="border-b border-line p-9 sm:border-r"
              >
                <h3 className="m-0 mb-3 font-display text-[21px] font-semibold tracking-[-0.01em] text-ink">
                  {f.title}
                </h3>
                <p className="m-0 text-[16px] leading-[1.6] text-muted">
                  {f.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* other products */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10">
          <div className="mb-10 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
            More from Bohniman
          </div>
          <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:border-l">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
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
                    {p.flagship ? (
                      <SamagamHubIcon />
                    ) : (
                      <ProductIcon slug={p.slug} />
                    )}
                  </span>
                  <h3 className="m-0 font-display text-[27px] font-semibold tracking-[-0.01em] text-ink">
                    {p.name}
                  </h3>
                </div>
                <p className="m-0 text-[15.5px] leading-[1.6] text-[#5A5E66]">
                  {p.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

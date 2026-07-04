import Link from "next/link";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-line"
      style={{
        background: "rgba(245,244,239,0.82)",
        backdropFilter: "saturate(1.3) blur(10px)",
        WebkitBackdropFilter: "saturate(1.3) blur(10px)",
      }}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-[15px] md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Logo color="#17191E" />
        </Link>

        <nav className="hidden items-center gap-[34px] md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-sans text-[15px] text-[#3A3E45] transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA slot — "Book a demo" hidden for now, reserved for future use */}
      </div>
    </header>
  );
}

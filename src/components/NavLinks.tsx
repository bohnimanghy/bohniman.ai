"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { nav } from "@/lib/site";
import { ProductsMenu } from "./ProductsMenu";

export function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hash = href.split("#")[1];
    if (!hash) return;
    // Already on the home page → smooth-scroll instead of a no-op navigation.
    if (pathname === "/") {
      const el = document.getElementById(hash);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${hash}`);
      }
    } else {
      // Coming from another page → navigate home with the hash.
      e.preventDefault();
      router.push(href);
    }
  };

  const isActive = (href: string) => {
    // Anchor links (e.g. "/#products") are section jumps, never "active".
    if (href.startsWith("/#") || href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="hidden items-center gap-9 md:flex">
      {nav.map((item) => {
        if (item.label === "Products") return <ProductsMenu key={item.label} />;
        const active = isActive(item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={
              item.href.includes("#")
                ? (e) => handleHashClick(e, item.href)
                : undefined
            }
            aria-current={active ? "page" : undefined}
            className={`group relative text-[14px] font-medium tracking-[0.01em] transition-colors ${
              active ? "text-ink" : "text-[#5A5E66] hover:text-ink"
            }`}
          >
            {item.label}
            <span
              className={`absolute -bottom-[6px] left-0 h-[2px] rounded-full bg-accent transition-all duration-300 ease-out ${
                active ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

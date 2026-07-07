import type { Metadata } from "next";
import { Schibsted_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollTop } from "@/components/ScrollTop";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bohniman.com"),
  title: {
    default: "Bohniman AI — AI products, built on 26 years of proof",
    template: "%s · Bohniman AI",
  },
  description:
    "Bohniman Systems builds AI products on 26 years of mission-critical engineering — Bookmanch, Kathan AI, Curioversity, Zalpan and Biocrat.",
  icons: { icon: [{ url: "/logo/mark.svg", type: "image/svg+xml" }] },
  openGraph: {
    title: "Bohniman AI — AI products, built on 26 years of proof",
    description:
      "AI products built on 26 years of government-grade engineering discipline.",
    type: "website",
    locale: "en_IN",
    siteName: "Bohniman AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}

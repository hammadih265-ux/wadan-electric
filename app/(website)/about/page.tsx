import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Sun, BatteryCharging, ShieldAlert, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Wadan Electric Store",
  description:
    "Learn about Wadan Electric Store — Pakistan's premier provider of certified Electric Accessories, high-yield Solar Inverters, durable Lithium Batteries, and Fire Safety solutions.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Us | Wadan Electric Store",
    description:
      "Powering homes, businesses, and solar projects with certified electrical gear and fire safety solutions across Pakistan.",
  },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-5xl px-5 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>About Wadan Electric Store</span>
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 mb-6">
          Powering Pakistan with{" "}
          <span className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent">
            Reliable Energy & Safety
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
          Wadan Electric Store was founded with a singular commitment: delivering authentic, top-tier electrical accessories, next-generation solar inverters, long-lasting LiFePO4 lithium batteries, and certified fire safety systems engineered for utmost reliability and durability.
        </p>
      </section>

      {/* 4 Pillars of Wadan Electric Store */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          {
            icon: Zap,
            title: "Electric Accessories",
            description:
              "Certified switches, breakers, industrial cables, surge protectors, and distribution equipment built to international safety standards.",
          },
          {
            icon: Sun,
            title: "Solar Inverters",
            description:
              "Smart hybrid, on-grid, and off-grid solar inverters offering maximum yield, smart monitoring, and long-term efficiency.",
          },
          {
            icon: BatteryCharging,
            title: "Lithium Batteries",
            description:
              "Advanced LiFePO4 chemistry with 6000+ deep cycles for reliable home and commercial solar storage without memory degradation.",
          },
          {
            icon: ShieldAlert,
            title: "Fire Safety Systems",
            description:
              "Industrial-grade fire extinguishers, smoke detection alarms, and emergency suppression equipment protecting lives and assets.",
          },
        ].map((v) => {
          const Icon = v.icon;
          return (
            <div
              key={v.title}
              className="bg-neutral-50 rounded-3xl border border-neutral-200/80 p-6 sm:p-7 text-left transition-all hover:shadow-lg hover:border-[#d4af37]/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-[#d4af37] flex items-center justify-center mb-5 shadow">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-neutral-900 mb-2">
                {v.title}
              </h2>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {v.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Trust & Quality Commitment */}
      <section className="bg-neutral-950 rounded-3xl p-8 sm:p-14 text-center text-white mb-20 relative overflow-hidden shadow-2xl border border-neutral-800">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <blockquote className="text-xl sm:text-3xl font-extrabold leading-snug tracking-tight">
            &ldquo;We don&apos;t just supply electrical hardware. We safeguard homes, empower industries, and engineer sustainable energy.&rdquo;
          </blockquote>
          <p className="mt-6 text-[#d4af37] text-xs font-semibold tracking-widest uppercase">
            — The Wadan Electric Store Quality Standard
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-3">
          Explore Our Catalog
        </h2>
        <p className="text-neutral-500 text-sm max-w-lg mx-auto mb-8">
          Browse our complete range of certified Electric Accessories, Solar Inverters, Lithium Batteries, and Fire Safety solutions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black px-8 py-3.5 rounded-2xl font-semibold shadow-lg shadow-[#d4af37]/20 hover:opacity-95 transition-all"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/923139235476"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neutral-300 bg-white text-neutral-900 px-7 py-3.5 rounded-2xl font-semibold hover:bg-neutral-50 transition-all text-sm"
          >
            Talk to an Expert on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Zap } from "lucide-react";
import type { Banner } from "@/services/banner.service";

interface BannerSliderProps {
  banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  const displayed = banners.slice(0, 5);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + displayed.length) % displayed.length);
  }, [displayed.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % displayed.length);
  }, [displayed.length]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (displayed.length <= 1 || paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [displayed.length, paused, next]);

  if (!displayed.length) return null;

  return (
    <section
      className="relative w-full my-4 sm:my-6 overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-800/80 bg-neutral-950 shadow-2xl"
      style={{ minHeight: 320, height: "clamp(340px, 42vw, 500px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured Highlights Banner"
    >
      <AnimatePresence mode="wait">
        {displayed.map((banner, i) =>
          i === current ? (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {/* Background image */}
              <Image
                src={banner.image_url}
                alt={banner.title}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
                priority={i === 0}
              />

              {/* Multi-layer Dark Gradient Overlay for Maximum Legibility & Mood */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.3) 75%, rgba(10,10,10,0.15) 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)",
                }}
              />

              {/* Subtle Ambient Gold Aura on the Left */}
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Text content */}
              <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-16 lg:px-20">
                <div className="max-w-xl text-left">
                  {/* Brand Tag Pill */}
                  <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-md mb-3 sm:mb-4 shadow-sm"
                  >
                    <Zap className="w-3 h-3 fill-[#d4af37]" />
                    <span>Wadan Electrics · Official</span>
                  </motion.div>

                  {/* Banner Title */}
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="text-white text-2xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight mb-3 sm:mb-4 drop-shadow-md"
                  >
                    {banner.title}
                  </motion.h2>

                  {/* Subtitle */}
                  {banner.subtitle && (
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.45 }}
                      className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 max-w-lg line-clamp-2 sm:line-clamp-3"
                    >
                      {banner.subtitle}
                    </motion.p>
                  )}

                  {/* CTA Button */}
                  {banner.link_href && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.45 }}
                    >
                      <Link
                        href={banner.link_href}
                        className="inline-flex items-center gap-2 rounded-2xl px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold text-black transition-all duration-300 hover:brightness-110 hover:shadow-xl hover:shadow-[#d4af37]/25 active:scale-95"
                        style={{
                          background:
                            "linear-gradient(135deg, #f59e0b 0%, #d4af37 50%, #b8941f 100%)",
                        }}
                      >
                        <span>{banner.link_label ?? "Explore Collection"}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {/* Prev / Next arrows — shown if more than 1 banner */}
      {displayed.length > 1 && (
        <>
          <button
            onClick={prev}
            type="button"
            aria-label="Previous banner"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-neutral-900/80 text-white/90 border border-white/10 backdrop-blur-md transition-all duration-200 hover:bg-neutral-900 hover:text-[#d4af37] hover:border-[#d4af37]/40 active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            type="button"
            aria-label="Next banner"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-neutral-900/80 text-white/90 border border-white/10 backdrop-blur-md transition-all duration-200 hover:bg-neutral-900 hover:text-[#d4af37] hover:border-[#d4af37]/40 active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot / Dash Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
            {displayed.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Go to banner ${idx + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: idx === current ? 26 : 7,
                  height: 6,
                  background:
                    idx === current
                      ? "linear-gradient(90deg, #f59e0b, #d4af37)"
                      : "rgba(255, 255, 255, 0.35)",
                  boxShadow:
                    idx === current
                      ? "0 0 10px rgba(212, 175, 55, 0.5)"
                      : "none",
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

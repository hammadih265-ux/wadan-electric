"use client";

import { memo, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import CollectionCard from "./CollectionCard";
import type { CollectionItem } from "./types";

interface Props {
  items: CollectionItem[];
}

function CollectionShowcase({ items }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section className="border-y border-neutral-200/80 bg-neutral-50/50 py-16 sm:py-20 my-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 mb-3">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Specialized Range</span>
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Explore Our Solutions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
            Explore our specialized systems engineered for high efficiency, smart automation, and certified safety.
          </p>
        </div>

        {/* Slider wrapper */}
        <div className="relative">
          {/* Left arrow — mobile horizontal scroll helper */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-neutral-200 bg-white/90 text-neutral-800 shadow-md backdrop-blur transition-all hover:bg-neutral-950 hover:text-white sm:flex lg:hidden"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-neutral-200 bg-white/90 text-neutral-800 shadow-md backdrop-blur transition-all hover:bg-neutral-950 hover:text-white sm:flex lg:hidden"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Responsive 4-Column Grid on Desktop, Smooth Snap Slider on Mobile */}
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-none sm:gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:overflow-visible"
          >
            {items.map((item, index) => (
              <CollectionCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CollectionShowcase);

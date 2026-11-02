"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CollectionItem } from "./types";

interface Props {
  item: CollectionItem;
  index: number;
}

function CollectionCard({ item, index }: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={prefersReducedMotion ? {} : { duration: 0.5, delay: index * 0.08 }}
      className="snap-center shrink-0 w-[80vw] sm:w-[45vw] lg:w-full"
    >
      <Link
        href={item.href}
        className="group relative block overflow-hidden rounded-3xl aspect-[4/5] border border-neutral-200/80 bg-neutral-900 shadow-md transition-all duration-300 hover:border-[#d4af37]/60 hover:shadow-2xl"
      >
        {/* Category Image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
          quality={80}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />

        {/* Multi-layer Dark Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

        {/* Content pinned to bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-left flex flex-col justify-end">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-1.5 opacity-90">
            Category
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 leading-snug group-hover:text-[#d4af37] transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
            <span>Explore Range</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default memo(CollectionCard);

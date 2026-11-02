"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowUpRight, Zap, Check } from "lucide-react";
import { Product } from "./types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [clicked, setClicked] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
    setClicked(true);
    setTimeout(() => setClicked(false), 1200);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/90 bg-white transition-all duration-300 hover:border-[#d4af37]/60 hover:shadow-2xl hover:shadow-black/5">
      {/* ── Top Micro-Bar ── */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100/70 p-3">
        {/* Ambient Top Micro Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5 items-start">
          {product.sale ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-sm">
              Sale Offer
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono font-medium text-neutral-300 border border-white/10">
              <Zap className="w-2.5 h-2.5 text-[#d4af37]" />
              Certified
            </span>
          )}
        </div>

        {/* Quick View Corner Action */}
        <Link
          href={`/collection/${product.slug}`}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 text-neutral-800 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-neutral-950 hover:text-white shadow-sm"
          aria-label="View product specs"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        {/* Product Image */}
        <Link
          href={`/collection/${product.slug}`}
          className="block h-full w-full"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            loading="lazy"
          />
        </Link>
      </div>

      {/* ── Meta & Price Section ── */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
            <span>Hardware // Spec</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              In Stock
            </span>
          </div>

          <Link href={`/collection/${product.slug}`}>
            <h3 className="line-clamp-2 text-sm sm:text-base font-bold text-neutral-950 group-hover:text-[#d4af37] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-neutral-100  block sm:flex  items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono text-neutral-400 uppercase">
              Price
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-neutral-950">
                Rs {product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-neutral-400 line-through font-mono">
                  Rs {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Bespoke Tech Add Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex items-center gap-1 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm ${
              clicked
                ? "bg-emerald-600 text-white"
                : "bg-neutral-950 text-white hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#b8941f] hover:text-black hover:shadow-md"
            }`}
            aria-label="Add to cart"
          >
            {clicked ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

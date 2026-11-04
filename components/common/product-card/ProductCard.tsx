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
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/90 bg-white transition-all duration-300 hover:border-[#d4af37]/60 hover:shadow-xl hover:shadow-black/5">
      {/* ── Top Micro-Bar ── */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100/70 p-3">
        {/* Ambient Top Micro Badges */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1.5 items-start">
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
          className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-white/90 text-neutral-800 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-neutral-950 hover:text-white shadow-sm"
          aria-label="View product specs"
        >
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400 mb-1 uppercase tracking-wider">
            <span>Hardware // Spec</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              In Stock
            </span>
          </div>

          <Link href={`/collection/${product.slug}`} className="block">
            <h3 className="line-clamp-2 text-xs sm:text-sm font-bold text-neutral-950 group-hover:text-[#d4af37] transition-colors leading-snug min-h-[2rem] sm:min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action Button (Responsive Stacked — Never Crops Button) */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-col gap-2">
          {/* Price Container */}
          <div className="min-w-0">
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-0.5">
              Price
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-sm sm:text-base font-extrabold text-neutral-950 whitespace-nowrap">
                Rs {product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-[11px] sm:text-xs text-neutral-400 line-through font-mono whitespace-nowrap">
                  Rs {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Bespoke Tech Add Button — Full Width & Never Squeezed */}
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full shrink-0 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm ${
              clicked
                ? "bg-emerald-600 text-white"
                : "bg-neutral-950 text-white hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#b8941f] hover:text-black hover:shadow-md"
            }`}
            aria-label="Add to cart"
          >
            {clicked ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 shrink-0" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

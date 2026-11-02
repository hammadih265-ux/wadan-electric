"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, Flame, MessageCircle, Zap } from "lucide-react";
import { Product } from "@/services/product.service";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import ProductCard from "@/components/common/product-card/ProductCard";

interface FeaturedShowcaseProps {
  featuredProducts?: Product[];
  upcomingProducts?: Product[];
}

export default function FeaturedShowcase({
  featuredProducts = [],
  upcomingProducts = [],
}: FeaturedShowcaseProps) {
  const addItemToCart = useCartStore((s) => s.addItem);

  const upcomingItem = upcomingProducts[0];
  const hasFeatured = featuredProducts.length > 0;
  const hasUpcoming = Boolean(upcomingItem);

  if (!hasFeatured && !hasUpcoming) return null;

  const handleAddToCart = (product: { id: string | number; name: string; price: number; image: string }) => {
    addItemToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="container mx-auto my-14 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* ── Upcoming Project / Next Launch Spotlight Banner ── */}
      {hasUpcoming && upcomingItem && (
        <div className="relative mb-14 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-10 lg:p-12 shadow-2xl">
          {/* Ambient Background Light */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#d4af37]/25 via-amber-600/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-gradient-to-tr from-[#d4af37]/15 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4af37]" />
                </span>
                <span>Upcoming Project · Sneak Peek</span>
              </div>

              <h2 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {upcomingItem.name}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
                {upcomingItem.description ||
                  "Engineered for high-yield efficiency, active thermal stability, and maximum durability. Launching soon under Wadan Electrics precision engineering."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/923159686822?text=${encodeURIComponent(
                    `Hi Wadan Electrics! I want to inquire about your upcoming release: ${upcomingItem.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8941f] px-6 py-3 text-sm font-bold text-black shadow-lg shadow-[#d4af37]/20 transition-all hover:brightness-110 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reserve via WhatsApp</span>
                </a>

                <Link
                  href={`/collection/${upcomingItem.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  <span>Technical Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Image Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-4 shadow-xl">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src={
                      upcomingItem.product_images?.[0]?.image_url ||
                      "/placeholder.jpg"
                    }
                    alt={upcomingItem.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-xl bg-black/75 px-3 py-1.5 text-xs font-mono font-bold text-[#d4af37] backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Featured Products Section ── */}
      {hasFeatured && (
        <div>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1">
                <Flame className="w-4 h-4" />
                <span>Handpicked Exclusives</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                Featured Collection
              </h2>
            </div>
            <Link
              href="/collection"
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-[#d4af37] transition-colors"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((p) => {
              const imgUrl =
                p.product_images?.[0]?.image_url || "/placeholder.jpg";
              const isSale = p.compare_at_price
                ? p.compare_at_price > p.price
                : false;

              return (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    slug: p.slug,
                    name: p.name,
                    image: imgUrl,
                    price: p.price,
                    oldPrice: p.compare_at_price ?? undefined,
                    sale: isSale,
                  }}
                  onAddToCart={(cardProduct) =>
                    handleAddToCart({
                      id: cardProduct.id,
                      name: cardProduct.name,
                      price: cardProduct.price,
                      image: cardProduct.image,
                    })
                  }
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}


"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, Flame, MessageCircle } from "lucide-react";
import { Product } from "@/services/product.service";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import ProductCard from "@/components/common/product-card/ProductCard";

interface FeaturedShowcaseProps {
  featuredProducts?: Product[];
  upcomingProducts?: Product[];
}

const fallbackUpcomingItem: Product = {
  id: "upcoming-fallback-1",
  name: "Industrial Hybrid Solar Inverter 10kW",
  description:
    "Engineered for high-yield efficiency, active thermal stability, and maximum durability. Launching soon under Wadan Electric Store precision engineering.",
  price: 245000,
  slug: "industrial-hybrid-solar-inverter-10kw",
  product_images: [{ id: "fb-img-1", image_url: "/categories/solar-inverter.svg", position: 0 }],
} as unknown as Product;

const fallbackFeaturedProducts: Product[] = [
  {
    id: "fallback-f-1",
    name: "Pure Sine Wave Hybrid Solar Inverter 6kW",
    price: 185000,
    compare_at_price: 210000,
    slug: "hybrid-solar-inverter-6kw",
    product_images: [{ id: "fb-img-2", image_url: "/categories/solar-inverter.svg", position: 0 }],
  } as unknown as Product,
  {
    id: "fallback-f-2",
    name: "LiFePO4 48V 100Ah Lithium Storage Battery",
    price: 320000,
    compare_at_price: 350000,
    slug: "lifepo4-48v-100ah-battery",
    product_images: [{ id: "fb-img-3", image_url: "/categories/lithium-battery.svg", position: 0 }],
  } as unknown as Product,
  {
    id: "fallback-f-3",
    name: "Triple Pole AC/DC Molded Circuit Breaker",
    price: 14500,
    compare_at_price: 16500,
    slug: "triple-pole-circuit-breaker",
    product_images: [{ id: "fb-img-4", image_url: "/categories/electric-accessories.svg", position: 0 }],
  } as unknown as Product,
  {
    id: "fallback-f-4",
    name: "Automatic Cabinet Dry Powder Fire Extinguisher",
    price: 8500,
    compare_at_price: 9800,
    slug: "automatic-cabinet-fire-extinguisher",
    product_images: [{ id: "fb-img-5", image_url: "/categories/fire-safety.svg", position: 0 }],
  } as unknown as Product,
];

export default function FeaturedShowcase({
  featuredProducts = [],
  upcomingProducts = [],
}: FeaturedShowcaseProps) {
  const addItemToCart = useCartStore((s) => s.addItem);
  const [upcomingImgLoaded, setUpcomingImgLoaded] = useState(false);
  const [upcomingImgSrc, setUpcomingImgSrc] = useState<string | null>(null);

  // If Supabase hasn't returned records yet, show verified hardware placeholders
  const upcomingItem = upcomingProducts[0] || fallbackUpcomingItem;
  const activeFeatured =
    featuredProducts.length > 0 ? featuredProducts : fallbackFeaturedProducts;

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

  const upcomingImageUrl =
    upcomingImgSrc ||
    upcomingItem?.product_images?.[0]?.image_url ||
    "/placeholder.svg";

  return (
    <section className="container mx-auto my-14 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* ── Spotlight / Upcoming Tech Release ── */}
      {upcomingItem && (
        <div className="mb-16 relative overflow-hidden rounded-3xl bg-neutral-950 text-white border border-neutral-800 shadow-2xl">
          {/* Ambient Spotlight Background */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Tech Overview */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#d4af37] mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Next-Gen Engineering · Upcoming Release</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {upcomingItem.name}
                </h2>

                <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed">
                  {upcomingItem.description ||
                    "Engineered for high-yield efficiency, active thermal stability, and maximum durability. Launching soon under Wadan Electric Store precision engineering."}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href={`https://wa.me/923139235476?text=${encodeURIComponent(
                      `Hi Wadan Electric Store! I want to inquire about your upcoming release: ${upcomingItem.name}`
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
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-900">
                    {!upcomingImgLoaded && (
                      <div className="absolute inset-0 z-0 bg-neutral-900 animate-pulse rounded-xl" />
                    )}

                    <Image
                      src={upcomingImageUrl}
                      alt={upcomingItem.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className={`object-cover transition-all duration-700 hover:scale-105 ${
                        upcomingImgLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setUpcomingImgLoaded(true)}
                      onError={() => {
                        setUpcomingImgSrc("/placeholder.svg");
                        setUpcomingImgLoaded(true);
                      }}
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
        </div>
      )}

      {/* ── Featured Products Section ── */}
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
          {activeFeatured.map((p) => {
            const imgUrl =
              p.product_images?.[0]?.image_url || "/placeholder.svg";
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
    </section>
  );
}

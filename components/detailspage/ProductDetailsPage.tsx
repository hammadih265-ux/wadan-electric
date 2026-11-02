"use client";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import RelatedProducts, { RelatedProduct } from "./RelatedProducts";
import { useEffect } from "react";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { MessageCircle, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";

interface ProductDetailsPageProps {
  product: {
    id: string;
    slug?: string;
    name: string;
    price: number;
    oldPrice?: number;
    description: string;
    rating?: number;
    reviews?: number;
    stock?: number;
    images: {
      id: string;
      url: string;
      alt?: string;
    }[];
  };
  relatedProducts?: RelatedProduct[];
}

export default function ProductDetailsPage({
  product,
  relatedProducts = [],
}: ProductDetailsPageProps) {
  const addItem = useRecentlyViewedStore((s) => s.addItem);

  useEffect(() => {
    if (product?.id) {
      addItem({
        id: product.id,
        slug: product.slug || product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images?.[0]?.url || "/placeholder.jpg",
        sale: product.oldPrice ? product.oldPrice > product.price : false,
      });
    }
  }, [product, addItem]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Product Images */}
        <div className="lg:sticky lg:top-24 h-fit animate-in fade-in slide-in-from-left-5 duration-700">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Information */}
        <ProductInfo
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            description: product.description,
            rating: product.rating,
            reviews: product.reviews,
            stock: product.stock,
            image: product.images[0]?.url,
          }}
        />
      </section>

      {/* Engineering Consultation Callout (Bespoke Tech Bar) */}
      <section className="mt-16 rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#d4af37]/20 via-amber-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#d4af37] mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Engineering Advisory Service</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Need Inverter Sizing, Battery Calculations, or Fire Safety Specs?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Our certified electrical engineers provide load analysis, solar single-line diagrams (SLD), and system compatibility checks for residential and commercial projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/923159686822?text=${encodeURIComponent(
                `Hi Wadan Electrics! I would like to consult an engineer regarding ${product.name} and system compatibility.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8941f] px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-lg shadow-[#d4af37]/20 transition hover:brightness-110 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consult Lead Engineer</span>
            </a>

            <div className="flex items-center gap-2 text-xs text-neutral-400 border border-white/10 rounded-xl px-4 py-3 bg-white/5">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>IEC & NFPA Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </main>
  );
}

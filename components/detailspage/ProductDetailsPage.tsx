"use client";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import RelatedProducts, { RelatedProduct } from "./RelatedProducts";
import { useEffect } from "react";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { MessageCircle, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";
import { STORE_CONTACT } from "@/components/common/SocialIcons";

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
        image: product.images?.[0]?.url || "/placeholder.svg",
      });
    }
  }, [product, addItem]);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Product Hero */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div className="w-full">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Info */}
        <div className="w-full">
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
              image: product.images?.[0]?.url,
            }}
          />
        </div>
      </div>

      {/* Engineering Consultation Strip */}
      <section className="mt-16 sm:mt-24 rounded-3xl bg-neutral-950 p-6 sm:p-10 border border-neutral-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
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
              href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                `Hi Wadan Electric Store! I would like to consult an engineer regarding ${product.name} and system compatibility.`
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

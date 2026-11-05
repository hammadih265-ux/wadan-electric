"use client";

import { Heart, ShieldCheck, Truck, Star, Zap, Wrench, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantitySelector from "./QuantitySelector";
import { useState } from "react";
import AddToCartButton from "./AddCardBtn";
import { STORE_CONTACT } from "@/components/common/SocialIcons";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    description: string;
    rating?: number;
    reviews?: number;
    stock?: number;
    image?: string;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const discount =
    product.oldPrice &&
    Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );

  const inStock = product.stock === undefined || product.stock > 0;

  return (
    <div className="flex flex-col space-y-7 animate-in fade-in slide-in-from-right-5 duration-700">
      {/* Micro-Badges & Status */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {inStock ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              In Stock · Fast Dispatch
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600">
              Out of Stock · Backorder Available
            </span>
          )}

          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-mono font-medium text-neutral-700">
            <Zap className="w-3 h-3 text-[#d4af37]" />
            IEC / CE Compliant
          </span>

          {discount && (
            <span className="inline-flex items-center rounded-full bg-neutral-950 px-3 py-1 text-xs font-mono font-bold text-[#d4af37]">
              {discount}% OFF
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950 leading-tight">
          {product.name}
        </h1>

        {/* Rating & Hardware Verification */}
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating || 5)
                    ? "fill-[#d4af37] text-[#d4af37]"
                    : "text-neutral-200"
                }`}
              />
            ))}
          </div>

          <span className="font-semibold text-neutral-800">
            {product.rating || "5.0"}
          </span>
          <span className="text-neutral-400">·</span>
          <span className="text-neutral-500">
            ({product.reviews || 12} verified installations)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-4">
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Rs {product.price.toLocaleString()}
        </span>

        {product.oldPrice && (
          <span className="text-base sm:text-lg text-neutral-400 line-through">
            Rs {product.oldPrice.toLocaleString()}
          </span>
        )}

        <span className="ml-auto text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 bg-amber-100/60 px-2.5 py-1 rounded-md">
          PKR · Dispatch on Payment Slip Verification
        </span>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
          Technical Overview & Features
        </h3>

        <p className="text-sm leading-relaxed text-neutral-700">
          {product.description}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          <QuantitySelector value={quantity} onChange={setQuantity} />

          <Button
            variant="outline"
            size="icon"
            onClick={() => setLiked(!liked)}
            className="h-12 w-12 rounded-xl border-neutral-300 transition-all hover:border-neutral-900 active:scale-95"
            aria-label="Wishlist"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                liked ? "fill-red-500 text-red-500" : "text-neutral-700"
              }`}
            />
          </Button>

          <a
            href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
              `Hi Wadan Electric Store! I need engineering consultation & sizing for: ${product.name} (Qty: ${quantity})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 text-xs sm:text-sm font-semibold text-neutral-800 transition-all hover:border-[#d4af37] hover:bg-neutral-50 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>

        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          }}
          quantity={quantity}
        />
      </div>

      {/* Industrial Engineering Assurances */}
      <div className="grid gap-3 pt-6 border-t border-neutral-200 sm:grid-cols-3">
        <Feature
          icon={<ShieldCheck className="w-5 h-5 text-[#d4af37]" />}
          title="Certified Hardware"
          text="100% genuine industrial components & factory test certificates"
        />

        <Feature
          icon={<Truck className="w-5 h-5 text-[#d4af37]" />}
          title="Insured Direct Transit"
          text="Heavy-duty crating & fast dispatch upon payment slip verification across Pakistan"
        />

        <Feature
          icon={<Wrench className="w-5 h-5 text-[#d4af37]" />}
          title="Engineering Support"
          text={`Direct WhatsApp sizing & support at ${STORE_CONTACT.phoneFormatted}`}
        />
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-3.5 transition-all duration-200 hover:border-[#d4af37]/40 hover:bg-neutral-50">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-white">
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-bold text-neutral-900">{title}</h4>
        <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">
          {text}
        </p>
      </div>
    </div>
  );
}

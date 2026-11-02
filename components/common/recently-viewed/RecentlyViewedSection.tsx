"use client";

import { useEffect, useState } from "react";
import { Clock, Trash2 } from "lucide-react";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import ProductCard from "@/components/common/product-card/ProductCard";

export default function RecentlyViewedSection() {
  const [mounted, setMounted] = useState(false);
  const items = useRecentlyViewedStore((s) => s.items);
  const clearItems = useRecentlyViewedStore((s) => s.clearItems);
  const addItemToCart = useCartStore((s) => s.addItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  const handleAddToCart = (item: {
    id: string | number;
    name: string;
    price: number;
    image: string;
  }) => {
    addItemToCart({
      id: String(item.id),
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    toast.success(`${item.name} added to cart`);
  };

  return (
    <section className="container mx-auto my-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-neutral-900 rounded-xl text-white">
            <Clock className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              Recently Inspected Hardware
            </h2>
            <p className="text-xs text-neutral-500">
              Quick access to products and systems you recently viewed
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            clearItems();
            toast.info("Recently viewed history cleared");
          }}
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-red-600 transition-colors self-start sm:self-center font-mono"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              slug: product.slug,
              name: product.name,
              image: product.image,
              price: product.price,
              oldPrice: product.oldPrice,
              sale: product.sale,
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
        ))}
      </div>
    </section>
  );
}

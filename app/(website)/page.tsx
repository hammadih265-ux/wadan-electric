import type { Metadata } from "next";
import Features from "@/components/common/card/Features";
import BannerSlider from "@/components/common/hero/BannerSlider";
import Marquee from "@/components/common/marquee/Marquee";
import ProductsGrid from "@/components/common/product-card/ProductsGrid";
import ProductsHydrator from "@/components/common/product-card/ProductsHydrator";
import CollectionShowcase from "@/components/common/showcase/CollectionShowcase";
import FeaturedShowcase from "@/components/common/featured/FeaturedShowcase";
import RecentlyViewedSection from "@/components/common/recently-viewed/RecentlyViewedSection";
import PopupModal from "@/components/common/popup/PopupModal";
import { getCategories } from "@/services/category.service";
import { getCategorySlug } from "@/lib/utils";
import {
  getLatestProducts,
  getFeaturedProducts,
  getUpcomingProducts,
  Product,
} from "@/services/product.service";
import { getBanners } from "@/services/banner.service";
import type { CollectionItem } from "@/components/common/showcase/types";
import type { Banner } from "@/services/banner.service";

// Revalidate every 60 seconds for ISR — keeps products/categories/banners fresh
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Wadan Electrics | Electric Accessories, Solar Inverter, Lithium Battery & Fire Safety",
  description:
    "Shop premium Electric Accessories, high-efficiency Solar Inverters, durable Lithium Batteries, and certified Fire Safety equipment at Wadan Electrics. Quality-tested power & protection solutions nationwide.",
  alternates: { canonical: "/" },
  keywords: [
    "Wadan Electrics",
    "Electric Accessories",
    "Solar Inverter",
    "Lithium Battery",
    "Fire Safety",
    "Solar Inverters Pakistan",
    "LiFePO4 battery",
    "Smoke detectors",
    "Circuit breakers",
    "Hybrid inverters",
  ],
  openGraph: {
    url: "/",
    title: "Wadan Electrics | Premium Electric, Solar & Fire Safety Solutions",
    description: "Quality Electric Accessories, Solar Inverters, Lithium Batteries, and Fire Safety equipment.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Wadan Electrics" }],
  },
};

export default async function Home() {
  let dbProducts: Product[] = [];
  try {
    dbProducts = await getLatestProducts(8);
  } catch {
    // ignore error in server component context
  }

  let featuredProducts: Product[] = [];
  try {
    featuredProducts = await getFeaturedProducts(4);
  } catch {
    // ignore error in server component context
  }

  let upcomingProducts: Product[] = [];
  try {
    upcomingProducts = await getUpcomingProducts(1);
  } catch {
    // ignore error in server component context
  }

  let showcaseItems: CollectionItem[] = [];
  try {
    const cats = await getCategories();
    if (cats && cats.length > 0) {
      showcaseItems = cats.map((cat) => ({
        id: cat.id,
        title: cat.name,
        image: cat.image_url ?? "/placeholder.jpg",
        href: `/collection?category=${getCategorySlug(cat)}`,
      }));
    } else {
      // High-converting defaults matching user requested categories
      showcaseItems = [
        {
          id: "electric-accessories",
          title: "Electric Accessories",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
          href: "/collection?category=electric-accessories",
        },
        {
          id: "solar-inverter",
          title: "Solar Inverter",
          image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80",
          href: "/collection?category=solar-inverter",
        },
        {
          id: "lithium-battery",
          title: "Lithium Battery",
          image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
          href: "/collection?category=lithium-battery",
        },
        {
          id: "fire-safety",
          title: "Fire Safety",
          image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80",
          href: "/collection?category=fire-safety",
        },
      ];
    }
  } catch {
    // ignore error in server component context
  }

  let banners: Banner[] = [];
  try {
    banners = await getBanners();
  } catch {
    // ignore error in server component context
  }

  // Map DB shape → lightweight UI shape used by ProductCard / Zustand
  const mappedProducts = dbProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    image: p.product_images?.[0]?.image_url ?? "/placeholder.jpg",
    price: p.price,
    oldPrice: p.compare_at_price || undefined,
    sale: p.compare_at_price ? p.compare_at_price > p.price : false,
  }));

  return (
    <main className="container mx-auto sm:max-w-7xl">
      {/* Promotional & Announcement Popup Ad */}
      <PopupModal />

      {/*
       * ProductsHydrator is a tiny "use client" component that pushes
       * server-fetched products into Zustand so any client component
       * can access them instantly.
       */}
      <ProductsHydrator products={mappedProducts} />

      {/* Hero Banner Slider */}
      <BannerSlider banners={banners} />

      {/* Dynamic Marquee with Electrical & Solar Highlights */}
      <Marquee
        speed={20}
        items={[
          "⚡ Electric Accessories & Smart Distribution",
          "☀️ High Efficiency Hybrid Solar Inverters",
          "🔋 Long-Life LiFePO4 Lithium Batteries",
          "🧯 Certified Fire Safety & Detection Systems",
          "🚚 Fast Shipping Nationwide Across Pakistan",
          "💵 Cash On Delivery Available",
        ]}
      />

      <Features />

      {/* Featured Exclusives & Upcoming Projects Spotlight */}
      <FeaturedShowcase
        featuredProducts={featuredProducts}
        upcomingProducts={upcomingProducts}
      />

      {/* Categories Showcase */}
      <CollectionShowcase items={showcaseItems} />

      {/* Latest Products Grid */}
      {mappedProducts.length > 0 ? (
        <ProductsGrid products={mappedProducts} />
      ) : (
        <section className="container mx-auto my-10 max-w-5xl rounded-2xl bg-neutral-50 px-6 py-16 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-neutral-800">
            Products Coming Soon
          </h2>
          <p className="mx-auto mb-6 max-w-md text-neutral-500">
            Our online catalog is currently updating with the latest solar and electrical items. Check back soon or contact us on WhatsApp.
          </p>
        </section>
      )}

      {/* Recently Viewed Products */}
      <RecentlyViewedSection />
    </main>
  );
}

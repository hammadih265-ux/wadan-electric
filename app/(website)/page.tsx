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
  title: "Wadan Electric Store | Electric Accessories, Solar Inverter, Lithium Battery & Fire Safety",
  description:
    "Shop premium Electric Accessories, high-efficiency Solar Inverters, durable Lithium Batteries, and certified Fire Safety equipment at Wadan Electric Store. Quality-tested power & protection solutions nationwide.",
  alternates: { canonical: "/" },
  keywords: [
    "Wadan Electric Store",
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
    title: "Wadan Electric Store | Premium Electric, Solar & Fire Safety Solutions",
    description: "Quality Electric Accessories, Solar Inverters, Lithium Batteries, and Fire Safety equipment.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Wadan Electric Store" }],
  },
};

const fallbackDefaultProducts = [
  {
    id: "fallback-prod-1",
    slug: "hybrid-solar-inverter-6kw",
    name: "Pure Sine Wave Hybrid Solar Inverter 6kW",
    price: 185000,
    oldPrice: 210000,
    sale: true,
    image: "/categories/solar-inverter.svg",
  },
  {
    id: "fallback-prod-2",
    slug: "lifepo4-48v-100ah-battery",
    name: "LiFePO4 48V 100Ah Lithium Storage Battery",
    price: 320000,
    oldPrice: 350000,
    sale: false,
    image: "/categories/lithium-battery.svg",
  },
  {
    id: "fallback-prod-3",
    slug: "molded-case-circuit-breaker",
    name: "Triple Pole AC/DC Molded Circuit Breaker",
    price: 14500,
    oldPrice: 16500,
    sale: false,
    image: "/categories/electric-accessories.svg",
  },
  {
    id: "fallback-prod-4",
    slug: "automated-fire-suppression",
    name: "Automatic Cabinet Dry Powder Fire Extinguisher",
    price: 8500,
    oldPrice: 9500,
    sale: true,
    image: "/categories/fire-safety.svg",
  },
];

export default async function Home() {
  // Parallel resilient data fetching to prevent blocking or build timeouts
  const [latestRes, featuredRes, upcomingRes, categoriesRes, bannersRes] =
    await Promise.allSettled([
      getLatestProducts(8),
      getFeaturedProducts(4),
      getUpcomingProducts(1),
      getCategories(),
      getBanners(),
    ]);

  const dbProducts: Product[] =
    latestRes.status === "fulfilled" ? latestRes.value || [] : [];
  const featuredProducts: Product[] =
    featuredRes.status === "fulfilled" ? featuredRes.value || [] : [];
  const upcomingProducts: Product[] =
    upcomingRes.status === "fulfilled" ? upcomingRes.value || [] : [];
  const cats =
    categoriesRes.status === "fulfilled" ? categoriesRes.value || [] : [];
  const banners: Banner[] =
    bannersRes.status === "fulfilled" ? bannersRes.value || [] : [];

  let showcaseItems: CollectionItem[] = [];

  if (cats && cats.length > 0) {
    showcaseItems = cats.map((cat) => ({
      id: cat.id,
      title: cat.name,
      image: cat.image_url ?? "/placeholder.svg",
      href: `/collection?category=${getCategorySlug(cat)}`,
    }));
  } else {
    // Branded high-converting local SVGs without external dummy dependencies
    showcaseItems = [
      {
        id: "electric-accessories",
        title: "Electric Accessories",
        image: "/categories/electric-accessories.svg",
        href: "/collection?category=electric-accessories",
      },
      {
        id: "solar-energy-storage",
        title: "Solar & Energy Storage",
        image: "/categories/solar-storage.svg",
        href: "/collection?category=solar-energy-storage",
      },
      {
        id: "home-automation",
        title: "Home Automation",
        image: "/categories/home-automation.svg",
        href: "/collection?category=home-automation",
      },
      {
        id: "fire-safety",
        title: "Fire Safety",
        image: "/categories/fire-safety.svg",
        href: "/collection?category=fire-safety",
      },
    ];
  }

  // Map DB shape → lightweight UI shape used by ProductCard / Zustand
  const mappedProducts = dbProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    image: p.product_images?.[0]?.image_url || "/placeholder.svg",
    price: p.price,
    oldPrice: p.compare_at_price || undefined,
    sale: p.compare_at_price ? p.compare_at_price > p.price : false,
  }));

  // If Supabase hasn't returned products yet at first, show hardware placeholders
  const activeProducts =
    mappedProducts.length > 0 ? mappedProducts : fallbackDefaultProducts;

  return (
    <main className="container mx-auto sm:max-w-7xl">
      {/* Promotional & Announcement Popup Ad */}
      <PopupModal />

      {/*
       * ProductsHydrator is a tiny "use client" component that pushes
       * server-fetched products into Zustand so any client component
       * can access them instantly.
       */}
      <ProductsHydrator products={activeProducts} />

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
          "💳 Send Payment Slip via WhatsApp for Quick Dispatch",
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
      <ProductsGrid products={activeProducts} />

      {/* Recently Viewed Products */}
      <RecentlyViewedSection />
    </main>
  );
}

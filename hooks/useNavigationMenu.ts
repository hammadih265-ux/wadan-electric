import { useMemo } from "react";
import { useCategories } from "./useCategories";
import type { MenuItem } from "@/components/headers/types";
import { getCategorySlug } from "@/lib/utils";

// Stable SEO-friendly defaults for Wadan Electric Store
// Ensures search engine bots and initial page loads always see crawlable links
const DEFAULT_CATEGORIES: { title: string; slug: string }[] = [
  {
    title: "Electric Accessories",
    slug: "accessories",
  },
  {
    title: "Solar & Energy Storage",
    slug: "solar",
  },
  {
    title: "Home Automation",
    slug: "automation",
  },
  {
    title: "Fire Safety",
    slug: "fire-safety",
  },
];

export function useNavigationMenu(): MenuItem[] {
  const { data: categories } = useCategories();

  return useMemo(() => {
    const shopChildren: MenuItem[] = [
      {
        title: "All Products",
        href: "/collection",
      },
    ];

    if (categories && categories.length > 0) {
      // Dynamic categories directly from Supabase
      // Using slug for SEO readability, with ID as fallback
      categories.forEach((cat) => {
        shopChildren.push({
          title: cat.name,
          href: `/collection?category=${getCategorySlug(cat)}`,
        });
      });
    } else {
      // Stable fallbacks while Supabase is hydrating / during SSR
      DEFAULT_CATEGORIES.forEach((cat) => {
        shopChildren.push({
          title: cat.title,
          href: `/collection?category=${cat.slug}`,
        });
      });
    }

    // Dynamically match primary highlight links to real Supabase categories if available
    const solarCat = categories?.find(
      (c) =>
        c.slug?.includes("solar") ||
        c.name?.toLowerCase().includes("solar"),
    );

    const fireCat = categories?.find(
      (c) =>
        c.slug?.includes("fire") ||
        c.name?.toLowerCase().includes("fire"),
    );

    const solarHref = solarCat
      ? `/collection?category=${getCategorySlug(solarCat)}`
      : "/collection?category=solar-inverter";

    const fireHref = fireCat
      ? `/collection?category=${getCategorySlug(fireCat)}`
      : "/collection?category=fire-safety";

    return [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Collection",
        href: "/collection",
      },
      {
        title: "Solutions",
        children: shopChildren,
      },
      {
        title: "Solar Solutions",
        href: solarHref,
      },
      {
        title: "Fire Safety",
        href: fireHref,
      },
    ];
  }, [categories]);
}

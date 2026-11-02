import { useMemo } from "react";
import { useCategories } from "./useCategories";
import type { MenuItem } from "@/components/headers/types";

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
      categories.forEach((cat) => {
        shopChildren.push({
          title: cat.name,
          href: `/collection?category=${cat.id}`,
        });
      });
    } else {
      // Fallback defaults for Wadan Electrics while loading or if DB categories are initializing
      shopChildren.push(
        {
          title: "Electric Accessories",
          href: "/collection?category=electric-accessories",
        },
        {
          title: "Solar Inverter",
          href: "/collection?category=solar-inverter",
        },
        {
          title: "Lithium Battery",
          href: "/collection?category=lithium-battery",
        },
        {
          title: "Fire Safety",
          href: "/collection?category=fire-safety",
        },
      );
    }

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
        title: "Categories",
        children: shopChildren,
      },
      {
        title: "Solar Solutions",
        href: "/collection?category=solar-inverter",
      },
      {
        title: "Fire Safety",
        href: "/collection?category=fire-safety",
      },
    ];
  }, [categories]);
}

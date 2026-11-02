import type { Metadata } from "next";
import { Suspense } from "react";
import CollectionFilters from "./ReusableFilter";

import { getFilteredProducts, Product } from "@/services/product.service";
import ProductCardWithCart from "./ProductCardWithCart";

export const revalidate = 60;

export function generateStaticParams() {
  return [];
}

export const metadata: Metadata = {
  title: "Collection | Wadan Electrics",
  description:
    "Browse our full collection of Electric Accessories, Solar Inverters, Lithium Batteries, and Fire Safety equipment. Filter by category and price. Free shipping nationwide.",
  alternates: { canonical: "/collection" },
  openGraph: {
    url: "/collection",
    title: "Collection | Wadan Electrics",
    description:
      "Browse premium Electric Accessories, Solar Inverters, Lithium Batteries, and Fire Safety gear at Wadan Electrics.",
  },
};

interface Props {
  searchParams: Promise<{
    category?: string;
    min?: string;
    max?: string;
    page?: string;
    search?: string;
  }>;
}

const PRODUCTS_PER_PAGE = 12;

// ── Filter skeleton shown while CollectionFilters hydrates ────────────────────
function FilterSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-10 rounded-xl bg-neutral-100" />
      <div className="h-10 rounded-xl bg-neutral-100" />
      <div className="h-10 rounded-xl bg-neutral-100" />
    </div>
  );
}

export default async function CollectionPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category;
  const minPrice = Number(params.min) || undefined;
  const maxPrice = Number(params.max) || undefined;
  const page = Number(params.page) || 1;
  const search = params.search;

  let filteredData: {
    products: Product[];
    total: number | null;
    page: number;
    limit: number;
  } = { products: [], total: 0, page, limit: PRODUCTS_PER_PAGE };

  try {
    filteredData = await getFilteredProducts({
      category_id: category,
      min_price: minPrice,
      max_price: maxPrice,
      search,
      page,
      limit: PRODUCTS_PER_PAGE,
    });
  } catch {
    // ignore error in server component context
  }

  const mappedProducts = filteredData.products.map((p: Product) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    image: p.product_images?.[0]?.image_url || "/placeholder.jpg",
    price: p.price,
    oldPrice: p.compare_at_price || undefined,
    sale: p.compare_at_price ? p.compare_at_price > p.price : false,
  }));

  const totalPages = Math.ceil((filteredData.total || 0) / PRODUCTS_PER_PAGE);

  const paginationBase = [
    category ? `category=${category}` : "",
    minPrice ? `min=${minPrice}` : "",
    maxPrice ? `max=${maxPrice}` : "",
    search ? `search=${encodeURIComponent(search)}` : "",
  ]
    .filter(Boolean)
    .join("&");

  return (
    /* overflow-x-hidden stops the filter panel or any child from
       causing a horizontal scrollbar on narrow viewports */
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ── Page heading ─────────────────────────────────────────────── */}
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
            Collection
          </h1>
          {filteredData.total != null && filteredData.total > 0 && (
            <p className="mt-1 text-sm text-neutral-500">
              {filteredData.total}{" "}
              {filteredData.total === 1 ? "product" : "products"}
            </p>
          )}
        </div>

        {/* ── Layout: stack on mobile → side-by-side on lg ─────────────── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* Filter — full-width on mobile (accordion), fixed sidebar on lg */}
          <div className="w-full lg:w-64 xl:w-72 lg:flex-shrink-0 lg:sticky lg:top-4">
            <Suspense fallback={<FilterSkeleton />}>
              <CollectionFilters />
            </Suspense>
          </div>

          {/* Products — takes remaining space, min-w-0 prevents flex overflow */}
          <div className="min-w-0 flex-1">
            {mappedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {mappedProducts.map((product) => (
                    <ProductCardWithCart
                      key={String(product.id)}
                      product={product}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav
                    aria-label="Pagination"
                    className="mt-10 flex flex-wrap justify-center gap-2"
                  >
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      const href = `/collection?page=${pageNum}${paginationBase ? `&${paginationBase}` : ""}`;
                      return (
                        <a
                          key={pageNum}
                          href={href}
                          aria-label={`Page ${pageNum}`}
                          aria-current={page === pageNum ? "page" : undefined}
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-medium transition-colors ${
                            page === pageNum
                              ? "border-black bg-black text-white"
                              : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                          }`}
                        >
                          {pageNum}
                        </a>
                      );
                    })}
                  </nav>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-6 py-20 text-center">
                <h3 className="mb-2 text-xl font-semibold text-neutral-800">
                  No Products Found
                </h3>
                <p className="mx-auto max-w-sm text-neutral-500">
                  We couldn&apos;t find any products matching your selection.
                  Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

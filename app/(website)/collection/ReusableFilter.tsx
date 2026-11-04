"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useCategories } from "@/hooks/useCategories";
import { getCategorySlug } from "@/lib/utils";

// ─── Debounce helper ──────────────────────────────────────────────────────────
function useDebounce(fn: (value: string) => void, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (value: string) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(value), delay);
    },
    [fn, delay],
  );
}

// ─── Chevron icon ─────────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 flex-shrink-0 text-neutral-500 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CollectionFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState(params.get("search") ?? "");
  const [minValue, setMinValue] = useState(params.get("min") ?? "");
  const [maxValue, setMaxValue] = useState(params.get("max") ?? "");

  // Mobile: is the whole filter panel open?
  const [panelOpen, setPanelOpen] = useState(false);

  const updateFilter = useCallback(
    (updates: Record<string, string>) => {
      const query = new URLSearchParams(params.toString());
      query.delete("page");
      Object.entries(updates).forEach(([key, value]) => {
        if (value) query.set(key, value);
        else query.delete(key);
      });
      startTransition(() => {
        router.push(`/collection?${query.toString()}`);
      });
    },
    [params, router],
  );

  const pushSearch = useCallback(
    (value: string) => updateFilter({ search: value }),
    [updateFilter],
  );
  const pushMin = useCallback(
    (value: string) => updateFilter({ min: value }),
    [updateFilter],
  );
  const pushMax = useCallback(
    (value: string) => updateFilter({ max: value }),
    [updateFilter],
  );

  const debouncedSearch = useDebounce(pushSearch, 400);
  const debouncedMin = useDebounce(pushMin, 500);
  const debouncedMax = useDebounce(pushMax, 500);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  const handleMin = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMinValue(e.target.value);
      debouncedMin(e.target.value);
    },
    [debouncedMin],
  );

  const handleMax = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMaxValue(e.target.value);
      debouncedMax(e.target.value);
    },
    [debouncedMax],
  );

  const clearAll = useCallback(() => {
    setSearchValue("");
    setMinValue("");
    setMaxValue("");
    startTransition(() => router.push("/collection"));
  }, [router]);

  const activeFilters = useMemo(() => {
    let count = 0;
    if (params.get("search")) count++;
    if (params.get("min")) count++;
    if (params.get("max")) count++;
    if (params.get("category")) count++;
    return count;
  }, [params]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <aside className="w-full">
      {/* ── Mobile toggle button (hidden on lg+) ─────────────────────────── */}
      <button
        type="button"
        aria-expanded={panelOpen}
        aria-controls="filter-panel"
        onClick={() => setPanelOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition hover:bg-neutral-50 lg:hidden"
      >
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-neutral-700">
          {isPending ? (
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18M7 12h10M11 20h2"
              />
            </svg>
          )}
          Filters
          {activeFilters > 0 && (
            <span className="rounded-full bg-black px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
              {activeFilters}
            </span>
          )}
        </span>
        <Chevron open={panelOpen} />
      </button>

      {/* ── Filter panel ─────────────────────────────────────────────────── */}
      {/* Mobile: toggle-controlled. Desktop (lg+): always visible */}
      <div
        id="filter-panel"
        className={[
          // mobile: show/hide based on panelOpen, with subtle slide
          "mt-3 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm",
          panelOpen ? "block" : "hidden",
          // desktop: always show, no border/shadow (embedded in the page)
          "lg:mt-0 lg:block lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none",
        ].join(" ")}
      >
        <div className="space-y-5 p-4 lg:p-0">
          {/* ── Header row (desktop only) + clear button ─────────────── */}
          <div className="flex items-center justify-between">
            <h2 className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-400 lg:flex">
              Filters
              {isPending && (
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
              )}
            </h2>
            {activeFilters > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-auto text-xs font-medium text-red-500 underline underline-offset-2 hover:text-red-700"
              >
                Clear all ({activeFilters})
              </button>
            )}
          </div>

          {/* ── Search ───────────────────────────────────────────────── */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Search
            </h3>
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                id="filter-search"
                type="search"
                value={searchValue}
                placeholder="Search products…"
                onChange={handleSearch}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-9 pr-3 text-sm placeholder-neutral-400 outline-none transition focus:border-neutral-700 focus:bg-white focus:ring-2 focus:ring-neutral-100"
              />
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* ── Price Range ───────────────────────────────────────────── */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Price Range
            </h3>
            {/* Stack price inputs vertically on very small screens,
                side-by-side from sm+ */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative min-w-0 flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                  ₨
                </span>
                <input
                  id="filter-min-price"
                  type="number"
                  inputMode="decimal"
                  value={minValue}
                  placeholder="Min"
                  min={0}
                  onChange={handleMin}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-7 pr-2 text-sm placeholder-neutral-400 outline-none transition focus:border-neutral-700 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                />
              </div>

              <span className="hidden shrink-0 text-lg leading-none text-neutral-300 sm:block">
                —
              </span>

              <div className="relative min-w-0 flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                  ₨
                </span>
                <input
                  id="filter-max-price"
                  type="number"
                  inputMode="decimal"
                  value={maxValue}
                  placeholder="Max"
                  min={0}
                  onChange={handleMax}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-7 pr-2 text-sm placeholder-neutral-400 outline-none transition focus:border-neutral-700 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                />
              </div>
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* ── Categories ───────────────────────────────────────────── */}
          <CategoryFilter onUpdate={updateFilter} currentParams={params} />
        </div>
      </div>
    </aside>
  );
}

// ─── Category sub-component ───────────────────────────────────────────────────
interface CategoryFilterProps {
  onUpdate: (updates: Record<string, string>) => void;
  currentParams: ReturnType<typeof useSearchParams>;
}

function CategoryFilter({ onUpdate, currentParams }: CategoryFilterProps) {
  const { data: categories, isLoading, isError } = useCategories();
  const activeCategory = currentParams.get("category") ?? "";

  const categoryList = useMemo(
    () =>
      (categories ?? []).map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })),
    [categories],
  );

  const handleSelect = useCallback(
    (id: string) => {
      onUpdate({ category: activeCategory === id ? "" : id });
    },
    [activeCategory, onUpdate],
  );

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
        Category
      </h3>

      {isLoading && (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 rounded-xl bg-neutral-100" />
          ))}
        </div>
      )}

      {(isError || (!isLoading && categoryList.length === 0)) && (
        <p className="text-xs text-neutral-400">No categories available.</p>
      )}

      {!isLoading && categoryList.length > 0 && (
        <ul className="space-y-1">
          {categoryList.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <li key={cat.id}>
                <button
                  id={`filter-cat-${cat.slug}`}
                  type="button"
                  onClick={() => handleSelect(cat.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {/* Checkbox indicator */}
                  <span
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                      isActive
                        ? "border-white bg-white"
                        : "border-neutral-300 bg-white"
                    }`}
                  >
                    {isActive && (
                      <svg
                        className="h-2.5 w-2.5 text-neutral-900"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="flex-1 truncate text-left">{cat.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

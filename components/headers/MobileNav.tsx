"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useNavigationMenu } from "@/hooks/useNavigationMenu";
import { useCartStore, useUIStore } from "@/store";

interface MenuItem {
  title: string;
  href?: string;
  children?: MenuItem[];
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const router = useRouter();
  const menu = useNavigationMenu();

  const toggleCartDrawer = useUIStore((state) => state.toggleCartDrawer);

  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [stack, setStack] = useState<MenuItem[][]>([]);
  const [titles, setTitles] = useState<string[]>(["Menu"]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const current = stack.length > 0 ? stack[stack.length - 1] : menu;
  const currentTitle = titles[titles.length - 1] || "Menu";

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStack([]);
        setTitles(["Menu"]);
        setSearchQuery("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    router.push(`/collection?search=${encodeURIComponent(query)}`);

    setSearchQuery("");
    onClose();
  }

  function openChildren(item: MenuItem) {
    if (!item.children) return;

    setStack((prev) => [...prev, item.children!]);
    setTitles((prev) => [...prev, item.title]);
  }

  function goBack() {
    if (stack.length === 0) return;

    setStack((prev) => prev.slice(0, -1));
    setTitles((prev) => prev.slice(0, -1));
  }

  function handleCartClick() {
    onClose();
    toggleCartDrawer();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 28,
            }}
            className="fixed left-0 top-0 z-50 flex h-screen w-[340px] max-w-[90vw] flex-col bg-neutral-950 text-white border-r border-neutral-800 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 px-6 py-5">
              <div className="flex items-center gap-3">
                {stack.length > 0 && (
                  <button
                    onClick={goBack}
                    className="p-1 -ml-1 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <h2 className="text-lg font-bold tracking-tight text-white">
                  {currentTitle}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-1 -mr-1 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <motion.div
              key={currentTitle}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              className="flex-1 overflow-y-auto p-4 sm:p-5"
            >
              <ul className="space-y-1.5">
                {current.map((item, index) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.04,
                    }}
                  >
                    {item.children ? (
                      <button
                        onClick={() => openChildren(item)}
                        className="group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-neutral-200 transition-colors hover:bg-neutral-900 hover:text-[#d4af37]"
                      >
                        <span>{item.title}</span>
                        <ChevronRight
                          size={18}
                          className="text-neutral-500 group-hover:text-[#d4af37] transition-colors"
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        className="block rounded-xl px-4 py-3.5 text-sm font-semibold text-neutral-200 transition-colors hover:bg-neutral-900 hover:text-[#d4af37]"
                      >
                        {item.title}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="px-5 pb-4">
              <div className="flex items-center gap-2.5 rounded-xl border border-neutral-800 bg-neutral-900/90 px-3.5 py-2.5 transition-colors focus-within:border-[#d4af37]/60">
                <Search size={16} className="flex-shrink-0 text-neutral-400" />

                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search accessories, solar, batteries…"
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
                />
              </div>
            </form>

            {/* Footer */}
            <div className="border-t border-neutral-800/80 p-5 bg-neutral-950">
              <div className="flex justify-around">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex flex-col items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-[#d4af37]"
                >
                  <User size={20} />
                  <span>Account</span>
                </Link>

                <button
                  onClick={() => searchInputRef.current?.focus()}
                  className="flex flex-col items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-[#d4af37]"
                >
                  <Search size={20} />
                  <span>Search</span>
                </button>

                <button
                  onClick={handleCartClick}
                  className="relative flex flex-col items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-[#d4af37]"
                >
                  <div className="relative">
                    <ShoppingBag size={20} />
                    {cartCount > 0 && (
                      <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] px-1 text-[9px] font-extrabold text-black shadow-sm">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span>Cart</span>
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

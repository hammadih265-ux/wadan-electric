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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
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
            className="fixed left-0 top-0 z-50 flex h-screen w-[340px] max-w-[90vw] flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div className="flex items-center gap-3">
                {stack.length > 1 && (
                  <button onClick={goBack}>
                    <ChevronLeft />
                  </button>
                )}

                <h2 className="text-lg font-semibold">{currentTitle}</h2>
              </div>

              <button onClick={onClose}>
                <X />
              </button>
            </div>

            {/* Navigation */}
            <motion.div
              key={currentTitle}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              className="flex-1 overflow-y-auto p-5"
            >
              <ul className="space-y-2">
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
                        className="flex w-full items-center justify-between rounded-xl px-4 py-4 transition hover:bg-zinc-100"
                      >
                        <span className="font-medium">{item.title}</span>

                        <ChevronRight size={18} />
                      </button>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={onClose}
                       
                        className="block rounded-xl px-4 py-4 transition hover:bg-zinc-100"
                      >
                        {item.title}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="px-6 pb-4">
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5">
                <Search size={16} className="flex-shrink-0 text-zinc-400" />

                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search accessories, solar, batteries…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                />
              </div>
            </form>

            {/* Footer */}
            <div className="border-t p-6">
              <div className="flex justify-around">
                <Link
                  href="/login"
                  onClick={onClose}
                 
                  className="flex flex-col items-center gap-2 text-sm transition-colors hover:text-zinc-600"
                >
                  <User size={22} />
                  Account
                </Link>

                <button
                  onClick={() => searchInputRef.current?.focus()}
                  className="flex flex-col items-center gap-2 text-sm transition-colors hover:text-zinc-600"
                >
                  <Search size={22} />
                  Search
                </button>

                <button
                  onClick={handleCartClick}
                  className="relative flex flex-col items-center gap-2 text-sm transition-colors hover:text-zinc-600"
                >
                  <ShoppingBag size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-[10px] font-bold text-black shadow-sm">
                      {cartCount}
                    </span>
                  )}
                  Cart
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

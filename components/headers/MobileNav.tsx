"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Search,
  ShoppingBag,
  X,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useNavigationMenu } from "@/hooks/useNavigationMenu";
import { useCartStore, useUIStore } from "@/store";
import {
  STORE_CONTACT,
  FacebookIcon,
  TikTokIcon,
} from "@/components/common/SocialIcons";

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
            className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-sm flex-col bg-neutral-950 text-white shadow-2xl border-r border-neutral-800"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800/80 px-5 py-4">
              <span className="font-heading text-base font-extrabold tracking-wider text-white">
                Wadan Electric Store
              </span>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Back button */}
            {stack.length > 0 && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 border-b border-neutral-800/80 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-[#d4af37]"
              >
                <ChevronLeft size={16} />
                <span>Back to {titles[titles.length - 2]}</span>
              </button>
            )}

            {/* Title */}
            <div className="border-b border-neutral-800/80 px-5 py-3.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                {currentTitle}
              </span>
            </div>

            {/* Menu List */}
            <motion.div
              key={currentTitle}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="flex-1 overflow-y-auto px-3 py-3"
            >
              <ul className="space-y-1">
                {current?.map((item) => (
                  <motion.li
                    key={item.title}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                  >
                    {item.children ? (
                      <button
                        onClick={() => openChildren(item)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-neutral-200 transition-colors hover:bg-neutral-900 hover:text-[#d4af37]"
                      >
                        <span>{item.title}</span>
                        <ChevronRight size={16} className="text-neutral-500" />
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
            <form onSubmit={handleSearchSubmit} className="px-5 pb-3">
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

            {/* Contact & Social Strip */}
            <div className="px-5 py-3 border-t border-neutral-800/80 bg-neutral-900/40">
              <div className="flex items-center justify-between text-xs">
                <a
                  href={`tel:${STORE_CONTACT.phone}`}
                  className="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 transition"
                >
                  <Phone size={13} className="text-[#d4af37]" />
                  <span>{STORE_CONTACT.phone}</span>
                </a>
                <div className="flex items-center gap-2.5">
                  <a
                    href={STORE_CONTACT.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={STORE_CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-[#1877F2] text-white transition"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-800/80 p-4 bg-neutral-950">
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

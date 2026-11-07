"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X, LogIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useUIStore, useCartStore } from "@/store";

export default function Header() {
  const mobileOpen = useUIStore((state) => state.mobileMenu);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const toggleCartDrawer = useUIStore((state) => state.toggleCartDrawer);

  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const listener = () => {
      setScrolled(window.scrollY > 20);
    };
    listener();
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  // Close search and user menu on outside click or Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
        setSearchQuery("");
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/collection?search=${encodeURIComponent(searchQuery.trim())}`,
      );
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  function toggleSearch() {
    setSearchOpen((prev) => !prev);
    if (searchOpen) setSearchQuery("");
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200/80 dark:border-neutral-800 shadow-lg"
            : "bg-white dark:bg-neutral-950 border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-28 pt-2 max-w-8xl items-center justify-between sm:px-6 px-3">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="lg:hidden"
          >
            <Menu className="h-7 w-7" />
          </button>

          {/* ── Logo ── */}
          {/* Hidden on mobile while search is expanded to avoid crowding/overflow; always visible on sm+ */}
          <motion.div
            animate={{
              opacity: searchOpen ? 0 : 1,
              scale: searchOpen ? 0.9 : 1,
            }}
            transition={{ duration: 0.15 }}
            className={searchOpen ? "hidden sm:block" : "block"}
          >
            <Link
              href="/"
              className="relative h-25 w-25 sm:h-40 sm:w-40 block mt-5  sm:mt-10 ml-10 md:ml-8 lg:ml-0"
            >
              <Image
                unoptimized
                src="/logo.png"
                alt="Logo"
                width={138}
                height={138}
                priority
              />
            </Link>
          </motion.div>

          {/* ── Desktop Navigation & Social Glowing Icons ── */}
          <DesktopNav />

          <div className="flex items-center sm:gap-5  gap-3">
            {/* ── Inline Search ── */}
            <div
              ref={searchContainerRef}
              className="relative flex items-center"
            >
              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    key="search-bar"
                    onSubmit={handleSearchSubmit}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="overflow-hidden mr-2"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search accessories, solar, batteries…"
                      className="w-full rounded-full border border-zinc-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-neutral-900 dark:text-neutral-100 px-4 py-1.5 text-sm outline-none ring-0 focus:border-[#d4af37] dark:focus:border-[#d4af37] transition-colors placeholder:text-zinc-400 dark:placeholder:text-neutral-500"
                    />
                  </motion.form>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={toggleSearch}
                aria-label="Toggle search"
                type="button"
                className="flex-shrink-0"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {searchOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="search"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Search className="h-7 w-7" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* ── User Menu ── */}
            <div ref={userMenuRef} className={`relative   sm:block hidden`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setUserMenuOpen((prev) => !prev)}
                aria-label="Account menu"
                type="button"
              >
                <User className="h-7 w-7" />
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-44 rounded-2xl border border-zinc-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="border-t border-zinc-100 dark:border-neutral-800" />
                    <Link
                      href="/login"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <LogIn size={15} /> Sign In
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Cart ── */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={toggleCartDrawer}
              className={`relative ${searchOpen ? "hidden sm:block" : "block"}`}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-[11px] font-bold text-black shadow-md shadow-[#d4af37]/30 animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileNav open={mobileOpen} onClose={toggleMobileMenu} />
        )}
      </AnimatePresence>
    </>
  );
}

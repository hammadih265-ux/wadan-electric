"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Sparkles, Tag, ArrowRight, Check } from "lucide-react";
import { getActivePopups, PopupAd } from "@/services/popup.service";
import { toast } from "sonner";

export default function PopupModal() {
  const [popup, setPopup] = useState<PopupAd | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    async function loadPopup() {
      try {
        const popups = await getActivePopups();
        if (!popups || popups.length === 0) return;

        // Find the first popup that hasn't been closed in this session
        const eligible = popups.find((p) => {
          if (!p.is_active) return false;
          if (p.show_once_per_session) {
            const hasSeen = sessionStorage.getItem(`wadan_popup_${p.id}`);
            if (hasSeen) return false;
          }
          return true;
        });

        if (eligible) {
          setPopup(eligible);
          const delay = eligible.show_delay_ms || 2500;
          timeoutId = setTimeout(() => {
            setIsOpen(true);
          }, delay);
        }
      } catch (err) {
        // Silent fail for non-critical marketing popups
        console.error("Popup check:", err);
      }
    }

    loadPopup();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!isOpen || !popup) return null;

  const handleClose = () => {
    if (popup.show_once_per_session) {
      sessionStorage.setItem(`wadan_popup_${popup.id}`, "true");
    }
    setIsOpen(false);
  };

  const handleCopyCode = () => {
    if (popup.discount_code) {
      navigator.clipboard.writeText(popup.discount_code);
      setCopied(true);
      toast.success(`Discount code "${popup.discount_code}" copied!`);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-neutral-950 border border-neutral-800 text-white shadow-2xl shadow-black/80 animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close offer"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 transition-all border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Optional Image */}
        {popup.image_url && (
          <div className="relative w-full h-48 sm:h-56 bg-neutral-900 overflow-hidden">
            <Image
              src={popup.image_url}
              alt={popup.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {popup.popup_type === "discount"
                ? "Special Offer"
                : popup.popup_type === "new_arrival"
                ? "New Arrival"
                : "Limited Deal"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            {popup.title}
          </h2>

          {/* Description */}
          {popup.description && (
            <p className="text-sm text-neutral-300 leading-relaxed mb-5">
              {popup.description}
            </p>
          )}

          {/* Discount Code Box if provided */}
          {popup.discount_code && (
            <div className="mb-6 flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#d4af37]" />
                <span className="text-xs uppercase text-neutral-400">
                  Use Code:
                </span>
                <span className="font-mono font-bold text-white tracking-widest text-sm">
                  {popup.discount_code}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#d4af37] text-black hover:bg-[#c49f2e] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
          )}

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            {popup.link_href && (
              <Link
                href={popup.link_href}
                onClick={handleClose}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black font-semibold text-sm shadow-lg shadow-[#d4af37]/20 hover:opacity-95 transition-all"
              >
                <span>{popup.link_label || "Explore Collection"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="py-3 px-5 rounded-2xl text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              No thanks, continue browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


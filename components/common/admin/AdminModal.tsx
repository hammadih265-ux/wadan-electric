"use client";

import React from "react";
import { X } from "lucide-react";

interface AdminModalProps {
  title: string;
  onClose: () => void;
  maxWidth?: string;
  children: React.ReactNode;
}

/**
 * Generic dark glassmorphic modal shell used across all admin pages.
 */
export function AdminModal({
  title,
  onClose,
  maxWidth = "max-w-xl",
  children,
}: AdminModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={`relative w-full ${maxWidth} rounded-2xl p-7 overflow-y-auto max-h-[90vh] bg-white dark:bg-[#141414] border border-neutral-200 dark:border-white/10 shadow-2xl text-neutral-900 dark:text-neutral-100`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100 dark:border-white/10">
          <h2 className="text-neutral-900 dark:text-white text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-white transition-colors p-1 rounded-lg"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

"use client";

import { Search, X } from "lucide-react";

interface AdminSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Admin search bar with icon and clear button.
 */
export function AdminSearchBar({
  value,
  onChange,
  placeholder = "Search…",
}: AdminSearchBarProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white dark:bg-white/[0.04] border border-neutral-200 dark:border-white/10 shadow-sm"
    >
      <Search size={15} className="text-neutral-400 dark:text-neutral-500" />
      <input
        className="flex-1 bg-transparent text-neutral-900 dark:text-white text-sm outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button onClick={() => onChange("")} aria-label="Clear search">
          <X size={14} className="text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-white" />
        </button>
      )}
    </div>
  );
}

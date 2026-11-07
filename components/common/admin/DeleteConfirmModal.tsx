"use client";

import { Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  /** The name/title of the entity being deleted — shown in the message */
  entityName: string;
  /** Label shown in the heading e.g. "product", "category". Defaults to "item" */
  entityLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

/**
 * Reusable delete-confirmation dialog shared by all admin pages.
 */
export function DeleteConfirmModal({
  entityName,
  entityLabel = "item",
  onConfirm,
  onCancel,
  loading,
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div
        className="relative rounded-2xl p-7 w-full max-w-sm text-center bg-white dark:bg-[#141414] border border-neutral-200 dark:border-white/10 shadow-2xl"
      >
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/15 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-600 dark:text-red-400" />
        </div>
        <p className="text-neutral-900 dark:text-white font-medium mb-1 capitalize">
          Delete {entityLabel}?
        </p>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
          &quot;{entityName}&quot; will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

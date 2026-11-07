"use client";

import React from "react";

interface AdminTableProps {
  /** Column header labels */
  headers: string[];
  isLoading: boolean;
  /** True when data is loaded but the (filtered) result is empty */
  isEmpty: boolean;
  /** Icon shown in the empty state */
  emptyIcon: React.ReactNode;
  emptyText: string;
  children: React.ReactNode;
}

/**
 * Shared admin table shell: dark rounded border, themed thead, loading row, empty state row.
 * Pass `<tr>` elements as children for the tbody.
 */
export function AdminTable({
  headers,
  isLoading,
  isEmpty,
  emptyIcon,
  emptyText,
  children,
}: AdminTableProps) {
  const colSpan = headers.length;

  return (
    <div
      className="rounded-2xl overflow-x-auto bg-white dark:bg-[#111] border border-neutral-200 dark:border-white/10 shadow-sm"
    >
      <table className="w-full min-w-[650px] text-sm">
        <thead>
          <tr className="bg-neutral-50 dark:bg-white/[0.03] border-b border-neutral-200 dark:border-white/10">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-5 py-3.5 text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-widest font-medium"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-white/5">
          {isLoading && (
            <tr>
              <td
                colSpan={colSpan}
                className="text-center text-neutral-400 dark:text-neutral-500 py-16 text-sm"
              >
                Loading…
              </td>
            </tr>
          )}
          {!isLoading && isEmpty && (
            <tr>
              <td colSpan={colSpan} className="text-center py-16">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-neutral-300 dark:text-neutral-700">{emptyIcon}</span>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm">{emptyText}</p>
                </div>
              </td>
            </tr>
          )}
          {!isLoading && !isEmpty && children}
        </tbody>
      </table>
    </div>
  );
}

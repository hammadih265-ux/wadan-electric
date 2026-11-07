"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllPopupsAdmin,
  createPopupAd,
  updatePopupAd,
  deletePopupAd,
  updatePopupAdStatus,
  type PopupAd,
  type CreatePopupAdInput,
} from "@/services/popup.service";
import ImageUpload from "@/components/common/image-upload/ImageUpload";
import { deleteImage } from "@/components/common/image-upload/upload";
import { Pencil, Trash2, Sparkles, Check, X, Tag } from "lucide-react";

import {
  AdminModal,
  DeleteConfirmModal,
  AdminPageHeader,
  AdminSearchBar,
  AdminTable,
  AdminPagination,
  statusColors,
} from "@/components/common/admin";

// ─── Popup Form Modal ─────────────────────────────────────────
function PopupFormModal({
  popup,
  onClose,
}: {
  popup?: PopupAd | null;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const isEdit = !!popup;

  const [formData, setFormData] = useState({
    title: popup?.title ?? "",
    description: popup?.description ?? "",
    image_url: popup?.image_url ?? "",
    popup_type: popup?.popup_type ?? "discount",
    discount_code: popup?.discount_code ?? "",
    link_href: popup?.link_href ?? "/collection",
    link_label: popup?.link_label ?? "Shop Now",
    show_delay_ms: popup?.show_delay_ms ?? 2500,
    show_once_per_session: popup?.show_once_per_session ?? true,
    is_active: popup?.is_active ?? true,
    sort_order: popup?.sort_order ?? 0,
  });

  const [error, setError] = useState<string | null>(null);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload: CreatePopupAdInput = {
        title: formData.title,
        description: formData.description || null,
        image_url: formData.image_url || null,
        popup_type: formData.popup_type as CreatePopupAdInput["popup_type"],
        discount_code: formData.discount_code || null,
        link_href: formData.link_href || null,
        link_label: formData.link_label || null,
        show_delay_ms: Number(formData.show_delay_ms || 2500),
        show_once_per_session: formData.show_once_per_session,
        is_active: formData.is_active,
        sort_order: Number(formData.sort_order || 0),
      };

      if (isEdit) {
        if (popup?.image_url && popup.image_url !== formData.image_url) {
          await deleteImage(popup.image_url, "popup-images");
        }
        return updatePopupAd(popup!.id, payload);
      } else {
        return createPopupAd(payload);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "popups"] });
      onClose();
    },
    onError: (e: unknown) =>
      setError(e instanceof Error ? e.message : "Save failed"),
  });

  return (
    <AdminModal
      title={isEdit ? "Edit Popup Announcement" : "Create New Popup / Deal"}
      onClose={onClose}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-1.5">
            Popup Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
            placeholder="e.g. Flash Sale: 20% OFF Everything!"
            className="admin-input"
          />
        </div>

        {/* Type & Discount Code */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-1.5">
              Popup Category
            </label>
            <select
              value={formData.popup_type}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  popup_type: e.target.value as typeof p.popup_type,
                }))
              }
              className="admin-input"
            >
              <option value="discount">Discount / Coupon</option>
              <option value="promotional">Promotional Deal</option>
              <option value="new_arrival">New Arrival Spotlight</option>
              <option value="announcement">Store Announcement</option>
              <option value="newsletter">Newsletter Signup</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-1.5">
              Discount Code (Optional)
            </label>
            <input
              type="text"
              value={formData.discount_code}
              onChange={(e) =>
                setFormData((p) => ({ ...p, discount_code: e.target.value.toUpperCase() }))
              }
              placeholder="e.g. WADAN20"
              className="admin-input"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-1.5">
            Description
          </label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            placeholder="Exclusive limited-time offer for our valued customers. Apply code at checkout."
            className="admin-input resize-none"
          />
        </div>

        {/* Image Upload with WebP */}
        <div>
          <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-2">
            Popup Banner Image (WebP auto-optimized)
          </label>
          <ImageUpload
            bucket="popup-images"
            folder="popups"
            value={formData.image_url}
            onChange={(url) => {
              const finalUrl = Array.isArray(url) ? url[0] || "" : url;
              setFormData((p) => ({ ...p, image_url: finalUrl }));
            }}
          />
          <div className="mt-2">
            <input
              type="text"
              value={formData.image_url}
              onChange={(e) =>
                setFormData((p) => ({ ...p, image_url: e.target.value }))
              }
              placeholder="Or direct image URL"
              className="admin-input text-xs"
            />
          </div>
        </div>

        {/* Link URL and Label */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-1.5">
              Target Link URL
            </label>
            <input
              type="text"
              value={formData.link_href}
              onChange={(e) => setFormData((p) => ({ ...p, link_href: e.target.value }))}
              placeholder="/collection"
              className="admin-input"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-1.5">
              Button Text
            </label>
            <input
              type="text"
              value={formData.link_label}
              onChange={(e) => setFormData((p) => ({ ...p, link_label: e.target.value }))}
              placeholder="Claim Offer"
              className="admin-input"
            />
          </div>
        </div>

        {/* Timing & Switches */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-1.5">
              Delay (ms)
            </label>
            <input
              type="number"
              value={formData.show_delay_ms}
              onChange={(e) =>
                setFormData((p) => ({ ...p, show_delay_ms: Number(e.target.value) }))
              }
              className="admin-input"
            />
          </div>

          <div className="flex flex-col justify-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.show_once_per_session}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    show_once_per_session: e.target.checked,
                  }))
                }
                className="rounded border-neutral-300 dark:border-neutral-700 text-[#d4af37] focus:ring-[#d4af37] h-4 w-4 bg-white dark:bg-white/5 cursor-pointer"
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">Once/Session</span>
            </label>
          </div>

          <div className="flex flex-col justify-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    is_active: e.target.checked,
                  }))
                }
                className="rounded border-neutral-300 dark:border-neutral-700 text-[#d4af37] focus:ring-[#d4af37] h-4 w-4 bg-white dark:bg-white/5 cursor-pointer"
              />
              <span className="text-xs text-[#b8941f] dark:text-[#d4af37] font-semibold">Active Live</span>
            </label>
          </div>
        </div>

        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending || !formData.title}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-black disabled:opacity-50 transition-all cursor-pointer"
            style={{
              background: "linear-gradient(135deg,#d4af37,#b8941f)",
              boxShadow: "0 4px 16px rgba(212,175,55,0.3)",
            }}
          >
            {saveMutation.isPending
              ? "Saving…"
              : isEdit
                ? "Save Changes"
                : "Publish Popup"}
          </button>
        </div>
      </div>
    </AdminModal>
  );
}

// ─── Main Admin Popups Page ───────────────────────────────────
const TABLE_HEADERS = ["Popup Title", "Type", "Code", "Link", "Status", "Actions"];
const PAGE_SIZE = 8;

export default function AdminPopupsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editPopup, setEditPopup] = useState<PopupAd | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PopupAd | null>(null);

  const { data: popups = [], isLoading } = useQuery({
    queryKey: ["admin", "popups"],
    queryFn: getAllPopupsAdmin,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      updatePopupAdStatus(id, active),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "popups"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const target = popups.find((p) => p.id === id);
      if (target?.image_url) {
        await deleteImage(target.image_url, "popup-images");
      }
      return deletePopupAd(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "popups"] });
      setDeleteTarget(null);
    },
  });

  const filtered = popups.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.discount_code && p.discount_code.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div>
      {(showForm || editPopup) && (
        <PopupFormModal
          popup={editPopup}
          onClose={() => {
            setShowForm(false);
            setEditPopup(null);
          }}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          entityName={deleteTarget.title}
          entityLabel="popup offer"
          loading={deleteMutation.isPending}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="space-y-6">
        <AdminPageHeader
          title="Pop-up Ads & Deals"
          subtitle={`${popups.length} total popup announcements`}
          addLabel="Create Popup"
          addButtonId="add-popup-btn"
          onAdd={() => setShowForm(true)}
        />

        <AdminSearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setCurrentPage(1);
          }}
          placeholder="Search by title, coupon or description…"
        />

        <AdminTable
          headers={TABLE_HEADERS}
          isLoading={isLoading}
          isEmpty={paginated.length === 0}
          emptyIcon={<Sparkles size={32} />}
          emptyText="No popup deals yet — click Create Popup to add one"
        >
          {paginated.map((p, i) => {
            const c = statusColors[p.is_active ? "active" : "inactive"];
            return (
              <tr
                key={p.id}
                className="hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors border-t border-neutral-100 dark:border-white/[0.04]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-neutral-200 dark:border-white/10"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                        <Sparkles size={16} className="text-[#b8941f] dark:text-[#d4af37]" />
                      </div>
                    )}
                    <div>
                      <p className="text-neutral-900 dark:text-white font-medium text-sm leading-snug">
                        {p.title}
                      </p>
                      {p.description && (
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 max-w-xs mt-0.5">
                          {p.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-xs font-medium capitalize text-neutral-700 dark:text-neutral-300">
                  {p.popup_type}
                </td>
                <td className="px-5 py-4">
                  {p.discount_code ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#d4af37]/15 text-[#b8941f] dark:text-[#d4af37] border border-[#d4af37]/30">
                      <Tag className="w-3 h-3" />
                      {p.discount_code}
                    </span>
                  ) : (
                    <span className="text-neutral-400 dark:text-neutral-500 text-xs">—</span>
                  )}
                </td>
                <td className="px-5 py-4 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  {p.link_href || "—"}
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() =>
                      toggleMutation.mutate({ id: p.id, active: !p.is_active })
                    }
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-opacity hover:opacity-75"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {p.is_active ? <Check size={10} /> : <X size={10} />}
                    {p.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditPopup(p)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-[#b8941f] dark:hover:text-[#d4af37] hover:bg-[#d4af37]/10 dark:text-neutral-500 transition-all cursor-pointer"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 dark:text-neutral-500 transition-all cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </AdminTable>

        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}


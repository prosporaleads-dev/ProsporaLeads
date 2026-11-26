"use client";

import { useState, type FormEvent } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { useFaqsCrud } from "@/hooks/admin";
import { Modal } from "@/components/admin/shared/modal";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import { StatusBadge } from "@/components/admin/shared/status-badge";
import { EmptyState } from "@/components/admin/shared/empty-state";
import type { AdminFaq, FaqPayload } from "@/types/admin";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-brand-navy outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15";

const emptyFaq: FaqPayload = {
  question: "",
  answer: "",
  category: "General",
  sortOrder: 0,
  isPublished: true,
};

export function FaqsManager({
  initialFaqs = [],
}: {
  initialFaqs?: AdminFaq[];
}) {
  const {
    faqs,
    categories,
    stats,
    loading,
    saving,
    deletingId,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    refresh,
    createFaq,
    updateFaq,
    togglePublish,
    deleteFaq,
  } = useFaqsCrud(initialFaqs);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminFaq | null>(null);
  const [form, setForm] = useState<FaqPayload>(emptyFaq);
  const [deleteTarget, setDeleteTarget] = useState<AdminFaq | null>(null);

  function openCreate() {
    setEditing(null);
    setForm({ ...emptyFaq, sortOrder: stats.total + 1 });
    setModalOpen(true);
  }

  function openEdit(faq: AdminFaq) {
    setEditing(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "General",
      sortOrder: faq.sortOrder,
      isPublished: faq.isPublished,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload: FaqPayload = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      category: form.category.trim() || "General",
      sortOrder: Number.isFinite(form.sortOrder) ? form.sortOrder : 0,
      isPublished: form.isPublished,
    };

    const result = editing
      ? await updateFaq(editing.id, payload)
      : await createFaq(payload);
    if (result) setModalOpen(false);
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const ok = await deleteFaq(deleteTarget.id);
    if (ok) setDeleteTarget(null);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-brand-navy">
            FAQs
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage frequently asked questions, categories, ordering, and
            visibility.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => void refresh()}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-teal-dark"
          >
            <Plus size={16} />
            New FAQ
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total FAQs", value: stats.total },
          { label: "Published", value: stats.published },
          { label: "Hidden", value: stats.hidden },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border bg-white p-4"
          >
            <p className="text-xs font-medium text-slate-500">{item.label}</p>
            <p className="mt-1.5 font-heading text-2xl font-extrabold text-brand-navy">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers…"
            className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-brand-navy outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm font-medium text-brand-navy outline-none focus:border-brand-teal"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "ALL" ? "All categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-28 animate-pulse rounded-2xl border border-border bg-white"
            />
          ))}
        </div>
      ) : faqs.length === 0 ? (
        <EmptyState
          icon={<HelpCircle size={22} />}
          title="No FAQs found"
          description={
            search || categoryFilter !== "ALL"
              ? "Try clearing your search or category filter."
              : "Add your first FAQ to answer common prospect questions."
          }
          action={
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-teal-dark"
            >
              <Plus size={16} /> Create FAQ
            </button>
          }
        />
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="rounded-2xl border border-border bg-white p-5 shadow-xs transition hover:border-brand-teal/40 hover:shadow-soft"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                      {faq.category || "General"}
                    </span>
                    <StatusBadge
                      status={faq.isPublished ? "PUBLISHED" : "HIDDEN"}
                    />
                    <span className="text-xs text-slate-400">
                      Order #{faq.sortOrder}
                    </span>
                  </div>
                  <h2 className="mt-2.5 font-heading text-base font-bold text-brand-navy">
                    {faq.question}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => void togglePublish(faq)}
                    disabled={saving}
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    {faq.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span>{faq.isPublished ? "Hide" : "Publish"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(faq)}
                    className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-brand-navy hover:border-brand-teal hover:text-brand-teal"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(faq)}
                    disabled={deletingId === faq.id}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit FAQ" : "Create new FAQ"}
        description="Provide a clear, concise answer for prospective B2B clients."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Question *
            <input
              className={inputCls}
              required
              minLength={2}
              maxLength={500}
              value={form.question}
              onChange={(e) =>
                setForm((f) => ({ ...f, question: e.target.value }))
              }
              placeholder="e.g. How do you verify B2B contact data?"
            />
          </label>

          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Answer *
            <textarea
              className={inputCls}
              rows={5}
              required
              minLength={2}
              maxLength={5000}
              value={form.answer}
              onChange={(e) =>
                setForm((f) => ({ ...f, answer: e.target.value }))
              }
              placeholder="Write a helpful, transparent response…"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Category
              <input
                className={inputCls}
                maxLength={100}
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="General"
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Sort order
              <input
                type="number"
                min={0}
                max={999}
                className={inputCls}
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    sortOrder: Number.parseInt(e.target.value || "0", 10),
                  }))
                }
              />
            </label>
            <label className="flex items-center gap-2.5 self-end rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-brand-navy">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isPublished: e.target.checked }))
                }
                className="h-4 w-4 rounded border-border text-brand-teal"
              />
              Published
            </label>
          </div>

          <div className="flex flex-col-reverse gap-2.5 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-brand-teal px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-teal-dark disabled:opacity-50"
            >
              {saving ? "Saving…" : editing ? "Save changes" : "Create FAQ"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => void handleConfirmDelete()}
        busy={Boolean(deletingId)}
        title="Delete FAQ?"
        description={`Delete "${deleteTarget?.question}"? This cannot be undone.`}
      />
    </div>
  );
}

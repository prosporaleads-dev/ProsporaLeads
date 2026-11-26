"use client";

import { useState, type FormEvent } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  RefreshCw,
} from "lucide-react";
import { useServicesCrud } from "@/hooks/admin";
import { Modal } from "@/components/admin/shared/modal";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import { StatusBadge } from "@/components/admin/shared/status-badge";
import { EmptyState } from "@/components/admin/shared/empty-state";
import { slugify } from "@/lib/utils";
import {
  SERVICE_ICON_OPTIONS,
  type AdminService,
  type ServicePayload,
} from "@/types/admin";

interface FormState {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  featuresText: string;
  bestFor: string;
  icon: string;
  sortOrder: number;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
}

const emptyForm: FormState = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  featuresText: "",
  bestFor: "",
  icon: "target",
  sortOrder: 0,
  isPublished: true,
  seoTitle: "",
  seoDescription: "",
};

const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-brand-navy outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15";

export function ServicesManager({
  initialServices = [],
}: {
  initialServices?: AdminService[];
}) {
  const {
    services,
    stats,
    loading,
    saving,
    deletingId,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    refresh,
    createService,
    updateService,
    togglePublish,
    deleteService,
  } = useServicesCrud(initialServices);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminService | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminService | null>(null);

  function openCreate() {
    setEditing(null);
    setSlugTouched(false);
    setForm({ ...emptyForm, sortOrder: stats.total + 1 });
    setModalOpen(true);
  }

  function openEdit(service: AdminService) {
    setEditing(service);
    setSlugTouched(true);
    setForm({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      description: service.description,
      featuresText: service.features.join("\n"),
      bestFor: service.bestFor,
      icon: service.icon || "target",
      sortOrder: service.sortOrder,
      isPublished: service.isPublished,
      seoTitle: service.seoTitle,
      seoDescription: service.seoDescription,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload: ServicePayload = {
      title: form.title.trim(),
      slug: form.slug.trim() || slugify(form.title),
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      features: form.featuresText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      bestFor: form.bestFor.trim(),
      icon: form.icon,
      sortOrder: Number.isFinite(form.sortOrder) ? form.sortOrder : 0,
      isPublished: form.isPublished,
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
    };

    const result = editing
      ? await updateService(editing.id, payload)
      : await createService(payload);

    if (result) setModalOpen(false);
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const ok = await deleteService(deleteTarget.id);
    if (ok) setDeleteTarget(null);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-brand-navy">
            Services
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, edit, publish, and organize B2B services displayed on your
            website.
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
            New service
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total services", value: stats.total, key: "ALL" as const },
          { label: "Published", value: stats.published, key: "PUBLISHED" as const },
          { label: "Hidden", value: stats.hidden, key: "HIDDEN" as const },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setStatusFilter(item.key)}
            className={`rounded-2xl border p-4 text-left transition ${
              statusFilter === item.key
                ? "border-brand-teal bg-brand-teal/5 shadow-xs"
                : "border-border bg-white hover:border-slate-300"
            }`}
          >
            <p className="text-xs font-medium text-slate-500">{item.label}</p>
            <p className="mt-1.5 font-heading text-2xl font-extrabold text-brand-navy">
              {item.value}
            </p>
          </button>
        ))}
      </div>

      {/* Search & Filter Toolbar */}
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
            placeholder="Search services by title, slug, or summary…"
            className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-brand-navy outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "ALL" | "PUBLISHED" | "HIDDEN")
          }
          className="rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm font-medium text-brand-navy outline-none focus:border-brand-teal"
        >
          <option value="ALL">All statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="HIDDEN">Hidden</option>
        </select>
      </div>

      {/* List */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-44 animate-pulse rounded-2xl border border-border bg-white p-5"
            />
          ))}
        </div>
      ) : services.length === 0 ? (
        <EmptyState
          icon={<BriefcaseBusiness size={22} />}
          title="No services found"
          description={
            search || statusFilter !== "ALL"
              ? "Try adjusting your search or status filter."
              : "Create your first B2B service to showcase it on the public website."
          }
          action={
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-teal-dark"
            >
              <Plus size={16} /> Add service
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-xs transition hover:border-brand-teal/40 hover:shadow-soft"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-heading text-base font-bold text-brand-navy">
                        {service.title}
                      </h2>
                      <StatusBadge
                        status={service.isPublished ? "PUBLISHED" : "HIDDEN"}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      /{service.slug} &middot; Order #{service.sortOrder}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {service.shortDescription}
                </p>

                {service.features.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {service.features.slice(0, 4).map((feat) => (
                      <span
                        key={feat}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {feat}
                      </span>
                    ))}
                    {service.features.length > 4 && (
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                        +{service.features.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => void togglePublish(service)}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-brand-navy"
                >
                  {service.isPublished ? (
                    <>
                      <EyeOff size={14} /> Hide
                    </>
                  ) : (
                    <>
                      <Eye size={14} /> Publish
                    </>
                  )}
                </button>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEdit(service)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-brand-navy transition hover:border-brand-teal hover:text-brand-teal"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(service)}
                    disabled={deletingId === service.id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Edit "${editing.title}"` : "Create new service"}
        description="Configure the service details, features, and visibility."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Title *
              <input
                className={inputCls}
                required
                maxLength={120}
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: slugTouched ? f.slug : slugify(title),
                  }));
                }}
                placeholder="e.g. B2B Lead Generation"
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              URL Slug *
              <input
                className={inputCls}
                required
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setForm((f) => ({ ...f, slug: e.target.value.toLowerCase() }));
                }}
                placeholder="b2b-lead-generation"
              />
            </label>
          </div>

          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Short description *
            <textarea
              className={inputCls}
              rows={2}
              required
              maxLength={500}
              value={form.shortDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, shortDescription: e.target.value }))
              }
              placeholder="Concise summary shown on service cards"
            />
          </label>

          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Full description
            <textarea
              className={inputCls}
              rows={3}
              maxLength={5000}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Detailed overview of how this service is delivered"
            />
          </label>

          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Key features (one per line)
            <textarea
              className={inputCls}
              rows={4}
              value={form.featuresText}
              onChange={(e) =>
                setForm((f) => ({ ...f, featuresText: e.target.value }))
              }
              placeholder={"ICP definition Decision-maker research Contact verification"}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Icon
              <select
                className={inputCls}
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
              >
                {SERVICE_ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
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

          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Best for
            <input
              className={inputCls}
              maxLength={500}
              value={form.bestFor}
              onChange={(e) =>
                setForm((f) => ({ ...f, bestFor: e.target.value }))
              }
              placeholder="e.g. Growth teams needing a steady stream of qualified prospects"
            />
          </label>

          <div className="grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              SEO title
              <input
                className={inputCls}
                maxLength={160}
                value={form.seoTitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, seoTitle: e.target.value }))
                }
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              SEO description
              <input
                className={inputCls}
                maxLength={320}
                value={form.seoDescription}
                onChange={(e) =>
                  setForm((f) => ({ ...f, seoDescription: e.target.value }))
                }
              />
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
              className="rounded-xl bg-brand-teal px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal-dark disabled:opacity-50"
            >
              {saving
                ? "Saving…"
                : editing
                  ? "Save changes"
                  : "Create service"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => void handleConfirmDelete()}
        busy={Boolean(deletingId)}
        title="Delete service?"
        description={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

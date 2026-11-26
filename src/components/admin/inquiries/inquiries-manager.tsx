"use client";

import { useState, type FormEvent } from "react";
import {
  Search,
  Plus,
  Eye,
  Trash2,
  Mail,
  Phone,
  Globe,
  Building2,
  Inbox,
  RefreshCw,
} from "lucide-react";
import { useInquiriesCrud } from "@/hooks/admin";
import { Modal } from "@/components/admin/shared/modal";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import { StatusBadge } from "@/components/admin/shared/status-badge";
import { EmptyState } from "@/components/admin/shared/empty-state";
import {
  INQUIRY_STATUSES,
  TARGET_REGIONS,
  type AdminInquiry,
  type InquiryStatus,
} from "@/types/admin";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-brand-navy outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15";

export function InquiriesManager() {
  const {
    inquiries,
    stats,
    loading,
    saving,
    deletingId,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    refresh,
    createInquiry,
    updateInquiry,
    deleteInquiry,
  } = useInquiriesCrud();

  const [selected, setSelected] = useState<AdminInquiry | null>(null);
  const [editStatus, setEditStatus] = useState<InquiryStatus>("NEW");
  const [editNotes, setEditNotes] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminInquiry | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    serviceInterest: "",
    goals: "",
    status: "NEW" as InquiryStatus,
    adminNotes: "",
    targetRegions: ["USA"] as string[],
  });

  function openDetail(item: AdminInquiry) {
    setSelected(item);
    setEditStatus(
      (INQUIRY_STATUSES.includes(item.status as InquiryStatus)
        ? item.status
        : "NEW") as InquiryStatus,
    );
    setEditNotes(item.adminNotes || "");
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const updated = await updateInquiry(selected.id, {
      status: editStatus,
      adminNotes: editNotes,
    });
    if (updated) setSelected(updated);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    const created = await createInquiry({
      ...newLead,
      targetRegions:
        newLead.targetRegions.length > 0 ? newLead.targetRegions : ["USA"],
    });
    if (created) {
      setCreateOpen(false);
      setNewLead({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        serviceInterest: "",
        goals: "",
        status: "NEW",
        adminNotes: "",
        targetRegions: ["USA"],
      });
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const ok = await deleteInquiry(deleteTarget.id);
    if (ok) {
      if (selected?.id === deleteTarget.id) setSelected(null);
      setDeleteTarget(null);
    }
  }

  function toggleNewRegion(region: string) {
    setNewLead((prev) => ({
      ...prev,
      targetRegions: prev.targetRegions.includes(region)
        ? prev.targetRegions.filter((r) => r !== region)
        : [...prev.targetRegions, region],
    }));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-brand-navy">
            Contact enquiries
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review inbound leads, update pipeline status, add internal notes, or
            log new enquiries.
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
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-teal px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-teal-dark"
          >
            <Plus size={16} />
            Add enquiry
          </button>
        </div>
      </div>

      {/* Pipeline Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { label: "All leads", value: stats.total, key: "ALL" as const },
          { label: "New", value: stats.newCount, key: "NEW" as const },
          { label: "Contacted", value: stats.contacted, key: "CONTACTED" as const },
          { label: "Qualified", value: stats.qualified, key: "QUALIFIED" as const },
          { label: "Archived", value: stats.archived, key: "ARCHIVED" as const },
        ].map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => setStatusFilter(card.key)}
            className={`rounded-2xl border p-4 text-left transition ${
              statusFilter === card.key
                ? "border-brand-teal bg-brand-teal/5 shadow-xs"
                : "border-border bg-white hover:border-slate-300"
            }`}
          >
            <p className="text-xs font-medium text-slate-500">{card.label}</p>
            <p className="mt-1.5 font-heading text-2xl font-extrabold text-brand-navy">
              {card.value}
            </p>
          </button>
        ))}
      </div>

      {/* Search + Filter */}
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
            placeholder="Search by name, email, company, service, or goals…"
            className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-brand-navy outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/15"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "ALL" | InquiryStatus)
          }
          className="rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm font-medium text-brand-navy outline-none focus:border-brand-teal"
        >
          <option value="ALL">All statuses</option>
          {INQUIRY_STATUSES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Content: Cards on Mobile, Table on Desktop */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-24 animate-pulse rounded-2xl border border-border bg-white"
            />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <EmptyState
          icon={<Inbox size={22} />}
          title="No enquiries found"
          description={
            search || statusFilter !== "ALL"
              ? "No enquiries match your current search or filter."
              : "Inbound contact form submissions will appear here automatically."
          }
        />
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="space-y-3 md:hidden">
            {inquiries.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border bg-white p-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-heading text-sm font-bold text-brand-navy">
                      {item.name}
                    </p>
                    <p className="truncate text-xs text-brand-teal">
                      {item.email}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  {item.company && <span>{item.company}</span>}
                  {item.serviceInterest && <span>{item.serviceInterest}</span>}
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => openDetail(item)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-brand-navy hover:border-brand-teal"
                  >
                    <Eye size={13} /> Manage
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    disabled={deletingId === item.id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-white shadow-xs md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Contact</th>
                    <th className="px-5 py-3.5 font-bold">Company / Service</th>
                    <th className="px-5 py-3.5 font-bold">Regions</th>
                    <th className="px-5 py-3.5 font-bold">Status</th>
                    <th className="px-5 py-3.5 font-bold">Received</th>
                    <th className="px-5 py-3.5 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-brand-navy">
                          {item.name}
                        </p>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-xs text-brand-teal hover:underline"
                        >
                          {item.email}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-700">
                          {item.company || "—"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.serviceInterest || "General enquiry"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {item.targetRegions.map((r) => (
                            <span
                              key={r}
                              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openDetail(item)}
                            className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-brand-navy transition hover:border-brand-teal hover:text-brand-teal"
                          >
                            <Eye size={13} /> Manage
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            disabled={deletingId === item.id}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* View & Update Detail Modal */}
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? selected.name : "Enquiry details"}
        description={
          selected
            ? `Received ${new Date(selected.createdAt).toLocaleString()}`
            : undefined
        }
      >
        {selected && (
          <div className="space-y-5">
            <div className="grid gap-3 rounded-2xl border border-border bg-slate-50/70 p-4 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail size={15} className="shrink-0 text-brand-teal" />
                <a
                  href={`mailto:${selected.email}`}
                  className="truncate font-semibold text-brand-teal hover:underline"
                >
                  {selected.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone size={15} className="shrink-0 text-brand-teal" />
                <span>{selected.phone || "No phone provided"}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Building2 size={15} className="shrink-0 text-brand-teal" />
                <span>{selected.company || "No company"}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Globe size={15} className="shrink-0 text-brand-teal" />
                {selected.website ? (
                  <a
                    href={selected.website}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-brand-teal hover:underline"
                  >
                    {selected.website}
                  </a>
                ) : (
                  <span>No website</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Service &amp; Regions
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.serviceInterest && (
                  <span className="rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-bold text-brand-teal-dark">
                    {selected.serviceInterest}
                  </span>
                )}
                {selected.targetRegions.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Prospect goals / message
              </p>
              <p className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-white p-4 text-sm leading-6 text-slate-700">
                {selected.goals}
              </p>
            </div>

            <form
              onSubmit={handleUpdate}
              className="space-y-4 border-t border-slate-100 pt-5"
            >
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Pipeline status
                <select
                  className={inputCls}
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(e.target.value as InquiryStatus)
                  }
                >
                  {INQUIRY_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Internal admin notes
                <textarea
                  className={inputCls}
                  rows={4}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add call notes, follow-up dates, or qualification details…"
                />
              </label>

              <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(selected)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} /> Delete lead
                </button>
                <div className="flex flex-col-reverse gap-2.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-brand-teal px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-teal-dark disabled:opacity-50"
                  >
                    {saving ? "Saving…" : "Save updates"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Modal>

      {/* Manual Create Enquiry Modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Add manual enquiry"
        description="Log an inbound call, email, or referral directly into the pipeline."
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Full name *
              <input
                className={inputCls}
                required
                minLength={2}
                value={newLead.name}
                onChange={(e) =>
                  setNewLead((p) => ({ ...p, name: e.target.value }))
                }
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Work email *
              <input
                type="email"
                className={inputCls}
                required
                value={newLead.email}
                onChange={(e) =>
                  setNewLead((p) => ({ ...p, email: e.target.value }))
                }
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Company
              <input
                className={inputCls}
                value={newLead.company}
                onChange={(e) =>
                  setNewLead((p) => ({ ...p, company: e.target.value }))
                }
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Phone
              <input
                className={inputCls}
                value={newLead.phone}
                onChange={(e) =>
                  setNewLead((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </label>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Target regions
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {TARGET_REGIONS.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleNewRegion(region)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    newLead.targetRegions.includes(region)
                      ? "border-brand-teal bg-brand-teal/10 text-brand-teal-dark"
                      : "border-border text-slate-600 hover:border-brand-teal"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Service interest
              <input
                className={inputCls}
                value={newLead.serviceInterest}
                onChange={(e) =>
                  setNewLead((p) => ({ ...p, serviceInterest: e.target.value }))
                }
                placeholder="e.g. Appointment Setting"
              />
            </label>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Initial status
              <select
                className={inputCls}
                value={newLead.status}
                onChange={(e) =>
                  setNewLead((p) => ({
                    ...p,
                    status: e.target.value as InquiryStatus,
                  }))
                }
              >
                {INQUIRY_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Goals / requirements *
            <textarea
              className={inputCls}
              rows={3}
              required
              minLength={5}
              value={newLead.goals}
              onChange={(e) =>
                setNewLead((p) => ({ ...p, goals: e.target.value }))
              }
            />
          </label>

          <div className="flex flex-col-reverse gap-2.5 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-brand-teal px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-teal-dark disabled:opacity-50"
            >
              {saving ? "Adding…" : "Add enquiry"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => void handleConfirmDelete()}
        busy={Boolean(deletingId)}
        title="Delete enquiry?"
        description={`Remove the enquiry from "${deleteTarget?.name}" (${deleteTarget?.email})? This cannot be undone.`}
      />
    </div>
  );
}

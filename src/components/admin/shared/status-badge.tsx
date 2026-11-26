"use client";

const STYLES: Record<string, string> = {
  NEW: "border-sky-200 bg-sky-50 text-sky-700",
  CONTACTED: "border-amber-200 bg-amber-50 text-amber-700",
  QUALIFIED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  ARCHIVED: "border-slate-200 bg-slate-100 text-slate-600",
  PUBLISHED: "border-brand-teal/30 bg-brand-teal/10 text-brand-teal-dark",
  HIDDEN: "border-slate-200 bg-slate-100 text-slate-600",
  DRAFT: "border-amber-200 bg-amber-50 text-amber-700",
};

export function StatusBadge({ status }: { status: string }) {
  const key = status.toUpperCase();
  const cls = STYLES[key] ?? "border-slate-200 bg-slate-100 text-slate-700";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${cls}`}
    >
      {key}
    </span>
  );
}

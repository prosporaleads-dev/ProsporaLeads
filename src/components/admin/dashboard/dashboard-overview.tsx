import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  HelpCircle,
  Inbox,
  Mail,
  Settings,
  Sparkles,
  UserCircle2,
  AlertCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/shared/status-badge";
import type { DashboardData, InquiryStatus } from "@/types/admin";

const PIPELINE_META: Array<{
  key: InquiryStatus;
  label: string;
  barClass: string;
}> = [
  { key: "NEW", label: "New leads", barClass: "bg-sky-500" },
  { key: "CONTACTED", label: "Contacted", barClass: "bg-amber-500" },
  { key: "QUALIFIED", label: "Qualified", barClass: "bg-emerald-500" },
  { key: "ARCHIVED", label: "Archived", barClass: "bg-slate-400" },
];

export function DashboardOverview({ data }: { data: DashboardData }) {
  const { adminName, counts, statusBreakdown, recentInquiries, contactEmail } =
    data;

  const totalLeads = Math.max(counts.inquiries, 1);

  const kpis = [
    {
      label: "Contact enquiries",
      value: counts.inquiries,
      sub:
        counts.newInquiries > 0
          ? `${counts.newInquiries} new awaiting review`
          : "All caught up",
      href: "/admin/inquiries",
      icon: Inbox,
      accent: "from-sky-500 to-brand-teal",
      highlight: counts.newInquiries > 0,
    },
    {
      label: "Services",
      value: counts.services,
      sub: `${counts.publishedServices} published live`,
      href: "/admin/services",
      icon: BriefcaseBusiness,
      accent: "from-[#010f33] to-[#087985]",
      highlight: false,
    },
    {
      label: "FAQs",
      value: counts.faqs,
      sub: `${counts.publishedFaqs} visible to visitors`,
      href: "/admin/faqs",
      icon: HelpCircle,
      accent: "from-teal-500 to-emerald-500",
      highlight: false,
    },
    {
      label: "CMS pages",
      value: counts.pages,
      sub: `${counts.publishedPages} published`,
      href: "/admin/pages",
      icon: FileText,
      accent: "from-indigo-600 to-brand-navy",
      highlight: false,
    },
  ];

  const readinessChecks = [
    {
      label: "Business contact email configured",
      detail: contactEmail,
      ok: Boolean(contactEmail && contactEmail !== "hello@example.com"),
      href: "/admin/settings",
    },
    {
      label: "Services catalogue populated",
      detail: `${counts.publishedServices} published services`,
      ok: counts.publishedServices > 0,
      href: "/admin/services",
    },
    {
      label: "FAQ knowledge base published",
      detail: `${counts.publishedFaqs} published FAQs`,
      ok: counts.publishedFaqs > 0,
      href: "/admin/faqs",
    },
    {
      label: "CMS pages & SEO metadata seeded",
      detail: `${counts.publishedPages} published pages`,
      ok: counts.publishedPages > 0,
      href: "/admin/pages",
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Hero Welcome Banner */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#010f33] via-[#072244] to-[#087985] p-6 text-white shadow-luxury sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10 bg-white/[.04]" />
        <div className="pointer-events-none absolute -bottom-28 right-1/4 -z-10 h-64 w-64 rounded-full bg-[#35d1c6]/15 blur-3xl" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-[#8be9df]">
              <Sparkles size={13} /> Prospora Leads Command Center
            </div>
            <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Welcome back, {adminName}.
            </h1>
            <p className="mt-2.5 text-sm leading-7 text-white/75 sm:text-base">
              Track inbound B2B enquiries, manage your service catalogue, keep
              FAQs fresh, and tune SEO across every page from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#35d1c6] to-[#0797a2] px-5 py-2.5 text-sm font-bold text-[#010f33] shadow-lg transition hover:brightness-110"
            >
              Review enquiries
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/admin/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Manage services
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Metric Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${kpi.accent} text-white shadow-sm`}
                >
                  <Icon size={20} />
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-teal"
                />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {kpi.label}
              </p>
              <p className="mt-1 font-heading text-3xl font-extrabold text-brand-navy">
                {kpi.value}
              </p>
              <p
                className={`mt-2 text-xs font-medium ${
                  kpi.highlight ? "text-brand-teal-dark" : "text-slate-500"
                }`}
              >
                {kpi.sub}
              </p>
            </Link>
          );
        })}
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        {/* Recent Enquiries */}
        <section className="rounded-3xl border border-border bg-white p-5 shadow-xs sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-brand-navy">
                Recent enquiries
              </h2>
              <p className="text-xs text-slate-500">
                Latest leads submitted from the contact page
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-teal hover:underline"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Mail size={20} />
              </div>
              <p className="mt-3 text-sm font-semibold text-brand-navy">
                No enquiries yet
              </p>
              <p className="mt-1 text-xs text-slate-500">
                New leads submitted via /contact will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentInquiries.map((lead) => (
                <Link
                  key={lead.id}
                  href="/admin/inquiries"
                  className="flex flex-col gap-2 py-4 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between sm:rounded-xl sm:px-3"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold text-brand-navy">
                        {lead.name}
                      </p>
                      <StatusBadge status={lead.status} />
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {lead.company ? `${lead.company} · ` : ""}
                      {lead.email}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                    {lead.targetRegions.slice(0, 2).map((r) => (
                      <span
                        key={r}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                      >
                        {r}
                      </span>
                    ))}
                    <span className="text-[11px] text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Pipeline Breakdown + Quick Actions */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-border bg-white p-5 shadow-xs sm:p-6">
            <h2 className="font-heading text-lg font-bold text-brand-navy">
              Lead pipeline breakdown
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Distribution of enquiries across stages
            </p>

            <div className="mt-5 space-y-4">
              {PIPELINE_META.map((stage) => {
                const count = statusBreakdown[stage.key] ?? 0;
                const pct = Math.round((count / totalLeads) * 100);
                return (
                  <div key={stage.key}>
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700">{stage.label}</span>
                      <span className="tabular-nums text-slate-500">
                        {count} ({counts.inquiries === 0 ? 0 : pct}%)
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all ${stage.barClass}`}
                        style={{
                          width: `${counts.inquiries === 0 ? 0 : Math.max(pct, count > 0 ? 6 : 0)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-white p-5 shadow-xs sm:p-6">
            <h2 className="font-heading text-lg font-bold text-brand-navy">
              Quick actions
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                {
                  label: "Services",
                  href: "/admin/services",
                  icon: BriefcaseBusiness,
                },
                { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
                { label: "Settings", href: "/admin/settings", icon: Settings },
                {
                  label: "My Profile",
                  href: "/admin/profile",
                  icon: UserCircle2,
                },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-2.5 rounded-2xl border border-border bg-slate-50/70 p-3.5 text-sm font-semibold text-brand-navy transition hover:border-brand-teal/40 hover:bg-white hover:shadow-xs"
                  >
                    <Icon size={17} className="shrink-0 text-brand-teal" />
                    <span className="truncate">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* System & Launch Readiness */}
      <section className="rounded-3xl border border-border bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-navy">
              Site readiness &amp; health
            </h2>
            <p className="text-xs text-slate-500">
              Live status checks from your database and settings
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> System
            online
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {readinessChecks.map((check) => (
            <Link
              key={check.label}
              href={check.href}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-brand-teal/35 hover:bg-white"
            >
              {check.ok ? (
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
              ) : (
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-500"
                />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-brand-navy">
                  {check.label}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {check.detail}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

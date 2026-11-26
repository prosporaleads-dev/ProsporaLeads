"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  Settings,
  Inbox,
  HelpCircle,
  UserCircle2,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { AdminLogout } from "@/components/admin/logout";
import type { AdminRole } from "@/types/admin";

interface AdminShellProps {
  user: {
    name: string;
    email: string;
    role: AdminRole;
  };
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/inquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/services", label: "Services", icon: BriefcaseBusiness },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/pages", label: "Pages & SEO", icon: FileText },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
  { href: "/admin/profile", label: "My profile", icon: UserCircle2 },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isNavActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const currentNav =
    NAV_ITEMS.find((item) => isNavActive(item.href, item.exact)) ?? NAV_ITEMS[0];

  const renderSidebarContent = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            onClick={onNavigate}
            className="block font-heading text-base font-extrabold tracking-[.14em] text-white"
          >
            PROSPORA <span className="text-[#35d1c6]">LEADS</span>
          </Link>
          {onNavigate && (
            <button
              type="button"
              onClick={onNavigate}
              aria-label="Close navigation"
              className="rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[.18em] text-slate-400">
          Admin Workspace
        </p>

        <nav className="mt-7 space-y-1.5" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isNavActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-[#0797a2] to-[#087985] text-white shadow-md shadow-[#0797a2]/20"
                    : "text-slate-300 hover:bg-white/[.07] hover:text-white"
                }`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <Link
          href="/admin/profile"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/[.07]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#35d1c6] to-[#0797a2] font-heading text-xs font-extrabold text-[#010f33]">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {user.name}
            </p>
            <p className="truncate text-[11px] text-slate-400">
              {user.role.replace("_", " ")}
            </p>
          </div>
        </Link>
        <div className="px-2">
          <AdminLogout />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f8fc] lg:grid lg:grid-cols-[264px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen overflow-y-auto bg-[#010f33] p-6 text-white lg:block">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-[#010f33]/60 backdrop-blur-xs lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <aside
            className="h-full w-72 max-w-[85vw] overflow-y-auto bg-[#010f33] p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {renderSidebarContent(() => setDrawerOpen(false))}
          </aside>
        </div>
      )}

      {/* Main Column */}
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-xl border border-border p-2 text-brand-navy transition hover:bg-slate-50 lg:hidden"
            >
              <Menu size={19} />
            </button>
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-bold text-brand-navy sm:text-base">
                {currentNav.label}
              </p>
              <p className="hidden text-xs text-slate-500 sm:block">
                Prospora Leads administration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin/profile"
              className="hidden items-center gap-2 rounded-full border border-border bg-slate-50 px-3 py-1.5 text-xs font-semibold text-brand-navy transition hover:border-brand-teal/40 hover:bg-white sm:inline-flex"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal text-[10px] font-bold text-white">
                {getInitials(user.name)}
              </span>
              <span className="max-w-[140px] truncate">{user.name}</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3.5 py-1.5 text-xs font-bold text-brand-teal-dark transition hover:bg-brand-teal hover:text-white"
            >
              <span>View site</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, isActive } from "@/components/Home/helpers/navHelpers";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 shadow-[0_4px_24px_rgba(1,15,51,.035)] backdrop-blur-2xl">
      <div className="container-shell flex h-[78px] items-center justify-between">
        <Link href="/" aria-label="Prospora Leads home" onClick={() => setOpen(false)}><BrandMark /></Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((link) => {
            const active = isActive(link, pathname);
            return <Link key={link.href} href={link.href} className={active ? "relative text-sm font-bold text-[#0797a2] after:absolute after:-bottom-[29px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-gradient-to-r after:from-[#0797a2] after:to-[#35d1c6]" : "text-sm font-semibold text-slate-600 transition hover:text-[#0797a2]"}>{link.label}</Link>;
          })}
        </nav>
        <div className="hidden lg:block"><Button asChild size="lg" variant="brand-teal" className="h-11 rounded-full px-6 text-white shadow-[0_8px_20px_rgba(7,151,162,.18)]"><Link href="/contact">Let’s talk <ArrowUpRight size={16} /></Link></Button></div>
        <button className="rounded-xl border border-slate-200 p-2.5 text-[#071632] transition hover:bg-slate-50 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-slate-100 bg-white px-5 py-5 shadow-xl lg:hidden" aria-label="Mobile navigation">
        {NAV_ITEMS.map(link => <Link key={link.href} onClick={() => setOpen(false)} href={link.href} className={isActive(link, pathname) ? "block rounded-xl bg-[#e9f8f6] px-4 py-3 text-sm font-bold text-[#087985]" : "block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"}>{link.label}</Link>)}
        <Button asChild className="mt-3 h-12 w-full rounded-full text-white" variant="brand-teal"><Link href="/contact" onClick={() => setOpen(false)}>Book a strategy call <ArrowUpRight size={16} /></Link></Button>
      </nav>}
    </header>
  );
}

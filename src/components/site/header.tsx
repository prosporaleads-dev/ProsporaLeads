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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-xl">
      <div className="container-shell flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="Propspora Leads home">
          <BrandMark />
        </Link>
        <nav
          className="hidden items-center gap-9 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((link) => {
            const active = isActive(link, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "text-sm font-medium text-brand-teal transition"
                    : "text-sm font-medium text-brand-ink/80 transition hover:text-brand-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <Button asChild size="lg" variant="brand-teal">
            <Link href="/contact">
              Book a strategy call <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>
        <button
          className="rounded-xl p-2 text-brand-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          className="border-t border-border/60 bg-white px-6 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((link) => {
            const active = isActive(link, pathname);
            return (
              <Link
                key={link.href}
                onClick={() => setOpen(false)}
                href={link.href}
                className={
                  active
                    ? "block rounded-xl bg-brand-teal/10 px-2 py-3 text-sm font-medium text-brand-teal"
                    : "block rounded-xl px-2 py-3 text-sm font-medium text-brand-ink/80 transition hover:bg-brand-surface hover:text-brand-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Button asChild className="mt-3 w-full" variant="brand-teal">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Book a strategy call
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}

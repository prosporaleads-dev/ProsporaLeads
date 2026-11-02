import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";
import { getSiteSettings } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export async function Footer() {
  const settings = await getSiteSettings();
  return (
    <footer className="border-t border-border bg-brand-ink text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-xl bg-white p-3">
            <BrandMark compact />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/75">
            {settings.footerText}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/65">
            <span className="flex items-center gap-1">USA</span>
            <span>·</span>
            <span className="flex items-center gap-1">Canada</span>
            <span>·</span>
            <span className="flex items-center gap-1">Middle East</span>
            <span>·</span>
            <span className="flex items-center gap-1">Australia</span>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/55">
            Explore
          </h3>
          <div className="space-y-4 text-sm text-white/75">
            {[
              ["Services", "/services"],
              ["Industries", "/industries"],
              ["Markets", "/markets"],
              ["How we work", "/how-we-work"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="block transition hover:text-brand-teal-light"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/55">
            Company
          </h3>
          <div className="space-y-4 text-sm text-white/75">
            {[
              ["About us", "/about"],
              ["FAQs", "/faq"],
              ["Contact", "/contact"],
              ["Privacy policy", "/privacy-policy"],
              ["Terms of service", "/terms-of-service"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="block transition hover:text-brand-teal-light"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/55">
            Start a conversation
          </h3>
          <a
            className="mt-2 block text-sm text-brand-teal-light transition hover:text-white"
            href={`mailto:${settings.contactEmail}`}
          >
            {settings.contactEmail}{" "}
            <ArrowUpRight size={15} className="inline-block -mt-0.5" />
          </a>
          {settings.contactPhone && (
            <a
              className="mt-3 block text-sm text-brand-teal-light transition hover:text-white"
              href={`tel:${settings.contactPhone}`}
            >
              {settings.contactPhone}
            </a>
          )}
          <p className="mt-6 text-xs leading-6 text-white/55">
            Research-led outreach for ambitious B2B teams.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Propspora Leads. All rights reserved.
          </span>
          <span>Research-led outreach. Responsible growth.</span>
        </div>
      </div>
    </footer>
  );
}

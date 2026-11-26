import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";
import { getSiteSettings } from "@/lib/content";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

export async function Footer() {
  const settings = await getSiteSettings();
  return <footer className="relative overflow-hidden bg-[#010f33] text-white">
    <div className="pointer-events-none absolute inset-0 opacity-60" style={{background:"radial-gradient(ellipse at 80% 0%, rgba(7,151,162,.35), transparent 42%), radial-gradient(ellipse at 10% 100%, rgba(53,209,198,.12), transparent 35%)"}} />
    <div className="container-shell relative grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.1fr] md:py-20">
      <div>
        <div className="inline-flex rounded-2xl bg-white p-3 shadow-xl"><BrandMark compact /></div>
        <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">{settings.footerText}</p>
        <div className="mt-6 flex flex-wrap gap-2">{["USA","Canada","Middle East","Australia"].map(region => <span key={region} className="rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-[11px] font-semibold text-white/70">{region}</span>)}</div>
      </div>
      <div><h3 className="mb-5 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#5bd8ce]">Explore</h3><div className="space-y-3.5 text-sm text-white/70">{[["Services","/services"],["Industries","/industries"],["Markets","/markets"],["How we work","/how-we-work"]].map(([label,href])=><Link key={href} href={href} className="block transition hover:translate-x-1 hover:text-white">{label}</Link>)}</div></div>
      <div><h3 className="mb-5 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#5bd8ce]">Company</h3><div className="space-y-3.5 text-sm text-white/70">{[["About us","/about"],["FAQs","/faq"],["Contact","/contact"],["Privacy policy","/privacy-policy"],["Terms of service","/terms-of-service"]].map(([label,href])=><Link key={href} href={href} className="block transition hover:translate-x-1 hover:text-white">{label}</Link>)}</div></div>
      <div><h3 className="mb-5 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#5bd8ce]">Start a conversation</h3><a className="flex items-center gap-2 text-sm text-white/80 transition hover:text-[#5bd8ce]" href={`mailto:${settings.contactEmail}`}><Mail size={16}/>{settings.contactEmail}<ArrowUpRight size={14}/></a>{settings.contactPhone && <a className="mt-4 flex items-center gap-2 text-sm text-white/80 transition hover:text-[#5bd8ce]" href={`tel:${settings.contactPhone}`}><Phone size={16}/>{settings.contactPhone}</a>}<p className="mt-6 text-xs leading-6 text-white/45">Research-led outreach for ambitious B2B teams.</p></div>
    </div>
    <div className="relative border-t border-white/10"><div className="container-shell flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Prospora Leads. All rights reserved.</span><span>Qualified conversations. Real pipeline.</span></div></div>
  </footer>;
}

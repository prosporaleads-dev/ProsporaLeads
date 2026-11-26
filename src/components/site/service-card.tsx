import Link from "next/link";
import { ArrowUpRight, Target, CalendarCheck, Mail, Network, Map, Database, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = { target: Target, "calendar-check": CalendarCheck, mail: Mail, network: Network, map: Map, database: Database };

export function ServiceCard({ service }: { service: { slug: string; title: string; shortDescription: string; icon?: string } }) {
  const Icon = icons[service.icon ?? "target"] ?? Target;
  return <article className="group relative h-full overflow-hidden rounded-[1.65rem] border border-slate-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(1,15,51,.035)] transition duration-300 hover:-translate-y-1.5 hover:border-[#0797a2]/35 hover:shadow-luxury">
    <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[5rem] bg-gradient-to-bl from-[#e6f8f6] to-transparent opacity-70 transition group-hover:scale-125" />
    <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#010f33] to-[#087985] text-white shadow-lg shadow-[#0797a2]/15"><Icon size={21}/></div>
    <h3 className="relative font-heading text-xl font-extrabold tracking-tight text-[#071632]">{service.title}</h3>
    <p className="relative mt-3 min-h-[72px] text-sm leading-7 text-slate-600">{service.shortDescription}</p>
    <div className="relative mt-6 border-t border-slate-100 pt-5"><Link href={`/services#${service.slug}`} className="inline-flex items-center gap-2 text-sm font-extrabold text-[#087985] transition group-hover:gap-3">Explore service <ArrowUpRight size={16}/></Link></div>
  </article>;
}

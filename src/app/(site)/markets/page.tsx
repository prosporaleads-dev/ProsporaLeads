import type { Metadata } from "next";
import { defaultMarkets } from "@/lib/content";
import { SectionHeading } from "@/components/site/section-heading";
export const metadata: Metadata = {
  title: "B2B Lead Generation Markets",
  description:
    "See how Propspora Leads adapts B2B outreach to the USA, Canada, Middle East and Australia.",
  alternates: { canonical: "/markets" },
};
export default function MarketsPage() {
  return (
    <div className="container-shell py-20 sm:py-28">
      <SectionHeading
        eyebrow="Markets we serve"
        title="Local awareness. Global reach."
        description="Good outreach in one market can fall flat in another. We adapt research, tone, timing and compliance considerations to each region."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {defaultMarkets.map((market, i) => (
          <article
            key={market.slug}
            className="rounded-2xl border border-slate-200 p-7"
          >
            <p className="text-xs font-bold uppercase tracking-[.2em] text-teal-700">
              Market 0{i + 1}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#102A4C]">
              {market.name}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              {market.description}
            </p>
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              {market.complianceNote}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-slate-500">
        Compliance information is general, not legal advice. Campaigns should be
        reviewed by a qualified adviser for the applicable country and audience.
      </p>
    </div>
  );
}

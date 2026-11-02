import type { Metadata } from "next";
import { defaultMarkets } from "@/lib/content";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "B2B Lead Generation Markets",
  description:
    "See how Propspora Leads adapts B2B outreach to the USA, Canada, Middle East and Australia.",
  alternates: { canonical: "/markets" },
};

export default function MarketsPage() {
  return (
    <div className="container-shell py-24 sm:py-36">
      <SectionHeading
        eyebrow="Markets we serve"
        title="Local awareness. Global reach."
        description="Good outreach in one market can fall flat in another. We adapt research, tone, timing and compliance considerations to each region."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {defaultMarkets.map((market, i) => (
          <article
            key={market.slug}
            className="rounded-[1.75rem] border border-border bg-white p-8 shadow-soft transition hover:border-brand-teal/60"
          >
            <Reveal delay={i * 0.05}>
              <div className="flex items-center gap-2 mb-5">
                <span className="h-1 w-8 rounded-full bg-brand-teal" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                  Market 0{i + 1}
                </p>
              </div>
            </Reveal>
            <Reveal delay={i * 0.05 + 0.04}>
              <h2 className="mt-0 mb-3 text-2xl font-bold text-foreground">
                {market.name}
              </h2>
            </Reveal>
            <Reveal delay={i * 0.05 + 0.08}>
              <p className="leading-8 text-foreground/75">
                {market.description}
              </p>
            </Reveal>
            <Reveal delay={i * 0.05 + 0.12}>
              <p className="mt-6 rounded-xl border border-brand-teal/20 bg-brand-teal/10 p-5 text-sm leading-7 text-brand-teal-dark">
                {market.complianceNote}
              </p>
            </Reveal>
          </article>
        ))}
      </div>
      <p className="mt-12 text-xs text-foreground/50 leading-6">
        Compliance information is general, not legal advice. Campaigns should be
        reviewed by a qualified adviser for the applicable country and audience.
      </p>
    </div>
  );
}

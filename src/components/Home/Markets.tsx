"use client";

import { defaultMarkets } from "./services/homeService";
import { Reveal } from "@/components/site/reveal";

export function Markets() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-shell">
        <div className="mb-12 max-w-3xl text-center mx-auto">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">
            <span className="h-1 w-12 rounded-full bg-brand-teal" /> Markets
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Local awareness. Global reach.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-ink/85 sm:text-lg">
            Good outreach in one market can fall flat in another. We adapt
            research, tone, timing and compliance to each region.
          </p>
        </div>
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
                <h2 className="mb-3 mt-0 text-2xl font-bold text-brand-ink">
                  {market.name}
                </h2>
              </Reveal>
              <Reveal delay={i * 0.05 + 0.08}>
                <p className="leading-8 text-brand-ink/75">
                  {market.description}
                </p>
              </Reveal>
              <Reveal delay={i * 0.05 + 0.12}>
                <p className="mt-6 rounded-xl border border-brand-teal/30 bg-brand-teal/10 p-5 text-sm leading-7 text-brand-teal-dark">
                  {market.complianceNote}
                </p>
              </Reveal>
            </article>
          ))}
        </div>
        <p className="mt-12 text-xs leading-6 text-muted-foreground">
          Compliance information is general, not legal advice. Campaigns should
          be reviewed by a qualified adviser for the applicable country and
          audience.
        </p>
      </div>
    </section>
  );
}

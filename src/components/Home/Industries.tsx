"use client";

import { defaultIndustries } from "./services/homeService";
import { Reveal } from "@/components/site/reveal";

export function Industries() {
  return (
    <section className="border-y border-border bg-brand-surface">
      <div className="container-shell py-24 sm:py-32">
        <div className="mb-12 max-w-3xl text-center mx-auto">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">
            <span className="h-1 w-12 rounded-full bg-brand-teal" /> Industries
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            We understand how different industries buy.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-ink/85 sm:text-lg">
            Every sector has its own decision-makers, language and buying cycle.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {defaultIndustries.map((industry, i) => (
            <div
              key={industry}
              className="rounded-xl border border-border bg-white p-6 text-center transition hover:border-brand-teal/50 hover:shadow-soft"
            >
              <Reveal delay={i * 0.03}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-teal/10 text-xs font-bold text-brand-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Reveal>
              <Reveal delay={i * 0.03 + 0.05}>
                <p className="mt-3 text-sm font-semibold leading-6 text-brand-ink">
                  {industry}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

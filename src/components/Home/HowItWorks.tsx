"use client";

import { Reveal } from "@/components/site/reveal";

const steps = [
  {
    num: "01",
    title: "Discovery & ICP",
    body: "We define who to target, which roles matter and how success will be measured.",
  },
  {
    num: "02",
    title: "Research & lists",
    body: "We build target-account lists and identify the right decision-makers.",
  },
  {
    num: "03",
    title: "Verification",
    body: "We check contact accuracy before any outreach begins.",
  },
  {
    num: "04",
    title: "Outreach",
    body: "Personalised email and LinkedIn campaigns with consistent follow-up.",
  },
  {
    num: "05",
    title: "Meetings",
    body: "Qualified conversations are placed on your sales calendar.",
  },
  {
    num: "06",
    title: "Reporting",
    body: "Transparent activity and response data, reviewed together.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-shell">
        <div className="mb-12 max-w-3xl text-center mx-auto">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">
            <span className="h-1 w-12 rounded-full bg-brand-teal" /> How we work
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            A clear process, from first call to booked meetings.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-ink/85 sm:text-lg">
            Collaborative and measurable, so your team knows what is happening
            and why.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="rounded-[1.75rem] border border-border bg-white p-8 shadow-soft transition-all hover:border-brand-teal/50"
            >
              <Reveal delay={i * 0.05}>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-white px-3 py-1 text-xs font-bold text-brand-teal">
                  {step.num}
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-brand-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-ink/70">
                  {step.body}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

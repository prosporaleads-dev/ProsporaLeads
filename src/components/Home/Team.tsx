"use client";

import { Reveal } from "@/components/site/reveal";

const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    bio: "Leads strategy and client partnerships with a focus on measurable pipeline growth.",
  },
  {
    name: "Sarah Chen",
    role: "Head of Research",
    bio: "Oversees ICP definition, target-account mapping and decision-maker identification.",
  },
  {
    name: "James Okoro",
    role: "Head of Outreach",
    bio: "Manages multi-channel campaigns, messaging and meeting bookings.",
  },
];

export function Team() {
  return (
    <section className="border-t border-border bg-brand-surface py-24 sm:py-32">
      <div className="container-shell">
        <div className="mb-12 max-w-3xl text-center mx-auto">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">
            <span className="h-1 w-12 rounded-full bg-brand-teal" /> Meet the
            team
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            The people behind your pipeline.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-ink/85 sm:text-lg">
            Our team combines research rigor with outreach expertise to deliver
            conversations that convert.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="rounded-[1.75rem] border border-border bg-white p-8 shadow-soft"
            >
              <Reveal delay={i * 0.05}>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/10 font-heading text-2xl font-bold text-brand-teal">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-ink">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand-teal">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-brand-ink/70">
                  {member.bio}
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="inline-flex items-center gap-1 rounded-full border border-brand-teal/30 px-3 py-1 text-xs font-bold text-brand-teal">
                    Coming Soon
                  </span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Full team profiles coming soon.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

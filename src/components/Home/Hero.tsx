"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  UsersRound,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const trustStats = [
  { label: "Markets covered", value: "4" },
  { label: "Core services", value: "6" },
  { label: "Avg. response rate", value: "+28%" },
  { label: "Client retention", value: "+91%" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-brand-surface" />
      <div className="hero-glow absolute inset-0 z-0" />
      <div className="container-shell relative z-10 grid items-center gap-10 py-24 lg:py-32 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-teal backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-teal" />{" "}
              Research-led B2B growth
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-xl font-heading text-5xl font-extrabold leading-[1.05] text-brand-ink sm:text-6xl xl:text-7xl">
              Meet the right buyers.{" "}
              <span className="text-brand-teal">
                Build a pipeline you can trust.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-lg text-lg leading-8 text-brand-ink/80">
              We help B2B companies find, reach and start conversations with
              real decision-makers through researched, verified and personalised
              outreach.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Button
                asChild
                size="lg"
                variant="brand-teal"
                className="w-full sm:w-auto"
              >
                <Link href="/contact">
                  Book a free strategy call <ArrowUpRight size={17} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="/how-we-work">
                  See how it works <ArrowRight size={17} />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-brand-muted">
              {trustStats.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-teal" />
                  <span className="font-bold">{s.value}</span>{" "}
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="relative hidden lg:block">
          <Reveal className="relative" delay={0.12}>
            <div className="relative rounded-[2rem] border border-border bg-white p-8 shadow-luxury">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <ShieldCheck
                    size={20}
                    className="flex-shrink-0 text-brand-teal"
                  />
                  <div>
                    <p className="font-semibold text-brand-ink">
                      Verified data
                    </p>
                    <p className="text-sm text-brand-ink/60">
                      Contacts checked before outreach.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <UsersRound
                    size={20}
                    className="flex-shrink-0 text-brand-teal"
                  />
                  <div>
                    <p className="font-semibold text-brand-ink">
                      Decision-makers
                    </p>
                    <p className="text-sm text-brand-ink/60">
                      Reached with personalised messaging.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <TrendingUp
                    size={20}
                    className="flex-shrink-0 text-brand-teal"
                  />
                  <div>
                    <p className="font-semibold text-brand-ink">
                      Booked meetings
                    </p>
                    <p className="text-sm text-brand-ink/60">
                      Placed on your sales calendar.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2
                    size={20}
                    className="flex-shrink-0 text-brand-teal"
                  />
                  <div>
                    <p className="font-semibold text-brand-ink">
                      Transparent reporting
                    </p>
                    <p className="text-sm text-brand-ink/60">
                      Activity, replies and next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

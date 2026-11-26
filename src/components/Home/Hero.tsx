"use client";

import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, TrendingUp,
  UsersRound, ShieldCheck, Target, CalendarCheck, Mail, Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const capabilities = [
  { icon: Target, title: "Right-fit prospects", detail: "Built around your ideal customer profile" },
  { icon: ShieldCheck, title: "Verified intelligence", detail: "Research-backed contact information" },
  { icon: Mail, title: "Personalised outreach", detail: "Relevant messaging with thoughtful follow-up" },
  { icon: CalendarCheck, title: "Sales conversations", detail: "Qualified interest handed to your team" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7f9fc]">
      <div className="absolute inset-0 -z-10 grid-pattern opacity-70" />
      <div className="hero-glow absolute inset-0 -z-10" />
      <div className="container-shell grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-[1.04fr_.96fr] lg:gap-16 lg:py-28">
        <div className="space-y-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0797a2]/20 bg-white/85 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.19em] text-[#087985] shadow-sm">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#35d1c6] opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#0797a2]" /></span>
              Qualified conversations. Real pipeline.
            </div>
          </Reveal>
          <Reveal delay={.07}>
            <h1 className="max-w-2xl font-heading text-[2.8rem] font-extrabold leading-[1.06] tracking-[-.045em] text-[#010f33] sm:text-6xl xl:text-[4.35rem]">
              Turn the right prospects into <span className="gradient-text">real opportunities.</span>
            </h1>
          </Reveal>
          <Reveal delay={.14}>
            <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Prospora Leads helps ambitious B2B teams identify decision-makers,
              build focused prospect lists and start meaningful sales conversations
              through research-led, personalised outreach.
            </p>
          </Reveal>
          <Reveal delay={.2}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="brand-teal" className="h-14 rounded-full px-7 text-white shadow-[0_12px_28px_rgba(7,151,162,.24)]">
                <Link href="/contact">Book a free strategy call <ArrowUpRight size={18} /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-slate-300 bg-white px-7 text-[#071632] hover:border-[#0797a2] hover:bg-white">
                <Link href="/how-we-work">Explore our approach <ArrowRight size={17} /></Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={.27}>
            <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200 pt-7 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-[#0797a2]" /> Research-led targeting</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-[#0797a2]" /> Clear qualification</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-[#0797a2]" /> Transparent reporting</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative mx-auto w-full max-w-[570px]" delay={.12}>
          <div className="absolute -inset-7 rounded-[3rem] bg-gradient-to-br from-[#0797a2]/15 via-[#35d1c6]/10 to-[#010f33]/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-luxury sm:p-7">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#010f33] via-[#0797a2] to-[#35d1c6]" />
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#0797a2]">The Prospora method</p>
                <h2 className="mt-1 font-heading text-xl font-extrabold tracking-tight text-[#010f33]">From research to revenue</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#010f33] to-[#087985] text-white shadow-lg"><Activity size={20} /></div>
            </div>
            <div className="relative my-6 space-y-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="relative flex items-center gap-4 rounded-2xl border border-slate-100 bg-gradient-to-r from-white to-[#f7fbfc] p-4 transition hover:-translate-y-0.5 hover:border-[#0797a2]/30 hover:shadow-md">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e0f8f5] to-[#edf4ff] text-[#087985]"><Icon size={19} /></div>
                    <div className="min-w-0 flex-1"><p className="font-bold text-[#071632]">{item.title}</p><p className="mt-0.5 text-xs leading-5 text-slate-500">{item.detail}</p></div>
                    <span className="text-xs font-bold tabular-nums text-slate-300">0{index + 1}</span>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-[#010f33] via-[#082b4a] to-[#087985] p-5 text-white">
              <div className="flex items-center justify-between gap-3">
                <div><p className="text-xs font-semibold text-white/65">Your next growth conversation</p><p className="mt-1 font-heading text-lg font-bold">Starts with a smarter target.</p></div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10"><TrendingUp size={19} /></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#8be9df]"><Sparkles size={13} /> Strategy • Research • Outreach</div>
            </div>
          </div>

          <div className="relative mt-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/95 px-5 py-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e0f8f5] text-[#0797a2]">
                <UsersRound size={17} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#071632]">Decision-maker focused</p>
                <p className="text-[11px] text-slate-500">Quality before quantity</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-[#e0f8f5] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#087985]">
              ICP Verified
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

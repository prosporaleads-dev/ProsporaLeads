"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export function CTA() {
  return <section className="py-20 sm:py-28"><div className="container-shell"><div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#010f33] via-[#08274a] to-[#087985] px-7 py-14 text-white shadow-[0_28px_70px_rgba(1,15,51,.2)] sm:px-14 sm:py-20">
    <div className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full border border-white/10 bg-white/[.04]"/><div className="absolute -bottom-48 left-1/3 -z-10 h-96 w-96 rounded-full border border-white/10"/>
    <Reveal><div className="mx-auto max-w-3xl text-center"><p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.2em] text-[#8ce9df]"><Sparkles size={14}/> Let’s create momentum</p><h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">Your next customer could be one conversation away.</h2><p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/70">Tell us who you want to reach. We’ll help shape a focused outreach approach built around your market, audience and goals.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild size="lg" className="h-14 rounded-full bg-gradient-to-r from-[#35d1c6] to-[#0797a2] px-7 font-bold text-[#04172e] shadow-lg hover:brightness-110"><Link href="/contact">Book your strategy call <ArrowUpRight size={17}/></Link></Button><Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/30 bg-white/5 px-7 text-white hover:bg-white/10"><Link href="/services">Explore services <ArrowRight size={17}/></Link></Button></div></div></Reveal>
  </div></div></section>;
}

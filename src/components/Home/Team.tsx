"use client";
import { Reveal } from "@/components/site/reveal";
import { SearchCheck, MessagesSquare, Workflow, BarChart3 } from "lucide-react";

const principles = [
  { icon: SearchCheck, title: "Research before outreach", body: "We start with your ideal customer profile, buying context and the decision-makers who matter." },
  { icon: MessagesSquare, title: "Relevance over volume", body: "Personalised messaging is shaped around your offer, audience and the conversations you want to create." },
  { icon: Workflow, title: "A connected process", body: "Research, outreach, qualification and handover work together as one coordinated programme." },
  { icon: BarChart3, title: "Visibility at every step", body: "Clear activity updates and practical reporting help your team understand what is working." },
];

export function Team() {
  return <section className="border-y border-slate-100 bg-[#f6f9fc] py-20 sm:py-28"><div className="container-shell">
    <div className="mx-auto mb-14 max-w-3xl text-center"><p className="mb-3 text-[11px] font-extrabold uppercase tracking-[.22em] text-[#0797a2]">The Prospora difference</p><h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#010f33] sm:text-4xl">A thoughtful extension of your sales team.</h2><p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">Great pipeline starts with a clear plan, careful research and consistent execution. We bring the pieces together so your team can focus on closing.</p></div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{principles.map((item,i)=>{const Icon=item.icon;return <Reveal key={item.title} delay={i*.05}><article className="h-full rounded-[1.5rem] border border-slate-200/80 bg-white p-7 shadow-[0_8px_26px_rgba(1,15,51,.035)] transition hover:-translate-y-1 hover:shadow-soft"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e1f8f5] to-[#edf2ff] text-[#087985]"><Icon size={22}/></div><h3 className="font-heading text-lg font-extrabold text-[#071632]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p></article></Reveal>})}</div>
  </div></section>;
}

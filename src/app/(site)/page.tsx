import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { ServiceCard } from "@/components/site/service-card";
import {
  defaultFaqs,
  defaultIndustries,
  defaultMarkets,
  getServices,
  getSiteSettings,
} from "@/lib/content";
export const metadata: Metadata = {
  title: "B2B Lead Generation Company",
  description:
    "Research-led B2B lead generation, appointment setting and personalised outreach for growth teams in the USA, Canada, Middle East and Australia.",
  alternates: { canonical: "/" },
};
export default async function HomePage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    description: settings.defaultSeoDescription,
    url: process.env.APP_URL ?? "http://localhost:3000",
    email: settings.contactEmail,
    areaServed: defaultMarkets.map((m) => m.name),
  };
  const jsonLdScript = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript }}
      />
      <section className="hero-grid relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="container-shell relative grid min-h-[650px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div>
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-teal-800">
                <span className="h-2 w-2 rounded-full bg-teal-500" />{" "}
                Research-led B2B growth
              </div>
              <h1 className="max-w-3xl font-heading text-5xl font-extrabold leading-[1.05] tracking-[-.045em] text-[#102A4C] sm:text-6xl xl:text-7xl">
                Meet the right buyers.{" "}
                <span className="text-teal-600">
                  Build a pipeline you can trust.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                We help B2B companies find, reach and start conversations with
                real decision-makers through researched, verified and
                personalised outreach.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Book a free strategy call <ArrowUpRight size={17} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/how-we-work">
                    See how it works <ArrowRight size={17} />
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-600" /> Verified
                  business contacts
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-teal-600" />{" "}
                  Transparent reporting
                </span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="relative">
            <div className="relative mx-auto aspect-[.96] w-full max-w-[510px] overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-[#102A4C] via-[#143d5c] to-[#0d7778] p-7 text-white shadow-2xl shadow-slate-900/20 sm:aspect-square">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/15" />
              <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-white/15" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="relative flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[.2em] text-teal-100">
                  Your growth, mapped
                </span>
                <Globe2 className="text-teal-200" size={26} />
              </div>
              <div className="relative mt-12 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <UsersRound className="mb-7 text-teal-200" size={24} />
                  <p className="text-sm text-slate-200">
                    Target decision-makers
                  </p>
                  <p className="mt-1 text-xl font-bold">Right-fit people</p>
                </div>
                <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <ShieldCheck className="mb-7 text-teal-200" size={24} />
                  <p className="text-sm text-slate-200">Contact quality</p>
                  <p className="mt-1 text-xl font-bold">Verified data</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <TrendingUp className="mb-7 text-teal-200" size={24} />
                  <p className="text-sm text-slate-200">Campaign focus</p>
                  <p className="mt-1 text-xl font-bold">Better-fit pipeline</p>
                </div>
                <div className="mt-8 rounded-2xl border border-teal-200/30 bg-teal-300/15 p-5 backdrop-blur">
                  <Sparkles className="mb-7 text-teal-100" size={24} />
                  <p className="text-sm text-teal-50">Our approach</p>
                  <p className="mt-1 text-xl font-bold">Research first</p>
                </div>
              </div>
              <div className="relative mt-8 flex items-center justify-between border-t border-white/15 pt-5 text-xs text-slate-200">
                <span>USA · Canada · Middle East · Australia</span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-teal-300" /> Built
                  around your ICP
                </span>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block">
              <p className="text-xs text-slate-500">Our standard</p>
              <p className="mt-1 text-sm font-bold text-[#102A4C]">
                Quality over volume
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <>
        <section className="border-y border-slate-100 bg-white">
          <div className="container-shell grid gap-4 py-7 text-center sm:grid-cols-2 lg:grid-cols-4">
            {["USA", "Canada", "Middle East", "Australia"].map((market, i) => (
              <div
                key={market}
                className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-600"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                  0{i + 1}
                </span>
                {market}
              </div>
            ))}
          </div>
        </section>
        <section className="container-shell py-20 sm:py-28">
          <SectionHeading
            eyebrow="What we do"
            title="Everything you need to turn target accounts into conversations."
            description="Choose a focused service or combine them into an outbound programme shaped around your audience, goals and market."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.04}>
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>
          <div className="mt-9 text-center">
            <Button asChild variant="outline">
              <Link href="/services">
                Explore all services <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </section>
        <section className="bg-[#F5F8FA] py-20 sm:py-28">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Our process"
              title="Research first. Outreach second."
              description="A straightforward workflow that keeps targeting, communication and reporting clear from day one."
              centered
            />
            <div className="grid gap-5 md:grid-cols-5">
              {[
                {
                  n: "01",
                  t: "Discover",
                  d: "Understand your offer, best customers and lead criteria.",
                },
                {
                  n: "02",
                  t: "Research",
                  d: "Build target-account lists and map decision-makers.",
                },
                {
                  n: "03",
                  t: "Verify",
                  d: "Check contact data before campaign launch.",
                },
                {
                  n: "04",
                  t: "Engage",
                  d: "Run personalised outreach with structured follow-up.",
                },
                {
                  n: "05",
                  t: "Refine",
                  d: "Review reporting and improve the next cycle.",
                },
              ].map((step, i) => (
                <Reveal key={step.n} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-6">
                    <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl bg-[#102A4C] font-bold text-teal-200">
                      {step.n}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#102A4C]">
                      {step.t}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {step.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="container-shell py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionHeading
                eyebrow="Why Propspora"
                title="A thoughtful partner for your next stage of growth."
                description="No recycled scripts. No vanity metrics. A clear process built around your ideal customer."
              />
              <Button asChild variant="outline">
                <Link href="/about">
                  Get to know us <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Quality over volume",
                  desc: "Prioritise relevant, better-fit prospects over oversized lists.",
                },
                {
                  title: "Verified data",
                  desc: "Check contacts before outreach and keep data quality in focus.",
                },
                {
                  title: "Messaging with context",
                  desc: "Build campaigns around your offer, audience and market.",
                },
                {
                  title: "Honest reporting",
                  desc: "See activity, responses and what we plan to improve.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="rounded-2xl border border-slate-200 p-6">
                    <div className="mb-4 h-1 w-12 rounded-full bg-teal-500" />
                    <h3 className="font-bold text-[#102A4C]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#102A4C] py-20 text-white sm:py-24">
          <div className="container-shell grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[.24em] text-teal-300">
                Ready to get started?
              </p>
              <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Let’s build a pipeline around the right conversations.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Tell us who you want to reach. We’ll review your market and
                outline a practical approach—without obligation.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/contact">
                Book your free strategy call <ArrowUpRight size={17} />
              </Link>
            </Button>
          </div>
        </section>
        <section className="container-shell py-20">
          <SectionHeading
            eyebrow="Common questions"
            title="A few things you may be wondering."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {defaultFaqs.slice(0, 4).map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 p-5"
              >
                <summary className="cursor-pointer list-none pr-8 font-semibold text-[#102A4C] marker:hidden">
                  {f.question}
                  <span className="float-right text-teal-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
          <Link
            href="/faq"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-700"
          >
            View all FAQs <ArrowRight size={16} />
          </Link>
        </section>
      </>
    </>
  );
}

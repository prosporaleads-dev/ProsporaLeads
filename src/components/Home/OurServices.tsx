"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { ServiceCard } from "@/components/site/service-card";
import { defaultServices } from "./services/homeService";

export function OurServices() {
  return (
    <section className="border-y border-border bg-brand-surface">
      <div className="container-shell py-24 sm:py-32">
        <div className="mb-12 max-w-3xl text-center mx-auto">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">
            <span className="h-1 w-12 rounded-full bg-brand-teal" /> Our
            services
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Outbound services designed around your ideal customer.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-ink/85 sm:text-lg">
            Choose a single service or combine them into a programme. Every
            engagement starts with understanding your offer and your buyers.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {defaultServices.map((service, i) => (
            <div key={service.slug} id={service.slug}>
              <Reveal delay={i * 0.04}>
                <ServiceCard service={service} />
              </Reveal>
            </div>
          ))}
        </div>
        <div className="mt-16 flex items-center justify-center">
          <Link
            href="/services"
            className="flex flex-row gap-3 items-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-teal/50 hover:text-brand-teal"
          >
            Explore our services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

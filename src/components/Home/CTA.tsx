"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-shell rounded-[2rem] border border-brand-teal/30 bg-brand-ink p-10 text-white sm:p-16 sm:text-center">
        <Reveal>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal-light">
            Ready to get started?
          </p>
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Let&rsquo;s build a pipeline around the right conversations.
          </h2>
          <p className="mt-5 max-w-lg leading-8 text-white/80 sm:mx-auto">
            Tell us who you want to reach. We&rsquo;ll review your market and
            outline a practical approach&mdash;without obligation.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              variant="brand-teal"
              className="w-full sm:w-auto text-white!"
            >
              <Link href="/contact">
                Book your free strategy call <ArrowUpRight size={17} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="/services">
                Explore our services <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

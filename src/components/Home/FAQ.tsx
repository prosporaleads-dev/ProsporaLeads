"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { defaultFaqs } from "./services/homeService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="container-shell">
        <div className="mb-12 max-w-3xl text-center mx-auto">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">
            <span className="h-1 w-12 rounded-full bg-brand-teal" /> Common
            questions
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            Straight answers.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-ink/85 sm:text-lg">
            Learn how we work, how leads are qualified and what you can expect
            from a campaign.
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-14 max-w-3xl divide-y divide-border rounded-xl border border-border bg-white px-6"
        >
          {defaultFaqs.slice(0, 4).map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-10 flex justify-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-teal"
          >
            View all FAQs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

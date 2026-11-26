import type { Metadata } from "next";
import { defaultFaqs } from "@/lib/content";
import { buildBreadcrumbJsonLd, safeJsonLd } from "@/lib/seo";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Prospora Leads services, qualification, regions, outreach, and campaign reporting.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: defaultFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq" },
    ]),
  ];

  return (
    <div className="container-shell py-24 sm:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <SectionHeading
        eyebrow="FAQs"
        title="Straight answers to common questions."
        description="Learn how we work, how leads are qualified and what you can expect from a campaign."
      />
      <div className="mt-16 max-w-3xl mx-auto space-y-3">
        {defaultFaqs.map((f, i) => (
          <details
            key={f.question}
            className="group rounded-xl border border-border bg-white p-6 shadow-soft transition hover:border-brand-teal/60"
          >
            <Reveal delay={i * 0.03}>
              <summary className="cursor-pointer list-none pr-8 font-semibold text-foreground marker:hidden">
                {f.question}
                <span className="float-right text-brand-teal transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-8 text-foreground/75">{f.answer}</p>
            </Reveal>
          </details>
        ))}
      </div>
    </div>
  );
}

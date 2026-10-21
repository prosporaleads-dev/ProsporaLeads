import type { Metadata } from "next";
import { defaultFaqs } from "@/lib/content";
import { SectionHeading } from "@/components/site/section-heading";
export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Propspora Leads services, qualification, regions, outreach and campaign reporting.",
  alternates: { canonical: "/faq" },
};
export default function FAQPage() {
  return (
    <div className="container-shell py-20 sm:py-28">
      <SectionHeading
        eyebrow="FAQs"
        title="Straight answers to common questions."
        description="Learn how we work, how leads are qualified and what you can expect from a campaign."
      />
      <div className="max-w-4xl space-y-3">
        {defaultFaqs.map((f) => (
          <details
            key={f.question}
            className="group rounded-2xl border border-slate-200 p-6"
          >
            <summary className="cursor-pointer list-none font-bold text-[#102A4C]">
              {f.question}
              <span className="float-right text-teal-600 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 leading-7 text-slate-600">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

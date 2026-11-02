import type { Metadata } from "next";
import { defaultIndustries } from "@/lib/content";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Research-led B2B lead generation for SaaS, staffing, real estate, finance, manufacturing and professional services.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <div className="container-shell py-24 sm:py-36">
      <SectionHeading
        eyebrow="Industries"
        title="We understand how different industries buy."
        description="Every sector has its own decision-makers, language and buying cycle. We research your industry before we write a message."
      />
      <div className="mt-16 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {defaultIndustries.map((industry, i) => (
          <div
            key={industry}
            className="rounded-xl border border-border bg-white p-6 text-center transition hover:border-brand-teal hover:shadow-soft"
          >
            <Reveal delay={i * 0.03}>
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Reveal>
            <Reveal delay={i * 0.03 + 0.05}>
              <p className="mt-3 text-sm font-semibold text-foreground leading-6">
                {industry}
              </p>
            </Reveal>
          </div>
        ))}
      </div>
      <p className="mt-12 text-sm text-foreground/60">
        Don’t see your industry?{" "}
        <a className="font-semibold text-brand-teal underline" href="/contact">
          Get in touch
        </a>
        — if there’s a clear B2B audience, we can research it.
      </p>
    </div>
  );
}

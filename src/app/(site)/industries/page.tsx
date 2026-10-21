import type { Metadata } from "next";
import { defaultIndustries } from "@/lib/content";
import { SectionHeading } from "@/components/site/section-heading";
export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Research-led B2B lead generation for SaaS, staffing, real estate, finance, manufacturing and professional services.",
  alternates: { canonical: "/industries" },
};
export default function IndustriesPage() {
  return (
    <div className="container-shell py-20 sm:py-28">
      <SectionHeading
        eyebrow="Industries"
        title="We understand how different industries buy."
        description="Every sector has its own decision-makers, language and buying cycle. We research your industry before we write a message."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {defaultIndustries.map((industry, i) => (
          <div
            key={industry}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 p-6"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-semibold text-[#102A4C]">{industry}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-slate-600">
        Don’t see your industry?{" "}
        <a className="font-semibold text-teal-700 underline" href="/contact">
          Get in touch
        </a>
        —if there’s a clear B2B audience, we can research it.
      </p>
    </div>
  );
}

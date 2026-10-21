import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Our Lead Generation Process",
  description:
    "A transparent lead generation process from discovery and research to verification, outreach and reporting.",
  alternates: { canonical: "/how-we-work" },
};
const steps = [
  {
    title: "Discovery call",
    body: "We talk through your product, your best customers, target regions and what a qualified lead means for your team.",
  },
  {
    title: "Strategy and ideal customer profile",
    body: "We define who to target, which roles matter, which messages may resonate and how success will be measured.",
  },
  {
    title: "Research and list building",
    body: "We build a target-account list and identify the right decision-makers at each company.",
  },
  {
    title: "Verification",
    body: "We check contact accuracy before it is used in a campaign, helping protect sender reputation.",
  },
  {
    title: "Outreach and follow-up",
    body: "We launch personalised email and LinkedIn campaigns, manage replies and follow up consistently and politely.",
  },
  {
    title: "Reporting and optimisation",
    body: "You receive updates on activity, responses and booked meetings. We review the data together and keep improving.",
  },
];
export default function HowWeWorkPage() {
  return (
    <div className="container-shell py-20 sm:py-28">
      <SectionHeading
        eyebrow="How we work"
        title="A clear process, from first call to booked meetings."
        description="The process is collaborative and measurable, so your team knows what is happening and why."
      />
      <div className="mt-12 space-y-5">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="grid gap-4 rounded-2xl border border-slate-200 p-6 sm:grid-cols-[80px_1fr] sm:p-8"
          >
            <div className="font-heading text-3xl font-extrabold text-teal-600">
              0{i + 1}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#102A4C]">{s.title}</h2>
              <p className="mt-2 max-w-3xl leading-7 text-slate-600">
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Button asChild size="lg">
          <Link href="/contact">Talk to our team</Link>
        </Button>
      </div>
    </div>
  );
}

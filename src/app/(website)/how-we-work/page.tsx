import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Our Lead Generation Process",
  description:
    "A transparent lead generation process from discovery and research to verification, outreach and reporting.",
  alternates: { canonical: "/how-we-work" },
};

const steps = [
  {
    num: "01",
    title: "Discovery call",
    body: "We talk through your product, your best customers, target regions and what a qualified lead means for your team.",
  },
  {
    num: "02",
    title: "Strategy and ideal customer profile",
    body: "We define who to target, which roles matter, which messages may resonate and how success will be measured.",
  },
  {
    num: "03",
    title: "Research and list building",
    body: "We build a target-account list and identify the right decision-makers at each company.",
  },
  {
    num: "04",
    title: "Verification",
    body: "We check contact accuracy before it is used in a campaign, helping protect sender reputation.",
  },
  {
    num: "05",
    title: "Outreach and follow-up",
    body: "We launch personalised email and LinkedIn campaigns, manage replies and follow up consistently and politely.",
  },
  {
    num: "06",
    title: "Reporting and optimisation",
    body: "You receive updates on activity, responses and booked meetings. We review the data together and keep improving.",
  },
];

export default function HowWeWorkPage() {
  return (
    <div className="container-shell py-24 sm:py-36">
      <SectionHeading
        eyebrow="How we work"
        title="A clear process, from first call to booked meetings."
        description="The process is collaborative and measurable, so your team knows what is happening and why."
      />
      <div className="mt-18 space-y-8">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className="grid gap-6 rounded-[1.75rem] border border-border bg-white p-8 shadow-soft sm:grid-cols-[120px_1fr] transition hover:border-brand-teal/60"
          >
            <Reveal delay={i * 0.05}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-teal bg-white text-brand-teal font-heading text-xl font-extrabold">
                {s.num}
              </div>
            </Reveal>
            <Reveal delay={i * 0.05 + 0.06}>
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-3xl leading-8 text-foreground/75">
                  {s.body}
                </p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
      <div className="mt-20 flex justify-center">
        <Button
          asChild
          size="lg"
          variant="brand-teal"
          className="w-full sm:w-auto"
        >
          <Link href="/contact">Talk to our team</Link>
        </Button>
      </div>
    </div>
  );
}

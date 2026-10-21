import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const metadata: Metadata = {
  title: "B2B Lead Generation Services",
  description:
    "Explore B2B lead generation, appointment setting, email and LinkedIn outreach, market research and data verification.",
  alternates: { canonical: "/services" },
};
export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="container-shell py-20 sm:py-28">
      <SectionHeading
        eyebrow="Our services"
        title="Outbound services designed around your ideal customer."
        description="Choose a single service or combine them into a programme. Every engagement starts with understanding your offer and your buyers—not with a template."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <div id={service.slug} key={service.slug}>
            <Reveal delay={i * 0.04}>
              <ServiceCard service={service} />
            </Reveal>
          </div>
        ))}
      </div>
      <div className="mt-16 rounded-3xl bg-[#102A4C] p-8 text-white sm:p-12">
        <h2 className="text-3xl font-bold">Not sure where to start?</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">
          Start with a focused pilot, a monthly programme or a one-off research
          project. We’ll help you identify a practical starting point.
        </p>
        <Button asChild className="mt-6">
          <Link href="/contact">Request a quote</Link>
        </Button>
      </div>
    </div>
  );
}

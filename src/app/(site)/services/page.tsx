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
    <div className="container-shell py-24 sm:py-36">
      <SectionHeading
        eyebrow="Our services"
        title="Outbound services designed around your ideal customer."
        description="Choose a single service or combine them into a programme. Every engagement starts with understanding your offer and your buyers—not with a template."
      />
      <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <div key={service.slug} id={service.slug}>
            <Reveal delay={i * 0.04}>
              <ServiceCard service={service} />
            </Reveal>
          </div>
        ))}
      </div>
      <div className="mt-24 rounded-[2rem] border border-brand-teal/30 bg-foreground p-10 text-white sm:p-16">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Not sure where to start?
        </h2>
        <p className="mt-5 max-w-xl leading-8 text-white/80">
          Start with a focused pilot, a monthly programme or a one-off research
          project. We’ll help you identify a practical starting point.
        </p>
        <Button
          asChild
          className="mt-8 w-full sm:w-auto"
          variant="brand-teal"
          size="lg"
        >
          <Link href="/contact">Request a proposal</Link>
        </Button>
      </div>
    </div>
  );
}

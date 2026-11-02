import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "About Propspora Leads",
  description:
    "Learn about Propspora Leads and our research-led, ethical approach to B2B pipeline development.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-shell py-24 sm:py-36">
      <SectionHeading
        eyebrow="About us"
        title="We help good companies get heard by the right people."
        description="Propspora Leads combines careful research, verified data and thoughtful outreach to help B2B businesses start relevant, respectful conversations."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Our mission",
            body: "Help B2B companies build a high-quality pipeline through research-led, responsible outreach.",
          },
          {
            title: "Our vision",
            body: "Be a lead generation partner growth teams trust for transparent communication and honest reporting.",
          },
          {
            title: "Our values",
            body: "Integrity, relevance, accuracy, respect for privacy and a genuine partnership with our clients.",
          },
        ].map((x, i) => (
          <article
            key={x.title}
            className="rounded-[1.75rem] border border-border bg-white p-8 shadow-soft transition hover:border-brand-teal/60"
          >
            <Reveal delay={i * 0.05}>
              <h2 className="font-heading text-lg font-bold text-foreground">
                {x.title}
              </h2>
              <p className="mt-3 leading-8 text-foreground/75">{x.body}</p>
            </Reveal>
          </article>
        ))}
      </div>
      <div className="mt-16 rounded-[2rem] border border-brand-teal/30 bg-foreground p-10 text-white sm:p-14">
        <Reveal>
          <h2 className="font-heading text-xl font-bold">Our promise</h2>
          <p className="mt-4 max-w-3xl leading-8 text-white/80">
            We tell clients what we see, including when a market or message
            needs more work. We do not promise guaranteed results; we commit to
            a rigorous process and transparent reporting.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

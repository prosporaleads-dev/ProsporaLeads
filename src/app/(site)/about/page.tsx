import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
export const metadata: Metadata = {
  title: "About Propspora Leads",
  description:
    "Learn about Propspora Leads and our research-led, ethical approach to B2B pipeline development.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <div className="container-shell py-20 sm:py-28">
      <SectionHeading
        eyebrow="About us"
        title="We help good companies get heard by the right people."
        description="Propspora Leads combines careful research, verified data and thoughtful outreach to help B2B businesses start relevant, respectful conversations."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
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
        ].map((x) => (
          <article
            key={x.title}
            className="rounded-2xl border border-slate-200 p-7"
          >
            <h2 className="text-xl font-bold text-[#102A4C]">{x.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{x.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-12 rounded-2xl bg-[#F5F8FA] p-8">
        <h2 className="text-xl font-bold text-[#102A4C]">Our promise</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          We tell clients what we see, including when a market or message needs
          more work. We do not promise guaranteed results; we commit to a
          rigorous process and transparent reporting.
        </p>
      </div>
    </div>
  );
}

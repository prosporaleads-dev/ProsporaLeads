import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";
import { SectionHeading } from "@/components/site/section-heading";
import { getSiteSettings } from "@/lib/content";
export const metadata: Metadata = {
  title: "Contact Propspora Leads",
  description:
    "Book a free strategy call and tell Propspora Leads who you want to reach.",
  alternates: { canonical: "/contact" },
};
export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <div className="container-shell py-24 sm:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-10">
          <SectionHeading
            eyebrow="Let's talk"
            title="Let's talk about your pipeline."
            description="Tell us a little about your business and who you want to reach. We’ll review your goals and follow up with next steps."
          />
          <div className="rounded-[1.75rem] border border-border bg-white p-8 shadow-soft">
            <h2 className="font-heading text-lg font-bold text-foreground">
              Contact details
            </h2>
            <p className="mt-3 text-sm text-foreground/70">Email</p>
            <a
              className="mt-1 block font-semibold text-brand-teal"
              href={`mailto:${settings.contactEmail}`}
            >
              {settings.contactEmail}
            </a>
            {settings.contactPhone && (
              <>
                <p className="mt-6 text-sm text-foreground/70">Phone</p>
                <a
                  className="mt-1 block font-semibold text-brand-teal"
                  href={`tel:${settings.contactPhone}`}
                >
                  {settings.contactPhone}
                </a>
              </>
            )}
            <p className="mt-8 text-sm leading-7 text-foreground/70">
              USA · Canada · Middle East · Australia
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

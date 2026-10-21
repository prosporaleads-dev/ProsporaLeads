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
    <div className="container-shell py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Let's talk"
            title="Let's talk about your pipeline."
            description="Tell us a little about your business and who you want to reach. We’ll review your goals and follow up with next steps."
          />
          <div className="rounded-2xl bg-[#F5F8FA] p-6">
            <h2 className="font-bold text-[#102A4C]">Contact details</h2>
            <p className="mt-3 text-sm text-slate-600">Email</p>
            <a
              className="font-semibold text-teal-700"
              href={`mailto:${settings.contactEmail}`}
            >
              {settings.contactEmail}
            </a>
            {settings.contactPhone && (
              <>
                <p className="mt-4 text-sm text-slate-600">Phone</p>
                <a
                  className="font-semibold text-teal-700"
                  href={`tel:${settings.contactPhone}`}
                >
                  {settings.contactPhone}
                </a>
              </>
            )}
            <p className="mt-5 text-sm leading-6 text-slate-600">
              USA · Canada · Middle East · Australia
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

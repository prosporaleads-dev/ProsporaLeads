import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";
import { SectionHeading } from "@/components/site/section-heading";
import { getSiteSettings } from "@/lib/content";
import { getAppUrl } from "@/lib/site-url";
import { buildBreadcrumbJsonLd, safeJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Prospora Leads",
  description:
    "Book a free strategy call or email info@prosporaleads.com to discuss B2B lead generation and appointment setting for your team.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const origin = getAppUrl().origin;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Prospora Leads",
      url: `${origin}/contact`,
      mainEntity: {
        "@type": "Organization",
        name: settings.siteName,
        url: origin,
        email: settings.contactEmail,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: settings.contactEmail,
          availableLanguage: ["English"],
        },
      },
    },
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  ];

  return (
    <div className="container-shell py-24 sm:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
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

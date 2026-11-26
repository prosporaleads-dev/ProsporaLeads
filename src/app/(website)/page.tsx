import type { Metadata } from "next";
import { defaultFaqs, defaultServices, getSiteSettings } from "@/lib/content";
import { getAppUrl } from "@/lib/site-url";
import { safeJsonLd } from "@/lib/seo";
import {
  Hero,
  CTA,
  OurServices,
  Team,
  HowItWorks,
  Industries,
  Markets,
  FAQ,
} from "@/components/Home";
import { defaultMarkets } from "@/components/Home/services/homeService";

export const metadata: Metadata = {
  title: "B2B Lead Generation & Appointment Setting Company",
  description:
    "Research-led B2B lead generation, appointment setting, and personalised outreach for growth teams in the USA, Canada, Middle East, and Australia.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const settings = await getSiteSettings();
  const origin = getAppUrl().origin;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: settings.siteName,
        url: origin,
        logo: `${origin}${settings.logoUrl}`,
        image: `${origin}/brand/og-banner.png`,
        description: settings.defaultSeoDescription,
        email: settings.contactEmail,
        slogan: settings.tagline,
        areaServed: defaultMarkets.map((m) => m.name),
        knowsAbout: [
          "B2B Lead Generation",
          "Appointment Setting",
          "Personalised Email Outreach",
          "LinkedIn Outreach",
          "Market & Account Research",
          "B2B Data Verification & Enrichment",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: settings.contactEmail,
            areaServed: ["US", "CA", "AE", "SA", "AU"],
            availableLanguage: ["English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: settings.siteName,
        description: settings.defaultSeoDescription,
        publisher: { "@id": `${origin}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${origin}/#service`,
        name: settings.siteName,
        url: origin,
        image: `${origin}/brand/og-banner.png`,
        email: settings.contactEmail,
        description: settings.defaultSeoDescription,
        areaServed: defaultMarkets.map((m) => m.name),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "B2B Lead Generation Services",
          itemListElement: defaultServices.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.shortDescription,
              url: `${origin}/services#${s.slug}`,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${origin}/#faq`,
        mainEntity: defaultFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <Hero />
      <OurServices />
      <HowItWorks />
      <Industries />
      <Markets />
      <Team />
      <CTA />
      <FAQ />
    </>
  );
}

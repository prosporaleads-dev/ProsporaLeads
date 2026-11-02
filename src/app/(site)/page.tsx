import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import {
  Hero,
  CTA,
  OurServices,
  Team,
  HowItWorks,
  Industries,
  Markets,
  FAQ,
  Testimonials,
} from "@/components/Home";
import { defaultMarkets } from "@/components/Home/services/homeService";

export const metadata: Metadata = {
  title: "B2B Lead Generation Company",
  description:
    "Research-led B2B lead generation, appointment setting and personalised outreach for growth teams in the USA, Canada, Middle East and Australia.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const settings = await getSiteSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    description: settings.defaultSeoDescription,
    url: process.env.APP_URL ?? "http://localhost:3000",
    email: settings.contactEmail,
    areaServed: defaultMarkets.map((m) => m.name),
  };
  const jsonLdScript = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript }}
      />
      <Hero />
      <OurServices />
      <HowItWorks />
      <Industries />
      <Markets />
      <Team />
      <Testimonials />
      <CTA />
      <FAQ />
    </>
  );
}

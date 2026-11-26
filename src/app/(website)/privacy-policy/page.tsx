import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy information for visitors and business enquiries to Propspora Leads.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="container-shell py-24 sm:py-36">
      <SectionHeading
        eyebrow="Legal"
        title="Privacy policy"
        description="How we collect, use and protect information you share with us."
      />
      <p className="mt-6 text-sm text-foreground/50">
        Draft template — obtain legal review and replace bracketed details
        before publishing.
      </p>
      <div className="mt-14 space-y-10">
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Who we are
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Propspora Leads (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;)
            provides B2B lead generation and outreach services. Contact us at
            [privacy contact email] for privacy questions.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Information we collect
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We may collect information you submit through our contact form,
            including your name, work email, phone number, company, website,
            target region and enquiry details. Basic technical information may
            also be processed to operate and protect the website.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            How we use information
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We use enquiry information to respond to requests, assess service
            fit, communicate about relevant services, maintain records and
            protect our website. We do not publish enquiry details.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Sharing and retention
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We may use service providers to host and operate our website. We
            retain information only as needed for the stated purposes, legal
            obligations and legitimate business records.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Your choices
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Depending on your location, you may have rights to access, correct,
            delete or object to certain processing. Contact [privacy contact
            email] to make a request.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            International transfers and regional rules
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We work with businesses in multiple regions. This draft must be
            adapted to the laws applicable to the business, the people whose
            data is processed and the actual data flows.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Updates
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We may update this policy. Add the effective date and the legal
            entity’s full registered details before launch.
          </p>
        </section>
      </div>
    </article>
  );
}

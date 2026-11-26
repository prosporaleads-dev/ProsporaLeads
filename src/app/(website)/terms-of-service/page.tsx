import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";
import { buildBreadcrumbJsonLd, safeJsonLd } from "@/lib/seo";
import { getAppUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing use of the Prospora Leads website and our B2B lead generation, appointment setting, and outreach services.",
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "November 26, 2026";
const CONTACT_EMAIL = "info@prosporaleads.com";

export default function TermsPage() {
  const origin = getAppUrl().origin;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Service | Prospora Leads",
      url: `${origin}/terms-of-service`,
      dateModified: "2026-11-26",
      description:
        "Terms of Service for using the Prospora Leads website and engaging Prospora Leads for B2B lead generation services.",
    },
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Terms of Service", path: "/terms-of-service" },
    ]),
  ];

  return (
    <article className="container-shell py-24 sm:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <SectionHeading
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms governing access to the Prospora Leads website and engagement of our B2B lead generation services."
      />
      <p className="mt-6 text-sm font-medium text-foreground/60">
        Effective date: {EFFECTIVE_DATE} &middot; Contact:{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-brand-teal underline-offset-4 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </p>

      <div className="mt-14 max-w-4xl space-y-10">
        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            By accessing or using the Prospora Leads website (the
            &quot;Site&quot;) or submitting an enquiry, you agree to be bound by
            these Terms of Service (&quot;Terms&quot;) and our{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-brand-teal hover:underline"
            >
              Privacy Policy
            </Link>
            . If you are accessing the Site on behalf of a company or
            organisation, you represent that you have authority to bind that
            entity to these Terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            2. Services Overview &amp; Separate Written Agreements
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Prospora Leads provides B2B lead generation, appointment setting,
            personalised email and LinkedIn outreach, market and account
            research, and data verification and enrichment services. Information
            on this Site is provided for general informational purposes and does
            not constitute a binding offer. Specific deliverables, timelines,
            qualification criteria, fees, payment schedules, and service levels
            are governed exclusively by a separate written Master Services
            Agreement (MSA) or Statement of Work (SOW) signed by both parties.
            In the event of a conflict between these Terms and a signed SOW/MSA,
            the signed agreement controls.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            3. No Guarantee of Specific Commercial Outcomes
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            While Prospora Leads commits to a rigorous, research-led process,
            verified contact standards, and transparent reporting, B2B outbound
            results depend on many factors outside our sole control—including
            your product-market fit, pricing, brand reputation, target market
            conditions, inbox placement, and your internal sales process. Unless
            expressly agreed in writing in a signed SOW, we do not guarantee a
            specific number of leads, replies, booked meetings, or closed deals.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            4. Client Responsibilities &amp; Regulatory Compliance
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Clients engaging Prospora Leads agree to provide accurate
            information regarding their offer, ideal customer profile, branding,
            and suppression/do-not-contact lists. Both parties agree to conduct
            outbound activities responsibly and in accordance with applicable
            commercial messaging and data protection laws in the target
            jurisdictions—including CAN-SPAM (USA), CASL (Canada), the Spam Act
            and Privacy Act (Australia), and applicable Middle East and EU/UK
            regulations. Any general compliance notes on this Site are for
            informational purposes only and do not constitute legal advice.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            5. Acceptable Use of the Website
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            You agree to use the Site only for lawful business purposes. You
            must not:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-8 text-foreground/75">
            <li>
              Attempt to gain unauthorised access to any portion of the Site,
              admin panels, APIs, or underlying servers.
            </li>
            <li>
              Submit false, fraudulent, defamatory, or spam enquiries through
              our contact forms.
            </li>
            <li>
              Introduce malware, conduct denial-of-service attacks, or interfere
              with the security or performance of the Site.
            </li>
            <li>
              Reproduce, redistribute, or commercially exploit Site content
              without our prior written permission.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            6. Intellectual Property
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            All content on this Site—including text, graphics, logos, design
            elements, and code—is owned by or licensed to Prospora Leads and is
            protected by applicable intellectual property laws. Clients retain
            ownership of their own trademarks, brand assets, and proprietary
            materials shared with us. Ownership and licence rights to campaign
            deliverables and prospect lists are defined in the applicable client
            agreement.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            7. Confidentiality
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We treat business information submitted through our contact forms
            and discovery conversations as confidential and use it solely to
            evaluate and deliver our services. Formal non-disclosure obligations
            for active engagements are set out in our client agreements or
            mutual NDAs.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            8. Third-Party Services and Links
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Our Site and service workflows may reference or integrate with
            third-party platforms (such as CRMs, scheduling tools, email
            providers, or LinkedIn). We do not control and are not responsible
            for the availability, policies, or practices of third-party
            services, and your use of them is governed by their respective
            terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            9. Disclaimers and Limitation of Liability
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            The Site is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis without warranties of any kind, express or
            implied, including merchantability, fitness for a particular
            purpose, or non-infringement. To the maximum extent permitted by
            applicable law, Prospora Leads shall not be liable for any indirect,
            incidental, consequential, special, or punitive damages, or loss of
            profits, revenue, or data arising out of or related to your use of
            the Site.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            10. Indemnification
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            You agree to indemnify and hold harmless Prospora Leads and its
            team, affiliates, and partners from any claims, damages, liabilities,
            or expenses arising from your breach of these Terms or misuse of the
            Site.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            11. Changes to These Terms
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We may revise these Terms from time to time. The updated version
            will be posted on this page with an updated effective date.
            Continued use of the Site after changes are posted constitutes
            acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            12. Governing Law &amp; Contact Information
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            These Terms are governed by applicable commercial law, and any
            dispute relating to client services will be resolved in accordance
            with the governing law and dispute resolution clause of the
            applicable signed MSA or SOW. For questions regarding these Terms,
            please contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-brand-teal hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or visit our{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-teal hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

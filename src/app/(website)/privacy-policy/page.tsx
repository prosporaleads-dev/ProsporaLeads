import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";
import { buildBreadcrumbJsonLd, safeJsonLd } from "@/lib/seo";
import { getAppUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Prospora Leads collects, uses, protects, and manages personal and business contact information across our website and B2B lead generation services.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "November 26, 2026";
const CONTACT_EMAIL = "info@prosporaleads.com";

export default function PrivacyPolicyPage() {
  const origin = getAppUrl().origin;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy | Prospora Leads",
      url: `${origin}/privacy-policy`,
      dateModified: "2026-11-26",
      description:
        "Privacy policy detailing how Prospora Leads collects, uses, and protects personal and B2B business data.",
    },
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy-policy" },
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
        title="Privacy Policy"
        description="How Prospora Leads collects, uses, safeguards, and respects your personal and business information."
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
            1. Who We Are
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Prospora Leads (&quot;Prospora Leads&quot;, &quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) is a B2B lead generation,
            appointment setting, market research, and outbound sales partner
            serving businesses across the United States, Canada, the Middle
            East, Australia, and other international markets. We are committed to
            protecting the privacy of website visitors, prospective clients,
            clients, and business contacts.
          </p>
          <p className="mt-3 leading-8 text-foreground/75">
            If you have any questions about this Privacy Policy or wish to
            exercise your privacy rights, please contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-brand-teal hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            2. Scope of This Policy
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            This Privacy Policy explains how we handle information collected
            through our website, contact and strategy-call forms, direct email
            communications, and B2B research and outreach services. When we
            process business contact data on behalf of a client under a separate
            service agreement, we act as a service provider or data processor
            following that client&apos;s documented instructions.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            3. Information We Collect
          </h2>
          <ul className="mt-3 list-disc space-y-3 pl-6 leading-8 text-foreground/75">
            <li>
              <strong className="text-foreground">
                Information you provide directly:
              </strong>{" "}
              When you submit an enquiry, book a strategy call, or email us, we
              collect details such as your full name, business email address,
              phone number, company name, company website, target regions,
              services of interest, and project goals.
            </li>
            <li>
              <strong className="text-foreground">
                Technical and usage data:
              </strong>{" "}
              When you visit our website, our hosting and security
              infrastructure may automatically log standard technical details
              such as IP address, browser type, device type, referring URL,
              pages viewed, and timestamps to keep the site secure and reliable.
            </li>
            <li>
              <strong className="text-foreground">
                B2B business contact information:
              </strong>{" "}
              In delivering our B2B research and outreach services, we may
              compile and verify publicly available or lawfully sourced
              professional information (such as business name, job title,
              corporate email address, and public professional profile URLs)
              strictly for relevant business-to-business communications.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            4. How We Use Information
          </h2>
          <ul className="mt-3 list-disc space-y-2.5 pl-6 leading-8 text-foreground/75">
            <li>
              Respond to your enquiries, prepare proposals, and schedule
              strategy calls.
            </li>
            <li>
              Deliver, manage, and improve our B2B lead generation, appointment
              setting, research, and data verification services.
            </li>
            <li>
              Communicate service updates, campaign reporting, and relevant
              business information.
            </li>
            <li>
              Maintain security, prevent spam or abusive automated submissions,
              and protect the integrity of our website and systems.
            </li>
            <li>
              Comply with applicable legal, regulatory, accounting, and
              contractual obligations.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            5. Legal Bases for Processing
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Where required by applicable data protection law (including the GDPR
            and UK GDPR), we rely on one or more of the following legal bases:
            your <strong className="text-foreground">consent</strong> (for
            example, when you submit our contact form),{" "}
            <strong className="text-foreground">contractual necessity</strong>{" "}
            (to deliver agreed services),{" "}
            <strong className="text-foreground">legitimate business interests</strong>{" "}
            (such as operating our website, preventing fraud, and conducting
            proportionate B2B outreach where permitted by law), and{" "}
            <strong className="text-foreground">legal obligations</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            6. How We Share Information
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We do not sell your personal information to third-party data brokers
            or publish your enquiry details. We share information only in
            limited circumstances:
          </p>
          <ul className="mt-3 list-disc space-y-2.5 pl-6 leading-8 text-foreground/75">
            <li>
              <strong className="text-foreground">
                Trusted service providers:
              </strong>{" "}
              Hosting, cloud database, email delivery, analytics, and CRM tools
              that process data on our behalf under confidentiality and security
              obligations.
            </li>
            <li>
              <strong className="text-foreground">Client engagements:</strong>{" "}
              Verified B2B prospect records delivered to clients strictly within
              the agreed scope of a B2B campaign.
            </li>
            <li>
              <strong className="text-foreground">
                Legal and safety requirements:
              </strong>{" "}
              Where required by law, subpoena, court order, or to protect our
              rights, safety, and systems.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            7. International Data Transfers
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Because we work with B2B teams across the United States, Canada, the
            Middle East, Australia, and other regions, your information may be
            processed in countries other than your own. When transferring data
            across borders, we use appropriate technical, organisational, and
            contractual safeguards consistent with applicable privacy laws.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            8. Data Retention and Security
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We retain personal and enquiry information only for as long as
            necessary to fulfil the purposes described in this policy, manage
            client relationships, honour opt-out/suppression lists, or meet
            legal and accounting requirements. We maintain reasonable
            administrative, technical, and physical safeguards—including
            encrypted connections (HTTPS), access controls, and rate limiting—to
            protect data against unauthorised access, loss, or misuse.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            9. Your Privacy Rights and Opt-Out Choices
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Depending on your jurisdiction (including the EU/UK GDPR, California
            CCPA/CPRA, Canada&apos;s PIPEDA/CASL, the US CAN-SPAM Act,
            Australia&apos;s Privacy Act and Spam Act, and applicable Middle
            East data protection regulations), you may have the right to:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-8 text-foreground/75">
            <li>Request access to the personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>
              Request deletion of your personal information or addition to our
              do-not-contact suppression list.
            </li>
            <li>
              Object to or restrict certain processing, or withdraw consent
              where processing is based on consent.
            </li>
            <li>
              Opt out of any B2B email outreach at any time by replying to the
              message or emailing{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-brand-teal hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </li>
          </ul>
          <p className="mt-3 leading-8 text-foreground/75">
            We will verify and respond to valid privacy requests within the
            timeframes required by applicable law.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            10. Cookies and Similar Technologies
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We use essential cookies and session mechanisms required for core
            website functionality and security. You can control or disable
            cookies through your browser settings, though some features of the
            website may not function as intended if essential cookies are
            blocked.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            11. Children&apos;s Privacy
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Our website and B2B services are intended solely for business
            professionals and are not directed to individuals under the age of
            18. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-foreground">
            12. Updates to This Policy &amp; Contact Us
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            We may update this Privacy Policy periodically to reflect changes in
            our practices or applicable laws. Any updates will be posted on
            this page with a revised effective date. For privacy questions, data
            requests, or opt-outs, contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-brand-teal hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or via our{" "}
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

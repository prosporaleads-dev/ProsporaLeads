import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy information for visitors and business enquiries to Propspora Leads.",
  robots: { index: false, follow: true },
};
export default function PrivacyPolicyPage() {
  return (
    <article className="container-shell prose prose-slate max-w-3xl py-20">
      <h1 className="font-heading text-4xl font-bold text-[#102A4C]">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-slate-500">
        Draft template — obtain legal review and replace bracketed details
        before publishing.
      </p>
      <h2>Who we are</h2>
      <p>
        Propspora Leads ("we", "us" or "our") provides B2B lead generation and
        outreach services. Contact us at [privacy contact email] for privacy
        questions.
      </p>
      <h2>Information we collect</h2>
      <p>
        We may collect information you submit through our contact form,
        including your name, work email, phone number, company, website, target
        region and enquiry details. Basic technical information may also be
        processed to operate and protect the website.
      </p>
      <h2>How we use information</h2>
      <p>
        We use enquiry information to respond to requests, assess service fit,
        communicate about relevant services, maintain records and protect our
        website. We do not publish enquiry details.
      </p>
      <h2>Sharing and retention</h2>
      <p>
        We may use service providers to host and operate our website. We retain
        information only as needed for the stated purposes, legal obligations
        and legitimate business records.
      </p>
      <h2>Your choices</h2>
      <p>
        Depending on your location, you may have rights to access, correct,
        delete or object to certain processing. Contact [privacy contact email]
        to make a request.
      </p>
      <h2>International transfers and regional rules</h2>
      <p>
        We work with businesses in multiple regions. This draft must be adapted
        to the laws applicable to the business, the people whose data is
        processed and the actual data flows.
      </p>
      <h2>Updates</h2>
      <p>
        We may update this policy. Add the effective date and the legal entity’s
        full registered details before launch.
      </p>
    </article>
  );
}

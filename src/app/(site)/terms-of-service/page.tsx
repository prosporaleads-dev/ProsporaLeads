import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for use of the Propspora Leads website and services.",
  robots: { index: false, follow: true },
};
export default function TermsPage() {
  return (
    <article className="container-shell prose prose-slate max-w-3xl py-20">
      <h1 className="font-heading text-4xl font-bold text-[#102A4C]">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-slate-500">
        Draft template — have qualified legal counsel review and customise
        before publication.
      </p>
      <h2>Website use</h2>
      <p>
        This website provides general information about Propspora Leads and its
        services. You agree not to misuse the website or attempt unauthorised
        access.
      </p>
      <h2>Services and outcomes</h2>
      <p>
        Specific service scope, deliverables, fees, responsibilities and
        timelines should be set out in a separate written agreement. Marketing
        outcomes depend on factors such as offer, market, audience and sales
        process; no result is guaranteed unless explicitly agreed in writing.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Website content and brand assets are owned by or licensed to the
        applicable rights holder unless stated otherwise. Do not reproduce them
        without permission.
      </p>
      <h2>Third-party services</h2>
      <p>
        Links to third-party services are provided for convenience. We are not
        responsible for their content or practices.
      </p>
      <h2>Contact</h2>
      <p>
        Contact [legal contact email] with questions about these terms. Add the
        correct legal entity, governing law, effective date and dispute
        provisions before publication.
      </p>
    </article>
  );
}

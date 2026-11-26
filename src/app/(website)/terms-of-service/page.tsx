import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for use of the Propspora Leads website and services.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <article className="container-shell py-24 sm:py-36">
      <SectionHeading
        eyebrow="Legal"
        title="Terms of service"
        description="Terms for use of the Propspora Leads website and services."
      />
      <p className="mt-6 text-sm text-foreground/50">
        Draft template — have qualified legal counsel review and customise
        before publication.
      </p>
      <div className="mt-14 space-y-10">
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Website use
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            This website provides general information about Propspora Leads and
            its services. You agree not to misuse the website or attempt
            unauthorised access.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Services and outcomes
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Specific service scope, deliverables, fees, responsibilities and
            timelines should be set out in a separate written agreement.
            Marketing outcomes depend on factors such as offer, market, audience
            and sales process; no result is guaranteed unless explicitly agreed
            in writing.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Intellectual property
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Website content and brand assets are owned by or licensed to the
            applicable rights holder unless stated otherwise. Do not reproduce
            them without permission.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Third-party services
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Links to third-party services are provided for convenience. We are
            not responsible for their content or practices.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Contact
          </h2>
          <p className="mt-3 leading-8 text-foreground/75">
            Contact [legal contact email] with questions about these terms. Add
            the correct legal entity, governing law, effective date and dispute
            provisions before publication.
          </p>
        </section>
      </div>
    </article>
  );
}

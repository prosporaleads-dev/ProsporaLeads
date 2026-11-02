import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center overflow-hidden bg-brand-surface px-6 py-20">
      <div className="container-shell relative z-10">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal-dark">
            <SearchX aria-hidden="true" size={23} />
          </div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-brand-teal-dark">
            Error 404
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight text-brand-ink sm:text-5xl">
            This page isn’t in our pipeline.
          </h1>
          <p className="mt-5 max-w-xl text-base text-brand-muted">
            The address may be outdated, or the page may have moved. Head back
            to the homepage and we’ll help you find the right direction.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-brand-teal px-5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-teal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
          >
            <ArrowLeft aria-hidden="true" size={17} />
            Back to homepage
          </Link>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-32 h-96 w-96 rounded-full border-[48px] border-brand-teal/5"
      />
    </main>
  );
}
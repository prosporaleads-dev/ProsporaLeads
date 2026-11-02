"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center bg-brand-surface px-6 py-20">
      <div className="container-shell">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
            <AlertTriangle aria-hidden="true" size={23} />
          </div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-brand-teal-dark">
            Something went wrong
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight text-brand-ink sm:text-5xl">
            We couldn’t load this page.
          </h1>
          <p className="mt-5 max-w-xl text-base text-brand-muted">
            The problem may be temporary. Try loading the page again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-brand-teal px-5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-teal-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
          >
            <RotateCcw aria-hidden="true" size={16} />
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
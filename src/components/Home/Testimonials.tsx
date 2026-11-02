"use client";

export function Testimonials() {
  return (
    <section className="border-t border-border bg-brand-surface py-24 sm:py-32">
      <div className="container-shell">
        <div className="mb-12 max-w-3xl text-center mx-auto">
          <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">
            <span className="h-1 w-12 rounded-full bg-brand-teal" /> Trusted by
            teams
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            What our partners say.
          </h2>
        </div>
        <div className="flex justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Client testimonials coming soon.
          </span>
        </div>
      </div>
    </section>
  );
}

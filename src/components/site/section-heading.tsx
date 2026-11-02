export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={
        centered ? "mx-auto mb-14 max-w-3xl text-center" : "mb-12 max-w-3xl"
      }
    >
      {eyebrow && (
        <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">
          <span className="h-1 w-12 rounded-full bg-brand-teal" /> {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-8 text-brand-ink/85 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

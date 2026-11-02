import Link from "next/link";
import {
  ArrowUpRight,
  Target,
  CalendarCheck,
  Mail,
  Network,
  Map,
  Database,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  target: Target,
  "calendar-check": CalendarCheck,
  mail: Mail,
  network: Network,
  map: Map,
  database: Database,
};

export function ServiceCard({
  service,
}: {
  service: {
    slug: string;
    title: string;
    shortDescription: string;
    icon?: string;
  };
}) {
  const Icon = icons[service.icon ?? "target"] ?? Target;
  return (
    <article className="group relative rounded-[1.75rem] border border-border bg-white p-7 transition-all hover:-translate-y-1.5 hover:border-brand-teal/50 hover:shadow-luxury">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
        <Icon size={20} />
      </div>
      <h3 className="font-heading text-xl font-bold text-brand-ink">
        {service.title}
      </h3>
      <p className="mt-4 min-h-[72px] text-sm leading-7 text-brand-ink/75">
        {service.shortDescription}
      </p>
      <div className=" border-border-soft">
        <Link
          href={`/services#${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-teal"
        >
          Explore service{" "}
          <ArrowUpRight
            size={15}
            className="transition group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

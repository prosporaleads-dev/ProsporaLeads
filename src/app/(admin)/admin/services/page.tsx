import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function AdminServicesPage() {
  let services: {
    id: string;
    title: string;
    slug: string;
    isPublished: boolean;
    sortOrder: number;
    shortDescription: string;
  }[] = [];
  try {
    services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {}
  return (
    <div>
      <div className="mb-7">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Services
        </h1>
        <p className="mt-2 text-sm text-muted">
          Service records available in the database and API.
        </p>
      </div>
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-soft">
        {services.length ? (
          services.map((s) => (
            <div
              key={s.id}
              className="border-b border-border/50 p-5 last:border-0"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold text-foreground">{s.title}</h2>
                  <p className="mt-1 text-xs text-muted">
                    /{s.slug} · Sort order {s.sortOrder}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${s.isPublished ? "border-brand-teal bg-brand-teal/10 text-brand-teal-dark" : "border-border/50 text-muted"}`}
                >
                  {s.isPublished ? "Published" : "Hidden"}
                </span>
              </div>
              <p className="mt-3 text-sm text-foreground/70">
                {s.shortDescription}
              </p>
            </div>
          ))
        ) : (
          <p className="p-6 text-sm text-muted">
            No database services yet. Run the seed script.
          </p>
        )}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">
        GET and POST endpoints are provided at /api/admin/services. Connect a
        form or editor to create and update records. The public site uses safe
        built-in defaults when the database has no services.
      </p>
    </div>
  );
}

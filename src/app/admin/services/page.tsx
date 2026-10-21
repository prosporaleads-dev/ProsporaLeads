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
        <h1 className="text-2xl font-bold text-[#102A4C]">Services</h1>
        <p className="mt-2 text-sm text-slate-500">
          Service records available in the database and API.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {services.length ? (
          services.map((s) => (
            <div
              key={s.id}
              className="border-b border-slate-100 p-5 last:border-0"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold text-[#102A4C]">{s.title}</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    /{s.slug} · Sort order {s.sortOrder}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${s.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                >
                  {s.isPublished ? "Published" : "Hidden"}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                {s.shortDescription}
              </p>
            </div>
          ))
        ) : (
          <p className="p-6 text-sm text-slate-500">
            No database services yet. Run the seed script.
          </p>
        )}
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        GET and POST endpoints are provided at /api/admin/services. Connect a
        form or editor to create and update records. The public site uses safe
        built-in defaults when the database has no services.
      </p>
    </div>
  );
}

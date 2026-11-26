import { prisma } from "@/lib/prisma";
import { AdminWelcome } from "@/components/admin/admin-data";
export const dynamic = "force-dynamic";
export default async function AdminDashboard() {
  let counts = { pages: 0, services: 0, inquiries: 0, faqs: 0 };
  try {
    const [pages, services, inquiries, faqs] = await Promise.all([
      prisma.page.count(),
      prisma.service.count(),
      prisma.inquiry.count(),
      prisma.fAQ.count(),
    ]);
    counts = { pages, services, inquiries, faqs };
  } catch {}
  return (
    <div className="space-y-8">
      <AdminWelcome />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "CMS pages", value: counts.pages },
          { label: "Services", value: counts.services },
          { label: "Enquiries", value: counts.inquiries },
          { label: "FAQs", value: counts.faqs },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="mt-3 text-3xl font-bold text-brand-navy">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

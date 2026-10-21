import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function AdminFaqsPage() {
  let faqs: {
    id: string;
    question: string;
    answer: string;
    isPublished: boolean;
    sortOrder: number;
  }[] = [];
  try {
    faqs = await prisma.fAQ.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {}
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#102A4C]">FAQs</h1>
        <p className="mt-2 text-sm text-slate-500">
          Review question and answer content.
        </p>
      </div>
      <div className="space-y-3">
        {faqs.length ? (
          faqs.map((f) => (
            <details
              key={f.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <summary className="cursor-pointer font-bold text-[#102A4C]">
                {f.question}
                <span className="float-right text-xs font-normal text-slate-400">
                  {f.isPublished ? "Published" : "Hidden"}
                </span>
              </summary>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {f.answer}
              </p>
            </details>
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            No FAQs seeded yet.
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-slate-500">
        GET and POST endpoints are provided at /api/admin/faqs. Connect your
        preferred editor to manage content.
      </p>
    </div>
  );
}

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
        <h1 className="font-heading text-2xl font-bold text-foreground">
          FAQs
        </h1>
        <p className="mt-2 text-sm text-muted">
          Review question and answer content.
        </p>
      </div>
      <div className="space-y-3">
        {faqs.length ? (
          faqs.map((f) => (
            <details
              key={f.id}
              className="rounded-[1.75rem] border border-border bg-white p-5 shadow-soft"
            >
              <summary className="cursor-pointer font-bold text-foreground">
                {f.question}
                <span className="float-right text-xs font-normal text-muted">
                  {f.isPublished ? "Published" : "Hidden"}
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-foreground/70">
                {f.answer}
              </p>
            </details>
          ))
        ) : (
          <div className="rounded-[1.75rem] border border-border bg-white p-6 text-sm text-muted">
            No FAQs seeded yet.
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-muted">
        GET and POST endpoints are provided at /api/admin/faqs. Connect your
        preferred editor to manage content.
      </p>
    </div>
  );
}

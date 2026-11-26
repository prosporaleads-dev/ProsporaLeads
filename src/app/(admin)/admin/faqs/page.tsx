import { prisma } from "@/lib/prisma";
import { FaqsManager } from "@/components/admin/faqs/faqs-manager";
import type { AdminFaq } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  let initialFaqs: AdminFaq[] = [];
  try {
    const records = await prisma.fAQ.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    initialFaqs = records.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category,
      sortOrder: f.sortOrder,
      isPublished: f.isPublished,
      createdAt: f.createdAt.toISOString(),
      updatedAt: f.updatedAt.toISOString(),
    }));
  } catch {}

  return <FaqsManager initialFaqs={initialFaqs} />;
}

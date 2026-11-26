import { prisma } from "@/lib/prisma";
import { ServicesManager } from "@/components/admin/services/services-manager";
import type { AdminService } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  let initialServices: AdminService[] = [];
  try {
    const records = await prisma.service.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    initialServices = records.map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      shortDescription: s.shortDescription,
      description: s.description,
      features: Array.isArray(s.features)
        ? s.features.filter((x): x is string => typeof x === "string")
        : [],
      bestFor: s.bestFor,
      icon: s.icon,
      sortOrder: s.sortOrder,
      isPublished: s.isPublished,
      seoTitle: s.seoTitle,
      seoDescription: s.seoDescription,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }));
  } catch {}

  return <ServicesManager initialServices={initialServices} />;
}

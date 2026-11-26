import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/content";
import { DashboardOverview } from "@/components/admin/dashboard/dashboard-overview";
import type { DashboardData, InquiryStatus } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [session, settings] = await Promise.all([
    getSession(),
    getSiteSettings(),
  ]);

  let counts: DashboardData["counts"] = {
    pages: 0,
    publishedPages: 0,
    services: 0,
    publishedServices: 0,
    inquiries: 0,
    newInquiries: 0,
    faqs: 0,
    publishedFaqs: 0,
  };

  const statusBreakdown: Record<InquiryStatus, number> = {
    NEW: 0,
    CONTACTED: 0,
    QUALIFIED: 0,
    ARCHIVED: 0,
  };

  let recentInquiries: DashboardData["recentInquiries"] = [];

  try {
    const [
      pages,
      publishedPages,
      services,
      publishedServices,
      inquiries,
      faqs,
      publishedFaqs,
      groupedStatuses,
      latestLeads,
    ] = await Promise.all([
      prisma.page.count(),
      prisma.page.count({ where: { status: "PUBLISHED" } }),
      prisma.service.count(),
      prisma.service.count({ where: { isPublished: true } }),
      prisma.inquiry.count(),
      prisma.fAQ.count(),
      prisma.fAQ.count({ where: { isPublished: true } }),
      prisma.inquiry.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          serviceInterest: true,
          targetRegions: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    for (const row of groupedStatuses) {
      const key = row.status.toUpperCase() as InquiryStatus;
      if (key in statusBreakdown) {
        statusBreakdown[key] = row._count.status;
      }
    }

    counts = {
      pages,
      publishedPages,
      services,
      publishedServices,
      inquiries,
      newInquiries: statusBreakdown.NEW,
      faqs,
      publishedFaqs,
    };

    recentInquiries = latestLeads.map((lead) => ({
      ...lead,
      createdAt: lead.createdAt.toISOString(),
    }));
  } catch {
    // Graceful fallback if DB is temporarily unreachable
  }

  return (
    <DashboardOverview
      data={{
        adminName: session?.name ?? "Admin",
        adminRole: session?.role ?? "EDITOR",
        counts,
        statusBreakdown,
        recentInquiries,
        contactEmail: settings.contactEmail,
      }}
    />
  );
}

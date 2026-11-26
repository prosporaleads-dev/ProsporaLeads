import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inquiryAdminCreateSchema } from "@/lib/validation";

export async function GET() {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      company: true,
      website: true,
      targetRegions: true,
      serviceInterest: true,
      goals: true,
      consent: true,
      status: true,
      adminNotes: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return NextResponse.json({ inquiries });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: unknown = await request.json();
  const parsed = inquiryAdminCreateSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid enquiry data", details: parsed.error.flatten() },
      { status: 400 },
    );

  try {
    const inquiry = await prisma.inquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        website: parsed.data.website || null,
        targetRegions: parsed.data.targetRegions,
        serviceInterest: parsed.data.serviceInterest || null,
        goals: parsed.data.goals,
        status: parsed.data.status,
        adminNotes: parsed.data.adminNotes ?? "",
        consent: true,
      },
    });
    return NextResponse.json({ inquiry }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to create enquiry." },
      { status: 500 },
    );
  }
}

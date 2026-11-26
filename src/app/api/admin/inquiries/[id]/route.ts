import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inquiryAdminUpdateSchema } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry)
    return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });

  return NextResponse.json({ inquiry });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const body: unknown = await request.json();
  const parsed = inquiryAdminUpdateSchema.partial().safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid enquiry update data", details: parsed.error.flatten() },
      { status: 400 },
    );

  try {
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
        ...(parsed.data.adminNotes !== undefined ? { adminNotes: parsed.data.adminNotes } : {}),
        ...(parsed.data.serviceInterest !== undefined
          ? { serviceInterest: parsed.data.serviceInterest || null }
          : {}),
        ...(parsed.data.company !== undefined
          ? { company: parsed.data.company || null }
          : {}),
        ...(parsed.data.phone !== undefined
          ? { phone: parsed.data.phone || null }
          : {}),
      },
    });
    return NextResponse.json({ inquiry });
  } catch {
    return NextResponse.json(
      { error: "Enquiry not found or could not be updated." },
      { status: 404 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  try {
    await prisma.inquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Enquiry not found or could not be deleted." },
      { status: 404 },
    );
  }
}

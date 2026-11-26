import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { faqSchema } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const faq = await prisma.fAQ.findUnique({ where: { id } });
  if (!faq)
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });

  return NextResponse.json({ faq });
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
  const parsed = faqSchema.partial().safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid FAQ data", details: parsed.error.flatten() },
      { status: 400 },
    );

  try {
    const faq = await prisma.fAQ.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ faq });
  } catch {
    return NextResponse.json(
      { error: "FAQ not found or could not be updated." },
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
    await prisma.fAQ.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "FAQ not found or could not be deleted." },
      { status: 404 },
    );
  }
}

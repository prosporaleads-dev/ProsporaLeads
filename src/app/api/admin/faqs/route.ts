import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { faqSchema } from "@/lib/validation";

export async function GET() {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const faqs = await prisma.fAQ.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ faqs });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: unknown = await request.json();
  const parsed = faqSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid FAQ data", details: parsed.error.flatten() },
      { status: 400 },
    );

  const faq = await prisma.fAQ.create({ data: parsed.data });
  return NextResponse.json({ faq }, { status: 201 });
}

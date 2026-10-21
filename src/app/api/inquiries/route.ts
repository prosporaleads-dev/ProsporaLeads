import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { inquirySchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`inquiry:${ip}`, 5, 60_000)) return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  try {
    const raw: unknown = await request.json(); const parsed = inquirySchema.safeParse(raw);
    if (!parsed.success) return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
    if (parsed.data.websiteConfirm) return NextResponse.json({ message: "Thank you. Your enquiry has been received." });
    await prisma.inquiry.create({ data: { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone || null, company: parsed.data.company || null, website: parsed.data.website || null, targetRegions: parsed.data.targetRegions, serviceInterest: parsed.data.serviceInterest || null, goals: parsed.data.goals, consent: parsed.data.consent } });
    return NextResponse.json({ message: "Thank you. Your enquiry has been received." }, { status: 201 });
  } catch { return NextResponse.json({ error: "We could not submit your enquiry right now. Please email us instead." }, { status: 500 }); }
}

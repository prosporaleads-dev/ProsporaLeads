import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
const schema = z.object({ question: z.string().min(2).max(500), answer: z.string().min(2).max(5000), category: z.string().max(100), sortOrder: z.number().int().min(0).max(999), isPublished: z.boolean() });
export async function GET() { const user = await getSession(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); return NextResponse.json({ faqs: await prisma.fAQ.findMany({ orderBy: { sortOrder: "asc" } }) }); }
export async function POST(request: NextRequest) { const user = await getSession(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Invalid FAQ data" }, { status: 400 }); return NextResponse.json({ faq: await prisma.fAQ.create({ data: parsed.data }) }, { status: 201 }); }

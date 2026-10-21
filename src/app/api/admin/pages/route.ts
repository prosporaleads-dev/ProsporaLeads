import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function GET() { const user = await getSession(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const pages = await prisma.page.findMany({ orderBy: { updatedAt: "desc" }, select: { id: true, slug: true, title: true, description: true, status: true, seoTitle: true, seoDescription: true, canonicalUrl: true, sections: true, updatedAt: true } }); return NextResponse.json({ pages }); }

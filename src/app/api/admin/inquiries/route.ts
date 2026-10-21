import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function GET() { const user = await getSession(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 200, select: { id: true, name: true, email: true, company: true, serviceInterest: true, targetRegions: true, status: true, createdAt: true } }); return NextResponse.json({ inquiries }); }

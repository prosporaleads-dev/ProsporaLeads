import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validation";

export async function GET() {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: unknown = await request.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid service data", details: parsed.error.flatten() },
      { status: 400 },
    );

  try {
    const service = await prisma.service.create({ data: parsed.data });
    return NextResponse.json({ service }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not create service. Check that its slug is unique." },
      { status: 409 },
    );
  }
}

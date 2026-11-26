import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSession();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service)
    return NextResponse.json({ error: "Service not found" }, { status: 404 });

  return NextResponse.json({ service });
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
  const parsed = serviceSchema.partial().safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid service data", details: parsed.error.flatten() },
      { status: 400 },
    );

  try {
    const service = await prisma.service.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ service });
  } catch {
    return NextResponse.json(
      { error: "Unable to update service. Check that the slug is unique." },
      { status: 409 },
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
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Service not found or could not be deleted." },
      { status: 404 },
    );
  }
}

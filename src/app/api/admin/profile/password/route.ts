import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { passwordChangeSchema } from "@/lib/validation";

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: unknown = await request.json();
  const parsed = passwordChangeSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ??
          "New password must be at least 14 characters.",
      },
      { status: 400 },
    );

  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: session.id },
      select: { id: true, passwordHash: true },
    });
    if (!admin)
      return NextResponse.json({ error: "Account not found" }, { status: 404 });

    const matches = await bcrypt.compare(
      parsed.data.currentPassword,
      admin.passwordHash,
    );
    if (!matches)
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 },
      );

    const nextHash = await bcrypt.hash(parsed.data.newPassword, 12);
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { passwordHash: nextHash },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to update password." },
      { status: 500 },
    );
  }
}

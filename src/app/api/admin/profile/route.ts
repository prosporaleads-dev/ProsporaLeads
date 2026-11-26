import { NextResponse, type NextRequest } from "next/server";
import { createSession, getSession, sessionCookieName } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { profileUpdateSchema } from "@/lib/validation";

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await prisma.adminUser.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!profile)
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  return NextResponse.json({ profile });
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: unknown = await request.json();
  const parsed = profileUpdateSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Enter a valid name and email address." },
      { status: 400 },
    );

  const normalizedEmail = parsed.data.email.toLowerCase();

  try {
    const existing = await prisma.adminUser.findFirst({
      where: { email: normalizedEmail, NOT: { id: session.id } },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Another administrator is already using this email." },
        { status: 409 },
      );
    }

    const profile = await prisma.adminUser.update({
      where: { id: session.id },
      data: {
        name: parsed.data.name,
        email: normalizedEmail,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const token = await createSession({
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role,
    });

    const response = NextResponse.json({ profile });
    response.cookies.set(sessionCookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to update profile." },
      { status: 500 },
    );
  }
}

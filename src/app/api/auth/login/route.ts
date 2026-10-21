import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, sessionCookieName } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`login:${ip}`, 6, 60_000)) return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  try { const body: unknown = await request.json(); const parsed = loginSchema.safeParse(body); if (!parsed.success) return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
    const user = await prisma.adminUser.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    if (!user || !user.isActive || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    const token = await createSession({ id: user.id, name: user.name, email: user.email, role: user.role });
    await prisma.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    response.cookies.set(sessionCookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
    return response;
  } catch { return NextResponse.json({ error: "Authentication service is unavailable." }, { status: 500 }); }
}

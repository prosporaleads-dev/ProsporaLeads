import "server-only";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "prospora_admin_session";
function secret(): Uint8Array {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) throw new Error("JWT_SECRET must be configured with at least 32 characters.");
  return new TextEncoder().encode(value);
}
export type SessionUser = { id: string; name: string; email: string; role: "SUPER_ADMIN" | "EDITOR" };
export async function createSession(user: SessionUser): Promise<string> {
  return new SignJWT({ name: user.name, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" }).setSubject(user.id)
    .setIssuer(process.env.JWT_ISSUER ?? "prospora-leads")
    .setAudience(process.env.JWT_AUDIENCE ?? "prospora-admin")
    .setIssuedAt().setExpirationTime("8h").sign(secret());
}
export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), { issuer: process.env.JWT_ISSUER ?? "prospora-leads", audience: process.env.JWT_AUDIENCE ?? "prospora-admin" });
    if (!payload.sub || typeof payload.name !== "string" || typeof payload.email !== "string" || (payload.role !== "SUPER_ADMIN" && payload.role !== "EDITOR")) return null;
    return { id: payload.sub, name: payload.name, email: payload.email, role: payload.role };
  } catch { return null; }
}
export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await verifyToken(token);
  if (!session) return null;
  const user = await prisma.adminUser.findUnique({ where: { id: session.id }, select: { id: true, name: true, email: true, role: true, isActive: true } });
  if (!user?.isActive) return null;
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
export const sessionCookieName = COOKIE_NAME;

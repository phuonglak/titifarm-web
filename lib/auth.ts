import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const COOKIE_NAME = "titifarm_token";

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export async function getUserFromCookie(cookies: Headers) {
  const cookieHeader = cookies.get("cookie") || "";
  const token = cookieHeader.split(";").map((s) => s.trim()).find((s) => s.startsWith(`${COOKIE_NAME}=`))?.split("=")[1];
  if (!token) return null;
  const decoded = verifyToken(token);
  if (!decoded?.sub) return null;
  const user = await prisma.user.findUnique({ where: { id: String(decoded.sub) } });
  return user;
}

export { COOKIE_NAME };



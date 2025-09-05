// Create a new API route to reset admin password with a token
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// POST /api/admin/reset-password
// Body: { email: string, newPassword: string, token: string }
export async function POST(request: Request) {
	const { email, newPassword, token } = await request.json();
	if (!email || !newPassword || !token) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}

	const expected = process.env.ADMIN_RESET_TOKEN;
	if (!expected || token !== expected) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	const hash = await bcrypt.hash(String(newPassword), 10);
	await prisma.user.update({ where: { id: user.id }, data: { passwordHash: hash } });
	return NextResponse.json({ ok: true });
}
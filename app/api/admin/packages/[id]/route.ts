import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const data = await request.json();
  const updated = await prisma.ticketPackage.update({ where: { id }, data });
  return NextResponse.json({ package: updated });
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await prisma.ticketPackage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

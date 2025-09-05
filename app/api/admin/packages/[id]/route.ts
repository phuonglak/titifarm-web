import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, context: any) {
  const id = (await context.params).id; // vì đôi khi nó là Promise
  const data = await request.json();
  const updated = await prisma.ticketPackage.update({ where: { id }, data });
  return NextResponse.json({ package: updated });
}

export async function DELETE(_request: NextRequest, context: any) {
  const id = (await context.params).id;
  await prisma.ticketPackage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

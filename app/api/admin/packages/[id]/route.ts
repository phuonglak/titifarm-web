import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  const id = String(params.id);
  const data = await request.json();
  const updated = await prisma.ticketPackage.update({ where: { id }, data });
  return NextResponse.json({ package: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  const id = String(params.id);
  await prisma.ticketPackage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}



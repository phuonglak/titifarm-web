import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const id = String(params.id);
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { customer: true, tickets: { include: { ticketPackage: true } } },
  });
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ booking });
}



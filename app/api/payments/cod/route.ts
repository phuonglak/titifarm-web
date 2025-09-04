import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { bookingId } = await request.json();
  if (!bookingId) return NextResponse.json({ error: "Missing bookingId" }, { status: 400 });

  const booking = await prisma.booking.findUnique({ where: { id: String(bookingId) } });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      method: "COD",
      amountVnd: booking.totalAmountVnd,
      status: "PENDING",
    },
  });

  return NextResponse.json({ ok: true });
}



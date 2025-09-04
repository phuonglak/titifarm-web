import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { phone, email } = await request.json();
  if (!phone && !email) return NextResponse.json({ error: "Missing filters" }, { status: 400 });

  const bookings = await prisma.booking.findMany({
    where: {
      customer: {
        ...(phone ? { phone: { contains: String(phone), mode: "insensitive" } } : {}),
        ...(email ? { email: { equals: String(email) } } : {}),
      },
    },
    orderBy: { createdAt: "desc" },
    include: { tickets: { include: { ticketPackage: true } } },
    take: 20,
  });

  return NextResponse.json({ bookings });
}



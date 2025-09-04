import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { name, priceVnd, description } = await request.json();
  if (!name || !priceVnd) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const created = await prisma.ticketPackage.create({
    data: { name, priceVnd: Number(priceVnd), description: description || null },
  });
  return NextResponse.json({ package: created });
}



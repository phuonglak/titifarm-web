import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const packages = await prisma.ticketPackage.findMany({
    where: { isActive: true },
    orderBy: { priceVnd: "asc" },
  });
  return NextResponse.json({ packages });
}



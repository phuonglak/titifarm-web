import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let packages = await prisma.ticketPackage.findMany({
      where: { isActive: true },
      orderBy: { priceVnd: "asc" },
    });

    if (packages.length === 0) {
      const defaults = [
        { name: "Vé bé", description: "Dành cho trẻ em (bao gồm hoạt động cơ bản)", priceVnd: 150000 },
        { name: "Vé người lớn", description: "Người lớn đi kèm", priceVnd: 80000 },
        { name: "Combo gia đình", description: "2 người lớn + 2 trẻ em", priceVnd: 450000 },
      ];
      for (const p of defaults) {
        await prisma.ticketPackage.upsert({
          where: { name: p.name },
          update: p,
          create: p,
        });
      }
      packages = await prisma.ticketPackage.findMany({
        where: { isActive: true },
        orderBy: { priceVnd: "asc" },
      });
    }

    return NextResponse.json({ packages });
  } catch (error) {
    return NextResponse.json({ packages: [] });
  }
}



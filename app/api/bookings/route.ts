import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const visitDate = new Date(String(data?.visitDate));
  const customer = {
    fullName: String(data?.customer?.fullName || "").trim(),
    phone: String(data?.customer?.phone || "").trim(),
    email: String(data?.customer?.email || "").trim() || null,
  };
  const items: Array<{ packageId: string; quantity: number }> = Array.isArray(
    data?.items
  )
    ? data.items
    : [];

  if (!customer.fullName || !customer.phone || isNaN(visitDate.getTime())) {
    return NextResponse.json(
      { error: "Thiếu thông tin bắt buộc" },
      { status: 400 }
    );
  }

  if (items.length === 0) {
    return NextResponse.json(
      { error: "Chưa chọn gói vé" },
      { status: 400 }
    );
  }

  const packages = await prisma.ticketPackage.findMany({
    where: { id: { in: items.map((i) => i.packageId) }, isActive: true },
  });
  const priceById = new Map(packages.map((p) => [p.id, p.priceVnd] as const));

  const totalAmountVnd = items.reduce((sum, i) => {
    const price = priceById.get(i.packageId) || 0;
    const qty = Math.max(0, Number(i.quantity || 0));
    return sum + price * qty;
  }, 0);

  const created = await prisma.booking.create({
    data: {
      visitDate,
      customer: {
        create: customer,
      },
      totalAmountVnd,
      tickets: {
        create: items
          .filter((i) => (priceById.get(i.packageId) || 0) > 0 && i.quantity > 0)
          .map((i) => ({
            ticketPackageId: i.packageId,
            quantity: i.quantity,
            unitPriceVnd: priceById.get(i.packageId)!,
          })),
      },
    },
    include: {
      customer: true,
      tickets: { include: { ticketPackage: true } },
    },
  });

  return NextResponse.json({ booking: created });
}



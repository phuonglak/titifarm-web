import { prisma } from "@/lib/prisma";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
    take: 50,
  });

  return (
    <div className="rounded-lg border divide-y">
      <div className="p-3 font-medium">Bookings</div>
      {bookings.map((b) => (
        <div key={b.id} className="p-3 flex items-center justify-between">
          <div>
            <p className="font-medium">{b.id}</p>
            <p className="text-sm text-muted-foreground">
              {b.customer.fullName} · {new Date(b.visitDate).toLocaleDateString("vi-VN")} · {b.status}
            </p>
          </div>
          <p className="text-sm">{b.totalAmountVnd.toLocaleString("vi-VN")} đ</p>
        </div>
      ))}
    </div>
  );
}



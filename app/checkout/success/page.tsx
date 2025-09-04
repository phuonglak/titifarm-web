"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const bookingId = params.get("bookingId");
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Thanh toán thành công</h1>
      <p className="text-sm">Cảm ơn bạn. Mã đặt chỗ: {bookingId}</p>
    </section>
  );
}



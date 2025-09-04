"use client";

import { useSearchParams } from "next/navigation";

export default function FailurePage() {
  const params = useSearchParams();
  const bookingId = params.get("bookingId");
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Thanh toán thất bại</h1>
      <p className="text-sm">Vui lòng thử lại. Mã đặt chỗ: {bookingId}</p>
    </section>
  );
}



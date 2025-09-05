"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function FailureInner() {
  const params = useSearchParams();
  const bookingId = params.get("bookingId");
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Thanh toán thất bại</h1>
      <p className="text-sm">Vui lòng thử lại. Mã đặt chỗ: {bookingId}</p>
    </section>
  );
}

export default function FailurePage() {
  return (
    <Suspense fallback={<div />}> 
      <FailureInner />
    </Suspense>
  );
}



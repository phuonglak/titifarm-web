"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";

type Booking = {
  id: string;
  totalAmountVnd: number;
};

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const bookingId = String(params?.id || "");

  useEffect(() => {
    if (!bookingId) return;
    fetch(`/api/bookings/${bookingId}`)
      .then((r) => r.json())
      .then((d) => setBooking(d.booking))
      .catch(() => setBooking(null));
  }, [bookingId]);

  async function payCOD() {
    const res = await fetch("/api/payments/cod", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    });
    if (res.ok) router.push(`/checkout/success?bookingId=${bookingId}`);
    else router.push(`/checkout/failure?bookingId=${bookingId}`);
  }

  async function payVNPay() {
    const res = await fetch("/api/payments/vnpay/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    });
    const data = await res.json();
    if (data?.paymentUrl) window.location.href = data.paymentUrl;
    else router.push(`/checkout/failure?bookingId=${bookingId}`);
  }

  if (!booking) return <p>Đang tải...</p>;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Thanh toán</h1>
      <div className="rounded-lg border p-4 space-y-2">
        <p>Mã đặt chỗ: {booking.id}</p>
        <p className="text-sm text-muted-foreground">
          Tổng tiền: {booking.totalAmountVnd.toLocaleString("vi-VN")} đ
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={payCOD}>Thanh toán tại farm (COD)</Button>
        <Button variant="secondary" onClick={payVNPay}>Thanh toán VNPay</Button>
      </div>
    </section>
  );
}



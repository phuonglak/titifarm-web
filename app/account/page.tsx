"use client";

import { useState } from "react";

export default function AccountBookingsPage() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email }),
      });
      const data = await res.json();
      setResults(data.bookings || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Lịch sử đặt chỗ</h1>
      <div className="rounded-lg border p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input className="border rounded-md px-3 py-2" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="border rounded-md px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={search} className="rounded-md bg-foreground text-background px-4 py-2">
            {loading ? "Đang tìm..." : "Tìm kiếm"}
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {results.map((b) => (
          <div key={b.id} className="rounded-lg border p-4">
            <p className="font-medium">Mã: {b.id}</p>
            <p className="text-sm text-muted-foreground">
              Ngày tham quan: {new Date(b.visitDate).toLocaleDateString("vi-VN")} · Tổng: {b.totalAmountVnd.toLocaleString("vi-VN")} đ
            </p>
            <ul className="text-sm list-disc ml-5 mt-2">
              {b.tickets?.map((t: any) => (
                <li key={t.id}>
                  {t.ticketPackage?.name} × {t.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {results.length === 0 && <p className="text-sm text-muted-foreground">Không có kết quả.</p>}
      </div>
    </section>
  );
}



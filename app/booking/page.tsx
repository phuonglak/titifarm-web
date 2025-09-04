"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

type Pkg = { id: string; name: string; priceVnd: number };

export default function BookingPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [visitDate, setVisitDate] = useState<string>("");
  const [customer, setCustomer] = useState({ fullName: "", phone: "", email: "" });
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => setPackages(data.packages || []))
      .catch(() => setPackages([]));
  }, []);

  const total = useMemo(() => {
    return packages.reduce((sum, p) => sum + (quantities[p.id] || 0) * p.priceVnd, 0);
  }, [packages, quantities]);

  async function submit() {
    setSubmitting(true);
    setResult(null);
    try {
      const items = packages
        .filter((p) => (quantities[p.id] || 0) > 0)
        .map((p) => ({ packageId: p.id, quantity: quantities[p.id] }));
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitDate, customer, items }),
      });
      if (!res.ok) throw new Error("Đặt lịch thất bại");
      const data = await res.json();
      setResult(`Đặt lịch thành công. Mã: ${data.booking.id}`);
      setQuantities({});
      router.push(`/checkout/${data.booking.id}`);
    } catch (e: any) {
      setResult(e.message || "Có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Đặt lịch tham quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-lg border p-4 space-y-3">
            <label className="block text-sm font-medium">Chọn ngày</label>
            <input
              type="date"
              className="border rounded-md px-3 py-2"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              required
            />
          </div>

          <div className="rounded-lg border p-4 space-y-4">
            <h2 className="font-medium">Chọn gói vé</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {packages.map((p) => (
                <div key={p.id} className="rounded-md border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {p.priceVnd.toLocaleString("vi-VN")} đ
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          setQuantities((q) => ({ ...q, [p.id]: Math.max(0, (q[p.id] || 0) - 1) }))
                        }
                      >
                        -
                      </Button>
                      <span className="min-w-6 text-center">{quantities[p.id] || 0}</span>
                      <Button
                        variant="secondary"
                        onClick={() => setQuantities((q) => ({ ...q, [p.id]: (q[p.id] || 0) + 1 }))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-3">
            <h2 className="font-medium">Thông tin liên hệ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Họ và tên"
                value={customer.fullName}
                onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Số điện thoại"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              />
            </div>
            <input
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Email (tuỳ chọn)"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            />
          </div>
        </div>

        <aside className="space-y-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Tổng tạm tính</p>
            <p className="text-2xl font-semibold">{total.toLocaleString("vi-VN")} đ</p>
          </div>
          <Button fullWidth disabled={submitting} onClick={submit}>
            {submitting ? "Đang xử lý..." : "Đặt lịch"}
          </Button>
          {result && <p className="text-sm">{result}</p>}
        </aside>
      </div>
    </section>
  );
}



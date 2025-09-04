"use client";

import { useEffect, useState } from "react";

type Pkg = { id: string; name: string; priceVnd: number; isActive: boolean };

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  async function load() {
    const res = await fetch("/api/packages");
    const data = await res.json();
    setPackages(data.packages || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function createPkg() {
    await fetch("/api/admin/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, priceVnd: Number(price) }),
    });
    setName("");
    setPrice(0);
    load();
  }

  async function toggleActive(id: string, isActive: boolean) {
    await fetch(`/api/admin/packages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    load();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4 space-y-3">
        <h2 className="font-medium">Tạo gói vé</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input className="border rounded-md px-3 py-2" placeholder="Tên" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="border rounded-md px-3 py-2" placeholder="Giá (VND)" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <button onClick={createPkg} className="rounded-md bg-foreground text-background px-4 py-2">Tạo</button>
        </div>
      </div>

      <div className="rounded-lg border divide-y">
        <div className="p-3 font-medium">Danh sách gói vé</div>
        {packages.map((p) => (
          <div key={p.id} className="p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.priceVnd.toLocaleString("vi-VN")} đ</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleActive(p.id, p.isActive)} className="text-sm underline">
                {p.isActive ? "Ẩn" : "Hiển thị"}
              </button>
              <button onClick={() => remove(p.id)} className="text-sm underline text-red-600">Xoá</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



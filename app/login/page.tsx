"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) router.push("/admin/bookings");
    else setError("Đăng nhập không thành công");
  }

  return (
    <section className="space-y-6 max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
      <form onSubmit={submit} className="rounded-lg border p-4 space-y-3">
        <input className="w-full border rounded-md px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded-md px-3 py-2" placeholder="Mật khẩu" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="rounded-md bg-foreground text-background px-4 py-2">Đăng nhập</button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </section>
  );
}



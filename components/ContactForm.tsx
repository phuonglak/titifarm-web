"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Gửi thất bại");
      }
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Có lỗi xảy ra");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="border rounded-md px-3 py-2"
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border rounded-md px-3 py-2"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <input
        className="w-full border rounded-md px-3 py-2"
        placeholder="Email (tuỳ chọn)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <textarea
        className="w-full border rounded-md px-3 py-2"
        placeholder="Nội dung"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
        {status === "success" && (
          <p className="text-sm text-green-600">Đã gửi thành công!</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </form>
  );
}



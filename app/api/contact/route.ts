import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const email = String(body?.email || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc (name, phone, message)" },
        { status: 400 }
      );
    }

    // TODO: integrate email or CRM later. For now, just log.
    console.log("Contact submission:", { name, phone, email, message });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}



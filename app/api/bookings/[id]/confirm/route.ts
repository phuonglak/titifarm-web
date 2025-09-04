import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/email";
import QRCode from "qrcode";

type Params = { params: { id: string } };

export async function POST(_req: Request, { params }: Params) {
  const id = String(params.id);
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { customer: true },
  });
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const qrDataUrl = await QRCode.toDataURL(`BOOKING:${booking.id}`);

  await sendMail({
    to: booking.customer.email || process.env.MAIL_FALLBACK || "",
    subject: `Xác nhận đặt chỗ #${booking.id}`,
    html: `
      <h3>Cảm ơn bạn đã đặt chỗ tại TitiFarm</h3>
      <p>Mã đặt chỗ: <strong>${booking.id}</strong></p>
      <p>Ngày tham quan: ${new Date(booking.visitDate).toLocaleDateString("vi-VN")}</p>
      <p>Vui lòng xuất mã QR khi check-in:</p>
      <img src="${qrDataUrl}" alt="QR Code" />
    `,
  });

  await prisma.booking.update({ where: { id }, data: { status: "CONFIRMED" } });

  return NextResponse.json({ ok: true });
}



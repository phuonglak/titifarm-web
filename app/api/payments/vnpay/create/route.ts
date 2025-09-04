import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

function sortObject(obj: Record<string, string | number>) {
  const sorted: Record<string, string | number> = {};
  const keys = Object.keys(obj).sort();
  for (const k of keys) sorted[k] = obj[k];
  return sorted;
}

export async function POST(request: Request) {
  const { bookingId } = await request.json();
  if (!bookingId) return NextResponse.json({ error: "Missing bookingId" }, { status: 400 });

  const booking = await prisma.booking.findUnique({ where: { id: String(bookingId) } });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  // VNPay sandbox config via env
  const vnp_TmnCode = process.env.VNP_TMNCODE || "DEMO";
  const vnp_HashSecret = process.env.VNP_HASH_SECRET || "SECRET";
  const vnp_Url = process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const vnp_ReturnUrl = process.env.VNP_RETURN_URL || "http://localhost:3000/checkout/success";

  const ipAddr = "127.0.0.1";
  const now = new Date();
  const createDate = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(
    2,
    "0"
  )}${String(now.getSeconds()).padStart(2, "0")}`;

  const orderId = booking.id;
  const amount = booking.totalAmountVnd * 100; // VNPay needs in smallest currency unit

  let vnp_Params: Record<string, string | number> = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = vnp_TmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = "VND";
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = `Thanh toan booking ${orderId}`;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount;
  vnp_Params["vnp_ReturnUrl"] = vnp_ReturnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;

  vnp_Params = sortObject(vnp_Params);
  const signData = Object.entries(vnp_Params)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;

  const query = new URLSearchParams(vnp_Params as Record<string, string>).toString();
  const paymentUrl = `${vnp_Url}?${query}`;

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      method: "VNPAY",
      amountVnd: booking.totalAmountVnd,
      status: "PENDING",
    },
  });

  return NextResponse.json({ paymentUrl });
}



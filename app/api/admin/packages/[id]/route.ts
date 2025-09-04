import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: any   // dùng any cho chắc, khỏi bị lỗi type
) {
  const { id } = await context.params;

  return NextResponse.json({
    package: {
      id,
      name: "Demo Package",
      createdAt: new Date(),
      updatedAt: new Date(),
      priceVnd: 100000,
      description: "Test deploy on Vercel",
      isActive: true,
    },
  });
}

export async function PATCH(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;
  const body = await req.json();

  return NextResponse.json({
    package: {
      id,
      ...body,
      updatedAt: new Date(),
    },
  });
}

export async function DELETE(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;

  return NextResponse.json({
    message: `Deleted package ${id}`,
  });
}

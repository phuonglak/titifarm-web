import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Xử lý logic update package ở đây
  return NextResponse.json({
    package: {
      id,
      name: "Demo",
      createdAt: new Date(),
      updatedAt: new Date(),
      priceVnd: 100000,
      description: "Example",
      isActive: true,
    },
  });
}

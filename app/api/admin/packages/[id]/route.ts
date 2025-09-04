import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // khai báo đúng type mới
) {
  const { id } = await context.params; // ⚡ cần await
  return NextResponse.json({ id, action: "GET OK" });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
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
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return NextResponse.json({ message: `Deleted package ${id}` });
}

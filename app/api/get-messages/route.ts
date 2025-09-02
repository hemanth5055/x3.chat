import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { chatId } = await req.json();
  if (!chatId) {
    return NextResponse.json(
      { success: false, message: "Missing chatId" },
      { status: 400 }
    );
  }
  const messages = await prisma.message.findMany({
    where: {
      chatId,
    },
    select: {
      id: true,
      content: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 10,
  });
  if (!messages) {
    return NextResponse.json(
      { success: false, message: "Error Retrieving Messages" },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, messages }, { status: 200 });
}

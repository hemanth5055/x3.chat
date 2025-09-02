import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Missing userId" },
      { status: 400 }
    );
  }
  const chats = await prisma.chat.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      isBookmarked: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  if (!chats) {
    return NextResponse.json(
      { success: false, message: "Error Retrieving Chats" },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, chats }, { status: 200 });
}

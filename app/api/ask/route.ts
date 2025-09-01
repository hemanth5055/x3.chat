import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

//get chatId and user message
//take last 5 messages form that chatId as context
//pass the context and user message to model
//decrement credits Create message and add to respective chat and send to user

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
const modelName = "gemini-2.5-pro";
export async function POST(req: NextRequest) {
  const { chatId, message } = await req.json();
  if (!chatId || !message) {
    return NextResponse.json(
      {
        success: false,
        message: "ChatId or message is missing",
      },
      { status: 400 }
    );
  }
  //last 5 messages of the user in respective chat
  const previousChatsMessages = await prisma.message.findMany({
    where: {
      chatId,
    },
    select: {
      role: true,
      content: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  const response = await genai.models.generateContent({
    model: modelName,
    contents: message,
  });
  return NextResponse.json({ success: true, message: response.text });
}

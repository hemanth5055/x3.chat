import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
const modelName = "gemini-1.5-flash";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  if (!message) {
    return NextResponse.json({ success: false, message: "missing message" });
  }
  try {
    const chatNameResponse = await genai.models.generateContent({
      model: modelName,
      contents: `
      Suggest a name for this chat based on the first message: "${message}".
      Requirements:
      - Only return ONE  name.
      - Use Space between words if there are multiple words
      - No markdown, no extra formatting, just plain text.
    `,
    });

    // Gemini SDK returns a response object — extract text safely
    let temp = "Untitled Chat";
    if (chatNameResponse && chatNameResponse.text) {
      temp = chatNameResponse.text;
    }

    const chat = await prisma.chat.create({
      data: {
        userId: session.user.id,
        name: temp,
      },
    });
    return NextResponse.json({
      success: true,
      chat,
      message: "Chat created Successfully",
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

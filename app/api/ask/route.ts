import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/auth";
import { MessageRole } from "@prisma/client";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
const modelName = "gemini-2.5-flash";

export async function POST(req: NextRequest) {
  try {
    const { chatId, message } = await req.json();
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!message || !chatId) {
      return NextResponse.json(
        { success: false, message: "Message or chatId is missing" },
        { status: 400 }
      );
    }

    // Check user credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    });

    if (!user || user.credits <= 0) {
      return NextResponse.json(
        { success: false, message: "No credits left" },
        { status: 403 }
      );
    }

    // last 5 messages of the user in respective chat
    const previousChatsMessages = await prisma.message.findMany({
      where: { chatId },
      select: { role: true, content: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // Format for Gemini
    const history = previousChatsMessages.reverse().map((msg) => ({
      role: msg.role === "USER" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    history.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Send to Gemini
    const response = await genai.models.generateContent({
      model: modelName,
      contents: history,
    });

    const reply = response.text || null;

    if (!reply) {
      return NextResponse.json(
        { success: false, message: "Model didn't respond." },
        { status: 500 }
      );
    }

    // Save user message
    await prisma.message.create({
      data: {
        chatId,
        role: MessageRole.USER,
        content: message,
      },
    });

    // Save AI message
    const messageToBeSent = await prisma.message.create({
      data: {
        chatId,
        role: MessageRole.AI,
        content: reply,
      },
    });

    // Decrement credits for logged-in user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { decrement: 1 } },
      select: { credits: true },
    });

    return NextResponse.json({
      success: true,
      reply,
      message: messageToBeSent,
      creditsLeft: updatedUser.credits,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

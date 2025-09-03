import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/auth";
import { MessageRole } from "@prisma/client";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
const modelName = "gemini-2.5-flash";

export async function POST(req: NextRequest) {
  const { chatId, message } = await req.json();
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!message) {
    return NextResponse.json(
      { success: false, message: "Message is missing" },
      { status: 400 }
    );
  }

  // ✅ Ensure chat exists (create if missing)
  let chat = null;
  if (chatId) {
    chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });
  }
  let newChat = false;
  if (!chat) {
    newChat = true;
    const chatNameResponse = await genai.models.generateContent({
      model: modelName,
      contents: `
    Suggest a name for this chat based on the first message: "${message}".
    Requirements:
    - Only return ONE  name.
    - No markdown, no extra formatting, just plain text.
  `,
    });

    // Gemini SDK returns a response object — extract text safely
    let temp = "Untitled Chat";
    if (chatNameResponse && chatNameResponse.text) {
      temp = chatNameResponse.text;
    }

    chat = await prisma.chat.create({
      data: {
        userId: session.user.id,
        name: temp,
      },
    });
  }

  // last 5 messages of the user in respective chat
  const previousChatsMessages = await prisma.message.findMany({
    where: { chatId: chat.id },
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

  const reply = response.text;
  if (!reply) {
    return NextResponse.json(
      { success: false, message: "Model didn't respond." },
      { status: 500 }
    );
  }

  // Save user message
  await prisma.message.create({
    data: {
      chatId: chat.id,
      role: MessageRole.USER,
      content: message,
    },
  });

  // Save AI message
  const messageToBeSent = await prisma.message.create({
    data: {
      chatId: chat.id,
      role: MessageRole.AI,
      content: reply,
    },
  });

  // Decrement credits for logged-in user
  await prisma.user.update({
    where: { id: session.user.id },
    data: { credits: { decrement: 1 } },
  });

  return NextResponse.json({
    success: true,
    chatId: chat.id,
    message: messageToBeSent,
    chat,
    newChat,
  });
}

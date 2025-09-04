import { prisma } from "@/prisma";
import { NextRequest } from "next/server";
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
      return new Response("Unauthorized", { status: 401 });
    }

    if (!message || !chatId) {
      return new Response("Message or chatId is missing", { status: 400 });
    }

    // Check user credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    });

    if (!user || user.credits <= 0) {
      return new Response("No credits left", { status: 403 });
    }

    // last 5 messages for context
    const previousChatsMessages = await prisma.message.findMany({
      where: { chatId },
      select: { role: true, content: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const history = previousChatsMessages.reverse().map((msg) => ({
      role: msg.role === "USER" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    history.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Save user message immediately
    await prisma.message.create({
      data: {
        chatId,
        role: MessageRole.USER,
        content: message,
      },
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await genai.models.generateContentStream({
            model: modelName,
            contents: history,
          });

          let accumulatedReply = "";

          for await (const chunk of response) {
            if (chunk.text) {
              accumulatedReply += chunk.text;

              controller.enqueue(
                new TextEncoder().encode(
                  JSON.stringify({ type: "chunk", text: chunk.text })+"\n"
                )
              );
            }
          }

          // Save AI message at the end
          const aiMessage = await prisma.message.create({
            data: {
              chatId,
              role: MessageRole.AI,
              content: accumulatedReply,
            },
          });

          // Decrement credits
          const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { credits: { decrement: 1 } },
            select: { credits: true },
          });

          controller.enqueue(
            new TextEncoder().encode(
              JSON.stringify({
                type: "done",
                message: aiMessage,
                creditsLeft: updatedUser.credits,
              }) + "\n"
            )
          );

          controller.close();
        } catch (err) {
          console.error("Error in stream:", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

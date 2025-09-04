"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/Chatcontext";
import { Loader2Icon, Send } from "lucide-react";
import Sidebar from "./Sidebar";
import UserMessage from "./UserMessage";
import Aireply from "./Aireply";
import axios from "axios";
import Welcome from "./Welcome";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";

const Chat = ({ chatId: initialChatId }: { chatId: string | null }) => {
  const { showSideBar, setShowSideBar, setChats } = useContext(ChatContext);
  const [chatId, setChatId] = useState<string | null>(initialChatId);
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [waitingReply, setWaitingReply] = useState(false);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const endRef = useRef<HTMLDivElement | null>(null);
  const session = useSession();
  const [credits, setCredits] = useState(0);

  // const handleSend = async () => {
  //   if (!message.trim()) return;

  // const userMessage = {
  //   id: Date.now(),
  //   role: "USER",
  //   content: message,
  // };

  // setMessages((prev: any) => [...prev, userMessage]);
  // setMessage("");
  // setWaitingReply(true);

  //   try {
  //     let currentChatId = chatId;

  //     if (currentChatId === null) {
  //       const createNewChat = await axios.post("/api/create-chat", { message });

  //       if (createNewChat?.data?.chat) {
  //         currentChatId = createNewChat.data.chat.id;
  //         setChatId(currentChatId);
  //         setChats((prev) => [createNewChat.data.chat, ...prev]);
  //         window.history.replaceState(null, "", `/chat/${currentChatId}`);
  //       }
  //     }

  //     const result = await axios.post("/api/ask", {
  //       chatId: currentChatId,
  //       message,
  //     });
  //     console.log(result);

  //     if (result?.data) {
  //       setMessages((prev: any) => [...prev, result.data.message]);
  //     }
  //   } catch (err) {
  //     console.error("Error sending message:", err);
  //   } finally {
  //     setWaitingReply(false);
  //   }
  // };
  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "USER",
      content: message,
    };

    setMessages((prev: any) => [...prev, userMessage]);
    setMessage("");
    setWaitingReply(true);

    try {
      let currentChatId = chatId;
      if (currentChatId === null) {
        const createNewChat = await axios.post("/api/create-chat", { message });

        if (createNewChat?.data?.chat) {
          currentChatId = createNewChat.data.chat.id;
          setChatId(currentChatId);
          setChats((prev) => [createNewChat.data.chat, ...prev]);
          window.history.replaceState(null, "", `/chat/${currentChatId}`);
        }
      }
      const aiMessageId = `ai-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`;
      const res = await fetch("/api/ask-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: currentChatId, message }),
      });

      if (!res || !res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // Placeholder AI message
      setMessages((prev: any) => [
        ...prev,
        { id: aiMessageId, role: "AI", content: "" },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!waitingReply) setWaitingReply(false);

        // multiple JSON objects may come in a single chunk
        const lines = chunk.trim().split("\n");
        for (const line of lines) {
          if (!line) continue;
          const temp = JSON.parse(line);

          if (temp.type === "chunk") {
            setMessages((prev: any) =>
              prev.map((msg: any) =>
                msg.id === aiMessageId
                  ? { ...msg, content: msg.content + temp.text }
                  : msg
              )
            );
          } else {
            setCredits(temp.creditsLeft);
          }
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setWaitingReply(false);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) {
        setLoadingGlobal(false);
        return;
      }
      try {
        const response = await axios.post("/api/get-messages", { chatId });
        if (response.data.success) {
          setMessages(response.data.messages);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoadingGlobal(false);
      }
    };
    fetchMessages();
  }, [initialChatId]);
  
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.get("/api/get-credits");
        setCredits(res.data.credits);
      } catch (err) {
        console.error("Error fetching credits:", err);
      }
    };

    fetchCredits();
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-screen flex gap-2 ">
      {showSideBar && <Sidebar />}
      <div className="w-full flex flex-col items-center overflow-x-hidden p-4">
        {/* Navbar */}
        <Navbar credits={credits ? credits : 0}></Navbar>
        {/* Messages Section */}
        {loadingGlobal ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2Icon className="animate-spin  text-blue-500" />
          </div>
        ) : messages.length === 0 ? (
          // Empty state / welcome
          <Welcome></Welcome>
        ) : (
          <div className="flex-1 w-full flex flex-col gap-4 items-center overflow-y-scroll p-2 minimal-scrollbar max-sm:p-1">
            {messages.map((msg: any, i: number) => (
              <div key={i} className="w-full flex flex-col gap-2 items-center">
                {msg.role === "USER" ? (
                  <UserMessage message={msg.content} />
                ) : (
                  <Aireply message={msg.content} />
                )}
              </div>
            ))}
            {waitingReply && (
              <div className="w-[90%] flex items-center justify-start">
                <Loader2Icon className="animate-spin  text-blue-500" />
              </div>
            )}
            <div ref={endRef}></div>
          </div>
        )}

        {/* Input Box */}
        <div className="w-[90%] flex relative h-[70px] max-sm:h-[50px] bg-[#F0F0F0] dark:bg-[#1D1D1D] rounded-full mt-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (message.length > 0) {
                  handleSend(); // call your send function
                }
              }
            }}
            placeholder="How can X3 help you today?"
            className="w-full h-full rounded-[20px] outline-none p-5 max-sm:p-3 text-[20px] max-sm:text-[17px] font-medium placeholder:text-[18px] max-sm:placeholder:text-[13px] font-funnel resize-none"
          />
          <div className="w-[70px] h-full flex justify-center items-center cursor-pointer">
            <div
              className="w-[40px] h-[40px] flex justify-center items-center"
              onClick={handleSend}
            >
              <Send size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/Chatcontext";
import {
  Loader2,
  Loader2Icon,
  Send,
  SidebarClose,
  SidebarOpen,
} from "lucide-react";
import Sidebar from "./Sidebar";
import UserMessage from "./UserMessage";
import Aireply from "./Aireply";
import axios from "axios";
import { div } from "motion/react-client";

const Chat = ({ chatId }: { chatId: string }) => {
  const { showSideBar, setShowSideBar } = useContext(ChatContext);
  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [waitingReply, setWaitingReply] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const sampleAiReply = `Got it ✅ — you want **3 sample prompts** to showcase on the homepage (like example starter prompts for users). Since your app is an AI chat clone, here are three clean, engaging ones you can display:

1. **“Explain quantum computing in simple terms.”**
2. **“Write a professional email asking for project updates.”**
3. **“Give me a 3-day workout plan for beginners.”**

👉 These cover **science/learning**, **productivity/writing**, and **lifestyle/health** — so users immediately see the range of what your AI can do.

Do you want me to make them look more **minimal like placeholders** (e.g., “Ask me to explain a topic” / “Draft an email” / “Plan a routine”), or more **realistic full prompts** like above?
`;
  const handleSend = async () => {
    if (message.length > 0) {
      setMessage("");
      setWaitingReply(true);
      setMessages((prev: any) => [
        ...prev,
        {
          id: Date.now(), // temporary unique id
          role: "USER",
          content: message,
        },
      ]);
      const result = await axios.post("/api/ask", { chatId: chatId, message });
      console.log(result);
      if (result) {
        setMessages((prev: any) => [...prev, result.data.message]);
      }
      setWaitingReply(false);
    }
  };
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.post("/api/get-messages", { chatId });
      if (response.data.success) {
        console.log(response);
        setMessages(response.data.messages);
      }
      setLoadingGlobal(false);
    };
    fetchMessages();
  }, []);
  useEffect(() => {
    if (endRef.current) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="w-full h-screen flex gap-2 p-6 ">
      {showSideBar ? <Sidebar></Sidebar> : ""}
      <div className="w-full flex flex-col items-center">
        {/* navbar */}
        <div className="w-full flex items-center justify-between">
          <div
            className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
            onClick={() => setShowSideBar((prev) => !prev)}
          >
            {showSideBar ? (
              <SidebarClose className="dark:text-gray-200 text-gray-800"></SidebarClose>
            ) : (
              <SidebarOpen className="dark:text-gray-200 text-gray-800"></SidebarOpen>
            )}
          </div>
          <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer rounded-full bg-gray-500"></div>
        </div>

        {/* messages-hero */}
        {messages.length == 0 && loadingGlobal ? (
          <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <Loader2Icon className="animate-spin"></Loader2Icon>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-4 items-center overflow-y-scroll p-4 minimal-scrollbar">
            {/* user-message */}
            {messages.map((msg: any, i: number) => (
              <div key={i} className="w-full flex flex-col gap-2 items-center ">
                {msg.role === "USER" ? (
                  <UserMessage message={msg.content} />
                ) : (
                  <Aireply message={msg.content} />
                )}
              </div>
            ))}
            {waitingReply ? (
              <div className="w-[90%] flex items-center justify-start">
                <Loader2 className="animate-spin"></Loader2>
              </div>
            ) : (
              ""
            )}
            <div className="" ref={endRef}></div>
          </div>
        )}

        <div className="w-[90%] flex relative h-[70px] bg-[#F0F0F0] dark:bg-[#1D1D1D] rounded-full">
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            placeholder="How can X3 help you today ?"
            className="w-full h-full rounded-[20px] outline-none p-5 text-[20px] font-medium placeholder:text-[18px] font-funnel resize-none"
          ></textarea>
          <div className="w-[70px] h-full rounded-full  flex justify-center items-center cursor-pointer">
            <div
              className="w-[40px] h-[40px] flex justify-center items-center "
              onClick={handleSend}
            >
              <Send size={18}></Send>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

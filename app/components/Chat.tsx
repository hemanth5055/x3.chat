"use client";
import React, { useContext, useState } from "react";
import { ChatContext } from "../context/Chatcontext";
import { Loader2Icon, Send, SidebarClose, SidebarOpen } from "lucide-react";
import Sidebar from "./Sidebar";
import UserMessage from "./UserMessage";
import Aireply from "./Aireply";

const Chat = ({ chatId }: { chatId: string }) => {
  const { showSideBar, setShowSideBar } = useContext(ChatContext);
  const [messages, setMessages] = useState([1]);
  const sampleAiReply = `Got it ✅ — you want **3 sample prompts** to showcase on the homepage (like example starter prompts for users). Since your app is an AI chat clone, here are three clean, engaging ones you can display:

1. **“Explain quantum computing in simple terms.”**
2. **“Write a professional email asking for project updates.”**
3. **“Give me a 3-day workout plan for beginners.”**

👉 These cover **science/learning**, **productivity/writing**, and **lifestyle/health** — so users immediately see the range of what your AI can do.

Do you want me to make them look more **minimal like placeholders** (e.g., “Ask me to explain a topic” / “Draft an email” / “Plan a routine”), or more **realistic full prompts** like above?
`;
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
        {messages.length == 0 ? (
          <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <Loader2Icon className="animate-spin"></Loader2Icon>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-4 items-center overflow-y-scroll p-4 minimal-scrollbar">
            {/* user-message */}
            <UserMessage
              message={
                "I am going to create a clone of t3.chat suggest me some names"
              }
            ></UserMessage>
            {/* ai-reply */}
            <Aireply message={sampleAiReply}></Aireply>
          </div>
        )}

        <div className="w-[90%] flex relative h-[200px] bg-[#F0F0F0] dark:bg-[#1D1D1D] rounded-[20px]">
          <div className="w-[40px] h-[40px] rounded-full bottom-1 right-2 flex justify-center items-center absolute cursor-pointer">
            <Send size={18}></Send>
          </div>
          <textarea
            name="message"
            id="message"
            placeholder="How can X3 help you today ?"
            className="w-full h-full rounded-[20px] outline-none p-5 text-[20px] font-medium placeholder:text-[18px] font-funnel resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Chat;

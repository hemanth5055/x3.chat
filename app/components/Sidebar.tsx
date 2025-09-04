"use client";
import { Loader2Icon, Plus } from "lucide-react";
import { motion } from "motion/react";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/Chatcontext";
import PreviousChat from "./PreviousChat";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const router = useRouter();
  const session = useSession();
  if (session == null || session.data == null)
    return <h1>Not authenticated</h1>;
  const userId = session.data.user.id;
  const { chats, setChats } = useContext(ChatContext);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchChats = async () => {
      const result = await axios.post("/api/get-chats", { userId });
      if (result.data.success) {
        setChats(result.data.chats);
      }
      setloading(false);
    };
    fetchChats();
  }, []);
  return (
    <motion.div
      className="w-[400px] bg-[#F0F0F0] dark:bg-[#151515] flex flex-col p-4 gap-2 rounded-3xl"
      // initial={{ x: -300, opacity: 0 }} // Start hidden to the left
      // animate={{ x: 0, opacity: 1 }} // Slide in to place
      // transition={{ duration: 0.4, ease: "easeOut" }} // Smooth transition
    >
      {/* new-chat-button */}
      <div className="w-full flex justify-center py-2 items-center">
        <button
          className="w-full h-[45px]  bg-[#dedede] dark:bg-[#292929] rounded-2xl cursor-pointer"
          onClick={() => router.push("/chat")}
        >
          <h4 className="font-funnel font-medium flex justify-center gap-2">
            <Plus></Plus> New Chat
          </h4>
        </button>
      </div>

      <div className="w-full flex py-2 items-center">
        <h2 className="font-funnel font-medium dark:text-gray-400 text-gray-600">
          History
        </h2>
      </div>

      <div className="w-full flex flex-col gap-3 justify-start items-center minimal-scrollbar  overflow-y-scroll py-2">
        {chats.length === 0 && loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          chats.map((chat) => (
            <PreviousChat name={chat.name} key={chat.id} id={chat.id} />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;

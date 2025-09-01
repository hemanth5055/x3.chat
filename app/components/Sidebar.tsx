"use client";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import React, { useContext } from "react";
import { ChatContext } from "../context/Chatcontext";
import PreviousChat from "./PreviousChat";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const { chats } = useContext(ChatContext);
  return (
    <motion.div
      className="w-[450px] bg-[#F0F0F0] dark:bg-[#151515] flex flex-col p-4 gap-2 rounded-3xl"
      // initial={{ x: -300, opacity: 0 }} // Start hidden to the left
      // animate={{ x: 0, opacity: 1 }} // Slide in to place
      // transition={{ duration: 0.4, ease: "easeOut" }} // Smooth transition
    >
      {/* new-chat-button */}
      <div className="w-full flex justify-center py-2 items-center">
        <button
          className="w-full h-[50px]  bg-[#dedede] dark:bg-[#292929] rounded-2xl cursor-pointer"
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

      <div className="w-full flex flex-col gap-3 justify-center items-center">
        {/* previous-chats */}
        <PreviousChat></PreviousChat>
        <PreviousChat></PreviousChat>
        <PreviousChat></PreviousChat>
        <PreviousChat></PreviousChat>
      </div>
    </motion.div>
  );
};

export default Sidebar;

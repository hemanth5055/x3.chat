"use client";
import { Loader2Icon, Plus, X } from "lucide-react";
import { motion } from "motion/react";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/Chatcontext";
import PreviousChat from "./PreviousChat";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Sidebar = () => {
  const router = useRouter();
  const session = useSession();
  if (session == null || session.data == null)
    return <h1>Not authenticated</h1>;
  const userId = session.data.user.id;
  const { chats, setChats, setShowSideBar } = useContext(ChatContext);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const result = await axios.post("/api/get-chats", { userId });
        if (result.data.success) {
          setChats(result.data.chats);
        } else {
          console.error("Failed to fetch chats:", result.data.message);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        toast.error("Error fetching chats");
      } finally {
        setloading(false);
      }
    };

    fetchChats();
  }, [userId, setChats]);
  return (
    <motion.div
      className="w-[420px] max-sm:w-full max-sm:h-screen bg-[#f6f6f6] dark:bg-[#151515] flex flex-col p-4 gap-2 max-sm:absolute max-sm:z-1 "
      // initial={{ x: -300, opacity: 0 }} // Start hidden to the left
      // animate={{ x: 0, opacity: 1 }} // Slide in to place
      // transition={{ duration: 0.4, ease: "easeOut" }} // Smooth transition
    >
      <div className=" w-full flex justify-between p-2">
        <h3 className="font-funnel text-[23px] font-medium ">X3.chat</h3>
        <div
          className="hidden max-sm:flex w-[40px] h-[40px] items-center justify-center"
          onClick={(e) => setShowSideBar(false)}
        >
          <X></X>
        </div>
      </div>
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

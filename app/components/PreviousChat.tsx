"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { ChatContext } from "../context/Chatcontext";

const PreviousChat = ({ name, id }: { name: string; id: string }) => {
  const router = useRouter();
  const { setShowSideBar } = useContext(ChatContext);
  const handleClick = () => {
    router.push(`/chat/${id}`);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setShowSideBar(false);
    }
  };
  return (
    <div
      className="w-full h-[45px] flex-shrink-0  bg-[#e6e5e5] dark:bg-[#292929] rounded-2xl cursor-pointer flex items-center px-4 py-1"
      onClick={handleClick}
    >
      <p className="font-funnel font-medium text-[18px]">
        {name.slice(0, 23)}
        {name.length > 23 ? ".." : ""}
      </p>
    </div>
  );
};

export default PreviousChat;

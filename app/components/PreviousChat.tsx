"use client";
import { useRouter } from "next/navigation";
import React from "react";

const PreviousChat = ({ name, id }: { name: string; id: string }) => {
  const router = useRouter();
  return (
    <div
      className="w-full h-[45px]  bg-[#e6e5e5] dark:bg-[#292929] rounded-2xl cursor-pointer flex items-center px-4 py-1"
      onClick={() => router.push(`/chat/${id}`)}
    >
      <p className="font-funnel font-medium text-[18px]">
        {name.slice(0, 23)}
        {name.length > 23 ? ".." : ""}
      </p>
    </div>
  );
};

export default PreviousChat;

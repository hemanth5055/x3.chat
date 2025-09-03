"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Welcome = () => {
  const session = useSession();
  return (
    <div className="flex-1 flex flex-col gap-4 justify-center items-center">
      <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
      <h1 className="font-funnel text-[35px] max-sm:text-[25px] text-center">
        Good Evening, {session.data?.user.name}!
      </h1>
      <p className="font-mont text-center text-[18px] max-sm:text-[15px] font-semibold text-[#717171]">
        Can I help you with anything?
      </p>
    </div>
  );
};

export default Welcome;

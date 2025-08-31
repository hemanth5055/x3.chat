"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Send, SidebarClose, SidebarOpen } from "lucide-react";

const page = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="w-full h-screen flex gap-2 p-6">
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
        <div className="w-full h-full flex flex-col gap-4">
          {/* welcome=msg */}
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
            <h1 className="font-funnel text-[35px]">
              Good Evening , Hemanth Reddy !
            </h1>
            <p className="font-mont text-[18px] font-semibold text-[#717171]">
              Can I help you with anything ?
            </p>
          </div>

          {/* example- prompts */}
          <div className="w-full flex flex-wrap  justify-evenly gap-y-4 pt-[20px]">
            <div className="w-[300px] rounded-[15px] p-3  bg-[#F0F0F0] dark:bg-[#1D1D1D] flex items-center justify-center">
              <p className="font-funnel font-medium text-center">
                Explain quantum computing in simple terms.
              </p>
            </div>
            <div className="w-[300px] rounded-[15px] p-3 bg-[#F0F0F0] dark:bg-[#1D1D1D] flex items-center justify-center">
              <p className="font-funnel font-medium text-center">
                Write a professional email asking for project updates.
              </p>
            </div>
            <div className="w-[300px] rounded-[15px] p-3 bg-[#F0F0F0] dark:bg-[#1D1D1D] flex items-center justify-center">
              <p className="font-funnel font-medium text-center">
                Give me a 3-day workout plan for beginners.
              </p>
            </div>
            <div className="w-[300px] rounded-[15px] p-3 bg-[#F0F0F0] dark:bg-[#1D1D1D] flex items-center justify-center">
              <p className="font-funnel font-medium text-center">
                Give me a 3-day workout plan for beginners.
              </p>
            </div>
          </div>
        </div>

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

export default page;

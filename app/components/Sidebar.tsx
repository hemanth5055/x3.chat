"use client";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

const Sidebar = () => {
  return (
    <motion.div
      className="w-[35%]   bg-[#F0F0F0] dark:bg-[#151515] flex flex-col p-4 gap-2 rounded-3xl"
      initial={{ x: -300, opacity: 0 }} // Start hidden to the left
      animate={{ x: 0, opacity: 1 }} // Slide in to place
      transition={{ duration: 0.4, ease: "easeOut" }} // Smooth transition
    >
      {/* new-chat-button */}
      <div className="w-full flex justify-center py-2 items-center">
        <button className="w-[90%] h-[50px]  bg-[#dedede] dark:bg-[#292929] rounded-2xl cursor-pointer">
          <h4 className="font-funnel font-medium flex justify-center gap-2">
            <Plus></Plus> New Chat
          </h4>
        </button>
      </div>

      <div className="w-full flex justify-center items-center">
        <h2 className="font-mont font-medium dark:text-gray-400 text-gray-600">History</h2>
      </div>
    </motion.div>
  );
};

export default Sidebar;

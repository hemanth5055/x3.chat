"use client";
import React from "react";

const UserMessage = ({ message }: { message: string }) => {
  return (
    <div className="w-[90%] flex rounded-[20px] justify-end items-center">
      <div className=" bg-[#F0F0F0] dark:bg-[#1D1D1D] rounded-[20px] p-4 max-w-[50%] max-sm:max-w-[90%] max-sm:p-3">
        <p className="font-mont font-semibold text-[15px]">
          {message}
        </p>
      </div>
    </div>
  );
};

export default UserMessage;

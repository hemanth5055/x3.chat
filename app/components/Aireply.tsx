"use client";
import React from "react";
import Markdown from "react-markdown";

const Aireply = ({ message }: { message: string }) => {

  return (
    <div className="w-[90%] flex rounded-[20px]  justify-start items-center">
      <div className="rounded-[20px] p-4  font-medium leading-relaxed max-w-[90%] text-[18px]">
        <Markdown>{message}</Markdown>
      </div>
    </div>
  );
};

export default Aireply;

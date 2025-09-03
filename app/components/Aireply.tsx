"use client";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Aireply = ({ message }: { message: string }) => {
  return (
    <div className="w-[90%] flex rounded-[20px]  justify-start items-center">
      <div className="markdown-container rounded-[20px] p-4  font-medium leading-[1.8] max-w-[95%] text-[16px] overflow-x-scroll font-mont dark:text-gray-300 text-gray-900">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message}
        </Markdown>
      </div>
    </div>
  );
};

export default Aireply;

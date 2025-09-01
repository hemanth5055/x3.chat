"use client";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Define types for context
type ChatContextType = {
//   messages: any[];
//   setMessages: Dispatch<SetStateAction<any[]>>;
  chats: any[];
  setChats: Dispatch<SetStateAction<any[]>>;
  activeChat: any | null;
  setActiveChat: Dispatch<SetStateAction<any | null>>;
  showSideBar: boolean;
  setShowSideBar: Dispatch<SetStateAction<boolean>>;
};

// Default value
const defaultValue: ChatContextType = {
//   messages: [],
//   setMessages: () => {},
  chats: [],
  setChats: () => {},
  activeChat: null,
  setActiveChat: () => {},
  showSideBar: false,
  setShowSideBar: () => {},
};

export const ChatContext = createContext<ChatContextType>(defaultValue);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
//   const [messages, setMessages] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{
        // messages,
        // setMessages,
        chats,
        setChats,
        activeChat,
        setActiveChat,
        showSideBar,
        setShowSideBar,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

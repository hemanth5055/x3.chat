"use client";
import React from "react";
import Chat from "../components/Chat";

const page = () => {
  return <Chat chatId={null}></Chat>;
};
export default page;
// "use client";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { Send, SidebarClose, SidebarOpen } from "lucide-react";
// import { ChatContext } from "../context/Chatcontext";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import UserMessage from "../components/UserMessage";
// import Aireply from "../components/Aireply";

// const page = () => {
//   const { showSideBar, setShowSideBar, setChats } = useContext(ChatContext);
//   const [messages, setMessages] = useState<any>([]);
//   const [message, setMessage] = useState("");
//   const [chatId, setChatId] = useState(null);
//   const endRef = useRef<HTMLDivElement | null>(null);
//   const [loadingGlobal, setLoadingGlobal] = useState(true);
//   const handleSend = async () => {
//     if (message.length > 0) {
//       setMessage("");
//       setMessages((prev: any) => [
//         ...prev,
//         {
//           id: Date.now(), // temporary unique id
//           role: "USER",
//           content: message,
//         },
//       ]);
//       const result = await axios.post("/api/ask", { chatId: chatId, message });
//       console.log(result);
//       if (result) {
//         if (!chatId) {
//           setChatId(result.data.chatId);
//           setChats((prev) => [result.data.chat, ...prev]);
//           window.history.replaceState(null, "", `/chat/${result.data.chatId}`);
//         }
//         setMessages((prev: any) => [...prev, result.data.message]);
//       }
//       setLoadingGlobal(false);
//     }
//   };
//   useEffect(() => {
//     if (endRef.current) {
//       endRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);
//   return (
//     <div className="w-full h-screen flex gap-2 p-6">
//       {showSideBar ? <Sidebar></Sidebar> : ""}
//       <div className="w-full flex flex-col items-center">
//         {/* navbar */}
//         <div className="w-full flex items-center justify-between">
//           <div
//             className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
//             onClick={() => setShowSideBar((prev) => !prev)}
//           >
//             {showSideBar ? (
//               <SidebarClose className="dark:text-gray-200 text-gray-800"></SidebarClose>
//             ) : (
//               <SidebarOpen className="dark:text-gray-200 text-gray-800"></SidebarOpen>
//             )}
//           </div>
//           <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer rounded-full bg-gray-500"></div>
//         </div>

//         {/* messages-hero */}
//         {messages.length == 0 ? (
//           <div className="w-full h-full flex flex-col gap-4">
//             {/* welcome=msg */}
//             <div className="w-full flex flex-col items-center justify-center gap-1">
//               <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
//               <h1 className="font-funnel text-[35px]">
//                 Good Evening , Hemanth Reddy !
//               </h1>
//               <p className="font-mont text-[18px] font-semibold text-[#717171]">
//                 Can I help you with anything ?
//               </p>
//             </div>

//             {/* example- prompts */}
//             <div className="w-full flex flex-wrap  justify-evenly gap-y-4 pt-[20px]">
//               <div
//                 className="w-[300px] rounded-[15px] p-3  bg-[#F0F0F0] dark:bg-[#1D1D1D] flex items-center justify-center cursor-pointer"
//                 onClick={() => {
//                   setMessage("Explain quantum computing in simple terms.");
//                 }}
//               >
//                 <p className="font-funnel font-medium text-center">
//                   Explain quantum computing in simple terms.
//                 </p>
//               </div>
//               <div
//                 className="w-[300px] rounded-[15px] p-3 bg-[#F0F0F0] dark:bg-[#1D1D1D] flex items-center justify-center cursor-pointer"
//                 onClick={() => {
//                   setMessage(
//                     "Write a professional email asking for project updates."
//                   );
//                 }}
//               >
//                 <p className="font-funnel font-medium text-center">
//                   Write a professional email asking for project updates.
//                 </p>
//               </div>
//               <div
//                 className="w-[300px] rounded-[15px] p-3 bg-[#F0F0F0] dark:bg-[#1D1D1D] flex items-center justify-center cursor-pointer"
//                 onClick={() => {
//                   setMessage("Give me a 3-day workout plan for beginners.");
//                 }}
//               >
//                 <p className="font-funnel font-medium text-center">
//                   Give me a 3-day workout plan for beginners.
//                 </p>
//               </div>
//               <div
//                 className="w-[300px] rounded-[15px] p-3 bg-[#F0F0F0] dark:bg-[#1D1D1D] flex items-center justify-center cursor-pointer"
//                 onClick={() => {
//                   setMessage(" Give me a DevOps Roadmap.");
//                 }}
//               >
//                 <p className="font-funnel font-medium text-center">
//                   Give me a DevOps Roadmap.
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="w-full h-full flex flex-col gap-4 overflow-y-scroll p-4 minimal-scrollbar items-center">
//             {messages.map((msg: any, i: number) => (
//               <div key={i} className="w-full flex flex-col gap-2 items-center">
//                 {msg.role === "USER" ? (
//                   <UserMessage message={msg.content} />
//                 ) : (
//                   <Aireply message={msg.content} />
//                 )}
//               </div>
//             ))}
//             <div className="" ref={endRef}></div>
//           </div>
//         )}

//         <div className="w-[90%] flex relative h-[70px] bg-[#F0F0F0] dark:bg-[#1D1D1D] rounded-[20px]">
//           <textarea
//                      name="message"
//                      value={message}
//                      onChange={(e) => setMessage(e.target.value)}
//                      id="message"
//                      placeholder="How can X3 help you today ?"
//                      className="w-full h-full rounded-[20px] outline-none p-5 text-[20px] font-medium placeholder:text-[18px] font-funnel resize-none"
//                    ></textarea>
//                    <div className="w-[70px] h-full rounded-full  flex justify-center items-center cursor-pointer">
//                      <div
//                        className="w-[40px] h-[40px] flex justify-center items-center "
//                        onClick={handleSend}
//                      >
//                        <Send size={18}></Send>
//                      </div>
//                    </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

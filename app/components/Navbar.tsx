"use client";
import { LogOut, SidebarClose, SidebarOpen } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useContext } from "react";
import { ChatContext } from "../context/Chatcontext";

const Navbar = ({ credits }: { credits: number }) => {
  const { showSideBar, setShowSideBar } = useContext(ChatContext);
  const session = useSession();
  return (
    <div className="w-full flex items-center justify-between">
      <div
        className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
        onClick={() => setShowSideBar((prev: boolean) => !prev)}
      >
        {showSideBar ? (
          <SidebarClose className="dark:text-gray-200 text-gray-800" />
        ) : (
          <SidebarOpen className="dark:text-gray-200 text-gray-800" />
        )}
      </div>
      {/* <div className="w-[40px] h-[40px] rounded-full relative overflow-hidden">
        <Image
          src={session.data?.user.image || "/default-avatar.png"} // fallback image
          alt="User Avatar"
          fill
          className="object-cover"
        />
      </div> */}
      <div className="flex items-center gap-2">
        <h2 className="font-funnel text-[18px]">{credits}</h2>
        <div
          className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
          onClick={() => signOut({ redirectTo: "/signin" })}
        >
          <LogOut></LogOut>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

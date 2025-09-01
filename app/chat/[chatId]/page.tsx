import Chat from "@/app/components/Chat";
import React from "react";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = await params;
  return <Chat chatId={chatId}></Chat>;
};

export default page;

import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session) redirect("/chat");
  return (
    <div className="w-full h-screen flex flex-col p-6">
      {/* <h1 className="absolute right-1 bottom-0 text-[130px] font-semibold  font-mont">
        X3
      </h1> */}
      <div className="w-full ">
        <p className="text-[15px] font-mont font-semibold">
          Chat with AI, instantly.<br></br>Fast, simple, and always ready to
          help.<br></br>Ask anything — get answers in seconds.
        </p>
      </div>
      <div className="w-full pt-[300px] flex justify-center">
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="relative w-[150px] h-[50px] bottom-[20px] rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex justify-center items-center font-funnel text-[20px] text-white cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;

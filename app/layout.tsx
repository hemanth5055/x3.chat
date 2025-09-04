import type { Metadata } from "next";
import { Montserrat, Funnel_Display } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ChatContextProvider } from "./context/Chatcontext";
import { Toaster } from "react-hot-toast";

const mont = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
});

const funnel = Funnel_Display({
  variable: "--font-funnel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X3",
  description:
    "X3 is a minimal AI chat platform — ask anything, get answers in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ChatContextProvider>
        <html lang="en">
          <body className={`${mont.variable} ${funnel.variable} antialiased`}>
            {children}
            <div>
              <Toaster position="bottom-left" reverseOrder={false} containerClassName="toast-container"/>
            </div>
          </body>
        </html>
      </ChatContextProvider>
    </SessionProvider>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Next-movies",
  description: "Next-movies",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className="no-scrollbar">
        <body
          className={`${inter.className} bg-black text-white overflow-x-hidden h-full`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}

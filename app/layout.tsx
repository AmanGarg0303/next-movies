import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Next-movies",
  description: "Next-movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-black text-white no-scrollbar overflow-y-scroll`}
      >
        {children}
      </body>
    </html>
  );
}

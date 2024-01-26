"use client";

import React from "react";
import {} from "lucide-react";
import { GoogleSvg } from "@/svgs/svgs";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const onClick = () => {
    signIn("google");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        onClick={onClick}
        className="border-2 px-14 py-8 rounded-lg flex items-center gap-x-3 cursor-pointer"
      >
        {GoogleSvg}
        Login with Google
      </div>
    </div>
  );
}

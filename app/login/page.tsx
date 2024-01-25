import React from "react";
import {} from "lucide-react";
import { GoogleSvg } from "@/svgs/svgs";

export default function LoginPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-2 px-14 py-8 rounded-lg flex items-center gap-x-3 cursor-pointer">
        {GoogleSvg}
        Login with Google
      </div>
    </div>
  );
}

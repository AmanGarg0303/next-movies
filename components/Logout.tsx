"use client";

import { LogOutIcon } from "lucide-react";
import { logoutAction } from "@/actions/logout";

export const LogoutBtn = () => {
  return (
    <div
      onClick={() => logoutAction()}
      className="flex items-center justify-between w-full cursor-pointer"
    >
      <span>
        <LogOutIcon className="mr-2 h-4 w-4" />
      </span>
      <span>Log out</span>
    </div>
  );
};

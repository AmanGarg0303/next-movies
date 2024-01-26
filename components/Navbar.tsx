"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { LogoutBtn } from "./Logout";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const session = useSession();
  // console.log(session);

  return (
    <nav className="px-20 py-4 absolute top-0 w-full z-40">
      <div className="flex gap-x-10 items-center justify-between">
        <Link href="/">
          <h1 className="font-semibold text-2xl">Next-Movies</h1>
        </Link>

        <div>
          <div className="flex gap-x-8">
            <Button variant="link" className="text-white text-xl">
              Home
            </Button>
            <Button variant="link" className="text-white text-xl">
              About
            </Button>
            <Button variant="link" className="text-white text-xl">
              Explore
            </Button>
          </div>
        </div>

        {session.status === "unauthenticated" ? (
          <Link href="/auth/login">
            <Button variant="secondary" className="text-xl font-medium">
              Login
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-xl">
              <Image
                src={session.data?.user?.image!}
                width={50}
                height={50}
                alt="profile"
                unoptimized
                className="rounded-full w-12 h-12"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-[#0e0e0e] text-white border-none outline-none">
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <span>
                    <UserIcon className="mr-2 h-4 w-4" />
                  </span>
                  <span>{session?.data?.user?.name}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {/* <div className="flex items-center justify-between w-full cursor-pointer">
                  <span>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                  </span>
                  <span onClick={logoutAction}>Log out</span>
                </div> */}
                <LogoutBtn />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

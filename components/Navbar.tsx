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
import { UserIcon, ClapperboardIcon, LayoutGridIcon } from "lucide-react";
import { LogoutBtn } from "./Logout";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const { data } = useSession();

  return (
    <nav className="px-20 py-4 absolute top-0 w-full z-40">
      <div className="flex gap-x-10 items-center justify-between">
        <Link href="/">
          <h1 className="font-semibold text-2xl">Next-Movies</h1>
        </Link>

        <div>
          <div className="flex gap-x-8">
            <Button variant="link" className="text-white text-xl">
              <Link href="/">Home</Link>
            </Button>
            <Button variant="link" className="text-white text-xl">
              About
            </Button>
            <Button variant="link" className="text-white text-xl">
              <Link href="/explore">Explore</Link>
            </Button>
          </div>
        </div>

        {!data?.user ? (
          <Link href="/auth/login">
            <Button variant="secondary" className="text-xl font-medium">
              Login
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-xl">
              <Image
                src={data?.user?.image!}
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
                  <span>{data?.user?.name}</span>
                </div>
              </DropdownMenuItem>

              {/** @ts-ignore */}
              {data?.user?.role === "ADMIN" && (
                <Link href={"/admin/addCategory"}>
                  <DropdownMenuItem>
                    <div className="flex items-center justify-between w-full cursor-pointer">
                      <span>
                        <LayoutGridIcon className="mr-3 h-4 w-4" />
                      </span>
                      <span>Add Category</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
              )}

              {/** @ts-ignore */}
              {data?.user?.role === "ADMIN" && (
                <Link href={"/admin/addMovie"}>
                  <DropdownMenuItem>
                    <div className="flex items-center justify-between w-full cursor-pointer">
                      <span>
                        <ClapperboardIcon className="mr-2 h-4 w-4" />
                      </span>
                      <span>Add Movie</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
              )}

              <DropdownMenuItem>
                <LogoutBtn />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

import Link from "next/link";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="px-20 py-4 absolute top-0 w-full z-40">
      <div className="flex gap-x-10 items-center justify-between">
        <Link href="/">
          <h1 className="font-semibold text-2xl">Next-Movies</h1>
        </Link>

        <div>
          <ul className="flex gap-x-8">
            <Button variant="link" className="text-white text-xl">
              Home
            </Button>
            <Button variant="link" className="text-white text-xl">
              About
            </Button>
            <Button variant="link" className="text-white text-xl">
              Explore
            </Button>
          </ul>
        </div>

        <Button variant="ghost" className="text-xl">
          Logout
        </Button>
      </div>
    </nav>
  );
};

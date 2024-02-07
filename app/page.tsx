import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Genres } from "@/components/Genres";
// import { Movies } from "@/components/Movies";

import dynamic from "next/dynamic";
const Movies = dynamic(() => import("@/components/Movies"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="scrollbar-hide">
      <div className="h-screen">
        <Navbar />
        <Hero />
        <Genres />
      </div>
      <Movies />
    </main>
  );
}

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Genres } from "@/components/Genres";
import { Movies } from "@/components/Movies";

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

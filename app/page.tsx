import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Genres } from "@/components/Genres";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Genres />
    </main>
  );
}

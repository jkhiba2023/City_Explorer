import { Carousel } from "@/Components/Carousel";
import { Compass } from "lucide-react";
import SearchPlace from "@/Components/SearchPlace";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl flex justify-center items-center font-extrabold text-blue-400 text-6xl text-center py-5">
        Welcome to City Expl
        <Compass className="relative top-2 size-10" />
        rer
      </h1>

      <SearchPlace />

      <Carousel />
    </main>
  );
}

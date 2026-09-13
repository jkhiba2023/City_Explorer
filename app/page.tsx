import { Carousel } from "@/Components/Carousel";
import { Compass } from "lucide-react";
import SearchPlace from "@/Components/SearchPlace";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 md:px-10 lg:px-16">
      {/* Hero Heading */}
      <div className="mx-auto max-w-6xl rounded-3xl bg-white px-4 py-10 shadow-lg sm:px-6 md:py-14">
        <h1 className="flex flex-wrap items-center justify-center gap-2 text-center text-3xl font-extrabold leading-tight text-blue-700 sm:text-4xl md:text-5xl lg:text-6xl">
          <span>Welcome to City</span>

          <span className="flex items-center text-blue-500">
            <span>Expl</span>
            <Compass className="mx-1 size-8 sm:size-10 md:size-12" />
            <span>rer</span>
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-blue-500 sm:text-base md:text-lg">
          Discover amazing places, explore new destinations, and experience the
          beauty of India with CityExplorer.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mt-8 max-w-4xl">
        <SearchPlace />
      </div>

      {/* Places Carousel */}
      <div className="mx-auto mt-8 max-w-6xl">
        <Carousel />
      </div>
    </main>
  );
}

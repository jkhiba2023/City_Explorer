"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchPlace = () => {
  const router = useRouter();
  const [visitedPlace, setVisitedPlace] = useState("");

  function handleInputSearch(e) {
    setVisitedPlace(e.target.value);
  }

  const searchHandler = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const query = visitedPlace.trim();
    if (!query) return;

    router.push(`/places?place=${encodeURIComponent(query)}`);
    setVisitedPlace("");
  };

  return (
    <div className="w-full px-4">
      {/* Search */}
      <form onSubmit={searchHandler} className="my-8 flex w-full justify-center">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            placeholder="Search Place (e.g. Gateway of India, Taj Mahal...)"
            className="min-w-0 flex-1 rounded-l-2xl border-2 border-blue-500 bg-white px-4 py-3 text-center text-sm text-blue-700 outline-none placeholder:text-blue-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 sm:px-6 sm:text-base"
            onChange={handleInputSearch}
            value={visitedPlace}
          />

          <button
            type="submit"
            className="rounded-r-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:px-7 sm:text-base cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchPlace;

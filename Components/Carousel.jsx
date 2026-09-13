"use client";

import places from "@/data/placesData";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { useState } from "react";

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, places.length - 3));
  };
  return (
    <div className="bg-blue-50 px-4 py-10 sm:px-6 md:px-10">
      <h1 className="mx-auto max-w-6xl rounded-2xl bg-blue-100 px-5 py-4 text-center text-3xl font-extrabold text-blue-700 shadow-sm sm:text-4xl">
        Famous Place In India
      </h1>

      <div className="relative mx-auto mt-8 max-w-7xl">
        <button
          onClick={previousSlide}
          disabled={currentIndex === 0}
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white disabled:opacity-40 sm:left-2"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="overflow-hidden px-8 sm:px-10 md:px-12">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {places.map((place) => (
              <div
                key={place.id}
                className="min-w-full px-2 sm:min-w-1/2 md:min-w-1/3"
              >
                <div className="group overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="h-64 overflow-hidden bg-blue-100 sm:h-72 md:h-[350px]">
                    <img
                      src={place.image}
                      alt={place.pname}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <h2 className="text-center text-xl font-extrabold text-blue-700 sm:text-2xl">
                      {place.pname}
                    </h2>

                    <p className="mt-2 text-center text-sm leading-6 text-blue-600 sm:text-base">
                      {place.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex >= places.length - 3}
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white disabled:opacity-40 sm:right-2"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

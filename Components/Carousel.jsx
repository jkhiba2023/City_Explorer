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
    <div className="bg-blue-50">
      <h1 className="inline font-extrabold text-blue-500 text-3xl bg-blue-200 p-5">
        Famous Place In India
      </h1>
      <div className="relative w-full flex justify-center">
        <button
          onClick={previousSlide}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-200 shadow-lg rounded-full disabled: opacity-50"
        >
          <ArrowLeft size={30} />
        </button>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
            }}
          >
            {places.map((place) => (
              <div
                key={place.id}
                className="min-w-full md:min-w-[33.333%] p-3 my-5 hover:scale-105 transition duration-300"
              >
                <div className="group bg-blue-200 rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-full h-[450px] overflow-hidden rounded-xl bg-blue-100">
                    <img
                      src={place.image}
                      alt={place.pname}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h2 className="text-center font-extrabold text-2xl text-blue-400">
                    {place.pname}
                  </h2>
                  <p className="text-center font-bold text-l text-blue-500 p-4">
                    {place.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextSlide}
          disabled={currentIndex >= places.length - 3}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-200 shadow-lg rounded-full disabled: opacity-50"
        >
          <ArrowRight size={30} />
        </button>
      </div>
    </div>
  );
};

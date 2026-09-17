"use client";

import places from "@/data/placesData";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export const Carousel = () => {
  const clonesCount = 3;
  const extendedPlaces = [
    ...places.slice(-clonesCount),
    ...places,
    ...places.slice(0, clonesCount),
  ];

  const [currentIndex, setCurrentIndex] = useState(clonesCount);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const nextSlide = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const previousSlide = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= places.length + clonesCount) {
      setIsTransitionEnabled(false);
      setCurrentIndex((prev) => prev - places.length);
    } else if (currentIndex < clonesCount) {
      setIsTransitionEnabled(false);
      setCurrentIndex((prev) => prev + places.length);
    }
  };

  useEffect(() => {
    if (!isTransitionEnabled) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(true);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isTransitionEnabled]);

  return (
    <div className="w-full bg-blue-50 px-3 py-8 sm:px-5 sm:py-10 md:px-8 lg:px-10">
      {/* Heading */}
      <h1 className="mx-auto max-w-6xl rounded-2xl bg-blue-100 px-4 py-4 text-center text-2xl font-extrabold text-blue-700 shadow-sm sm:px-5 sm:text-3xl md:text-4xl">
        Famous Place In India
      </h1>

      {/* Carousel */}
      <div className="relative mx-auto mt-6 w-full max-w-7xl sm:mt-8">
        {/* Previous Button */}
        <button
          onClick={previousSlide}
          aria-label="Previous places"
          className="absolute left-0 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg transition hover:bg-blue-600 hover:text-white sm:left-1 sm:size-10 md:left-2 md:size-11"
        >
          <ArrowLeft className="size-4 sm:size-5 md:size-6" />
        </button>

        {/* Viewport */}
        <div className="overflow-hidden px-7 sm:px-10 md:px-12">
          {/* Track */}
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex [--items-per-view:1] md:[--items-per-view:3] ${
              isTransitionEnabled
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
            style={{
              width: `calc((${extendedPlaces.length} / var(--items-per-view)) * 100%)`,
              transform: `translateX(-${currentIndex * (100 / extendedPlaces.length)}%)`,
            }}
          >
            {extendedPlaces.map((place, index) => (
              <div
                key={`${place.id}-${index}`}
                className="shrink-0 px-1.5 sm:px-2"
                style={{
                  width: `${100 / extendedPlaces.length}%`,
                }}
              >
                <Link
                  href={`/places/${place.id}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden bg-blue-100 sm:h-56 md:h-72 lg:h-[350px]">
                    <img
                      src={place.image}
                      alt={place.pname}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 md:p-5">
                    <h2 className="text-center text-lg font-extrabold text-blue-700 sm:text-xl md:text-2xl group-hover:text-blue-900 transition">
                      {place.pname}
                    </h2>

                    <p className="mt-2 text-center text-xs leading-5 text-blue-600 sm:text-sm sm:leading-6 md:text-base">
                      {place.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next places"
          className="absolute right-0 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg transition hover:bg-blue-600 hover:text-white sm:right-1 sm:size-10 md:right-2 md:size-11"
        >
          <ArrowRight className="size-4 sm:size-5 md:size-6" />
        </button>
      </div>
    </div>
  );
};

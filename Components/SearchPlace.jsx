"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchPlace = () => {
  const router = useRouter();

  const [visitedPlace, setVisitedPlace] = useState("");
  const [placeName, setPlacename] = useState("");
  const [weather, setWeather] = useState("");

  function handleInputSearch(e) {
    setVisitedPlace(e.target.value);
  }

  const searchHandler = () => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${visitedPlace}&format=jsonv2`,
      {
        headers: {
          "User-Agent": "Mynext",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        let place = data[0];

        // console.log("get Place", place);

        setPlacename(place.display_name);

        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current=temperature_2m,relative_humidity_2m,weather_code`,
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log("WEATHER", data);
            setWeather(data);
            router.push(`/places?place=${encodeURIComponent(visitedPlace)}`);
            setVisitedPlace("");
          });
      });
  };

  return (
    <div className="w-full px-4">
      {/* Search */}
      <div className="my-8 flex w-full justify-center">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            placeholder="Search Place"
            className="min-w-0 flex-1 rounded-l-2xl border-2 border-blue-500 bg-white px-4 py-3 text-center text-sm text-blue-700 outline-none placeholder:text-blue-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-200 sm:px-6 sm:text-base"
            onChange={handleInputSearch}
            value={visitedPlace}
          />

          <button
            className="rounded-r-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 sm:px-7 sm:text-base"
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </div>

      {/* Weather */}
      {weather && (
        <div className="flex justify-center px-2">
          <div className="w-full max-w-sm rounded-2xl border border-blue-200 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="rounded-xl bg-blue-50 p-5">
              <p className="text-2xl font-extrabold text-blue-800 sm:text-3xl">
                {placeName}
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl bg-blue-100 p-3">
                  <p className="text-base font-bold text-blue-700 sm:text-lg">
                    🌡️ Temperature
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-blue-600">
                    {weather?.current?.temperature_2m}
                    {weather?.current_units?.temperature_2m}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-100 p-3">
                  <p className="text-base font-bold text-blue-700 sm:text-lg">
                    💧 Humidity
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-blue-600">
                    {weather?.current?.relative_humidity_2m}
                    {weather?.current_units?.relative_humidity_2m}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPlace;

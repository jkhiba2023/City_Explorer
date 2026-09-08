"use client";

import { useState } from "react";

const SearchPlace = () => {
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

        setPlacename(place.name);

        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current=temperature_2m,relative_humidity_2m,weather_code`,
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log("WEATHER", data);
            setWeather(data);
            setVisitedPlace("");
          });
      });
  };

  return (
    <div className="">
      <div className="flex justify-center my-10">
        <input
          type="text"
          placeholder="Search Place"
          className="w-64 px-6 py-2 text-center
          text-blue-700
          border-2 border-blue-500
          rounded-l-2xl
          outline-none
          placeholder-blue-700
          focus:border-blue-700
          focus:ring-2 focus:ring-blue-300
        "
          onChange={handleInputSearch}
          value={visitedPlace}
        />
        <button
          className="bg-blue-500 text-white rounded-r-2xl px-6 py-2"
          onClick={searchHandler}
        >
          Search
        </button>
      </div>

      {weather && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-5 rounded-xl py-5 mx-1 my-3 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-500 shadow-lg w-90 hover:scale-105 transition duration-300">
            <p className="text-2xl font-extrabold">{placeName}</p>
            <p className="text-lg font-bold">
              Temperature🌡️ {weather?.current?.temperature_2m}
              {weather?.current_units?.temperature_2m}
            </p>
            <p className="text-lg font-bold">
              Humidity 💧 {weather?.current?.relative_humidity_2m}
              {weather?.current_units?.relative_humidity_2m}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPlace;

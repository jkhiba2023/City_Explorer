import React from "react";

const page = async ({ searchParams }) => {
  const { place: searchPlace } = await searchParams;

  if (!searchPlace) {
    return (
      <div className="flex min-h-[calc(100dvh-90px)] items-center justify-center bg-blue-50 px-4">
        <div className="rounded-2xl border border-blue-200 bg-white px-8 py-6 text-center shadow-lg">
          <p className="text-lg font-semibold text-blue-700">
            Please search a place first
          </p>
        </div>
      </div>
    );
  }

  let res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchPlace)}&format=jsonv2`,
    {
      headers: {
        "User-Agent": "Mynext",
      },
    },
  );

  let data = await res.json();

  if (!data.length) {
    return (
      <div className="flex min-h-[calc(100dvh-90px)] items-center justify-center bg-blue-50 px-4">
        <div className="rounded-2xl border border-red-200 bg-white px-8 py-6 text-center shadow-lg">
          <p className="text-lg font-semibold text-red-600">Place not found.</p>
        </div>
      </div>
    );
  }

  let place = data[0];

  let temp = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current=temperature_2m,relative_humidity_2m,weather_code`,
  );

  let finalRes = await temp.json();

  return (
    <main className="min-h-[calc(100dvh-90px)] bg-blue-50 px-4 py-8 sm:px-6 md:px-10 lg:px-16">
      {/* Heading */}
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
          City Explorer
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-blue-700 sm:text-4xl md:text-5xl">
          Famous Place
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-500 sm:text-base">
          Explore the place you searched and check its current weather.
        </p>
      </div>

      {/* Main Card */}
      <div className="mx-auto mt-8 flex max-w-5xl justify-center">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-xl">
          {/* Card Header */}
          <div className="bg-blue-600 px-5 py-7 text-center sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
              📍 Location
            </p>

            <h2 className="mt-2 text-xl font-extrabold leading-relaxed text-white sm:text-2xl md:text-3xl">
              {place.display_name}
            </h2>
          </div>

          {/* Weather */}
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
            {/* Temperature */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-3xl">🌡️</div>

              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-blue-500">
                Temperature
              </p>

              <p className="mt-2 text-3xl font-extrabold text-blue-700">
                {finalRes.current.temperature_2m}
                {finalRes.current_units.temperature_2m}
              </p>
            </div>

            {/* Humidity */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-3xl">💧</div>

              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-blue-500">
                Humidity
              </p>

              <p className="mt-2 text-3xl font-extrabold text-blue-700">
                {finalRes.current.relative_humidity_2m}
                {finalRes.current_units.relative_humidity_2m}
              </p>
            </div>
          </div>

          {/* Coordinates */}
          <div className="border-t border-blue-100 px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-3 text-center text-sm sm:flex-row sm:justify-center sm:gap-8">
              <p className="text-blue-500">
                <span className="font-bold text-blue-700">Latitude:</span>{" "}
                {place.lat}
              </p>

              <p className="text-blue-500">
                <span className="font-bold text-blue-700">Longitude:</span>{" "}
                {place.lon}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;

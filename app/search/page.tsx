"use client";

import { RenderingBadge } from "@/Components/RenderingBadge";
import {
  Search as SearchIcon,
  MapPin,
  CloudSun,
  Loader2,
  Sparkles,
  AlertCircle,
  Thermometer,
  Droplets,
  Wind,
  Compass,
} from "lucide-react";
import { useState } from "react";

interface NominatimPlace {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  category?: string;
  address?: Record<string, string>;
}

interface WeatherResult {
  current?: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

const suggestedQueries = [
  "Gateway of India, Mumbai",
  "Taj Mahal, Agra",
  "Marine Drive, Mumbai",
  "Red Fort, Delhi",
  "Hawa Mahal, Jaipur",
  "Golden Temple, Amritsar",
  "Charminar, Hyderabad",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<NominatimPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<NominatimPlace | null>(null);
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (searchTerm: string) => {
    const term = searchTerm.trim();
    if (!term) return;

    setLoading(true);
    setSearched(true);
    setErrorMsg("");
    setSelectedPlace(null);
    setWeather(null);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          term
        )}&format=jsonv2&addressdetails=1&limit=6`,
        {
          headers: {
            "User-Agent": "CityExplorerApp/1.0 (educational demo)",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Nominatim search request failed");
      }

      const data: NominatimPlace[] = await res.json();
      setResults(data);

      if (data.length > 0) {
        fetchPlaceWeather(data[0]);
      }
    } catch (err: any) {
      setErrorMsg(
        err.message || "Failed to search location. Please check your internet connection."
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceWeather = async (place: NominatimPlace) => {
    setSelectedPlace(place);
    setWeatherLoading(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`
      );
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } catch (err) {
      console.error("Failed to fetch weather for selected place:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {/* Header & CSR Strategy Badge */}
        <div className="text-center">
          <div className="mb-4 inline-block">
            <RenderingBadge
              strategy="CSR"
              explanation="Client-Side Rendered ('use client'). Search requests &amp; UI state update instantly in your browser."
            />
          </div>

          <h1 className="text-3xl font-black text-blue-900 sm:text-5xl">
            Live Place Search &amp; Weather
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-600 sm:text-base">
            Search any landmark, city, monument, or street across India using OpenStreetMap Nominatim and fetch live Open-Meteo forecasts on the fly.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="mx-auto mt-8 max-w-2xl">
          <form
            onSubmit={onSubmit}
            className="flex items-center overflow-hidden rounded-2xl border-2 border-blue-500 bg-white shadow-lg transition-all focus-within:border-blue-700 focus-within:ring-4 focus-within:ring-blue-100"
          >
            <div className="flex items-center pl-4 text-blue-500">
              <SearchIcon className="size-5" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any place in India (e.g. Gateway of India, Marine Drive)..."
              className="w-full bg-transparent px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-hidden sm:text-base"
            />

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex items-center gap-2 bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <span>Search</span>
              )}
            </button>
          </form>

          {/* Suggested Quick Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-gray-500">Try searching:</span>
            {suggestedQueries.map((suggest) => (
              <button
                key={suggest}
                type="button"
                onClick={() => {
                  setQuery(suggest);
                  handleSearch(suggest);
                }}
                className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-2xs transition hover:bg-blue-600 hover:text-white"
              >
                {suggest}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {errorMsg && (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center text-sm font-medium text-rose-700 flex items-center justify-center gap-2">
            <AlertCircle className="size-5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Results Area */}
        <div className="mt-10">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="size-10 animate-spin text-blue-600" />
              <p className="mt-3 text-sm font-bold text-blue-800">
                Searching Nominatim OpenStreetMap...
              </p>
            </div>
          )}

          {!loading && searched && results.length === 0 && !errorMsg && (
            <div className="mx-auto max-w-md rounded-3xl border border-blue-200 bg-white p-8 text-center shadow-md">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <SearchIcon className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Places Found</h3>
              <p className="mt-1 text-xs text-gray-500">
                We couldn&apos;t find any results for &quot;{query}&quot;. Try checking spelling or search for broader landmarks like &quot;Mumbai&quot; or &quot;Delhi&quot;.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Results List */}
              <div className="space-y-3 lg:col-span-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Found {results.length} Locations:
                </p>

                {results.map((place) => {
                  const isSelected = selectedPlace?.place_id === place.place_id;
                  return (
                    <div
                      key={place.place_id}
                      onClick={() => fetchPlaceWeather(place)}
                      className={`cursor-pointer rounded-2xl border p-4 shadow-2xs transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/90 ring-2 ring-blue-400"
                          : "border-blue-100 bg-white hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                          <MapPin className="size-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-blue-950 leading-snug">
                            {place.display_name}
                          </h4>
                          <p className="mt-1 text-[11px] font-mono text-gray-500">
                            Lat: {parseFloat(place.lat).toFixed(4)} | Lon:{" "}
                            {parseFloat(place.lon).toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Weather Forecast Preview for Selected Place */}
              <div className="lg:col-span-6">
                {selectedPlace && (
                  <div className="sticky top-24 rounded-3xl border border-indigo-200 bg-white p-6 shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                      <div className="flex items-center gap-2">
                        <CloudSun className="size-5 text-indigo-600" />
                        <h3 className="font-extrabold text-indigo-950">
                          Selected Place Live Weather
                        </h3>
                      </div>
                      <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-black text-indigo-800">
                        Open-Meteo
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-extrabold text-gray-900 leading-snug">
                        {selectedPlace.display_name}
                      </h4>
                      <p className="mt-1 font-mono text-xs text-gray-500">
                        GPS: {selectedPlace.lat}, {selectedPlace.lon}
                      </p>
                    </div>

                    {weatherLoading ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="size-8 animate-spin text-indigo-600" />
                        <p className="mt-2 text-xs font-bold text-indigo-700">
                          Fetching live coordinates weather...
                        </p>
                      </div>
                    ) : weather?.current ? (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-center">
                          <p className="text-[10px] font-bold uppercase text-gray-500">
                            Temp
                          </p>
                          <p className="text-xl font-black text-indigo-900">
                            {Math.round(weather.current.temperature_2m)}°C
                          </p>
                        </div>

                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-center">
                          <p className="text-[10px] font-bold uppercase text-gray-500">
                            Feels
                          </p>
                          <p className="text-xl font-black text-indigo-900">
                            {Math.round(weather.current.apparent_temperature)}°C
                          </p>
                        </div>

                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-center">
                          <p className="text-[10px] font-bold uppercase text-gray-500">
                            Humidity
                          </p>
                          <p className="text-xl font-black text-indigo-900">
                            {weather.current.relative_humidity_2m}%
                          </p>
                        </div>

                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-center">
                          <p className="text-[10px] font-bold uppercase text-gray-500">
                            Wind
                          </p>
                          <p className="text-xl font-black text-indigo-900">
                            {weather.current.wind_speed_10m} km/h
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-500">
                        Weather data unavailable for this coordinate.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

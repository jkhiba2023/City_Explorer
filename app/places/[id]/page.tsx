import {
  ArrowLeft,
  Calendar,
  Cloud,
  Compass,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import places from "@/data/placesData";

// SSR (Server-Side Rendering) - Fresh live weather is fetched on every server request
export const dynamic = "force-dynamic";

interface PlaceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Weather code mapping according to WMO standard
function getWeatherCondition(code: number) {
  if (code === 0) return { label: "Clear Sky", icon: "☀️" };
  if (code === 1 || code === 2) return { label: "Partly Cloudy", icon: "🌤️" };
  if (code === 3) return { label: "Overcast", icon: "☁️" };
  if (code >= 45 && code <= 48) return { label: "Foggy", icon: "🌫️" };
  if (code >= 51 && code <= 67) return { label: "Rain Showers", icon: "🌧️" };
  if (code >= 71 && code <= 77) return { label: "Snow Flurries", icon: "❄️" };
  if (code >= 80 && code <= 82) return { label: "Heavy Showers", icon: "🌦️" };
  if (code >= 95 && code <= 99) return { label: "Thunderstorm", icon: "⛈️" };
  return { label: "Fair Weather", icon: "🌤️" };
}

async function fetchLiveWeatherData(lat?: number, lon?: number) {
  if (typeof lat !== "number" || typeof lon !== "number") return null;

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
      { cache: "no-store" } // SSR: Always fresh
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Open-Meteo fetch failed:", err);
    return null;
  }
}

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
  const { id } = await params;

  // Match place from dataset
  const place = places.find((p) => p.id === id);

  if (!place) {
    notFound();
  }

  // Fetch live server-side weather
  const weatherData = await fetchLiveWeatherData(place.lat, place.lon);
  const current = weatherData?.current;
  const condition = getWeatherCondition(current?.weather_code ?? 0);

  const locationDisplay = [place.city, place.state].filter(Boolean).join(", ") || "India";
  const highlights = place.highlights || [];

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {/* Top Navigation */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-xs transition hover:bg-blue-600 hover:text-white"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-xl">
          {/* Main Visual Image Banner */}
          <div className="relative h-72 w-full sm:h-96 bg-blue-900">
            <img
              src={place.image}
              alt={place.pname}
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-300">
                <MapPin className="size-4" />
                <span>{locationDisplay}</span>
              </div>
              <h1 className="mt-1 text-2xl font-black sm:text-4xl md:text-5xl">
                {place.pname}
              </h1>
            </div>
          </div>

          {/* Place Description & Live Weather Grid */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Overview */}
            <div>
              <h2 className="text-xl font-black text-blue-900 sm:text-2xl">
                About the Destination
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-700">
                {place.description}
              </p>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-800">
                  Top Highlights
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="flex items-center gap-1.5 rounded-xl bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700 border border-blue-200"
                    >
                      <Sparkles className="size-3.5 text-blue-500" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Live SSR Weather Module */}
            <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-white p-6 sm:p-8 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                    <Cloud className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-indigo-950">
                      Live Weather Forecast
                    </h3>
                    <p className="text-xs font-medium text-indigo-600">
                      Fetched via Open-Meteo Server-Side API (SSR)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-indigo-100/70 px-3 py-1 text-xs font-bold text-indigo-800">
                  <span className="text-lg">{condition.icon}</span>
                  <span>{condition.label}</span>
                </div>
              </div>

              {/* Weather Stats Grid */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-2xl border border-indigo-100 bg-white p-4 text-center shadow-xs">
                  <div className="text-2xl">🌡️</div>
                  <p className="mt-1 text-xs font-semibold text-gray-500 uppercase">
                    Temperature
                  </p>
                  <p className="mt-1 text-2xl font-black text-indigo-900">
                    {current ? `${Math.round(current.temperature_2m)}°C` : "--"}
                  </p>
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-white p-4 text-center shadow-xs">
                  <div className="text-2xl">😌</div>
                  <p className="mt-1 text-xs font-semibold text-gray-500 uppercase">
                    Feels Like
                  </p>
                  <p className="mt-1 text-2xl font-black text-indigo-900">
                    {current ? `${Math.round(current.apparent_temperature)}°C` : "--"}
                  </p>
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-white p-4 text-center shadow-xs">
                  <div className="text-2xl">💧</div>
                  <p className="mt-1 text-xs font-semibold text-gray-500 uppercase">
                    Humidity
                  </p>
                  <p className="mt-1 text-2xl font-black text-indigo-900">
                    {current ? `${current.relative_humidity_2m}%` : "--"}
                  </p>
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-white p-4 text-center shadow-xs">
                  <div className="text-2xl">💨</div>
                  <p className="mt-1 text-xs font-semibold text-gray-500 uppercase">
                    Wind Speed
                  </p>
                  <p className="mt-1 text-2xl font-black text-indigo-900">
                    {current ? `${current.wind_speed_10m} km/h` : "--"}
                  </p>
                </div>
              </div>

              {/* Coordinates Info */}
              {(place.lat || place.bestTimeToVisit) && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-indigo-100/50 px-4 py-3 text-xs text-indigo-900">
                  {place.lat && place.lon && (
                    <div className="flex items-center gap-1.5 font-bold">
                      <Compass className="size-4 text-indigo-600" />
                      <span>GPS Coordinates:</span>
                      <span className="font-mono">{place.lat}° N, {place.lon}° E</span>
                    </div>
                  )}
                  {place.bestTimeToVisit && (
                    <div className="flex items-center gap-1.5 font-bold">
                      <Calendar className="size-4 text-indigo-600" />
                      <span>Best Season: {place.bestTimeToVisit}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

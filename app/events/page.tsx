import { RenderingBadge } from "@/Components/RenderingBadge";
import { TicketButton } from "@/Components/TicketButton";
import { sampleEvents, EventItem } from "@/data/eventsData";
import {
  Calendar,
  MapPin,
  Tag,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

// ISR (Incremental Static Regeneration) - Revalidated every 120 seconds
export const revalidate = 120;

async function getEvents(): Promise<{ events: EventItem[]; isLiveApi: boolean }> {
  const apiKey = process.env.TICKETMASTER_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=IN&apikey=${apiKey}`,
        { next: { revalidate: 120 } }
      );

      if (res.ok) {
        const data = await res.json();
        const apiEvents = data?._embedded?.events;

        if (apiEvents && Array.isArray(apiEvents) && apiEvents.length > 0) {
          const formatted: EventItem[] = apiEvents.map((e: any) => ({
            id: e.id,
            name: e.name,
            city: e._embedded?.venues?.[0]?.city?.name || "India",
            venue: e._embedded?.venues?.[0]?.name || "Local Venue",
            date: e.dates?.start?.localDate || "Upcoming",
            category: e.classifications?.[0]?.segment?.name || "Live Event",
            image:
              e.images?.[0]?.url ||
              "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
            description:
              e.info ||
              e.pleaseNote ||
              "Experience live cultural, music, or theatrical performances.",
            price: e.priceRanges?.[0]?.min
              ? `₹${e.priceRanges[0].min}`
              : "Tickets Available",
            source: "ticketmaster",
          }));

          return { events: formatted, isLiveApi: true };
        }
      }
    } catch (err) {
      console.warn("Ticketmaster API failed, falling back to sample dataset:", err);
    }
  }

  // Graceful fallback to curated Indian festivals and events
  return { events: sampleEvents, isLiveApi: false };
}

export default async function EventsPage() {
  const { events, isLiveApi } = await getEvents();

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 inline-block">
            <RenderingBadge
              strategy="ISR"
              revalidateTime={120}
              explanation="Events are statically cached with 120s background revalidation + graceful API fallback."
            />
          </div>

          <h1 className="text-3xl font-black text-blue-900 sm:text-5xl">
            Live Events &amp; Cultural Festivals
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-600 sm:text-base">
            Discover upcoming music festivals, literature summits, art fairs, and cultural celebrations across India.
          </p>

          {/* API Info Banner */}
          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-semibold text-blue-800 shadow-2xs">
            <Sparkles className="size-3.5 text-amber-500" />
            <span>
              {isLiveApi
                ? "Live Ticketmaster Discovery API Connected"
                : "Curated Indian Cultural & Arts Festival Dataset"}
            </span>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-blue-900">
                <img
                  src={event.image}
                  alt={event.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-blue-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                  {event.category}
                </div>
                <div className="absolute top-3 right-3 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold text-white shadow-xs">
                  {event.price}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                  <Calendar className="size-3.5" />
                  <span>{event.date}</span>
                </div>

                <h2 className="mt-2 text-lg font-black text-blue-950 group-hover:text-blue-600 transition">
                  {event.name}
                </h2>

                <p className="mt-2 flex items-start gap-1.5 text-xs text-gray-500">
                  <MapPin className="size-3.5 shrink-0 text-red-500 mt-0.5" />
                  <span>{event.venue}, {event.city}</span>
                </p>

                <p className="mt-3 line-clamp-3 text-xs sm:text-sm leading-relaxed text-gray-600">
                  {event.description}
                </p>

                {/* Footer Action */}
                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 uppercase">
                    City: {event.city}
                  </span>

                  <TicketButton eventName={event.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

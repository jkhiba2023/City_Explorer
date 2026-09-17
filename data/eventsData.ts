export interface EventItem {
  id: string;
  name: string;
  city: string;
  venue: string;
  date: string;
  category: string;
  image: string;
  description: string;
  price: string;
  source: string;
}

export const sampleEvents: EventItem[] = [
  {
    id: "jaipur-lit-fest",
    name: "Jaipur Literature Festival",
    city: "Jaipur",
    venue: "Hotel Clarks Amer",
    date: "Jan 22 - Jan 26",
    category: "Literature & Arts",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
    description: "The greatest literary show on Earth bringing together world-renowned authors, thinkers, and Nobel laureates.",
    price: "Free Entry / Delegate Pass",
    source: "curated",
  },
  {
    id: "sunburn-goa",
    name: "Sunburn Music Festival",
    city: "Goa",
    venue: "Vagator Beach",
    date: "Dec 28 - Dec 31",
    category: "Music & EDM",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    description: "Asia's premier electronic dance music festival featuring top international DJs, massive stages, and beach vibes.",
    price: "₹3,500 onwards",
    source: "curated",
  },
  {
    id: "pushkar-camel-fair",
    name: "Pushkar Camel & Cultural Fair",
    city: "Pushkar",
    venue: "Pushkar Fair Ground",
    date: "Nov 15 - Nov 23",
    category: "Culture & Heritage",
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=800&auto=format&fit=crop&q=80",
    description: "An iconic cultural spectacle of color, traditional folk dance, music, hot air balloons, and camel trade.",
    price: "Free Admission",
    source: "curated",
  },
  {
    id: "kala-ghoda-fest",
    name: "Kala Ghoda Arts Festival",
    city: "Mumbai",
    venue: "Kala Ghoda Precinct, Fort",
    date: "Feb 01 - Feb 09",
    category: "Visual & Street Arts",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
    description: "A vibrant multi-disciplinary street arts festival celebrating visual art, theatre, dance, music, and food.",
    price: "Free Entry",
    source: "curated",
  },
  {
    id: "rann-utsav",
    name: "Rann Utsav - White Desert Festival",
    city: "Kutch",
    venue: "Dhordo Tent City",
    date: "Nov 01 - Feb 28",
    category: "Cultural Carnival",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
    description: "Experience the mesmerizing white salt desert under full moon with authentic Gujarati music, cuisine, and luxury glamping.",
    price: "₹5,000 onwards",
    source: "curated",
  },
  {
    id: "hornbill-festival",
    name: "Hornbill Festival",
    city: "Kohima",
    venue: "Naga Heritage Village, Kisama",
    date: "Dec 01 - Dec 10",
    category: "Tribal & Indigenous Culture",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80",
    description: "The Festival of Festivals showcasing the rich heritage, dances, crafts, indigenous sports, and food of Nagaland tribes.",
    price: "₹50/day Pass",
    source: "curated",
  },
];

export type Show = {
  date: string;
  /** Event name — leave "" to hide */
  title: string;
  venue: string;
  city: string;
  /** Details link → "Lihat Butiran ↗" button; null → "Akan Datang" */
  link: string | null;
};

/** Upcoming shows, in date order. An empty list shows the "no shows" message. */
export const SHOWS: Show[] = [
  {
    date: "16 Mei 2026",
    title: "FOR FUN GIG 3.0",
    venue: "Sarang Suara Studio",
    city: "Seri Kembangan, Selangor",
    link: "https://www.instagram.com/p/DVFMqlFgef7/?igsh=dWxhNTBicjhnNjJn",
  },
  {
    date: "12 September 2026",
    title: "",
    venue: "Garage Space Ampang Hilir",
    city: "Ampang, Selangor",
    link: null,
  },
];

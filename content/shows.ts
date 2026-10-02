export type Show = {
  /** ISO date "YYYY-MM-DD" — displayed per language, and used to work out past vs upcoming */
  date: string;
  /** Event name — leave "" to hide */
  title: string;
  venue: string;
  city: string;
  /** Details link → "Lihat Butiran ↗" button (upcoming shows only); null → "Akan Datang" */
  link: string | null;
};

/**
 * All shows, any order. Past shows (date before today) automatically lose their
 * button/status and move below upcoming ones — no need to edit them after the gig.
 */
export const SHOWS: Show[] = [
  {
    date: "2026-10-24",
    title: "MUSE MADNESS 4.0",
    venue: "Sarang Suara Studio",
    city: "Seri Kembangan, Selangor",
    link: "https://www.instagram.com/p/Ddu1WD0upaZ/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  },
  {
    date: "2026-09-12",
    title: "",
    venue: "Garage Space Ampang Hilir",
    city: "Ampang, Selangor",
    link: null,
  },
  {
    date: "2026-05-16",
    title: "FOR FUN GIG 3.0",
    venue: "Sarang Suara Studio",
    city: "Seri Kembangan, Selangor",
    link: "https://www.instagram.com/p/DVFMqlFgef7/?igsh=dWxhNTBicjhnNjJn",
  },
];

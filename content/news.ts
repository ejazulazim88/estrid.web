import { asset } from "@/lib/utils";

export type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  /** External article link */
  link: string;
};

/** Newest first. The first item is shown as the large featured story. */
export const NEWS: NewsItem[] = [
  {
    title: "Single Sulung 'Narsistik' Kini Tersedia!",
    date: "16 Ogos 2025",
    excerpt: "Single pertama kami akhirnya hadir. Dengar 'Narsistik' sekarang di semua platform muzik utama dan rasai tenaga mentah Estrid yang tidak berkompromi.",
    image: asset("/images/estrid-2026.png"),
    link: "https://musicaddicts.my/estrid-meledak-lembaran-baharu-muzik-rock-alternatif-tempatan-dengan-narsistik/",
  },
];

import type { Localized } from "@/lib/i18n";
import { asset } from "@/lib/utils";

export type NewsItem = {
  title: Localized;
  /** ISO date "YYYY-MM-DD" — displayed per language */
  date: string;
  excerpt: Localized;
  image: string;
  /** External article / video link */
  link: string;
};

/** Newest first. The first item is the large featured story. Keep at least one item. */
export const NEWS: NewsItem[] = [
  {
    title: {
      ms: "Single Baharu 'Akhir.' Kini Tersedia!",
      en: "New Single 'Akhir.' Out Now!",
    },
    date: "2026-09-26",
    excerpt: {
      ms: "'Akhir.' kini boleh didengar di semua platform muzik utama. Tonton video muzik rasminya sekarang.",
      en: "'Akhir.' is out now on all major music platforms. Watch the official music video now.",
    },
    image: asset("/images/akhir-artwork-landscape.jpg"),
    link: "https://youtu.be/pLnVxlmiMF4",
  },
  {
    title: {
      ms: "Single Sulung 'Narsistik' Kini Tersedia!",
      en: "Debut Single 'Narsistik' Out Now!",
    },
    date: "2025-08-16",
    excerpt: {
      ms: "Single pertama kami akhirnya hadir. Dengar 'Narsistik' sekarang di semua platform muzik utama dan rasai tenaga mentah Estrid yang tidak berkompromi.",
      en: "Our first single is finally here. Listen to 'Narsistik' now on all major music platforms and feel Estrid's raw, uncompromising energy.",
    },
    image: asset("/images/estrid-2026.png"),
    link: "https://musicaddicts.my/estrid-meledak-lembaran-baharu-muzik-rock-alternatif-tempatan-dengan-narsistik/",
  },
];

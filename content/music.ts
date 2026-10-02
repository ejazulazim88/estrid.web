import { Disc3, Music2, Youtube } from "lucide-react";
import type { Localized } from "@/lib/i18n";

/** The big card at the top of the Music section */
export const FEATURED_RELEASE: {
  title: [string, string];
  label: string;
  artwork: string;
  description: Localized;
  spotifyEmbed: string;
} = {
  /** Rendered as one word; the second part is shown in red */
  title: ["Akhir", "."],
  label: "Single · 2026",
  artwork: "/images/akhir-artwork.jpg",
  description: {
    ms: "Single terbaharu Estrid — kini tersedia di semua platform muzik.",
    en: "Estrid’s newest single — out now on all music platforms.",
  },
  /** Spotify → Share → Embed track → copy the src URL */
  spotifyEmbed: "https://open.spotify.com/embed/track/0DKpL2GNJ5gcWxRAP1guXO?utm_source=generator&theme=0",
};

export const MUSIC_VIDEO = {
  title: FEATURED_RELEASE.title.join(""),
  /** The id from youtu.be/<id> or youtube.com/watch?v=<id> */
  youtubeId: "pLnVxlmiMF4",
};

/** Pop-up shown once per session. Change `slug` for the next release so it shows again. */
export const NEW_RELEASE = {
  slug: "akhir",
  title: FEATURED_RELEASE.title,
  artwork: FEATURED_RELEASE.artwork,
  youtubeUrl: `https://youtu.be/${MUSIC_VIDEO.youtubeId}`,
};

/** Older releases, newest first — compact rows under the music video */
export const PAST_RELEASES = [
  {
    title: "Narsistik",
    label: "Single · 2025",
    artwork: "/images/narsistik artwork.png",
    spotifyUrl: "https://open.spotify.com/track/10qy02MuJQsxXM4sAOwo1A",
    youtubeUrl: "https://youtu.be/Pw14pde3heQ",
  },
];

export const PLATFORMS = [
  { name: "Spotify", icon: Disc3, url: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu?si=jw60k9sgTRiXx6xRIoKkfQ" },
  { name: "Apple Music", icon: Music2, url: "https://music.apple.com/my/artist/estrid/1831023443" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@EstridBand" },
];

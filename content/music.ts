import { Disc3, Music2, Youtube } from "lucide-react";
import { asset } from "@/lib/utils";

export const FEATURED_RELEASE = {
  /** Rendered as one word; the second part is shown in red */
  title: ["Narsi", "stik"],
  label: "Single · 2025",
  artwork: asset("/images/narsistik artwork.png"),
  description: "Single sulung Estrid — mentah, jujur, dan tidak berkompromi. Tersedia di semua platform muzik.",
  /** Spotify → Share → Embed track → copy the src URL */
  spotifyEmbed: "https://open.spotify.com/embed/track/10qy02MuJQsxXM4sAOwo1A?utm_source=generator&theme=0",
};

export const MUSIC_VIDEO = {
  title: "Narsistik",
  /** The id from youtube.com/watch?v=<id> */
  youtubeId: "Pw14pde3heQ",
};

export const PLATFORMS = [
  { name: "Spotify", icon: Disc3, url: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu?si=jw60k9sgTRiXx6xRIoKkfQ" },
  { name: "Apple Music", icon: Music2, url: "https://music.apple.com/my/artist/estrid/1831023443" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@EstridBand" },
];

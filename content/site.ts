import { Facebook, Instagram, Music, Youtube } from "lucide-react";

export const SITE = {
  name: "ESTRID",
  url: "https://estrid.my",
  title: "ESTRID | Band Rock Malaysia",
  description:
    "ESTRID — band rock Malaysia. Muzik, jadual persembahan, galeri, dan berita terkini.",
  tagline: "Emosi Yang Dibebaskan, Bersuara Melalui Bunyi.",
  email: "estridband.official@gmail.com",
  linktree: "https://linktr.ee/estrid.band",
  location: "Kuala Lumpur, Malaysia",
  themeColor: "#DC2626",
  ogImage: "/images/og-image.png",
};

/** Page sections in scroll order — drives the nav, footer links and sitemap */
export const NAV_SECTIONS = [
  { id: "home", label: "Laman Utama" },
  { id: "about", label: "Tentang" },
  { id: "music", label: "Muzik" },
  { id: "tour", label: "Persembahan" },
  { id: "gallery", label: "Galeri" },
  { id: "berita", label: "Berita" },
  { id: "contact", label: "Hubungi" },
];

export const SOCIAL_LINKS = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/estrid.my" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/estrid.band" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@EstridBand" },
  { name: "Spotify", icon: Music, href: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu" },
];

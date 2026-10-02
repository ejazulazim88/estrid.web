import { Facebook, Instagram, Music, Youtube } from "lucide-react";
import type { Localized } from "@/lib/i18n";

export const SITE = {
  name: "ESTRID",
  url: "https://estrid.my",
  // SEO metadata stays BM-only (see design spec)
  title: "ESTRID",
  description:
    "ESTRID. Muzik, jadual persembahan, galeri, dan berita terkini.",
  tagline: {
    ms: "Emosi Yang Dibebaskan, Bersuara Melalui Bunyi.",
    en: "Emotions Unleashed, Given Voice Through Sound.",
  } satisfies Localized,
  email: "estridband.official@gmail.com",
  linktree: "https://linktr.ee/estrid.band",
  location: "Kuala Lumpur, Malaysia",
  whatsapp: {
    contact: "https://wa.me/60127159784?text=Hi%2C%20I%20want%20to%20know%20more%20about%20ESTRID",
    merch: "https://wa.me/60173308974?text=Hi%2C%20I%20want%20to%20order%20ESTRID%20merch",
  },
  themeColor: "#DC2626",
  ogImage: "/images/og-image.jpg",
};

/** Page sections in scroll order — drives the nav and footer links */
export const NAV_SECTIONS: { id: string; label: Localized }[] = [
  { id: "home", label: { ms: "Laman Utama", en: "Home" } },
  { id: "about", label: { ms: "Tentang", en: "About" } },
  { id: "music", label: { ms: "Muzik", en: "Music" } },
  { id: "tour", label: { ms: "Persembahan", en: "Shows" } },
  { id: "gallery", label: { ms: "Galeri", en: "Gallery" } },
  { id: "berita", label: { ms: "Berita", en: "News" } },
  { id: "contact", label: { ms: "Hubungi", en: "Contact" } },
];

export const SOCIAL_LINKS = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/estrid.my" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/estrid.band" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@EstridBand" },
  { name: "Spotify", icon: Music, href: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu" },
];

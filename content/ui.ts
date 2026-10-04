import type { CreditRole } from "@/content/lyrics";
import type { Localized } from "@/lib/i18n";

type Header = { eyebrow: Localized; title: Localized; accent: Localized };

/** Interface copy (buttons, labels, headings). Band content lives in the other content/ files. */
export const UI = {
  common: {
    close: { ms: "Tutup", en: "Close" },
    previous: { ms: "Sebelumnya", en: "Previous" },
    next: { ms: "Seterusnya", en: "Next" },
    followUs: { ms: "Ikuti Kami", en: "Follow Us" },
  },
  nav: {
    toggleMenu: { ms: "Buka/tutup menu", en: "Toggle menu" },
    language: { ms: "Bahasa", en: "Language" },
  },
  hero: {
    listenNow: { ms: "Dengar Sekarang", en: "Listen Now" },
    showDates: { ms: "Tarikh Persembahan", en: "Show Dates" },
    scrollDown: { ms: "Tatal ke bawah", en: "Scroll down" },
  },
  about: {
    header: {
      eyebrow: { ms: "Siapa Kami", en: "Who We Are" },
      title: { ms: "Tentang", en: "About" },
      accent: { ms: "ESTRID", en: "ESTRID" },
    } satisfies Header,
    story: { ms: "CERITA KAMI", en: "OUR STORY" },
    members: { ms: "AHLI BAND", en: "BAND MEMBERS" },
  },
  music: {
    header: {
      eyebrow: { ms: "Dengar Kami", en: "Listen" },
      title: { ms: "Muzik", en: "Our" },
      accent: { ms: "Kami", en: "Music" },
    } satisfies Header,
    latestRelease: { ms: "— Keluaran Terkini", en: "— Latest Release" },
    listenNow: { ms: "Dengar sekarang", en: "Listen now" },
    officialVideo: { ms: "Video Muzik Rasmi", en: "Official Music Video" },
    previousReleases: { ms: "Keluaran Terdahulu", en: "Previous Releases" },
    availableOn: { ms: "Tersedia Di", en: "Available On" },
  },
  tour: {
    pastShow: { ms: "Persembahan telah berlalu", en: "Past show" },
    header: {
      eyebrow: { ms: "Jumpa Kami", en: "See Us Live" },
      title: { ms: "Tarikh", en: "Show" },
      accent: { ms: "Persembahan", en: "Dates" },
    } satisfies Header,
    viewDetails: { ms: "Lihat Butiran ↗", en: "View Details ↗" },
    comingSoon: { ms: "Akan Datang", en: "Coming Soon" },
    emptyTitle: { ms: "Tiada Persembahan Dijadualkan", en: "No Shows Scheduled" },
    emptySubtitle: { ms: "Nantikan Pengumuman Baharu", en: "Stay Tuned for Announcements" },
    stayUpdated: { ms: "IKUTI BERITA TERKINI", en: "STAY UPDATED" },
    mailingList: { ms: "Sertai Senarai Mel Kami ↗", en: "Join Our Mailing List ↗" },
  },
  gallery: {
    header: {
      eyebrow: { ms: "Kenangan Kami", en: "Memories" },
      title: { ms: "Galeri", en: "Photo" },
      accent: { ms: "Foto", en: "Gallery" },
    } satisfies Header,
  },
  news: {
    header: {
      eyebrow: { ms: "Terkini", en: "Latest" },
      title: { ms: "Berita", en: "Our" },
      accent: { ms: "Kami", en: "News" },
    } satisfies Header,
    readMore: { ms: "Baca Selanjutnya ↗", en: "Read More ↗" },
    moreNews: { ms: "Berita Lain", en: "More News" },
  },
  contact: {
    header: {
      eyebrow: { ms: "Berhubung", en: "Get In Touch" },
      title: { ms: "Hubungi", en: "Contact" },
      accent: { ms: "Kami", en: "Us" },
    } satisfies Header,
    info: { ms: "Maklumat", en: "Info" },
    email: { ms: "E-mel", en: "Email" },
    location: { ms: "Lokasi", en: "Location" },
    whatsappUs: { ms: "WhatsApp Kami", en: "WhatsApp Us" },
    orderMerch: { ms: "Tempah Merch", en: "Order Merch" },
  },
  footer: {
    links: { ms: "Pautan", en: "Links" },
  },
  releaseModal: {
    eyebrow: { ms: "Lagu Baharu", en: "New Release" },
    subtitle: { ms: "Kini di semua platform", en: "Out now on all platforms" },
    watchMv: { ms: "Tonton MV ↗", en: "Watch MV ↗" },
  },
  lyrics: {
    lyrics: { ms: "Lirik", en: "Lyrics" },
    songLyrics: { ms: "Lirik Lagu", en: "Song Lyrics" },
    indexIntro: { ms: "Lirik rasmi lagu-lagu ESTRID.", en: "Official lyrics for every ESTRID song." },
    allLyrics: { ms: "Semua Lirik", en: "All Lyrics" },
    credits: { ms: "Kredit", en: "Credits" },
    readLyrics: { ms: "Baca Lirik →", en: "Read Lyrics →" },
    roles: {
      composer: { ms: "Komposer", en: "Composer" },
      lyricist: { ms: "Lirik", en: "Lyrics" },
      arranger: { ms: "Susunan", en: "Arrangement" },
      producer: { ms: "Produser", en: "Producer" },
      mixMaster: { ms: "Mix / Master", en: "Mix / Master" },
    } satisfies Record<CreditRole, Localized>,
  },
};

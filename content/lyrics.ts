/**
 * Song lyrics — one entry per song, newest first. Each gets a page at /lirik/<slug>/.
 * `slug` must match a release in content/music.ts (artwork and links come from there).
 * In `lyrics`, a blank line starts a new verse. Keep the official spelling as-is.
 */

export type CreditRole = "composer" | "lyricist" | "arranger" | "producer" | "mixMaster";

export type SongLyrics = {
  slug: string;
  title: string;
  credits: { role: CreditRole; names: string[] }[];
  lyrics: string;
};

export const LYRICS: SongLyrics[] = [
  {
    slug: "akhir",
    title: "Akhir",
    credits: [
      { role: "composer", names: ["Ejazul Azim"] },
      { role: "lyricist", names: ["Mono"] },
      { role: "arranger", names: ["Ejazul Azim", "PEDANG"] },
      { role: "producer", names: ["Ejazul Azim", "Moe Hussaini"] },
      { role: "mixMaster", names: ["Moe Hussaini"] },
    ],
    lyrics: `Dingin malamku bertemankan bulan
Dan Angin menghembus kesunyian ini
Kau tersenyum melempar keindahan
Menghapus rasa sepi dan sejuk tubuhku

Kita bermesra,senyum dan tertawa
Kau bawaku terbang ke dalam dirimu

Saat aku genggam oh tanganmu
Ku rasakan bagai ada sesuatu

Jangan pergi
Tinggal ku sendiri
Bertemankan malam yg sunyi dan sepi
Tuhan tolonglah
Temani dirinya
Hanya sampai disini cerita nya

Andai ku bisa memutarkan masa
Akan aku jaga seluruh hatiku

Izinkan ku memeluk dirimu
Untuk yang terakhir,selamanya

Jangan pergi
Tinggal ku sendiri
Bertemankan malam yg sunyi dan sepi
Tuhan tolonglah
Aku cinta dia
Sungguh aku tak mampu..
Tanpanya..

Dengarkanlah
Kalam terakhir ku..
Ku coret semua...untukmu
Ku mahu kau tahu
Kau cinta matiku
Nanti kan ku..disana

Ku rindu...
Aku rindu..
Sungguh aku...rindu
Padamu`,
  },
  {
    slug: "narsistik",
    title: "Narsistik",
    credits: [
      { role: "composer", names: ["Ejazul Azim"] },
      { role: "lyricist", names: ["Mono"] },
      { role: "arranger", names: ["Ejazul Azim", "Fairuz Rahman"] },
      { role: "producer", names: ["Estrid"] },
      { role: "mixMaster", names: ["Moe Hussaini"] },
    ],
    lyrics: `Kau dan Ku..
Tidak kita dicipta ‘tuk Bersama
Mengharungi kisah dan perjalanan
Pahit getir suka dan semua impian
Membina harapan yang setinggi cita
Meraih kasih yang takkan mungkin tiba

Lepaskan aku
Dari segala belenggu mainanmu
Cukup sudah aku merasakan seksa
Bukan lagi cerita tapi derita

Cukup sudah aku
Menyemai cinta yang kau beri padaku
Segala rasa yang kau curahkan dulu
Memang tidak ku nafikan oh cintanya
Namun semua tak seperti kau duga
Hati ku kini sudah beralih arah

Lepaskan aku
Dari segala belenggu mainanmu
Cukup sudah aku merasakan seksa
Bukan lagi cerita tapi derita

Ku bukan boneka mainanmu
kau hancurkan segalanya percayaku
ternyata kau narsistik

Dengarkan aku
Risalah cintaku
Andai waktu
Memungkinkan segalanya

Lepaskan aku
Dari segala belenggu mainanmu
Cukup sudah aku merasakan seksa
Bukan lagi cerita tapi derita

Cukup-cukuplah (cukuplah)
Cukup sampai disini cerita kita (oh cerita)
Tak perlu lagi kau mendustainya
Lelah ku penat dengan semuanya`,
  },
];

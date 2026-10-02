import type { Localized } from "@/lib/i18n";
import { asset } from "@/lib/utils";

/** Band story — one entry per paragraph */
export const STORY: Localized[] = [
  {
    ms: "Estrid lahir dari keberanian untuk melawan kebiasaan—menyambar perhatian melalui pentas-pentas ganjil, termasuk sebuah toilet gig yang kemudian menjadi legenda. Dari situ, mereka menjelma sebagai nadi tetap scene muzik tempatan, menggegarkan malam demi malam melalui gig mingguan yang digerakkan oleh kolektif indie.",
    en: "Estrid was born from the nerve to break convention—grabbing attention on unlikely stages, including a toilet gig that went on to become legend. From there they became a steady pulse of the local music scene, shaking night after night at weekly gigs run by indie collectives.",
  },
  {
    ms: "Single sulung mereka, “Narsistik,” membuka pintu kepada era baharu yang lebih liar, lebih jujur—dan ini baru permulaannya. Didorong oleh api semangat, tujuan yang jelas, dan bisikan mitologi Norse, Estrid bukan sekadar memainkan muzik. Mereka membina perjalanan cerita dan garapan emosi dalam setiap lagu.",
    en: "Their debut single, “Narsistik,” opened the door to a wilder, more honest era—and this is only the beginning. Driven by fire, clear purpose and whispers of Norse mythology, Estrid don’t just play music. They build a journey of story and emotion into every song.",
  },
  {
    ms: "Berpangkalan di Kuala Lumpur, Estrid ialah kumpulan alternative rock yang menyalurkan tenaga dan emosi ‘rare’ ke setiap pentas yang mereka pijak. Muzik mereka menghentam dengan grit melodik, sarat dengan luka, amarah, dan keindahan.",
    en: "Based in Kuala Lumpur, Estrid is an alternative rock band channelling raw energy and emotion into every stage they step on. Their music hits with melodic grit—heavy with wounds, rage and beauty.",
  },
];

export const BAND_PHOTO = asset("/images/estrid-img-1.jpg");

export const STATS: { label: Localized; value: string }[] = [
  { label: { ms: "Jumlah Lagu", en: "Songs" }, value: "3" },
  { label: { ms: "Ahli Band", en: "Members" }, value: "6" },
  { label: { ms: "Gig", en: "Gigs" }, value: "12" },
  { label: { ms: "Penggemar Setia", en: "Loyal Fans" }, value: "10K+" },
];

/** Photos live in public/images/Bandmates/. Leave `image` out to show a placeholder icon. */
export const MEMBERS: { name: string; role: Localized; image?: string }[] = [
  { name: "MONO", role: { ms: "Vokalis", en: "Vocals" }, image: asset("/images/Bandmates/Vocalist.jpg") },
  { name: "AGYM", role: { ms: "Gitar", en: "Guitar" }, image: asset("/images/Bandmates/Guitar%201.jpg") },
  { name: "DARON", role: { ms: "Gitar", en: "Guitar" }, image: asset("/images/Bandmates/Guitar%202.jpg") },
  { name: "NAZ", role: { ms: "Bass", en: "Bass" }, image: asset("/images/Bandmates/Bass.jpg") },
  { name: "BEN", role: { ms: "Dram", en: "Drums" }, image: asset("/images/Bandmates/Drummer.jpg") },
  { name: "PEDANG", role: { ms: "Keyboard", en: "Keys" }, image: asset("/images/Bandmates/Keys.jpg") },
];

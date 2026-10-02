import { asset } from "@/lib/utils";

/** Band story — one string per paragraph */
export const STORY = [
  "Estrid lahir dari keberanian untuk melawan kebiasaan—menyambar perhatian melalui pentas-pentas ganjil, termasuk sebuah toilet gig yang kemudian menjadi legenda. Dari situ, mereka menjelma sebagai nadi tetap scene muzik tempatan, menggegarkan malam demi malam melalui gig mingguan yang digerakkan oleh kolektif indie.",
  "Single sulung mereka, “Narsistik,” membuka pintu kepada era baharu yang lebih liar, lebih jujur—dan ini baru permulaannya. Didorong oleh api semangat, tujuan yang jelas, dan bisikan mitologi Norse, Estrid bukan sekadar memainkan muzik. Mereka membina perjalanan cerita dan garapan emosi dalam setiap lagu.",
  "Berpangkalan di Kuala Lumpur, Estrid ialah kumpulan alternative rock yang menyalurkan tenaga dan emosi ‘rare’ ke setiap pentas yang mereka pijak. Muzik mereka menghentam dengan grit melodik, sarat dengan luka, amarah, dan keindahan.",
];

export const BAND_PHOTO = asset("/images/estrid-img-1.jpg");

export const STATS = [
  { label: "Jumlah Lagu", value: "3" },
  { label: "Ahli Band", value: "6" },
  { label: "Gig", value: "12" },
  { label: "Penggemar Setia", value: "10K+" },
];

/** Photos live in public/images/Bandmates/. Leave `image` out to show a placeholder icon. */
export const MEMBERS: { name: string; role: string; image?: string }[] = [
  { name: "MONO", role: "Vokalis", image: asset("/images/Bandmates/Vocalist.jpg") },
  { name: "AGYM", role: "Gitar", image: asset("/images/Bandmates/Guitar%201.jpg") },
  { name: "DARON", role: "Gitar", image: asset("/images/Bandmates/Guitar%202.jpg") },
  { name: "NAZ", role: "Bass", image: asset("/images/Bandmates/Bass.jpg") },
  { name: "BEN", role: "Dram", image: asset("/images/Bandmates/Drummer.jpg") },
  { name: "PEDANG", role: "Keyboard", image: asset("/images/Bandmates/Keys.jpg") },
];

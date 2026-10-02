import { asset } from "@/lib/utils";

/** Photos live in public/images/Galeri/. `tall` → portrait 3:4, otherwise square. */
export const PHOTOS = [
  { src: asset("/images/Galeri/image1.jpg"), alt: "Estrid Gig 1", tall: true },
  { src: asset("/images/Galeri/image2.jpg"), alt: "Estrid Gig 2", tall: false },
  { src: asset("/images/Galeri/image3.jpg"), alt: "Estrid Gig 3", tall: false },
  { src: asset("/images/Galeri/image4.jpg"), alt: "Estrid Gig 4", tall: true },
  { src: asset("/images/Galeri/image5.jpg"), alt: "Estrid Gig 5", tall: false },
  { src: asset("/images/Galeri/image6.jpg"), alt: "Estrid Gig 6", tall: false },
];

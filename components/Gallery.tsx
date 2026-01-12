"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070",
    alt: "Live performance",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070",
    alt: "Band on stage",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070",
    alt: "Concert crowd",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070",
    alt: "Backstage",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070",
    alt: "Recording session",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070",
    alt: "Band portrait",
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-montserrat)] mb-4">
            Photo <span className="text-accent">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Moments captured from our journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(photo.id)}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={photos.find((p) => p.id === selectedImage)?.url}
            alt={photos.find((p) => p.id === selectedImage)?.alt}
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>
      )}
    </section>
  );
}


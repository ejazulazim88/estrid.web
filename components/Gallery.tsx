"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { id: 1, url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800", alt: "Persembahan Langsung", tall: true },
  { id: 2, url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800", alt: "Band Di Pentas", tall: false },
  { id: 3, url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800", alt: "Kerumunan Konsert", tall: false },
  { id: 4, url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800", alt: "Belakang Pentas", tall: true },
  { id: 5, url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800", alt: "Sesi Rakaman", tall: false },
  { id: 6, url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800", alt: "Potret Band", tall: false },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const prev = useCallback(() => {
    setSelectedIndex(i => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, []);

  const next = useCallback(() => {
    setSelectedIndex(i => (i === null ? null : (i + 1) % photos.length));
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">Kenangan Kami</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest font-[family-name:var(--font-montserrat)] mb-4">
            Galeri <span className="text-accent">Foto</span>
          </h2>
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Detik-detik yang diabadikan sepanjang perjalanan kami
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid ${photo.tall ? "aspect-[3/4]" : "aspect-square"}`}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold uppercase tracking-widest text-sm">Lihat</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10"
              onClick={() => setSelectedIndex(null)}
              aria-label="Tutup"
            >
              <X size={32} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={photos[selectedIndex].url}
              alt={photos[selectedIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Seterusnya"
            >
              <ChevronRight size={40} />
            </button>

            {/* Counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm uppercase tracking-widest">
              {selectedIndex + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

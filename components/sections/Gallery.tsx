"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CornerBrackets from "@/components/ui/CornerBrackets";
import { PHOTOS } from "@/content/gallery";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const prev = useCallback(() => {
    setSelectedIndex(i => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length));
  }, []);

  const next = useCallback(() => {
    setSelectedIndex(i => (i === null ? null : (i + 1) % PHOTOS.length));
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-black/10 overflow-hidden" ref={ref}>
      <SectionHeader
        number="04"
        eyebrow="Kenangan Kami"
        title="Galeri"
        accent="Foto"
        inView={isInView}
        className="container mx-auto px-4"
      />

      {/* Masonry Grid */}
      <div className="container mx-auto px-4">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={cn(
                "group relative overflow-hidden cursor-pointer break-inside-avoid",
                photo.tall ? "aspect-[3/4]" : "aspect-square"
              )}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              {/* Red border on hover */}
              <div className="absolute inset-0 outline outline-1 outline-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Index number */}
              <span className="absolute top-3 right-3 text-xs text-white/40 font-mono select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              {/* Alt label on hover */}
              <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.25em] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-display">
                {photo.alt}
              </span>
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-6"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-8 text-white/50 hover:text-accent transition-colors z-10 text-3xl font-light leading-none"
              onClick={() => setSelectedIndex(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            {/* Prev */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-accent transition-colors z-10 text-2xl font-light px-3 py-2 border border-white/10 hover:border-accent"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Sebelumnya"
            >
              ←
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CornerBrackets />
              <img
                src={PHOTOS[selectedIndex].src}
                alt={PHOTOS[selectedIndex].alt}
                className="max-w-full max-h-[78vh] w-full object-contain"
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-accent transition-colors z-10 text-2xl font-light px-3 py-2 border border-white/10 hover:border-accent"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Seterusnya"
            >
              →
            </button>

            {/* Counter */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-accent text-xs uppercase tracking-[0.3em] font-mono">
              {selectedIndex + 1} — {PHOTOS.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

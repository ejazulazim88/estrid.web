"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const newsItems = [
  {
    id: 1,
    title: "Single Sulung 'Narsistik' Kini Tersedia!",
    date: "15 Januari 2025",
    excerpt: "Single pertama kami akhirnya hadir. Dengar 'Narsistik' sekarang di semua platform muzik utama dan rasai tenaga mentah Estrid yang tidak berkompromi.",
    image: `${basePath}/images/estrid-2026.png`,
    featured: true,
  },
  {
    id: 2,
    title: "Tarikh Persembahan 2026 Diumumkan",
    date: "1 Mac 2026",
    excerpt: "Kami akan muncul di pentas baru. Semak tarikh persembahan dan dapatkan tiket anda sebelum kehabisan.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800",
    featured: false,
  },
  {
    id: 3,
    title: "Di Sebalik Tabir: Proses Rakaman Estrid",
    date: "20 Februari 2026",
    excerpt: "Ikuti perjalanan rakaman eksklusif kami. Rakaman video dan temu bual akan datang tidak lama lagi.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800",
    featured: false,
  },
];

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featured = newsItems[0];
  const rest = newsItems.slice(1);

  return (
    <section
      id="berita"
      className="py-24 md:py-32 bg-black/80 backdrop-blur-md border-y border-white/[0.06] grain relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-end gap-6"
          >
            <span
              className="text-[7rem] md:text-[10rem] font-black leading-none select-none font-[family-name:var(--font-montserrat)]"
              style={{ color: "hsl(0 72.2% 50.6% / 0.12)" }}
            >
              05
            </span>
            <div className="pb-4">
              <p className="text-accent uppercase tracking-[0.35em] text-xs font-semibold mb-1">Terkini</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest font-[family-name:var(--font-montserrat)] leading-none">
                Berita <span className="text-accent">Kami</span>
              </h2>
            </div>
            <div className="flex-1 h-px bg-white/10 mb-6 hidden md:block" />
          </motion.div>
        </div>

        {/* Featured Story */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-16"
        >
          {/* Full-width image with corner brackets */}
          <div className="relative group mb-8">
            <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent z-10" />
            <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-accent z-10" />
            <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-accent z-10" />
            <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent z-10" />
            <div className="relative aspect-video overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Featured content */}
          <div className="max-w-3xl">
            <time className="block text-accent/60 text-xs uppercase tracking-[0.3em] mb-4 font-mono">
              {featured.date}
            </time>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-[family-name:var(--font-montserrat)] mb-5 hover:text-accent transition-colors cursor-default leading-tight">
              {featured.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl mb-6">
              {featured.excerpt}
            </p>
            <a
              href="https://musicaddicts.my/estrid-meledak-lembaran-baharu-muzik-rock-alternatif-tempatan-dengan-narsistik/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-xs uppercase tracking-[0.3em] font-semibold hover:text-white transition-colors"
            >
              Baca Selanjutnya ↗
            </a>
          </div>
        </motion.article>

        {/* Divider with label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center gap-6 mb-8"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-[family-name:var(--font-montserrat)] shrink-0">
            Berita Lain
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </motion.div>

        {/* Secondary Stories — table/list layout */}
        <div>
          {rest.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
            >
              <a
                href="#"
                className="group border-b border-white/10 py-5 flex gap-6 items-start hover:bg-white/[0.02] transition-colors px-2 block"
              >
                {/* Date */}
                <time className="text-accent/40 text-xs font-mono w-28 shrink-0 mt-1 uppercase tracking-wider">
                  {item.date}
                </time>
                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold uppercase tracking-wider text-sm font-[family-name:var(--font-montserrat)] group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
                {/* Arrow — invisible until hover */}
                <span className="text-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
                  ↗
                </span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

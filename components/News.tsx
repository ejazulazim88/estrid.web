"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Single Sulung 'Narsistik' Kini Tersedia!",
    date: "15 Januari 2025",
    excerpt: "Single pertama kami akhirnya hadir. Dengar 'Narsistik' sekarang di semua platform muzik utama dan rasai tenaga mentah Estrid yang tidak berkompromi.",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1200",
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
    <section id="berita" className="py-24 md:py-32 bg-card grain relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">Terkini</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest font-[family-name:var(--font-montserrat)] mb-4">
            Berita <span className="text-accent">Kami</span>
          </h2>
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ikuti perkembangan terkini daripada Estrid
          </p>
        </motion.div>

        {/* Featured Card */}
        <motion.article
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="group mb-8 bg-background rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 md:grid md:grid-cols-2"
        >
          <div className="relative aspect-video md:aspect-auto overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-sm text-accent mb-4">
              <Calendar className="w-4 h-4" />
              <time className="uppercase tracking-wider">{featured.date}</time>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)] mb-4 group-hover:text-accent transition-colors">
              {featured.title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{featured.excerpt}</p>
            <a href="#" className="inline-flex items-center gap-2 text-accent font-semibold uppercase tracking-wider text-sm hover:gap-4 transition-all duration-300">
              <span>Baca Selanjutnya</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.article>

        {/* Regular Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              className="group bg-background rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-accent mb-3">
                  <Calendar className="w-4 h-4" />
                  <time className="uppercase tracking-wider text-xs">{item.date}</time>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)] mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{item.excerpt}</p>
                <a href="#" className="inline-flex items-center gap-2 text-accent font-semibold uppercase tracking-wider text-xs hover:gap-4 transition-all duration-300">
                  <span>Baca Selanjutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

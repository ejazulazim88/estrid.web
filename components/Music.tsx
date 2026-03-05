"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Music2, ExternalLink, Youtube, Disc3 } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const platforms = [
  { name: "Spotify", icon: Disc3, url: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu?si=jw60k9sgTRiXx6xRIoKkfQ" },
  { name: "Apple Music", icon: Music2, url: "https://music.apple.com/my/artist/estrid/1831023443" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@EstridBand" },
];

const comingSoon = [
  { title: "Misery", year: "Akan Datang", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800" },
  { title: "Akhir", year: "Akan Datang", cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=800" },
];

export default function Music() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="music" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">Dengar Kami</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest font-[family-name:var(--font-montserrat)] mb-4">
            Muzik <span className="text-accent">Kami</span>
          </h2>
          <div className="w-24 h-0.5 bg-accent mx-auto" />
        </motion.div>

        {/* Featured Release — Narsistik */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-20"
        >
          <p className="text-center text-accent uppercase tracking-[0.3em] text-xs font-semibold mb-8">Keluaran Terkini</p>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center bg-card rounded-2xl border border-border overflow-hidden group hover:border-accent transition-all duration-500">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={`${basePath}/images/narsistik artwork.png`}
                alt="Narsistik"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50" />
            </div>
            <div className="p-8 md:p-10 space-y-6">
              <div>
                <p className="text-muted-foreground uppercase tracking-widest text-xs mb-2">Single — 2025</p>
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)] text-foreground">
                  Narsistik
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Single sulung Estrid — mentah, jujur, dan tidak berkompromi. Tersedia di semua platform muzik.
              </p>
              <button
                onClick={() => window.open('https://open.spotify.com/track/10qy02MuJQsxXM4sAOwo1A?si=IN1YtW6VR9iOHJH7moYTcQ', '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-semibold uppercase tracking-widest text-sm rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5" />
                <span>Dengar di Spotify</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <p className="text-center text-muted-foreground uppercase tracking-[0.3em] text-xs font-semibold mb-8">Akan Datang</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {comingSoon.map((album, index) => (
              <motion.div
                key={album.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                whileHover={{ y: -4 }}
                className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)]">{album.title}</h3>
                      <p className="text-accent text-xs uppercase tracking-widest">{album.year}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Music Video */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <p className="text-center text-accent uppercase tracking-[0.3em] text-xs font-semibold mb-4">Video Muzik Rasmi</p>
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)] text-center mb-8">
            Narsistik
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full rounded-xl overflow-hidden glow-red" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/Pw14pde3heQ"
                title="Narsistik - Video Muzik Rasmi"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>

        {/* Streaming Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-xs font-semibold mb-6">Tersedia Di</p>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-full hover:border-accent hover:bg-accent/10 transition-all duration-300 group uppercase tracking-wider text-sm font-semibold"
              >
                <platform.icon className="w-5 h-5 text-accent" />
                <span>{platform.name}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CornerBrackets from "@/components/ui/CornerBrackets";
import LabelDivider from "@/components/ui/LabelDivider";
import { FEATURED_RELEASE, MUSIC_VIDEO, PLATFORMS } from "@/content/music";

export default function Music() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [titleStart, titleEnd] = FEATURED_RELEASE.title;

  return (
    <section id="music" className="py-24 md:py-32 bg-black/10 overflow-hidden" ref={ref}>
      <SectionHeader
        number="02"
        eyebrow="Dengar Kami"
        title="Muzik"
        accent="Kami"
        inView={isInView}
        className="container mx-auto px-4"
      />

      {/* ── Featured Release ── */}
      <div className="container mx-auto px-4 mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-accent/50 uppercase tracking-[0.4em] text-[10px] font-semibold mb-4"
        >
          — Keluaran Terkini
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 overflow-hidden border border-white/10 hover:border-accent/40 transition-colors duration-700 group"
        >
          {/* Artwork — sharp, no rounding */}
          <div className="relative aspect-square md:aspect-auto overflow-hidden">
            <img
              src={FEATURED_RELEASE.artwork}
              alt={titleStart + titleEnd}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            {/* Red edge bleed */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 hidden md:block" />

            {/* Floating label on artwork */}
            <div className="absolute top-4 left-4 border border-white/20 px-3 py-1 backdrop-blur-sm bg-black/40">
              <p className="text-white/70 uppercase tracking-[0.25em] text-[9px] font-semibold">{FEATURED_RELEASE.label}</p>
            </div>
          </div>

          {/* Content panel */}
          <div className="bg-black/60 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-between gap-8 border-l border-white/[0.06]">
            <div>
              {/* Oversized title */}
              <h3
                className="font-black uppercase font-display leading-[0.9] mb-6"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
              >
                {titleStart}
                <span className="text-accent">{titleEnd}</span>
              </h3>
              <p className="text-white/50 leading-relaxed text-sm max-w-sm">
                {FEATURED_RELEASE.description}
              </p>
            </div>

            {/* Spotify embed */}
            <div>
              <p className="text-white/30 uppercase tracking-[0.3em] text-[9px] mb-3">Dengar sekarang</p>
              <iframe
                style={{ borderRadius: '8px', display: 'block' }}
                src={FEATURED_RELEASE.spotifyEmbed}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div className="container mx-auto px-4 mb-16">
        <LabelDivider
          label="Video Muzik Rasmi"
          className="origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>

      {/* ── Music Video ── */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest font-display mb-6 flex items-center gap-4">
            <span className="text-accent/40 text-sm font-normal tracking-widest">MV</span>
            {MUSIC_VIDEO.title}
          </h3>

          <div className="relative">
            <CornerBrackets />

            {/* 16:9 responsive embed */}
            <div
              className="relative w-full overflow-hidden border border-white/10"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${MUSIC_VIDEO.youtubeId}`}
                title={`${MUSIC_VIDEO.title} - Video Muzik Rasmi`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Platforms strip ── */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-white/10 pt-10"
        >
          <p className="text-white/30 uppercase tracking-[0.4em] text-[9px] font-semibold mb-6">Tersedia Di</p>
          <div className="flex flex-wrap items-center gap-0">
            {PLATFORMS.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 pr-8 mr-8 border-r border-white/10 last:border-r-0 last:mr-0 last:pr-0 text-white/50 hover:text-accent transition-colors duration-300 group"
              >
                <platform.icon className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-widest text-xs font-semibold font-display">
                  {platform.name}
                </span>
                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity text-xs ml-1">↗</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}

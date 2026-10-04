"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CornerBrackets from "@/components/ui/CornerBrackets";
import LabelDivider from "@/components/ui/LabelDivider";
import { FEATURED_RELEASE, MUSIC_VIDEO, PAST_RELEASES, PLATFORMS } from "@/content/music";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { hasLyrics, lyricsPath } from "@/lib/songs";

export default function Music() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [titleStart, titleEnd] = FEATURED_RELEASE.title;

  return (
    <section id="music" className="py-24 md:py-32 bg-black/10 overflow-hidden" ref={ref}>
      <SectionHeader
        number="02"
        eyebrow={t(UI.music.header.eyebrow)}
        title={t(UI.music.header.title)}
        accent={t(UI.music.header.accent)}
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
          {t(UI.music.latestRelease)}
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
              loading="lazy"
              decoding="async"
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
                {t(FEATURED_RELEASE.description)}
              </p>
              {hasLyrics(FEATURED_RELEASE.slug) && (
                <a
                  href={lyricsPath(FEATURED_RELEASE.slug)}
                  className="inline-block mt-6 text-white/50 hover:text-accent uppercase tracking-widest text-xs font-semibold font-display transition-colors"
                >
                  {t(UI.lyrics.readLyrics)}
                </a>
              )}
            </div>

            {/* Spotify embed */}
            <div>
              <p className="text-white/30 uppercase tracking-[0.3em] text-[9px] mb-3">{t(UI.music.listenNow)}</p>
              <iframe
                style={{ borderRadius: '8px', display: 'block' }}
                src={FEATURED_RELEASE.spotifyEmbed}
                title={`${titleStart}${titleEnd} — Spotify`}
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
          label={t(UI.music.officialVideo)}
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
                title={`${MUSIC_VIDEO.title} - ${t(UI.music.officialVideo)}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Previous Releases ── */}
      {PAST_RELEASES.length > 0 && (
        <div className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <LabelDivider label={t(UI.music.previousReleases)} className="mb-6" />
            <div className="space-y-3">
              {PAST_RELEASES.map((release) => (
                <div
                  key={release.title}
                  className="group flex items-center gap-5 border border-white/10 hover:border-accent/40 bg-black/40 p-3 transition-colors duration-300"
                >
                  <img
                    src={release.artwork}
                    loading="lazy"
                    decoding="async"
                    alt={release.title}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-base md:text-lg font-black uppercase tracking-widest font-display leading-tight truncate">
                      {release.title}
                    </p>
                    <p className="text-white/40 uppercase tracking-[0.25em] text-[9px] font-semibold mt-1">
                      {release.label}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 shrink-0 pr-2">
                    {hasLyrics(release.slug) && (
                      <a
                        href={lyricsPath(release.slug)}
                        aria-label={`${t(UI.lyrics.lyrics)} ${release.title}`}
                        className="text-white/50 hover:text-accent uppercase tracking-widest text-xs font-semibold font-display transition-colors"
                      >
                        {t(UI.lyrics.lyrics)}
                      </a>
                    )}
                    <a
                      href={release.spotifyUrl}
                      aria-label={`${release.title} — Spotify`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-accent uppercase tracking-widest text-xs font-semibold font-display transition-colors"
                    >
                      Spotify <span aria-hidden="true">↗</span>
                    </a>
                    <a
                      href={release.youtubeUrl}
                      aria-label={`${release.title} — YouTube`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-accent uppercase tracking-widest text-xs font-semibold font-display transition-colors"
                    >
                      YouTube <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Platforms strip ── */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-white/10 pt-10"
        >
          <p className="text-white/30 uppercase tracking-[0.4em] text-[9px] font-semibold mb-6">{t(UI.music.availableOn)}</p>
          <div className="flex flex-wrap items-center gap-0">
            {PLATFORMS.map((platform) => (
              <a
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
                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity text-xs ml-1" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}

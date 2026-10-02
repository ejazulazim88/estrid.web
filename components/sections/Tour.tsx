"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import LabelDivider from "@/components/ui/LabelDivider";
import { SHOWS, type Show } from "@/content/shows";
import { scrollToId } from "@/lib/utils";

export default function Tour() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="tour"
      className="py-24 md:py-32 bg-black/80 backdrop-blur-md border-y border-white/[0.06] grain relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          number="03"
          eyebrow="Jumpa Kami"
          title="Tarikh"
          accent="Persembahan"
          inView={isInView}
          compact
        />

        {SHOWS.length === 0 ? (
          <EmptyState inView={isInView} />
        ) : (
          <div className="max-w-5xl mx-auto space-y-3 mb-16">
            {SHOWS.map((show, index) => (
              <ShowRow key={`${show.date}-${show.venue}`} show={show} index={index} inView={isInView} />
            ))}
          </div>
        )}

        <LabelDivider
          label="IKUTI BERITA TERKINI"
          className="mb-10 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex justify-center"
        >
          <a
            href="#contact"
            className="text-accent/60 uppercase tracking-[0.4em] text-xs hover:text-accent transition-colors duration-200 font-semibold"
            onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}
          >
            Sertai Senarai Mel Kami ↗
          </a>
        </motion.div>

      </div>
    </section>
  );
}

function ShowRow({ show, index, inView }: { show: Show; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
      className="group flex items-stretch border border-white/10 hover:border-accent/40 bg-black/40 transition-all duration-300"
    >
      {/* Red left edge bar */}
      <div className="w-1 bg-accent flex-shrink-0" />

      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-6 py-5">

        {/* Date — LEFT */}
        <div className="flex-shrink-0 md:w-56">
          <p
            className="text-3xl md:text-5xl font-black leading-none font-display text-accent"
          >
            {show.date}
          </p>
        </div>

        {/* Thin vertical rule — desktop only */}
        <div className="hidden md:block w-px self-stretch bg-white/[0.06]" />

        {/* Venue + City — CENTER */}
        <div className="flex-1 space-y-1">
          {show.title && (
            <p className="text-accent/60 uppercase tracking-[0.3em] text-[10px] font-semibold mb-0.5">
              {show.title}
            </p>
          )}
          <p className="text-lg font-bold uppercase tracking-wider font-display leading-tight">
            {show.venue}
          </p>
          <div className="flex items-center gap-2 text-white/50">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-sm uppercase tracking-wider">{show.city}</span>
          </div>
        </div>

        {/* Detail link — RIGHT */}
        <div className="flex items-center md:justify-end flex-shrink-0">
          {show.link ? (
            <a
              href={show.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-accent/60 px-5 py-2.5 text-accent uppercase tracking-widest text-xs font-black font-display hover:bg-accent hover:text-white transition-all duration-200"
            >
              Lihat Butiran ↗
            </a>
          ) : (
            <span className="border border-white/10 px-4 py-2 text-white/30 uppercase tracking-widest text-xs font-semibold font-display">
              Akan Datang
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col items-center justify-center py-24 gap-4"
    >
      <span className="text-[8rem] font-black leading-none select-none font-display text-accent/10">
        —
      </span>
      <p className="text-white/30 uppercase tracking-[0.4em] text-xs font-semibold">
        Tiada Persembahan Dijadualkan
      </p>
      <p className="text-white/20 uppercase tracking-[0.3em] text-[9px]">
        Nantikan Pengumuman Baharu
      </p>
    </motion.div>
  );
}

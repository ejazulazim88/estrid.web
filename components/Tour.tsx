"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

const tourDates = [
  {
    id: 1,
    date: "16 Mei 2026",
    title: "FOR FUN GIG 3.0",
    venue: "Sarang Suara Studio",
    city: "Seri Kembangan, Selangor",
    link: "https://www.instagram.com/p/DVFMqlFgef7/?igsh=dWxhNTBicjhnNjJn",
  },
  {
    id: 2,
    date: "12 September 2026",
    title: "",
    venue: "Garage Space Ampang Hilir",
    city: "Ampang, Selangor",
    link: null,
  },
];

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

        {/* ── Section Header ── */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-end gap-6"
          >
            <span
              className="text-[5rem] md:text-[10rem] font-black leading-none select-none font-[family-name:var(--font-montserrat)] shrink-0"
              style={{ color: 'hsl(0 72.2% 50.6% / 0.12)' }}
            >
              03
            </span>
            <div className="pb-4">
              <p className="text-accent uppercase tracking-[0.35em] text-xs font-semibold mb-1">
                Jumpa Kami
              </p>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-widest font-[family-name:var(--font-montserrat)] leading-tight">
                Tarikh <span className="text-accent">Persembahan</span>
              </h2>
            </div>
            <div className="flex-1 h-px bg-white/10 mb-6 hidden md:block" />
          </motion.div>
        </div>

        {/* ── Show Rows or Empty State ── */}
        {tourDates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <span
              className="text-[8rem] font-black leading-none select-none font-[family-name:var(--font-montserrat)]"
              style={{ color: 'hsl(0 72.2% 50.6% / 0.10)' }}
            >
              —
            </span>
            <p className="text-white/30 uppercase tracking-[0.4em] text-xs font-semibold">
              Tiada Persembahan Dijadualkan
            </p>
            <p className="text-white/20 uppercase tracking-[0.3em] text-[9px]">
              Nantikan Pengumuman Baharu
            </p>
          </motion.div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-3 mb-16">
            {tourDates.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
                className="group flex items-stretch border border-white/10 hover:border-accent/40 bg-black/40 transition-all duration-300"
              >
                {/* Red left edge bar */}
                <div className="w-1 bg-accent flex-shrink-0" />

                {/* Row content */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-6 py-5">

                  {/* Date — LEFT */}
                  <div className="flex-shrink-0 md:w-56">
                    <p
                      className="text-3xl md:text-5xl font-black leading-none font-[family-name:var(--font-montserrat)] transition-colors duration-300 group-hover:text-accent"
                      style={{ color: 'hsl(0 72.2% 50.6%)' }}
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
                    <p className="text-lg font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)] leading-tight">
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
                        className="flex items-center gap-2 border border-accent/60 px-5 py-2.5 text-accent uppercase tracking-widest text-xs font-black font-[family-name:var(--font-montserrat)] hover:bg-accent hover:text-white transition-all duration-200"
                      >
                        Lihat Butiran ↗
                      </a>
                    ) : (
                      <span className="border border-white/10 px-4 py-2 text-white/30 uppercase tracking-widest text-xs font-semibold font-[family-name:var(--font-montserrat)]">
                        Akan Datang
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Divider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-6 mb-10 max-w-5xl mx-auto"
        >
          <div className="w-8 h-px bg-accent" />
          <p className="text-white/30 uppercase tracking-[0.4em] text-[9px] font-semibold whitespace-nowrap">
            IKUTI BERITA TERKINI
          </p>
          <div className="flex-1 h-px bg-white/10" />
        </motion.div>

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
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Sertai Senarai Mel Kami ↗
          </a>
        </motion.div>

      </div>
    </section>
  );
}

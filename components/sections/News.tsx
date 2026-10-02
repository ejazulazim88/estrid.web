"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CornerBrackets from "@/components/ui/CornerBrackets";
import { NEWS } from "@/content/news";

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [featured, ...rest] = NEWS;

  return (
    <section
      id="berita"
      className="py-24 md:py-32 bg-black/80 backdrop-blur-md border-y border-white/[0.06] grain relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader number="05" eyebrow="Terkini" title="Berita" accent="Kami" inView={isInView} />

        {/* Featured Story */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-16"
        >
          <div className="relative group mb-8">
            <CornerBrackets />
            <div className="relative aspect-video overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          <div className="max-w-3xl">
            <time className="block text-accent/60 text-xs uppercase tracking-[0.3em] mb-4 font-mono">
              {featured.date}
            </time>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display mb-5 hover:text-accent transition-colors cursor-default leading-tight">
              {featured.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl mb-6">
              {featured.excerpt}
            </p>
            <a
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-xs uppercase tracking-[0.3em] font-semibold hover:text-white transition-colors"
            >
              Baca Selanjutnya ↗
            </a>
          </div>
        </motion.article>

        {/* Other stories — only rendered when there is more than the featured one */}
        {rest.length > 0 && (
          <>
            {/* Divider with label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center gap-6 mb-8"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-display shrink-0">
                Berita Lain
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </motion.div>

            {/* Secondary Stories — table/list layout */}
            <div>
              {rest.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-b border-white/10 py-5 flex gap-6 items-start hover:bg-white/[0.02] transition-colors px-2"
                  >
                    <time className="text-accent/40 text-xs font-mono w-28 shrink-0 mt-1 uppercase tracking-wider">
                      {item.date}
                    </time>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold uppercase tracking-wider text-sm font-display group-hover:text-accent transition-colors leading-snug">
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
          </>
        )}
      </div>
    </section>
  );
}

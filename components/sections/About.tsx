"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import CornerBrackets from "@/components/ui/CornerBrackets";
import LabelDivider from "@/components/ui/LabelDivider";
import { BAND_PHOTO, MEMBERS, STATS, STORY } from "@/content/about";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function About() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const membersRef = useRef(null);
  const membersInView = useInView(membersRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative pt-24 pb-32 overflow-hidden backdrop-blur-md bg-black/80 border-y border-white/[0.06] grain"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          number="01"
          eyebrow={t(UI.about.header.eyebrow)}
          title={t(UI.about.header.title)}
          accent={t(UI.about.header.accent)}
          inView={isInView}
        />

        {/* ── Story + Photo Block ── */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

          {/* Photo — LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative aspect-square">
              <CornerBrackets />

              <div className="w-full h-full overflow-hidden bg-black/60 backdrop-blur-sm border border-white/[0.08]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img
                  src={BAND_PHOTO}
                  loading="lazy"
                  decoding="async"
                  alt="ESTRID Band"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Bottom label tag */}
              <div className="absolute bottom-0 left-0 z-20 bg-accent px-3 py-1">
                <p className="text-white text-[9px] font-black uppercase tracking-[0.35em] font-display">
                  ESTRID — KL
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story — RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <LabelDivider label={t(UI.about.story)} className="mb-2" />
            {STORY.map((paragraph, i) => (
              <p key={i} className="text-white/60 leading-relaxed text-sm">
                {t(paragraph)}
              </p>
            ))}
          </motion.div>
        </div>

        {/* ── Stats Strip ── */}
        <div ref={statsRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.03] border-y border-white/[0.06] py-8 mb-24"
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label.ms}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={cn(
                    "flex flex-col items-center justify-center py-6 cursor-default group",
                    index < STATS.length - 1 && "border-r border-white/[0.06]",
                    index < 2 && "border-b border-white/[0.06] md:border-b-0"
                  )}
                >
                  <div
                    className="text-4xl md:text-5xl font-black leading-none font-display mb-2 text-accent"
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/30 uppercase tracking-[0.35em] text-[9px] font-semibold">
                    {t(stat.label)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Members Section ── */}
        <div ref={membersRef}>
          <LabelDivider
            label={t(UI.about.members)}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={membersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {MEMBERS.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={membersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative aspect-square overflow-hidden bg-black/60 border border-white/[0.08] group-hover:border-accent/60 transition-all duration-300">
                  <CornerBrackets variant="hover" />

                  {member.image ? (
                    <img
                      src={member.image}
                      loading="lazy"
                      decoding="async"
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                      <Users className="w-10 h-10 text-white/10" />
                    </div>
                  )}

                  {/* Bottom overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                  {/* Name + role overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
                    <p className="text-white text-xs font-black uppercase tracking-widest font-display leading-none mb-1">
                      {member.name}
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-accent">
                      {t(member.role)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import LabelDivider from "@/components/ui/LabelDivider";
import { SHOWS, type Show } from "@/content/shows";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { parseIsoDate } from "@/lib/dates";
import { orderShows } from "@/lib/shows";
import { cn, scrollToId } from "@/lib/utils";

export default function Tour() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // "Today" is only known in the browser — read it after mount
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  const { upcoming, past } = orderShows(SHOWS, today);
  const rows = [
    ...upcoming.map((show) => ({ show, isPast: false })),
    ...past.map((show) => ({ show, isPast: true })),
  ];

  return (
    <section
      id="tour"
      className="py-24 md:py-32 bg-black/80 backdrop-blur-md border-y border-white/[0.06] grain relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          number="03"
          eyebrow={t(UI.tour.header.eyebrow)}
          title={t(UI.tour.header.title)}
          accent={t(UI.tour.header.accent)}
          inView={isInView}
          compact
        />

        {rows.length === 0 ? (
          <EmptyState inView={isInView} />
        ) : (
          <div className="max-w-5xl mx-auto space-y-3 mb-16">
            {rows.map(({ show, isPast }, index) => (
              <ShowRow
                key={`${show.date}-${show.venue}`}
                show={show}
                isPast={isPast}
                index={index}
                inView={isInView}
              />
            ))}
          </div>
        )}

        <LabelDivider
          label={t(UI.tour.stayUpdated)}
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
            {t(UI.tour.mailingList)}
          </a>
        </motion.div>

      </div>
    </section>
  );
}

function ShowRow({ show, isPast, index, inView }: { show: Show; isPast: boolean; index: number; inView: boolean }) {
  const { t, formatMonthYear } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: isPast ? 0.6 : 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
      className={cn(
        "group flex items-stretch border border-white/10 bg-black/40 transition-all duration-300",
        !isPast && "hover:border-accent/40"
      )}
    >
      {/* Left edge bar — red for upcoming, muted for past */}
      <div className={cn("w-1 flex-shrink-0", isPast ? "bg-white/20" : "bg-accent")} />

      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-6 py-5">
        {isPast && <span className="sr-only">{t(UI.tour.pastShow)}</span>}

        {/* Date — LEFT */}
        <div className="flex-shrink-0 md:w-48">
          <time dateTime={show.date} className="block">
            <span
              className={cn(
                "block text-5xl md:text-6xl font-black leading-none font-display",
                isPast ? "text-white/60" : "text-accent"
              )}
            >
              {parseIsoDate(show.date).getDate()}
            </span>
            <span
              className={cn(
                "block mt-2 text-xs md:text-sm font-semibold uppercase tracking-[0.3em]",
                isPast ? "text-white/40" : "text-white/70"
              )}
            >
              {formatMonthYear(show.date)}
            </span>
          </time>
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

        {/* Detail link / status — RIGHT (upcoming shows only) */}
        {!isPast && (
          <div className="flex items-center md:justify-end flex-shrink-0">
            {show.link ? (
              <a
                href={show.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-accent/60 px-5 py-2.5 text-accent uppercase tracking-widest text-xs font-black font-display hover:bg-accent hover:text-white transition-all duration-200"
              >
                {t(UI.tour.viewDetails)}
              </a>
            ) : (
              <span className="border border-white/10 px-4 py-2 text-white/30 uppercase tracking-widest text-xs font-semibold font-display">
                {t(UI.tour.comingSoon)}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState({ inView }: { inView: boolean }) {
  const { t } = useLang();

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
        {t(UI.tour.emptyTitle)}
      </p>
      <p className="text-white/20 uppercase tracking-[0.3em] text-[9px]">
        {t(UI.tour.emptySubtitle)}
      </p>
    </motion.div>
  );
}

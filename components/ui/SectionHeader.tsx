"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Ghost number shown behind the title, e.g. "01" */
  number: string;
  /** Small red label above the title */
  eyebrow: string;
  title: string;
  /** Word appended to the title in accent red */
  accent: string;
  inView: boolean;
  /** Smaller mobile sizing for long titles */
  compact?: boolean;
  className?: string;
}

export default function SectionHeader({
  number,
  eyebrow,
  title,
  accent,
  inView,
  compact = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", className)}>
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="flex items-end gap-6"
      >
        <span
          className={cn(
            "md:text-[10rem] font-black leading-none select-none font-display text-accent/[0.12]",
            compact ? "text-[5rem] shrink-0" : "text-[7rem]"
          )}
        >
          {number}
        </span>
        <div className="pb-4">
          <p className="text-accent uppercase tracking-[0.35em] text-xs font-semibold mb-1">
            {eyebrow}
          </p>
          <h2
            className={cn(
              "font-black uppercase font-display md:text-6xl",
              compact
                ? "text-2xl tracking-wide md:tracking-widest leading-tight"
                : "text-4xl tracking-widest leading-none"
            )}
          >
            {title} <span className="text-accent">{accent}</span>
          </h2>
        </div>
        <div className="flex-1 h-px bg-white/10 mb-6 hidden md:block" />
      </motion.div>
    </div>
  );
}

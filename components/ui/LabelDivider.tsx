"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type LabelDividerProps = { label: string; className?: string } & Omit<HTMLMotionProps<"div">, "children">;

/** Short red bar + small label + hairline rule. Accepts motion props for entrance animation. */
export default function LabelDivider({ label, className, ...motionProps }: LabelDividerProps) {
  return (
    <motion.div className={cn("flex items-center gap-6", className)} {...motionProps}>
      <div className="w-8 h-px bg-accent" />
      <p className="text-white/30 uppercase tracking-[0.4em] text-[9px] font-semibold whitespace-nowrap">
        {label}
      </p>
      <div className="flex-1 h-px bg-white/10" />
    </motion.div>
  );
}

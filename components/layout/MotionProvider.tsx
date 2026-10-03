"use client";

import { MotionConfig } from "framer-motion";

/**
 * Follows the OS "Reduce Motion" setting for every framer-motion animation:
 * transforms (slides, scales, the Hero chevron bounce) are skipped, fades remain.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

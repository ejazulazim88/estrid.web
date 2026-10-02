"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import CornerBrackets from "@/components/ui/CornerBrackets";
import { NEW_RELEASE } from "@/content/music";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";

const OPEN_DELAY_MS = 1200;

/** New-release announcement — opens once per browser session */
export default function ReleaseModal() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const storageKey = `release-seen-${NEW_RELEASE.slug}`;
  const [titleStart, titleEnd] = NEW_RELEASE.title;

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      // storage unavailable — show the modal anyway
    }
    const timer = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        // ignore
      }
    }, OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [storageKey]);

  // Esc to close + move focus into the dialog
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="release-modal-title"
            className="relative w-full max-w-sm bg-black border border-white/10"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CornerBrackets />

            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label={t(UI.common.close)}
              className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center bg-black/60 border border-white/20 text-white/70 hover:text-accent hover:border-accent transition-colors"
            >
              <X size={18} />
            </button>

            <img
              src={NEW_RELEASE.artwork}
              alt={titleStart + titleEnd}
              className="w-full aspect-square object-cover"
            />

            <div className="p-6 text-center">
              <p className="text-accent uppercase tracking-[0.35em] text-xs font-semibold mb-2">
                {t(UI.releaseModal.eyebrow)}
              </p>
              <h2
                id="release-modal-title"
                className="text-5xl font-black uppercase font-display leading-none mb-2"
              >
                {titleStart}
                <span className="text-accent">{titleEnd}</span>
              </h2>
              <p className="text-white/40 uppercase tracking-[0.3em] text-[9px] font-semibold mb-6">
                {t(UI.releaseModal.subtitle)}
              </p>
              <a
                href={NEW_RELEASE.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center px-8 py-4 bg-accent text-white font-bold uppercase tracking-widest text-sm font-display hover:bg-accent/80 transition-colors"
              >
                {t(UI.releaseModal.watchMv)}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

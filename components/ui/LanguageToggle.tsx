"use client";

import { Fragment } from "react";
import { UI } from "@/content/ui";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "ms", label: "BM" },
  { value: "en", label: "EN" },
];

/** BM | EN switch — the active language is shown in accent red */
export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t(UI.nav.language)}
      className={cn("flex items-center gap-2 text-sm font-semibold tracking-widest font-display", className)}
    >
      {OPTIONS.map((option, i) => (
        <Fragment key={option.value}>
          {i > 0 && <span className="text-white/20">|</span>}
          <button
            type="button"
            aria-pressed={lang === option.value}
            onClick={() => setLang(option.value)}
            className={cn(
              "transition-colors duration-300",
              lang === option.value ? "text-accent" : "text-white/40 hover:text-white"
            )}
          >
            {option.label}
          </button>
        </Fragment>
      ))}
    </div>
  );
}

"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "ms" | "en";

/** A string in both site languages */
export type Localized = { ms: string; en: string };

const STORAGE_KEY = "estrid-lang";
const INTL_LOCALE: Record<Lang, string> = { ms: "ms-MY", en: "en-GB" };

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (value: Localized) => string;
  /** "2026-10-24" → "24 Oktober 2026" / "24 October 2026" */
  formatDate: (isoDate: string) => string;
  /** "2026-10-24" → "Oktober 2026" / "October 2026" */
  formatMonthYear: (isoDate: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

/** Parse "YYYY-MM-DD" as a local calendar date (not UTC midnight) */
export function parseIsoDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDateIn(isoDate: string, lang: Lang) {
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseIsoDate(isoDate));
}

/** "2026-10-24" → "Oktober 2026" / "October 2026" */
export function formatMonthYearIn(isoDate: string, lang: Lang) {
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], { month: "long", year: "numeric" }).format(parseIsoDate(isoDate));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Static HTML is always rendered in BM; a stored preference is applied after mount
  const [lang, setLangState] = useState<Lang>("ms");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "ms" || stored === "en") setLangState(stored);
    } catch {
      // storage unavailable (private mode) — stay on BM
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — choice just won't persist
    }
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t: (v) => v[lang],
      formatDate: (iso) => formatDateIn(iso, lang),
      formatMonthYear: (iso) => formatMonthYearIn(iso, lang),
    }),
    [lang, setLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

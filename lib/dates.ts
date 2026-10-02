import type { Lang } from "@/lib/i18n";

const INTL_LOCALE: Record<Lang, string> = { ms: "ms-MY", en: "en-GB" };

/** Parse "YYYY-MM-DD" as a local calendar date (not UTC midnight) */
export function parseIsoDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatIso(isoDate: string, lang: Lang, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], options).format(parseIsoDate(isoDate));
}

/** "2026-10-24" → "24 Oktober 2026" / "24 October 2026" */
export function formatDateIn(isoDate: string, lang: Lang) {
  return formatIso(isoDate, lang, { day: "numeric", month: "long", year: "numeric" });
}

/** "2026-10-24" → "Oktober 2026" / "October 2026" */
export function formatMonthYearIn(isoDate: string, lang: Lang) {
  return formatIso(isoDate, lang, { month: "long", year: "numeric" });
}

import type { Show } from "@/content/shows";
import { parseIsoDate } from "@/lib/i18n";

/** A show is past once its date is before today (a show today still counts as upcoming) */
export function isPast(show: Show, today: Date) {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return parseIsoDate(show.date) < startOfToday;
}

/**
 * Upcoming shows soonest-first, then past shows newest-first.
 * `today` is null before mount — everything is treated as upcoming so the
 * static HTML and first client render match.
 */
export function orderShows(shows: Show[], today: Date | null) {
  const byDate = (a: Show, b: Show) => a.date.localeCompare(b.date);
  const upcoming = shows.filter((s) => !today || !isPast(s, today)).sort(byDate);
  const past = today ? shows.filter((s) => isPast(s, today)).sort((a, b) => byDate(b, a)) : [];
  return { upcoming, past };
}

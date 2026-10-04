import { LYRICS, type SongLyrics } from "@/content/lyrics";
import { FEATURED_RELEASE, NEW_RELEASE, PAST_RELEASES } from "@/content/music";

/** Lyrics joined with their release (artwork, label, links) from content/music.ts */
export type Song = SongLyrics & {
  label: string;
  artwork: string;
  spotifyUrl: string;
  youtubeUrl: string;
  path: string;
};

const RELEASES = [
  {
    slug: FEATURED_RELEASE.slug,
    label: FEATURED_RELEASE.label,
    artwork: FEATURED_RELEASE.artwork,
    spotifyUrl: FEATURED_RELEASE.spotifyUrl,
    youtubeUrl: NEW_RELEASE.youtubeUrl,
  },
  ...PAST_RELEASES,
];

/** Page URL for a song's lyrics — trailing slash matches the canonical URL */
export const lyricsPath = (slug: string) => `/lirik/${slug}/`;

export const hasLyrics = (slug: string) => LYRICS.some((song) => song.slug === slug);

export const SONGS: Song[] = LYRICS.map((song) => {
  const release = RELEASES.find((r) => r.slug === song.slug);
  // Fails the build rather than shipping a lyrics page without artwork or links
  if (!release) throw new Error(`content/lyrics.ts: no release in content/music.ts with slug "${song.slug}"`);
  const { label, artwork, spotifyUrl, youtubeUrl } = release;
  return { ...song, label, artwork, spotifyUrl, youtubeUrl, path: lyricsPath(song.slug) };
});

export const getSong = (slug: string) => SONGS.find((song) => song.slug === slug);

/** Lyrics text → verses (split on blank lines) → lines */
export const toVerses = (lyrics: string) =>
  lyrics.split(/\n\s*\n/).map((verse) => verse.split("\n").map((line) => line.trimEnd()));

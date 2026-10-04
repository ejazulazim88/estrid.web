import { MEMBERS } from "@/content/about";
import type { CreditRole } from "@/content/lyrics";
import { FEATURED_RELEASE, NEW_RELEASE, PAST_RELEASES } from "@/content/music";
import { SHOWS } from "@/content/shows";
import { SITE, SOCIAL_LINKS } from "@/content/site";
import type { Song } from "@/lib/songs";

/**
 * schema.org JSON-LD for search engines, built from content/ so new shows,
 * releases and members show up without touching this file.
 */
const BAND_ID = `${SITE.url}/#band`;

export function buildJsonLd() {
  const image = `${SITE.url}${SITE.ogImage}`;

  const band = {
    "@type": "MusicGroup",
    "@id": BAND_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    genre: ["Rock", "Malaysian Rock"],
    image,
    logo: `${SITE.url}/images/estrid-logo.png`,
    email: SITE.email,
    foundingLocation: { "@type": "Place", name: SITE.location },
    sameAs: [...SOCIAL_LINKS.map((s) => s.href), SITE.linktree],
    member: MEMBERS.map((m) => ({ "@type": "Person", name: m.name })),
    track: [
      { "@type": "MusicRecording", name: FEATURED_RELEASE.title.join(""), url: NEW_RELEASE.youtubeUrl },
      ...PAST_RELEASES.map((r) => ({ "@type": "MusicRecording", name: r.title, url: r.youtubeUrl })),
    ],
  };

  const events = SHOWS.map((show) => ({
    "@type": "MusicEvent",
    name: show.title || `${SITE.name} @ ${show.venue}`,
    startDate: show.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: show.venue,
      address: { "@type": "PostalAddress", addressLocality: show.city, addressCountry: "MY" },
    },
    performer: { "@type": "MusicGroup", "@id": BAND_ID, name: SITE.name },
    image,
    ...(show.link && { url: show.link }),
  }));

  return { "@context": "https://schema.org", "@graph": [band, ...events] };
}

/** schema.org JSON-LD for one lyrics page: the song (with lyrics and writers) plus its breadcrumb */
export function buildSongJsonLd(song: Song) {
  const url = `${SITE.url}${song.path}`;
  const people = (role: CreditRole) =>
    song.credits
      .filter((c) => c.role === role)
      .flatMap((c) => c.names)
      .map((name) => ({ "@type": "Person", name }));

  const composition = {
    "@type": "MusicComposition",
    "@id": `${url}#song`,
    name: song.title,
    url,
    inLanguage: "ms",
    composer: people("composer"),
    lyricist: people("lyricist"),
    lyrics: { "@type": "CreativeWork", text: song.lyrics },
    recordedAs: {
      "@type": "MusicRecording",
      name: song.title,
      byArtist: { "@id": BAND_ID },
      image: `${SITE.url}${song.artwork}`,
      url: song.youtubeUrl,
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE.name, item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Lirik", item: `${SITE.url}/lirik/` },
      { "@type": "ListItem", position: 3, name: song.title, item: url },
    ],
  };

  return { "@context": "https://schema.org", "@graph": [composition, breadcrumb] };
}

import { MEMBERS } from "@/content/about";
import { FEATURED_RELEASE, NEW_RELEASE, PAST_RELEASES } from "@/content/music";
import { SHOWS } from "@/content/shows";
import { SITE, SOCIAL_LINKS } from "@/content/site";

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
    performer: { "@id": BAND_ID },
    image,
    ...(show.link && { url: show.link }),
  }));

  return { "@context": "https://schema.org", "@graph": [band, ...events] };
}

import { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { SONGS } from "@/lib/songs";

export const dynamic = "force-static";

/** Home plus the lyrics pages. #section URLs are ignored by search engines, so they aren't listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/lirik/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...SONGS.map((song) => ({
      url: `${SITE.url}${song.path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}

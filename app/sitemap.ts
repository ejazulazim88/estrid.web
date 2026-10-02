import { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

type Entry = Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">;

const SECTIONS: Record<string, Entry> = {
  about: { changeFrequency: "monthly", priority: 0.8 },
  music: { changeFrequency: "weekly", priority: 0.9 },
  tour: { changeFrequency: "weekly", priority: 0.9 },
  berita: { changeFrequency: "weekly", priority: 0.8 },
  contact: { changeFrequency: "monthly", priority: 0.6 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE.url, lastModified, changeFrequency: "weekly", priority: 1 },
    ...Object.entries(SECTIONS).map(([id, entry]) => ({
      url: `${SITE.url}/#${id}`,
      lastModified,
      ...entry,
    })),
  ];
}

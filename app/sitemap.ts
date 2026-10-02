import { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

/** One-page site: search engines ignore #section URLs, so only the root is listed */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE.url}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}

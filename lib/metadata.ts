import type { Metadata } from "next";
import { SITE } from "@/content/site";

/**
 * Metadata for a page other than home. Next merges metadata shallowly, so the
 * root's openGraph / twitter / canonical ("/") would leak in unless set in full here.
 */
export function pageMetadata({ title, description, path, image = SITE.ogImage, imageAlt }: {
  title: string;
  description: string;
  /** With trailing slash, e.g. "/lirik/akhir/" */
  path: string;
  image?: string;
  imageAlt: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  const images = [{ url: `${SITE.url}${image}`, alt: imageAlt }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      images,
      locale: "ms_MY",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

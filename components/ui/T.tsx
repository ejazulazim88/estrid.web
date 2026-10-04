"use client";

import { useLang, type Localized } from "@/lib/i18n";

/** Translated text for server components — static HTML gets BM, the toggle swaps it */
export default function T({ v }: { v: Localized }) {
  return <>{useLang().t(v)}</>;
}

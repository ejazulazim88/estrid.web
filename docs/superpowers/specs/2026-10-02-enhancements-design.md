# ESTRID Enhancements — Design

**Date:** 2026-10-02 · **Branch:** `feat/enhancements` · **Production:** Vercel (`estrid.my`), auto-deploys `main`

Five enhancements:
1. Bilingual BM / EN
2. WhatsApp buttons in Contact
3. "Akhir" new-release pop-up
4. Promote "Akhir" in Music
5. Show dates: past vs upcoming, and a new show

---

## 1. Bilingual BM / EN

**Decision:** a client-side toggle on a single URL. No locale routes and no i18n library.

### `lib/i18n.tsx` (new, about 60 lines)
- `type Lang = "ms" | "en"` and `type Localized = { ms: string; en: string }`
- `LanguageProvider` wraps the page in `app/page.tsx`. It holds `lang` state:
  - initial value is `"ms"`
  - after mount, it reads `localStorage["estrid-lang"]`
  - `setLang` writes to `localStorage` and sets `document.documentElement.lang`
- `useLang()` returns `{ lang, setLang, t }`, where `t(value: Localized) => string`.
- All `localStorage` access is wrapped in try/catch, because private mode can throw.

### Content
- Any translatable string in `content/*.ts` becomes `Localized`. TypeScript then fails the build if a language is missing.
- Proper nouns stay plain strings: venue, city, member names, song titles, and Malay-only names such as "ESTRID — KL".
- New file `content/ui.ts` holds the UI strings:
  - section headers (eyebrow/title/accent)
  - buttons and dividers
  - form labels and placeholders
  - form status messages
  - aria-labels
  - nav labels, which move from `NAV_SECTIONS.label` to `Localized`
- I draft the English translations. The user reviews them in the PR.

### Toggle UI
- A **BM | EN** text toggle: right of the desktop nav links, and at the bottom of the mobile menu.
- The active language shows in `text-accent`, the inactive one in `text-white/40` with hover. It uses `<button aria-pressed>`.

### Accepted trade-offs
- The static HTML is BM. An EN visitor sees BM for about a frame before the stored choice applies.
- SEO metadata, JSON-LD and OG stay BM.

---

## 2. WhatsApp buttons (Contact)

`SITE.whatsapp` holds the URLs exactly as given:
- contact: `https://wa.me/60127159784?text=Hi%2C%20I%20want%20to%20know%20more%20about%20ESTRID`
- merch: `https://wa.me/60173308974?text=Hi%2C%20I%20want%20to%20order%20ESTRID%20merch`

In the Contact info panel, above the info table, add two full-width buttons that open in a new tab:
- **WhatsApp Kami / WhatsApp Us**: filled `bg-accent`
- **Tempah Merch / Order Merch**: outline `border-accent/60`

Both use an inline WhatsApp SVG icon in `components/ui/WhatsAppIcon.tsx`, because Lucide has no brand icon. The contact form is unchanged.

---

## 3. "Akhir" pop-up modal

**Component:** `components/ui/ReleaseModal.tsx`, mounted once in `app/page.tsx`.

**Data:** `NEW_RELEASE` in `content/music.ts`:

```ts
{ slug: "akhir", title: "Akhir.", artwork: asset("/images/akhir-artwork.jpg"),
  youtubeUrl: "https://youtu.be/pLnVxlmiMF4" }
```

**Behaviour:**
- Opens 1.2s after mount.
- Skipped if `sessionStorage["release-seen-akhir"]` is set. That key is written when the modal opens.
- A new `slug` makes it show again automatically for the next release.

**Content:**
- artwork (square)
- eyebrow **LAGU BAHARU / NEW RELEASE**
- title **AKHIR.** (the dot in accent red)
- button **Tonton MV ↗ / Watch MV ↗**, which opens YouTube in a new tab and closes the modal

**Closing:** ✕ button, Esc, or a backdrop click. `role="dialog"`, `aria-modal`, and focus moves to ✕ on open.

**Styling:**
- matches the site: sharp edges, `CornerBrackets`, `bg-black/90` backdrop with blur
- framer-motion fade/scale, like the gallery lightbox
- `z-[60]`, above the nav (`z-50`)

**Asset:** the 3000×3000 PNG (6.3 MB) is converted with `sips` to `public/images/akhir-artwork.jpg` (1200×1200, about 200 KB). The source stays outside the repo.

---

## 4. Music section — Akhir featured, Narsistik moved to "Previous Releases"

**`FEATURED_RELEASE` changes to Akhir:**

| Field | Value |
|---|---|
| title | `["Akhir", "."]` (dot in red) |
| label | **"Single · 2026"** ⚠️ default, confirm |
| artwork | `akhir-artwork.jpg` |
| description | Localized; I draft it |
| spotifyEmbed | `https://open.spotify.com/embed/track/0DKpL2GNJ5gcWxRAP1guXO?utm_source=generator&theme=0` |

- Keep the compact 152px embed, because the artwork is already shown beside it.
- **`MUSIC_VIDEO`** becomes `{ title: "Akhir.", youtubeId: "pLnVxlmiMF4" }`.
- **New `PAST_RELEASES`:**
  - `[{ title: "Narsistik", label: "Single · 2025", artwork: "narsistik artwork.png", spotifyUrl: "https://open.spotify.com/track/10qy02MuJQsxXM4sAOwo1A", youtubeUrl: "https://youtu.be/Pw14pde3heQ" }]`
  - Rendered as a compact row under the MV, before the platforms strip.
  - Uses a `LabelDivider` "Keluaran Terdahulu / Previous Releases".
  - Each row: small artwork (80px), title, label, and Spotify ↗ / YouTube ↗ links.

**News** ⚠️ default, confirm: add a featured item "Single Baharu 'Akhir.' Kini Tersedia! / New Single 'Akhir.' Out Now!" that links to the MV and uses the Akhir artwork. The Narsistik item moves into "Berita Lain", which becomes visible again. Its date is release day, which the user must give or confirm.

---

## 5. Show dates — automatic past/upcoming, and a new show

`Show.date` becomes an ISO string (`"2026-10-24"`). The display date comes from `Intl.DateTimeFormat` (`ms-MY` gives "24 Oktober 2026", `en-GB` gives "24 October 2026"), so the dates are bilingual for free.

**Status is computed:** a show is past when its date is before today (local time).
- **Upcoming:**
  - current row styling
  - **Lihat Butiran ↗** when `link` is set, otherwise **Akan Datang**
  - sorted soonest first
- **Past:**
  - no button and no status label
  - row dimmed (`opacity-50`)
  - sorted below the upcoming shows, newest first

**Hydration:** "today" is read after mount (`useEffect`). Before that, all shows render as upcoming. The flicker is once and tiny, and it avoids a static-HTML/client mismatch.

**New show:**

```ts
{ date: "2026-10-24", title: "MUSE MADNESS 4.0", venue: "Sarang Suara Studio",
  city: "Seri Kembangan, Selangor",
  link: "https://www.instagram.com/p/Ddu1WD0upaZ/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" }
```

As of 2026-10-02, this gives 1 upcoming show (Muse Madness 4.0) and 2 past (12 Sep, 16 May).

---

## Testing

- `yarn build` passes. TypeScript enforces complete `Localized` pairs.
- Visual check: screenshots of every section in **BM and EN**, desktop and mobile. The screenshot harness pre-sets `sessionStorage` so the modal doesn't cover the shots.
- Playwright behaviour checks:
  - The modal opens on the first visit, stays closed after reload in the same session, and closes with Esc.
  - The language choice survives a reload, and `<html lang>` updates.
  - Shows: Muse Madness has a button, the past rows have no button or status, and the order is correct.
  - WhatsApp links have the exact hrefs.

## Out of scope

- Translating SEO metadata
- Locale routes
- A Vercel env var for Web3Forms (separate, done by the user in the Vercel dashboard)

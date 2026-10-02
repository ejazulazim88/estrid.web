# Content Guide

How to update the website content without touching the layout or design.

**Everything editable is in the `content/` folder.** You never need to open `components/` to change text, dates, links or photos.

Images go in `public/images/…` and are referenced as `"/images/…"`. File names with spaces should be written as `%20` (e.g. `Guitar%201.jpg`).

### Two languages (BM / EN)

Anything visitors read is written in both languages as `{ ms: "...", en: "..." }`. The build fails if one is missing. Names (venues, members, song titles) are plain strings. Buttons and headings live in `content/ui.ts`.

### Dates

Dates are written as `"YYYY-MM-DD"` (e.g. `"2026-10-24"`) and shown automatically as "24 Oktober 2026" / "24 October 2026".

---

## Show Dates — `content/shows.ts`

```ts
{
  date: "2026-10-24",                  // YYYY-MM-DD
  title: "MUSE MADNESS 4.0",           // Event name — "" to hide
  venue: "Sarang Suara Studio",
  city: "Seri Kembangan, Selangor",
  link: "https://...",                 // null → shows "Akan Datang"
},
```

- Upcoming show + `link` → **Lihat Butiran ↗** button; `link: null` → **Akan Datang**
- **Past shows are automatic**: once the date has passed, the button/status disappears, the row dims and moves to the bottom. You don't need to edit or delete them.
- Dates render poster-style: a big day number with the month and year below it.
- Past shows show no visible status, but carry a screen-reader-only "past show" label.
- Empty list (`[]`) → "Tiada Persembahan Dijadualkan"
- Every show is also published to Google as a `MusicEvent` (JSON-LD) automatically — same for releases and members.

---

## Gallery — `content/gallery.ts`

1. Drop new images into `public/images/Galeri/`
2. Add a line to `PHOTOS`:

```ts
{ src: "/images/Galeri/image7.jpg", alt: "Description", tall: false },
```

- `tall: true` → portrait (3:4)
- `tall: false` → square (1:1)

---

## News / Berita — `content/news.ts`

Newest first. The **first item** is the large featured story; any others appear in the "Berita Lain" list below it (that list is hidden when there's only one item).

⚠️ Keep **at least one** item — an empty `NEWS` list breaks the build.

```ts
{
  title: { ms: "...", en: "..." },
  date: "2026-09-26",                     // YYYY-MM-DD
  excerpt: { ms: "...", en: "..." },
  image: "/images/your-image.jpg",   // or a full https:// URL
  link: "https://...",                       // article the story links to
},
```

The featured image should be 16:9 landscape (e.g. 1280×720), as with `akhir-artwork-landscape.jpg` for "Akhir.".

---

## About — `content/about.ts`

- **Story:** `STORY` — one `{ ms, en }` per paragraph
- **Band photo:** `BAND_PHOTO`
- **Stats:** `STATS` — `{ label, value }`
- **Members:** `MEMBERS` — photos live in `public/images/Bandmates/`

```ts
{ name: "MONO", role: "Vokalis", image: "/images/Bandmates/Vocalist.jpg" },
```

Leave out `image` to show a placeholder icon.

---

## Music — `content/music.ts`

- **`FEATURED_RELEASE`** — the big card: title (two parts; the second is shown in red), label, artwork, `description` (BM/EN), and `spotifyEmbed` (Spotify → Share → Embed track → copy the `src` URL)
- **`MUSIC_VIDEO`** — `youtubeId` is the part after `youtu.be/` or `watch?v=`
- **`NEW_RELEASE`** — the pop-up shown once per visit. It reuses the featured release; change `slug` when a new song comes out so returning visitors see the pop-up again
- **`PAST_RELEASES`** — older singles shown as small rows (newest first). When a new single comes out, move the current featured one here
- **`PLATFORMS`** — streaming links in the "Tersedia Di" strip

Artwork tip: resize big exports before adding them, e.g.
`sips -s format jpeg -s formatOptions 82 -Z 1200 "artwork.png" --out public/images/name.jpg`

---

## Site Info & Social Links — `content/site.ts`

One place for things used across the site:

- `SITE` — name, URL, tagline, description (SEO), email, Linktree, location
- `SOCIAL_LINKS` — used by **both** the Contact section and the Footer
- `SITE.whatsapp` — the two WhatsApp buttons in Hubungi Kami (`contact`, `merch`). Format: `https://wa.me/60XXXXXXXXX?text=<url-encoded message>`
- `NAV_SECTIONS` — menu labels; also drives the footer links

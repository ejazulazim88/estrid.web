# Content Guide

How to update the website content without touching the layout or design.

**Everything editable is in the `content/` folder.** You never need to open `components/` to change text, dates, links or photos.

Images go in `public/images/…` and are referenced as `asset("/images/…")` so they work on GitHub Pages. File names with spaces must be written as `%20` (e.g. `Guitar%201.jpg`).

---

## Show Dates — `content/shows.ts`

```ts
export const SHOWS: Show[] = [
  {
    date: "16 Mei 2026",
    title: "FOR FUN GIG 3.0",          // Event name — "" to hide
    venue: "Sarang Suara Studio",
    city: "Seri Kembangan, Selangor",
    link: "https://...",               // null → shows "Akan Datang"
  },
];
```

- `link: "https://..."` → shows a **Lihat Butiran ↗** button
- `link: null` → shows **Akan Datang** (dim placeholder)
- Empty list (`[]`) → shows "Tiada Persembahan Dijadualkan"

---

## Gallery — `content/gallery.ts`

1. Drop new images into `public/images/Galeri/`
2. Add a line to `PHOTOS`:

```ts
{ src: asset("/images/Galeri/image7.jpg"), alt: "Description", tall: false },
```

- `tall: true` → portrait (3:4)
- `tall: false` → square (1:1)

---

## News / Berita — `content/news.ts`

Newest first. The **first item** is the large featured story; any others appear in the "Berita Lain" list below it (that list is hidden when there's only one item).

```ts
{
  title: "Single Sulung 'Narsistik' Kini Tersedia!",
  date: "16 Ogos 2025",
  excerpt: "Short description...",
  image: asset("/images/your-image.jpg"),   // or a full https:// URL
  link: "https://...",                       // article the story links to
},
```

---

## About — `content/about.ts`

- **Story:** `STORY` — one string per paragraph
- **Band photo:** `BAND_PHOTO`
- **Stats:** `STATS` — `{ label, value }`
- **Members:** `MEMBERS` — photos live in `public/images/Bandmates/`

```ts
{ name: "MONO", role: "Vokalis", image: asset("/images/Bandmates/Vocalist.jpg") },
```

Leave out `image` to show a placeholder icon.

---

## Music — `content/music.ts`

- **`FEATURED_RELEASE`** — title (two parts; the second is shown in red), label, artwork, description, and `spotifyEmbed` (Spotify → Share → Embed track → copy the `src` URL)
- **`MUSIC_VIDEO`** — `youtubeId` is the part after `watch?v=` in the YouTube URL
- **`PLATFORMS`** — streaming links in the "Tersedia Di" strip

---

## Site Info & Social Links — `content/site.ts`

One place for things used across the site:

- `SITE` — name, URL, tagline, description (SEO), email, Linktree, location
- `SOCIAL_LINKS` — used by **both** the Contact section and the Footer
- `NAV_SECTIONS` — menu labels; also drives the footer links

---

## Contact Form Email

Form submissions are sent via Web3Forms to the email registered at [web3forms.com](https://web3forms.com).

Local: put the key in `.env.local`:
```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key-here
```

Production (GitHub Pages): add it as a repository secret — **Settings → Secrets → Actions → `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`**. The deploy workflow passes it to the build.

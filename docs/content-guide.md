# Content Guide

How to update the website content without touching the layout or design.

---

## Tour Dates — `components/Tour.tsx`

Add or edit shows in the `tourDates` array at the top of the file:

```ts
const tourDates = [
  {
    id: 1,
    date: "16 Mei 2026",
    title: "FOR FUN GIG 3.0",          // Show name (optional — omit or set "" to hide)
    venue: "Sarang Suara Studio",
    city: "Seri Kembangan, Selangor",
    link: "https://...",               // Set to null if no link yet → shows "Akan Datang"
  },
];
```

- `link: "https://..."` → shows a **Lihat Butiran ↗** button
- `link: null` → shows **Akan Datang** (dim placeholder)

---

## Gallery — `components/Gallery.tsx`

Photos are loaded from `/public/images/Galeri/`. To update:

1. Drop new images into `public/images/Galeri/`
2. Update the `photos` array in `Gallery.tsx`:

```ts
{ id: 1, url: `${basePath}/images/Galeri/image1.jpg`, alt: "Description", tall: true },
```

- `tall: true` → renders as portrait (3:4 aspect ratio)
- `tall: false` → renders as square (1:1 aspect ratio)

---

## News / Berita — `components/News.tsx`

Update the `newsItems` array. The **first item** (`featured: true`) is displayed as the large hero article.

```ts
{
  id: 1,
  title: "Single Sulung 'Narsistik' Kini Tersedia!",
  date: "15 Januari 2025",
  excerpt: "Short description...",
  image: `${basePath}/images/your-image.jpg`,  // or external URL
  featured: true,
},
```

To link a story to an external article, update the `href` on the `<a>` tag inside the featured article block (line ~104) or on secondary story rows.

---

## Band Members — `components/About.tsx`

Members are defined in the `members` array:

```ts
{ name: "MONO", role: "Vokalis", image: `${basePath}/images/Bandmates/Vocalist.jpg` },
```

Photo files live in `public/images/Bandmates/`. To add/change a photo:
1. Place the image in `public/images/Bandmates/`
2. Update the `image` path in the array

---

## Music / Featured Release — `components/Music.tsx`

- **Artwork image:** update `src` on the `<img>` tag (~line 66)
- **Spotify embed:** update the `src` URL on the `<iframe>` (~line 101) — get embed URL from Spotify → Share → Embed
- **YouTube MV:** update the `src` URL on the `<iframe>` (~line 155) — use `youtube.com/embed/VIDEO_ID`
- **Platform links:** edit the `platforms` array at the top of the file

---

## Social Links

Two places to update when social links change:

1. **Contact section** — `components/Contact.tsx`, `socialLinks` array (top of file)
2. **Footer** — `components/Footer.tsx`, social links in the JSX (~line 60+)

---

## Stats — `components/About.tsx`

The four stats (Jumlah Lagu, Ahli Band, Gig, Penggemar Setia) are in the `stats` array:

```ts
const stats = [
  { icon: Music, label: "Jumlah Lagu", value: "3" },
  { icon: Users, label: "Ahli Band", value: "6" },
  ...
];
```

---

## Contact Form Email

Form submissions are sent via Web3Forms to the email registered at [web3forms.com](https://web3forms.com).

The access key is stored in `.env.local`:
```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-key-here
```

For production (GitHub Pages), add the key as a repository secret: **Settings → Secrets → Actions → `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`**.

# Architecture

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion v11 |
| Icons | Lucide React |
| WebGL | OGL (Plasma background) |
| Hosting | Vercel (static export, auto-deploys `main`) |

## Project Structure

```
estrid.web/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, JSON-LD (from lib/structuredData.ts)
│   ├── page.tsx            # Server component — mounts the background + all sections
│   ├── robots.ts           # robots.txt (static)
│   ├── sitemap.ts          # sitemap.xml (root URL only)
│   └── globals.css         # CSS variables, .grain / .bg-noise / .particle utilities
│
├── content/                # ← All editable site content lives here (see content-guide.md)
│   ├── ui.ts               # Buttons, headings, labels (BM/EN)
│   ├── site.ts             # Name, URL, tagline, contact info, NAV_SECTIONS, SOCIAL_LINKS
│   ├── about.ts            # Story, stats, band members
│   ├── music.ts            # Featured release, music video, streaming platforms
│   ├── shows.ts            # Show dates
│   ├── gallery.ts          # Gallery photos
│   └── news.ts             # News items
│
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx  # Sticky nav (desktop links from 1024px / lg; hamburger menu below)
│   │   └── Footer.tsx      # Brand, section links, social icons
│   ├── sections/           # One file per page section, in page order
│   │   ├── Hero.tsx        # #home
│   │   ├── About.tsx       # #about
│   │   ├── Music.tsx       # #music
│   │   ├── Tour.tsx        # #tour
│   │   ├── Gallery.tsx     # #gallery
│   │   ├── News.tsx        # #berita  ← note: not #news
│   │   └── Contact.tsx     # #contact
│   ├── ui/                 # Small shared building blocks
│   │   ├── SectionHeader.tsx   # Ghost number + eyebrow + title (01–06)
│   │   ├── CornerBrackets.tsx  # Red corner brackets: "frame" or "hover" variant
│   │   ├── LabelDivider.tsx    # Red bar + small label + hairline rule
│   │   ├── LanguageToggle.tsx  # BM | EN switch
│   │   ├── ReleaseModal.tsx    # New-release pop-up (once per session)
│   │   ├── WhatsAppIcon.tsx    # Brand icon (Lucide has none)
│   │   └── MagneticButton.tsx  # Cursor-following CTA link (Hero)
│   └── background/
│       ├── Plasma.tsx          # WebGL animated background (OGL)
│       └── PlasmaBackground.tsx # Client-only fixed wrapper used by page.tsx
│
├── lib/
│   ├── dates.ts            # Pure date parsing/formatting (ms-MY / en-GB)
│   ├── i18n.tsx            # LanguageProvider, useLang(), Localized, date formatting
│   ├── shows.ts            # Past/upcoming ordering
│   ├── structuredData.ts   # JSON-LD (band, members, tracks, shows) built from content/
│   └── utils.ts            # cn(), scrollToId()
│
├── public/images/          # Logo, photos, Bandmates/, Galeri/
├── next.config.ts          # Static export, image config
└── tailwind.config.ts      # Theme tokens (accent, font-display, …)
```

**Rule of thumb:** text, links and image paths go in `content/`; markup and styling stay in `components/`.

## Page Architecture

`app/page.tsx` renders a fixed WebGL background (z-index 0) behind a scrollable `<main>` (z-index 10) containing all sections in order:

```
PlasmaBackground (fixed, z-0, pointer-events-none)
└── main (z-10)
    ├── Navigation  (fixed, z-50; mobile menu overlay is a sibling at z-40)
    ├── Hero        transparent — full plasma exposure
    ├── About       bg-black/80 backdrop-blur grain
    ├── Music       bg-black/10
    ├── Tour        bg-black/80 backdrop-blur grain
    ├── Gallery     bg-black/10
    ├── News        bg-black/80 backdrop-blur grain
    ├── Contact     bg-black/10
    └── Footer      bg-black/80 backdrop-blur grain
```

Alternating `bg-black/80` (opaque glass) and `bg-black/10` (near-transparent) lets the Plasma background bleed through. Each section sets its own background class; there is no global `section` rule.

## Design System

**Accent color:** `hsl(0 72.2% 50.6%)` (`--accent`) — use `text-accent`, `bg-accent`, `border-accent`, with opacity modifiers like `text-accent/[0.12]`. Avoid inline `style={{ color }}`: it overrides `hover:` classes.

**Background:** `hsl(20 5% 7%)` — warm near-black `--background`. The site is dark-only; the palette lives on `:root`.

**Typography:**
- `font-display` → Montserrat (headings, labels, all-caps)
- `font-sans` → Inter (body, default)
- Both loaded via `next/font` in `app/layout.tsx`.

**Key CSS utilities (globals.css):**
- `.grain` — SVG noise via `::after` at 4% opacity. The element must be positioned (`relative`/`fixed`); `.grain` sets no position itself.
- `.bg-noise` — the raw noise background, for places that need their own z-index (Hero)
- `.particle` — floating dot animation with `--duration` and `--delay` CSS props

**Section header:** use `<SectionHeader number="0X" eyebrow="…" title="…" accent="…" inView={isInView} />`. Pass `compact` for long titles (Tour), and `className="container mx-auto px-4"` when the section has no outer container.

## Languages (BM / EN)

- `LanguageProvider` (in `app/page.tsx`) holds the language; components call `const { t, formatDate, formatMonthYear } = useLang()`.
- `t(value)` picks `value.ms` / `value.en`; `formatDate("2026-10-24")` uses `Intl` (`ms-MY` / `en-GB`). The pure parsing/formatting helpers (`parseIsoDate`, `formatDateIn`, `formatMonthYearIn`) live in `lib/dates.ts`, a plain module (not `"use client"`); `lib/i18n.tsx` wraps them for the context.
- The static HTML is always BM; a stored choice (`localStorage["estrid-lang"]`) is applied after mount. SEO metadata is BM-only.
- Anything that depends on the browser (stored language, today's date for past shows, the release pop-up) is read in `useEffect`, so the static HTML and the first client render always match.
- The BM | EN toggle sits in the desktop nav from 1024px (`lg`); below that it is at the bottom of the hamburger menu.

Images in `public/images/` are referenced by absolute path (`"/images/…"`); the site is served from the domain root.

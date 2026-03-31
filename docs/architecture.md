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
| Forms | Web3Forms API |
| Hosting | GitHub Pages (static export) |

## Project Structure

```
estrid.web/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, dark class
│   ├── page.tsx            # Entry point — mounts all sections + fixed Plasma bg
│   └── globals.css         # Global styles, CSS variables, utility classes
│
├── components/
│   ├── Plasma.tsx          # WebGL animated background (OGL)
│   ├── Plasma.css          # Plasma container styles
│   ├── Navigation.tsx      # Sticky nav, mobile hamburger menu
│   ├── Hero.tsx            # Full-screen hero, CTA buttons
│   ├── About.tsx           # Band story, stats strip, member grid
│   ├── Music.tsx           # Featured release, Spotify embed, YouTube MV
│   ├── Tour.tsx            # Show dates with detail links
│   ├── Gallery.tsx         # Masonry photo grid + lightbox
│   ├── News.tsx            # Featured article + secondary stories
│   ├── Contact.tsx         # Contact form (Web3Forms) + info panel
│   └── Footer.tsx          # Brand, nav links, social icons
│
├── public/
│   └── images/
│       ├── estrid-logo.png
│       ├── estrid-2026.png          # Hero desktop bg
│       ├── estrid-2026-portrait.png # Hero mobile bg
│       ├── estrid-img-1.jpg         # About section photo
│       ├── narsistik artwork.png    # Music section artwork
│       ├── Bandmates/               # Member photos (Vocalist, Guitar 1, etc.)
│       └── Galeri/                  # Gallery photos (image1–image6.jpg)
│
├── .env.local              # Local env vars (not committed)
├── .env.local.example      # Template for env vars
├── next.config.ts          # Static export, basePath, image config
├── tailwind.config.ts      # Theme tokens, custom colors
└── .github/workflows/
    └── deploy.yml          # GitHub Actions — build + deploy to Pages
```

## Page Architecture

`app/page.tsx` renders a fixed WebGL background (z-index 0) behind a scrollable `<main>` (z-index 10) containing all sections in order:

```
Navigation (sticky, z-50)
├── Fixed: <Plasma /> bg (z-0, pointer-events-none)
└── main (z-10)
    ├── Hero        bg-black/80
    ├── About       bg-black/80 backdrop-blur grain
    ├── Music       bg-black/10
    ├── Tour        bg-black/80 backdrop-blur grain
    ├── Gallery     bg-black/10
    ├── News        bg-black/80 backdrop-blur grain
    ├── Contact     bg-black/10
    └── Footer      bg-black/80 backdrop-blur grain
```

Alternating `bg-black/80` (opaque glass) and `bg-black/10` (near-transparent) lets the Plasma background bleed through on transparent sections.

## Design System

**Accent color:** `hsl(0 72.2% 50.6%)` — referenced as `text-accent`, `bg-accent`, `border-accent` via Tailwind config.

**Background:** `hsl(20 5% 7%)` — warm near-black set as `--background` CSS variable.

**Key CSS utilities (globals.css):**
- `.grain` — SVG noise texture via `::after` pseudo-element at 4% opacity
- `.glow-red` / `.glow-red-sm` — red radial glow shadows
- `.particle` — floating dot animation with `--duration` and `--delay` CSS props

**Section header pattern** (used across all sections):
- Ghost section number (`01`–`06`) at `hsl(0 72.2% 50.6% / 0.12)` opacity
- Small red label above (`text-accent uppercase tracking-[0.35em]`)
- Large black heading with accent-colored last word
- Horizontal rule `bg-white/10` filling remaining space

**Typography:** Montserrat (headings, all-caps) + Geist (body). Both loaded via `next/font`.

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BASE_PATH` | Set to `/estrid.web` for GitHub Pages subdirectory deployment. Empty for custom domain. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms API key for contact form email delivery. |

All image paths use `const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''` at module scope in each component.

# ESTRID Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship five enhancements to the ESTRID site:
1. BM/EN toggle
2. WhatsApp contact/merch buttons
3. "Akhir." new-release pop-up
4. Akhir as the featured release, with Narsistik moved to "previous releases"
5. Show dates that work out past/upcoming on their own, plus the new show MUSE MADNESS 4.0

**Spec:** `docs/superpowers/specs/2026-10-02-enhancements-design.md`

**Architecture:**
- A hand-rolled React context (`lib/i18n.tsx`) holds the language. Translatable copy in `content/*.ts` becomes `{ ms, en }` pairs (`Localized`), so TypeScript fails the build if a translation is missing.
- UI chrome strings live in `content/ui.ts`.
- Show and news dates become ISO strings, formatted per language with `Intl.DateTimeFormat`.
- Show status (past/upcoming) is computed client-side after mount.

**Tech stack:** Next.js 15 (static export), React 19, Tailwind v3, Framer Motion 11, lucide-react, Yarn 4 PnP.

---

## Ground rules for the implementer

- **Branch:** `feat/enhancements` (already created; the spec is committed there). Never commit to `main`. Pushing `main` deploys to production on Vercel.
- **Don't commit these Yarn files**, which only exist locally: `.pnp.cjs`, `.pnp.loader.mjs`, `yarn.lock`, `.yarnrc.yml`. Always `git add` explicit paths.
- **Don't rename `package.json` "name".** Yarn PnP bakes it into the lockfile.
- **There is no unit-test framework**, and adding one is out of scope. Two gates replace it:
  1. `yarn build`, which type-checks. Most tasks are data-shape changes, so a type error is the "failing test".
  2. The Playwright verification in Task 12.
  `yarn lint` is broken (no eslint config) and is not a gate.
- **tailwind-merge gotcha.** Inside `cn(...)`, a `text-<size>` class that comes after `leading-*` silently drops the `leading-*`. Put size classes first.
- **Styling.**
  - No inline `style={{ color }}`. Use `text-accent` etc. Inline colors beat `hover:` classes.
  - `.grain` sets no `position`, so the element needs `relative` or `fixed`.
  - Full-screen overlays must not live inside `<nav>`: its `backdrop-filter` would trap `position: fixed`.
- **Commit message footer:** `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

Build command used throughout:

```bash
cd /Users/ejazulazim/Work/Outside/estrid.web && yarn build 2>&1 | grep -E "Compiled|Type error|rror" ; echo "exit=${PIPESTATUS[0]}"
```

Expected on success: `✓ Compiled successfully` and `exit=0`.

---

## File map

| File | Status | Responsibility |
|---|---|---|
| `lib/i18n.tsx` | create | `Lang`, `Localized`, `LanguageProvider`, `useLang()`, `formatDateIn()` |
| `lib/shows.ts` | create | `isPast()`, `orderShows()`: pure past/upcoming logic |
| `content/ui.ts` | create | All UI chrome strings, `Localized` |
| `content/site.ts` | modify | Localized nav labels and tagline, plus `whatsapp` URLs |
| `content/about.ts` | modify | Localized story, stats and roles |
| `content/music.ts` | modify | Akhir featured, `NEW_RELEASE`, `PAST_RELEASES` |
| `content/shows.ts` | modify | ISO dates, new show |
| `content/news.ts` | modify | Localized, ISO dates, Akhir item |
| `components/ui/LanguageToggle.tsx` | create | BM \| EN buttons |
| `components/ui/WhatsAppIcon.tsx` | create | Inline WhatsApp SVG |
| `components/ui/ReleaseModal.tsx` | create | Akhir pop-up |
| `app/page.tsx` | modify | Wrap in `LanguageProvider`, mount `ReleaseModal` |
| `components/layout/Navigation.tsx`, `Footer.tsx` | modify | i18n and toggle |
| `components/sections/*.tsx` (all 7) | modify | i18n, plus feature changes |
| `public/images/akhir-artwork.jpg` | create | 1200px artwork, from the 3000px PNG |
| `public/images/akhir-artwork-landscape.jpg` | create | 16:9 Akhir artwork (from the user's landscape PNG) for the news card |
| `docs/content-guide.md`, `docs/architecture.md` | modify | Document Localized and ISO dates |

---

### Task 1: i18n core, UI dictionary, toggle, provider

**Files:**
- Create: `lib/i18n.tsx`, `content/ui.ts`, `components/ui/LanguageToggle.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `lib/i18n.tsx`**

```tsx
"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "ms" | "en";

/** A string in both site languages */
export type Localized = { ms: string; en: string };

const STORAGE_KEY = "estrid-lang";
const INTL_LOCALE: Record<Lang, string> = { ms: "ms-MY", en: "en-GB" };

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (value: Localized) => string;
  /** "2026-10-24" → "24 Oktober 2026" / "24 October 2026" */
  formatDate: (isoDate: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

/** Parse "YYYY-MM-DD" as a local calendar date (not UTC midnight) */
export function parseIsoDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDateIn(isoDate: string, lang: Lang) {
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseIsoDate(isoDate));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Static HTML is always rendered in BM; a stored preference is applied after mount
  const [lang, setLangState] = useState<Lang>("ms");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "ms" || stored === "en") setLangState(stored);
    } catch {
      // storage unavailable (private mode) — stay on BM
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — choice just won't persist
    }
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t: (v) => v[lang],
      formatDate: (iso) => formatDateIn(iso, lang),
    }),
    [lang, setLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
```

- [ ] **Step 2: Create `content/ui.ts`.** This is the complete dictionary every later task uses.

```ts
import type { Localized } from "@/lib/i18n";

type Header = { eyebrow: Localized; title: Localized; accent: Localized };

/** Interface copy (buttons, labels, headings). Band content lives in the other content/ files. */
export const UI = {
  common: {
    close: { ms: "Tutup", en: "Close" },
    previous: { ms: "Sebelumnya", en: "Previous" },
    next: { ms: "Seterusnya", en: "Next" },
    followUs: { ms: "Ikuti Kami", en: "Follow Us" },
  },
  nav: {
    toggleMenu: { ms: "Buka/tutup menu", en: "Toggle menu" },
    language: { ms: "Bahasa", en: "Language" },
  },
  hero: {
    listenNow: { ms: "Dengar Sekarang", en: "Listen Now" },
    showDates: { ms: "Tarikh Persembahan", en: "Show Dates" },
    scrollDown: { ms: "Tatal ke bawah", en: "Scroll down" },
  },
  about: {
    header: {
      eyebrow: { ms: "Siapa Kami", en: "Who We Are" },
      title: { ms: "Tentang", en: "About" },
      accent: { ms: "ESTRID", en: "ESTRID" },
    } satisfies Header,
    story: { ms: "CERITA KAMI", en: "OUR STORY" },
    members: { ms: "AHLI BAND", en: "BAND MEMBERS" },
  },
  music: {
    header: {
      eyebrow: { ms: "Dengar Kami", en: "Listen" },
      title: { ms: "Muzik", en: "Our" },
      accent: { ms: "Kami", en: "Music" },
    } satisfies Header,
    latestRelease: { ms: "— Keluaran Terkini", en: "— Latest Release" },
    listenNow: { ms: "Dengar sekarang", en: "Listen now" },
    officialVideo: { ms: "Video Muzik Rasmi", en: "Official Music Video" },
    previousReleases: { ms: "Keluaran Terdahulu", en: "Previous Releases" },
    availableOn: { ms: "Tersedia Di", en: "Available On" },
  },
  tour: {
    header: {
      eyebrow: { ms: "Jumpa Kami", en: "See Us Live" },
      title: { ms: "Tarikh", en: "Show" },
      accent: { ms: "Persembahan", en: "Dates" },
    } satisfies Header,
    viewDetails: { ms: "Lihat Butiran ↗", en: "View Details ↗" },
    comingSoon: { ms: "Akan Datang", en: "Coming Soon" },
    emptyTitle: { ms: "Tiada Persembahan Dijadualkan", en: "No Shows Scheduled" },
    emptySubtitle: { ms: "Nantikan Pengumuman Baharu", en: "Stay Tuned for Announcements" },
    stayUpdated: { ms: "IKUTI BERITA TERKINI", en: "STAY UPDATED" },
    mailingList: { ms: "Sertai Senarai Mel Kami ↗", en: "Join Our Mailing List ↗" },
  },
  gallery: {
    header: {
      eyebrow: { ms: "Kenangan Kami", en: "Memories" },
      title: { ms: "Galeri", en: "Photo" },
      accent: { ms: "Foto", en: "Gallery" },
    } satisfies Header,
  },
  news: {
    header: {
      eyebrow: { ms: "Terkini", en: "Latest" },
      title: { ms: "Berita", en: "Our" },
      accent: { ms: "Kami", en: "News" },
    } satisfies Header,
    readMore: { ms: "Baca Selanjutnya ↗", en: "Read More ↗" },
    moreNews: { ms: "Berita Lain", en: "More News" },
  },
  contact: {
    header: {
      eyebrow: { ms: "Berhubung", en: "Get In Touch" },
      title: { ms: "Hubungi", en: "Contact" },
      accent: { ms: "Kami", en: "Us" },
    } satisfies Header,
    info: { ms: "Maklumat", en: "Info" },
    email: { ms: "E-mel", en: "Email" },
    location: { ms: "Lokasi", en: "Location" },
    whatsappUs: { ms: "WhatsApp Kami", en: "WhatsApp Us" },
    orderMerch: { ms: "Tempah Merch", en: "Order Merch" },
    nameLabel: { ms: "Nama", en: "Name" },
    namePlaceholder: { ms: "Nama anda", en: "Your name" },
    emailPlaceholder: { ms: "anda@email.com", en: "you@email.com" },
    messageLabel: { ms: "Mesej", en: "Message" },
    messagePlaceholder: { ms: "Mesej anda...", en: "Your message..." },
    send: { ms: "Hantar Mesej", en: "Send Message" },
    sending: { ms: "Menghantar...", en: "Sending..." },
    success: {
      ms: "Mesej berjaya dihantar! Kami akan menghubungi anda tidak lama lagi.",
      en: "Message sent! We'll get back to you soon.",
    },
    error: {
      ms: "Maaf, terdapat masalah menghantar mesej. Sila cuba lagi.",
      en: "Sorry, something went wrong sending your message. Please try again.",
    },
  },
  footer: {
    links: { ms: "Pautan", en: "Links" },
  },
  releaseModal: {
    eyebrow: { ms: "Lagu Baharu", en: "New Release" },
    subtitle: { ms: "Kini di semua platform", en: "Out now on all platforms" },
    watchMv: { ms: "Tonton MV ↗", en: "Watch MV ↗" },
  },
};
```

- [ ] **Step 3: Create `components/ui/LanguageToggle.tsx`**

```tsx
"use client";

import { Fragment } from "react";
import { UI } from "@/content/ui";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "ms", label: "BM" },
  { value: "en", label: "EN" },
];

/** BM | EN switch — the active language is shown in accent red */
export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t(UI.nav.language)}
      className={cn("flex items-center gap-2 text-sm font-semibold tracking-widest font-display", className)}
    >
      {OPTIONS.map((option, i) => (
        <Fragment key={option.value}>
          {i > 0 && <span className="text-white/20">|</span>}
          <button
            type="button"
            aria-pressed={lang === option.value}
            onClick={() => setLang(option.value)}
            className={cn(
              "transition-colors duration-300",
              lang === option.value ? "text-accent" : "text-white/40 hover:text-white"
            )}
          >
            {option.label}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Wrap the page in the provider.** Replace `app/page.tsx` with:

```tsx
import PlasmaBackground from "@/components/background/PlasmaBackground";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Music from "@/components/sections/Music";
import Tour from "@/components/sections/Tour";
import Gallery from "@/components/sections/Gallery";
import News from "@/components/sections/News";
import Contact from "@/components/sections/Contact";
import { LanguageProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LanguageProvider>
      <PlasmaBackground />

      <main className="relative z-10 min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Music />
        <Tour />
        <Gallery />
        <News />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
```

- [ ] **Step 5: Build.** Run the build command. Expected: `✓ Compiled successfully`, `exit=0`. Nothing consumes the new files yet, which is fine.

- [ ] **Step 6: Commit**

```bash
git add lib/i18n.tsx content/ui.ts components/ui/LanguageToggle.tsx app/page.tsx
git commit -m "feat(i18n): add language context, UI dictionary and BM/EN toggle

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Site config, Navigation, Footer, Hero

**Files:**
- Modify: `content/site.ts`, `components/layout/Navigation.tsx`, `components/layout/Footer.tsx`, `components/sections/Hero.tsx`

- [ ] **Step 1: Make the site config bilingual and add WhatsApp.** Replace `content/site.ts` with:

```ts
import { Facebook, Instagram, Music, Youtube } from "lucide-react";
import type { Localized } from "@/lib/i18n";

export const SITE = {
  name: "ESTRID",
  url: "https://estrid.my",
  // SEO metadata stays BM-only (see design spec)
  title: "ESTRID",
  description:
    "ESTRID. Muzik, jadual persembahan, galeri, dan berita terkini.",
  tagline: {
    ms: "Emosi Yang Dibebaskan, Bersuara Melalui Bunyi.",
    en: "Emotions Unleashed, Given Voice Through Sound.",
  } satisfies Localized,
  email: "estridband.official@gmail.com",
  linktree: "https://linktr.ee/estrid.band",
  location: "Kuala Lumpur, Malaysia",
  whatsapp: {
    contact: "https://wa.me/60127159784?text=Hi%2C%20I%20want%20to%20know%20more%20about%20ESTRID",
    merch: "https://wa.me/60173308974?text=Hi%2C%20I%20want%20to%20order%20ESTRID%20merch",
  },
  themeColor: "#DC2626",
  ogImage: "/images/og-image.png",
};

/** Page sections in scroll order — drives the nav, footer links and sitemap */
export const NAV_SECTIONS: { id: string; label: Localized }[] = [
  { id: "home", label: { ms: "Laman Utama", en: "Home" } },
  { id: "about", label: { ms: "Tentang", en: "About" } },
  { id: "music", label: { ms: "Muzik", en: "Music" } },
  { id: "tour", label: { ms: "Persembahan", en: "Shows" } },
  { id: "gallery", label: { ms: "Galeri", en: "Gallery" } },
  { id: "berita", label: { ms: "Berita", en: "News" } },
  { id: "contact", label: { ms: "Hubungi", en: "Contact" } },
];

export const SOCIAL_LINKS = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/estrid.my" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/estrid.band" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@EstridBand" },
  { name: "Spotify", icon: Music, href: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu" },
];
```

- [ ] **Step 2: Build, and expect it to fail.** Run the build command. Expected: Type errors in `Navigation.tsx`, `Footer.tsx` and `Hero.tsx` (`Localized` is not assignable to `ReactNode`). This is the "failing test" for this task.

- [ ] **Step 3: Replace `components/layout/Navigation.tsx`.** This keeps the earlier fixes: overlay as a sibling of `<nav>` at `z-40`, and class-based active/hover colours.

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { NAV_SECTIONS } from "@/content/site";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { asset, cn, scrollToId } from "@/lib/utils";

export default function Navigation() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight whichever section is currently on screen
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const goTo = useCallback((id: string) => {
    scrollToId(id);
    setIsOpen(false);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => { e.preventDefault(); goTo("home"); }}
            >
              <img
                src={asset("/images/estrid-logo.png")}
                alt="Estrid Logo"
                className="h-20 md:h-28 w-auto"
              />
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_SECTIONS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      "relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 pt-3",
                      isActive ? "text-accent" : "text-foreground hover:text-accent"
                    )}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onClick={(e) => { e.preventDefault(); goTo(item.id); }}
                  >
                    {/* Active indicator — small red square dot above text */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent"
                        style={{ borderRadius: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {t(item.label)}
                  </motion.a>
                );
              })}
              <LanguageToggle className="pt-3 pl-8 border-l border-white/10" />
            </div>

            {/* Mobile hamburger toggle */}
            <button
              className="md:hidden text-foreground hover:text-accent transition-colors z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t(UI.nav.toggleMenu)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay — a sibling of <nav>, not a child: the nav's
          backdrop-blur would otherwise become the containing block for `fixed` */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden flex flex-col items-center justify-center grain"
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center space-y-8">
              {NAV_SECTIONS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      "group flex items-baseline gap-3 text-3xl font-bold uppercase tracking-widest transition-colors duration-300",
                      isActive ? "text-accent" : "text-foreground hover:text-accent"
                    )}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
                    onClick={(e) => { e.preventDefault(); goTo(item.id); }}
                  >
                    {/* Numeric index prefix */}
                    <span className="text-sm font-mono tracking-widest tabular-nums text-accent opacity-70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/30 text-base font-light">—</span>
                    <span>{t(item.label)}</span>
                  </motion.a>
                );
              })}
            </div>
            <LanguageToggle className="mt-14 text-base" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 4: Update `components/layout/Footer.tsx`.** Make these three edits to the current file. Leave everything else as is, including `whileInView` and `viewport`.
  - Imports: after `import { NAV_SECTIONS, SITE, SOCIAL_LINKS } from "@/content/site";` add:
    ```tsx
    import { UI } from "@/content/ui";
    import { useLang } from "@/lib/i18n";
    ```
  - First line inside `Footer()`: add `const { t } = useLang();`.
  - Text replacements:
    - `{SITE.tagline}` → `{t(SITE.tagline)}`
    - `>Pautan</p>` → `>{t(UI.footer.links)}</p>`
    - `>Ikuti Kami</p>` → `>{t(UI.common.followUs)}</p>`
    - `{link.label}` → `{t(link.label)}`

- [ ] **Step 5: Update `components/sections/Hero.tsx`.** Make these edits to the current file.
  - Imports: add
    ```tsx
    import { UI } from "@/content/ui";
    import { useLang } from "@/lib/i18n";
    ```
  - First line inside `Hero()`: add `const { t } = useLang();`.
  - `{SITE.tagline.split(" ").map((word, wi) => (` → `{t(SITE.tagline).split(" ").map((word, wi) => (`
  - The tagline `motion.span` key: `key={wi}` → `` key={`${t(SITE.tagline)}-${wi}`} ``. This re-runs the blur-in reveal when the language changes.
  - `<span className="relative z-10">Dengar Sekarang</span>` → `<span className="relative z-10">{t(UI.hero.listenNow)}</span>`
  - `<span className="relative z-10">Tarikh Persembahan</span>` → `<span className="relative z-10">{t(UI.hero.showDates)}</span>`
  - `aria-label="Tatal ke bawah"` → `aria-label={t(UI.hero.scrollDown)}`

- [ ] **Step 6: Build.** Run the build command. Expected: `✓ Compiled successfully`, `exit=0`.

- [ ] **Step 7: Commit**

```bash
git add content/site.ts components/layout/Navigation.tsx components/layout/Footer.tsx components/sections/Hero.tsx
git commit -m "feat(i18n): translate nav, footer and hero; add language toggle to nav

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: About

**Files:** Modify `content/about.ts`, `components/sections/About.tsx`

- [ ] **Step 1: Replace `content/about.ts`**

```ts
import type { Localized } from "@/lib/i18n";
import { asset } from "@/lib/utils";

/** Band story — one entry per paragraph */
export const STORY: Localized[] = [
  {
    ms: "Estrid lahir dari keberanian untuk melawan kebiasaan—menyambar perhatian melalui pentas-pentas ganjil, termasuk sebuah toilet gig yang kemudian menjadi legenda. Dari situ, mereka menjelma sebagai nadi tetap scene muzik tempatan, menggegarkan malam demi malam melalui gig mingguan yang digerakkan oleh kolektif indie.",
    en: "Estrid was born from the nerve to break convention—grabbing attention on unlikely stages, including a toilet gig that went on to become legend. From there they became a steady pulse of the local music scene, shaking night after night at weekly gigs run by indie collectives.",
  },
  {
    ms: "Single sulung mereka, “Narsistik,” membuka pintu kepada era baharu yang lebih liar, lebih jujur—dan ini baru permulaannya. Didorong oleh api semangat, tujuan yang jelas, dan bisikan mitologi Norse, Estrid bukan sekadar memainkan muzik. Mereka membina perjalanan cerita dan garapan emosi dalam setiap lagu.",
    en: "Their debut single, “Narsistik,” opened the door to a wilder, more honest era—and this is only the beginning. Driven by fire, clear purpose and whispers of Norse mythology, Estrid don’t just play music. They build a journey of story and emotion into every song.",
  },
  {
    ms: "Berpangkalan di Kuala Lumpur, Estrid ialah kumpulan alternative rock yang menyalurkan tenaga dan emosi ‘rare’ ke setiap pentas yang mereka pijak. Muzik mereka menghentam dengan grit melodik, sarat dengan luka, amarah, dan keindahan.",
    en: "Based in Kuala Lumpur, Estrid is an alternative rock band channelling raw energy and emotion into every stage they step on. Their music hits with melodic grit—heavy with wounds, rage and beauty.",
  },
];

export const BAND_PHOTO = asset("/images/estrid-img-1.jpg");

export const STATS: { label: Localized; value: string }[] = [
  { label: { ms: "Jumlah Lagu", en: "Songs" }, value: "3" },
  { label: { ms: "Ahli Band", en: "Members" }, value: "6" },
  { label: { ms: "Gig", en: "Gigs" }, value: "12" },
  { label: { ms: "Penggemar Setia", en: "Loyal Fans" }, value: "10K+" },
];

/** Photos live in public/images/Bandmates/. Leave `image` out to show a placeholder icon. */
export const MEMBERS: { name: string; role: Localized; image?: string }[] = [
  { name: "MONO", role: { ms: "Vokalis", en: "Vocals" }, image: asset("/images/Bandmates/Vocalist.jpg") },
  { name: "AGYM", role: { ms: "Gitar", en: "Guitar" }, image: asset("/images/Bandmates/Guitar%201.jpg") },
  { name: "DARON", role: { ms: "Gitar", en: "Guitar" }, image: asset("/images/Bandmates/Guitar%202.jpg") },
  { name: "NAZ", role: { ms: "Bass", en: "Bass" }, image: asset("/images/Bandmates/Bass.jpg") },
  { name: "BEN", role: { ms: "Dram", en: "Drums" }, image: asset("/images/Bandmates/Drummer.jpg") },
  { name: "PEDANG", role: { ms: "Keyboard", en: "Keys" }, image: asset("/images/Bandmates/Keys.jpg") },
];
```

- [ ] **Step 2: Build, and expect it to fail.** Expected: type errors in `About.tsx` (`Localized` rendered as a child).

- [ ] **Step 3: Update `components/sections/About.tsx`.** Make these edits to the current file.
  - Imports: add
    ```tsx
    import { UI } from "@/content/ui";
    import { useLang } from "@/lib/i18n";
    ```
  - First line inside `About()`: add `const { t } = useLang();`.
  - Replace the header line with:
    ```tsx
    <SectionHeader
      number="01"
      eyebrow={t(UI.about.header.eyebrow)}
      title={t(UI.about.header.title)}
      accent={t(UI.about.header.accent)}
      inView={isInView}
    />
    ```
  - `label="CERITA KAMI"` → `label={t(UI.about.story)}`
  - `label="AHLI BAND"` → `label={t(UI.about.members)}`
  - `{paragraph}` → `{t(paragraph)}`
  - `key={stat.label}` → `key={stat.label.ms}`
  - `{stat.label}` → `{t(stat.label)}`
  - `{member.role}` → `{t(member.role)}`

- [ ] **Step 4: Build.** Expected `exit=0`.

- [ ] **Step 5: Commit**

```bash
git add content/about.ts components/sections/About.tsx
git commit -m "feat(i18n): translate About section

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Gallery

**Files:** Modify `components/sections/Gallery.tsx`

- [ ] **Step 1: Make these edits**
  - Imports: add
    ```tsx
    import { UI } from "@/content/ui";
    import { useLang } from "@/lib/i18n";
    ```
  - First line inside `Gallery()`: add `const { t } = useLang();`.
  - In the `<SectionHeader ... />` props:
    - `eyebrow="Kenangan Kami"` → `eyebrow={t(UI.gallery.header.eyebrow)}`
    - `title="Galeri"` → `title={t(UI.gallery.header.title)}`
    - `accent="Foto"` → `accent={t(UI.gallery.header.accent)}`
  - `aria-label="Tutup"` → `aria-label={t(UI.common.close)}`
  - `aria-label="Sebelumnya"` → `aria-label={t(UI.common.previous)}`
  - `aria-label="Seterusnya"` → `aria-label={t(UI.common.next)}`

- [ ] **Step 2: Build.** Expected `exit=0`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Gallery.tsx
git commit -m "feat(i18n): translate Gallery section

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Contact i18n

**Files:** Modify `components/sections/Contact.tsx`

- [ ] **Step 1: Replace `components/sections/Contact.tsx`.** The full file, including the WhatsApp hook-up point. The buttons themselves come in Task 6.

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SITE, SOCIAL_LINKS } from "@/content/site";
import { UI } from "@/content/ui";
import { useLang, type Localized } from "@/lib/i18n";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const contactInfo: { label: Localized; value: string; href: string | null }[] = [
  { label: UI.contact.email, value: SITE.email, href: `mailto:${SITE.email}` },
  { label: { ms: "Linktree", en: "Linktree" }, value: SITE.linktree.replace("https://", ""), href: SITE.linktree },
  { label: UI.contact.location, value: SITE.location, href: null },
];

const EMPTY_FORM = { name: "", email: "", message: "" };
type FormData = typeof EMPTY_FORM;
type SubmitStatus = "success" | "error" | null;

export default function Contact() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          ...formData,
          // Email to the band stays in BM regardless of the visitor's language
          subject: `Mesej dari ${formData.name}`,
          from_name: "Laman Web Estrid",
          to_email: SITE.email,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData(EMPTY_FORM);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-black/10 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          number="06"
          eyebrow={t(UI.contact.header.eyebrow)}
          title={t(UI.contact.header.title)}
          accent={t(UI.contact.header.accent)}
          inView={isInView}
        />

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-8">
          {/* Left — Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm border border-white/[0.08] p-8 md:p-10"
          >
            <p className="text-accent uppercase tracking-[0.35em] text-[10px] font-semibold mb-8">{t(UI.contact.info)}</p>

            {/* WHATSAPP_BUTTONS — added in Task 6 */}

            <div className="mb-10">
              {contactInfo.map(({ label, value, href }) => (
                <div key={label.ms} className="border-b border-white/[0.06] py-4 flex justify-between items-center gap-4">
                  <span className="text-white/30 uppercase tracking-widest text-[10px] shrink-0">{t(label)}</span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-accent transition-colors text-right"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm text-white/70 text-right">{value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons row */}
            <div>
              <p className="text-white/20 uppercase tracking-widest text-[10px] mb-5">{t(UI.common.followUs)}</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 border border-white/10 hover:border-accent flex items-center justify-center transition-all duration-300 hover:bg-accent/5"
                  >
                    <social.icon className="w-4 h-4 text-white/50" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="bg-black/40 backdrop-blur-sm border border-white/[0.08] p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <Field label={t(UI.contact.nameLabel)} name="name" placeholder={t(UI.contact.namePlaceholder)} value={formData.name} onChange={handleChange} />
              <Field label={t(UI.contact.email)} name="email" type="email" placeholder={t(UI.contact.emailPlaceholder)} value={formData.email} onChange={handleChange} />
              <Field label={t(UI.contact.messageLabel)} name="message" multiline placeholder={t(UI.contact.messagePlaceholder)} value={formData.message} onChange={handleChange} />

              {submitStatus && (
                <p className={`text-xs uppercase tracking-[0.2em] ${submitStatus === "success" ? "text-green-400/70" : "text-red-400/70"}`}>
                  {t(submitStatus === "success" ? UI.contact.success : UI.contact.error)}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-4 uppercase tracking-widest text-xs font-bold font-display flex items-center justify-center gap-3 hover:bg-accent/80 transition-colors disabled:opacity-50"
              >
                <span>{t(isSubmitting ? UI.contact.sending : UI.contact.send)}</span>
                {!isSubmitting && <span className="text-base leading-none">→</span>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const fieldClass =
  "w-full bg-transparent border-b border-white/20 focus:border-accent py-3 text-white/80 focus:outline-none transition-colors text-sm placeholder:text-white/20";

function Field({ label, name, type = "text", multiline = false, placeholder, value, onChange }: {
  label: string;
  name: keyof FormData;
  type?: string;
  multiline?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] uppercase tracking-[0.35em] text-white/30 mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
          rows={5}
          className={`${fieldClass} resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
          className={fieldClass}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
```

Note: `submitStatus` changed from `{type, message}` to the type alone. The message is looked up at render time, so it follows a language switch.

- [ ] **Step 2: Build.** Expected `exit=0`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat(i18n): translate Contact section and form messages

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: WhatsApp buttons

**Files:**
- Create: `components/ui/WhatsAppIcon.tsx`
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/ui/WhatsAppIcon.tsx`.** Lucide has no brand icons; this is the Simple Icons WhatsApp glyph.

```tsx
/** WhatsApp logo (Simple Icons, CC0) — inherits text colour */
export default function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
```

- [ ] **Step 2: Add the buttons in `Contact.tsx`.**
  - Add the import: `import WhatsAppIcon from "@/components/ui/WhatsAppIcon";`
  - Replace the line `{/* WHATSAPP_BUTTONS — added in Task 6 */}` with:

```tsx
            {/* WhatsApp — primary contact + merch orders */}
            <div className="grid gap-3 mb-10">
              <a
                href={SITE.whatsapp.contact}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-accent text-white py-4 uppercase tracking-widest text-xs font-bold font-display hover:bg-accent/80 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                {t(UI.contact.whatsappUs)}
              </a>
              <a
                href={SITE.whatsapp.merch}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-accent/60 text-accent py-4 uppercase tracking-widest text-xs font-bold font-display hover:bg-accent hover:text-white transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                {t(UI.contact.orderMerch)}
              </a>
            </div>
```

- [ ] **Step 3: Build.** Expected `exit=0`.

- [ ] **Step 4: Check the hrefs in the output**

```bash
grep -o 'href="https://wa.me[^"]*"' out/index.html | sed 's/&amp;/\&/g' | sort -u
```

Expected, exactly two lines:

```
href="https://wa.me/60127159784?text=Hi%2C%20I%20want%20to%20know%20more%20about%20ESTRID"
href="https://wa.me/60173308974?text=Hi%2C%20I%20want%20to%20order%20ESTRID%20merch"
```

- [ ] **Step 5: Commit**

```bash
git add components/ui/WhatsAppIcon.tsx components/sections/Contact.tsx
git commit -m "feat(contact): add WhatsApp contact and merch buttons

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Akhir artwork, Music data, Music section

**Files:**
- Create: `public/images/akhir-artwork.jpg`
- Modify: `content/music.ts`, `components/sections/Music.tsx`

- [ ] **Step 1: Make a web-sized artwork.** macOS `sips` is built in.

```bash
cd /Users/ejazulazim/Work/Outside/estrid.web
sips -s format jpeg -s formatOptions 82 -Z 1200 "/Users/ejazulazim/Mac Videos/ESTRID/AKHIR MV/akhir artwork - square.png" --out public/images/akhir-artwork.jpg >/dev/null
file public/images/akhir-artwork.jpg && du -h public/images/akhir-artwork.jpg
```

Expected: `JPEG image data ... 1200x1200`, size under about 400K. If it's larger, re-run with `formatOptions 72`.

- [ ] **Step 2: Replace `content/music.ts`**

```ts
import { Disc3, Music2, Youtube } from "lucide-react";
import type { Localized } from "@/lib/i18n";
import { asset } from "@/lib/utils";

/** The big card at the top of the Music section */
export const FEATURED_RELEASE: {
  title: [string, string];
  label: string;
  artwork: string;
  description: Localized;
  spotifyEmbed: string;
} = {
  /** Rendered as one word; the second part is shown in red */
  title: ["Akhir", "."],
  label: "Single · 2026",
  artwork: asset("/images/akhir-artwork.jpg"),
  description: {
    ms: "Single terbaharu Estrid — kini tersedia di semua platform muzik.",
    en: "Estrid’s newest single — out now on all music platforms.",
  },
  /** Spotify → Share → Embed track → copy the src URL */
  spotifyEmbed: "https://open.spotify.com/embed/track/0DKpL2GNJ5gcWxRAP1guXO?utm_source=generator&theme=0",
};

export const MUSIC_VIDEO = {
  title: "Akhir.",
  /** The id from youtu.be/<id> or youtube.com/watch?v=<id> */
  youtubeId: "pLnVxlmiMF4",
};

/** Pop-up shown once per session. Change `slug` for the next release so it shows again. */
export const NEW_RELEASE = {
  slug: "akhir",
  title: FEATURED_RELEASE.title,
  artwork: FEATURED_RELEASE.artwork,
  youtubeUrl: `https://youtu.be/${MUSIC_VIDEO.youtubeId}`,
};

/** Older releases, newest first — compact rows under the music video */
export const PAST_RELEASES = [
  {
    title: "Narsistik",
    label: "Single · 2025",
    artwork: asset("/images/narsistik artwork.png"),
    spotifyUrl: "https://open.spotify.com/track/10qy02MuJQsxXM4sAOwo1A",
    youtubeUrl: "https://youtu.be/Pw14pde3heQ",
  },
];

export const PLATFORMS = [
  { name: "Spotify", icon: Disc3, url: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu?si=jw60k9sgTRiXx6xRIoKkfQ" },
  { name: "Apple Music", icon: Music2, url: "https://music.apple.com/my/artist/estrid/1831023443" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@EstridBand" },
];
```

- [ ] **Step 3: Build, and expect it to fail.** Expected: a type error in `Music.tsx` on `{FEATURED_RELEASE.description}`.

- [ ] **Step 4: Replace `components/sections/Music.tsx`**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CornerBrackets from "@/components/ui/CornerBrackets";
import LabelDivider from "@/components/ui/LabelDivider";
import { FEATURED_RELEASE, MUSIC_VIDEO, PAST_RELEASES, PLATFORMS } from "@/content/music";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";

export default function Music() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [titleStart, titleEnd] = FEATURED_RELEASE.title;

  return (
    <section id="music" className="py-24 md:py-32 bg-black/10 overflow-hidden" ref={ref}>
      <SectionHeader
        number="02"
        eyebrow={t(UI.music.header.eyebrow)}
        title={t(UI.music.header.title)}
        accent={t(UI.music.header.accent)}
        inView={isInView}
        className="container mx-auto px-4"
      />

      {/* ── Featured Release ── */}
      <div className="container mx-auto px-4 mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-accent/50 uppercase tracking-[0.4em] text-[10px] font-semibold mb-4"
        >
          {t(UI.music.latestRelease)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 overflow-hidden border border-white/10 hover:border-accent/40 transition-colors duration-700 group"
        >
          {/* Artwork — sharp, no rounding */}
          <div className="relative aspect-square md:aspect-auto overflow-hidden">
            <img
              src={FEATURED_RELEASE.artwork}
              alt={titleStart + titleEnd}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            {/* Red edge bleed */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 hidden md:block" />

            {/* Floating label on artwork */}
            <div className="absolute top-4 left-4 border border-white/20 px-3 py-1 backdrop-blur-sm bg-black/40">
              <p className="text-white/70 uppercase tracking-[0.25em] text-[9px] font-semibold">{FEATURED_RELEASE.label}</p>
            </div>
          </div>

          {/* Content panel */}
          <div className="bg-black/60 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-between gap-8 border-l border-white/[0.06]">
            <div>
              {/* Oversized title */}
              <h3
                className="font-black uppercase font-display leading-[0.9] mb-6"
                style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
              >
                {titleStart}
                <span className="text-accent">{titleEnd}</span>
              </h3>
              <p className="text-white/50 leading-relaxed text-sm max-w-sm">
                {t(FEATURED_RELEASE.description)}
              </p>
            </div>

            {/* Spotify embed */}
            <div>
              <p className="text-white/30 uppercase tracking-[0.3em] text-[9px] mb-3">{t(UI.music.listenNow)}</p>
              <iframe
                style={{ borderRadius: '8px', display: 'block' }}
                src={FEATURED_RELEASE.spotifyEmbed}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <div className="container mx-auto px-4 mb-16">
        <LabelDivider
          label={t(UI.music.officialVideo)}
          className="origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>

      {/* ── Music Video ── */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest font-display mb-6 flex items-center gap-4">
            <span className="text-accent/40 text-sm font-normal tracking-widest">MV</span>
            {MUSIC_VIDEO.title}
          </h3>

          <div className="relative">
            <CornerBrackets />

            {/* 16:9 responsive embed */}
            <div
              className="relative w-full overflow-hidden border border-white/10"
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${MUSIC_VIDEO.youtubeId}`}
                title={`${MUSIC_VIDEO.title} - ${t(UI.music.officialVideo)}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Previous Releases ── */}
      {PAST_RELEASES.length > 0 && (
        <div className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <LabelDivider label={t(UI.music.previousReleases)} className="mb-6" />
            <div className="space-y-3">
              {PAST_RELEASES.map((release) => (
                <div
                  key={release.title}
                  className="group flex items-center gap-5 border border-white/10 hover:border-accent/40 bg-black/40 p-3 transition-colors duration-300"
                >
                  <img
                    src={release.artwork}
                    alt={release.title}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-base md:text-lg font-black uppercase tracking-widest font-display leading-tight truncate">
                      {release.title}
                    </p>
                    <p className="text-white/40 uppercase tracking-[0.25em] text-[9px] font-semibold mt-1">
                      {release.label}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 shrink-0 pr-2">
                    <a
                      href={release.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-accent uppercase tracking-widest text-xs font-semibold font-display transition-colors"
                    >
                      Spotify ↗
                    </a>
                    <a
                      href={release.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-accent uppercase tracking-widest text-xs font-semibold font-display transition-colors"
                    >
                      YouTube ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Platforms strip ── */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-white/10 pt-10"
        >
          <p className="text-white/30 uppercase tracking-[0.4em] text-[9px] font-semibold mb-6">{t(UI.music.availableOn)}</p>
          <div className="flex flex-wrap items-center gap-0">
            {PLATFORMS.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 pr-8 mr-8 border-r border-white/10 last:border-r-0 last:mr-0 last:pr-0 text-white/50 hover:text-accent transition-colors duration-300 group"
              >
                <platform.icon className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-widest text-xs font-semibold font-display">
                  {platform.name}
                </span>
                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity text-xs ml-1">↗</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
```

- [ ] **Step 5: Build.** Expected `exit=0`. Then confirm the new embeds are in the output:

```bash
grep -o 'embed/track/[A-Za-z0-9]*\|youtube.com/embed/[A-Za-z0-9_-]*' out/index.html | sort -u
```

Expected: `embed/track/0DKpL2GNJ5gcWxRAP1guXO` and `youtube.com/embed/pLnVxlmiMF4`.

- [ ] **Step 6: Commit**

```bash
git add public/images/akhir-artwork.jpg content/music.ts components/sections/Music.tsx
git commit -m "feat(music): feature new single 'Akhir.' and move Narsistik to previous releases

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Release pop-up modal

**Files:**
- Create: `components/ui/ReleaseModal.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/ui/ReleaseModal.tsx`**

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import CornerBrackets from "@/components/ui/CornerBrackets";
import { NEW_RELEASE } from "@/content/music";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";

const OPEN_DELAY_MS = 1200;

/** New-release announcement — opens once per browser session */
export default function ReleaseModal() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const storageKey = `release-seen-${NEW_RELEASE.slug}`;
  const [titleStart, titleEnd] = NEW_RELEASE.title;

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      // storage unavailable — show the modal anyway
    }
    const timer = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        // ignore
      }
    }, OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [storageKey]);

  // Esc to close + move focus into the dialog
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="release-modal-title"
            className="relative w-full max-w-sm bg-black border border-white/10"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CornerBrackets />

            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label={t(UI.common.close)}
              className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center bg-black/60 border border-white/20 text-white/70 hover:text-accent hover:border-accent transition-colors"
            >
              <X size={18} />
            </button>

            <img
              src={NEW_RELEASE.artwork}
              alt={titleStart + titleEnd}
              className="w-full aspect-square object-cover"
            />

            <div className="p-6 text-center">
              <p className="text-accent uppercase tracking-[0.35em] text-xs font-semibold mb-2">
                {t(UI.releaseModal.eyebrow)}
              </p>
              <h2
                id="release-modal-title"
                className="text-5xl font-black uppercase font-display leading-none mb-2"
              >
                {titleStart}
                <span className="text-accent">{titleEnd}</span>
              </h2>
              <p className="text-white/40 uppercase tracking-[0.3em] text-[9px] font-semibold mb-6">
                {t(UI.releaseModal.subtitle)}
              </p>
              <a
                href={NEW_RELEASE.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center px-8 py-4 bg-accent text-white font-bold uppercase tracking-widest text-sm font-display hover:bg-accent/80 transition-colors"
              >
                {t(UI.releaseModal.watchMv)}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Mount it in `app/page.tsx`.**
  - Add the import: `import ReleaseModal from "@/components/ui/ReleaseModal";`
  - Add `<ReleaseModal />` right after `</main>`, inside `<LanguageProvider>`.

- [ ] **Step 3: Build.** Expected `exit=0`.

- [ ] **Step 4: Commit**

```bash
git add components/ui/ReleaseModal.tsx app/page.tsx
git commit -m "feat: add once-per-session pop-up for new single 'Akhir.'

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Shows — ISO dates, automatic past/upcoming, MUSE MADNESS 4.0

**Files:**
- Create: `lib/shows.ts`
- Modify: `content/shows.ts`, `components/sections/Tour.tsx`

- [ ] **Step 1: Replace `content/shows.ts`**

```ts
export type Show = {
  /** ISO date "YYYY-MM-DD" — displayed per language, and used to work out past vs upcoming */
  date: string;
  /** Event name — leave "" to hide */
  title: string;
  venue: string;
  city: string;
  /** Details link → "Lihat Butiran ↗" button (upcoming shows only); null → "Akan Datang" */
  link: string | null;
};

/**
 * All shows, any order. Past shows (date before today) automatically lose their
 * button/status and move below upcoming ones — no need to edit them after the gig.
 */
export const SHOWS: Show[] = [
  {
    date: "2026-10-24",
    title: "MUSE MADNESS 4.0",
    venue: "Sarang Suara Studio",
    city: "Seri Kembangan, Selangor",
    link: "https://www.instagram.com/p/Ddu1WD0upaZ/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  },
  {
    date: "2026-09-12",
    title: "",
    venue: "Garage Space Ampang Hilir",
    city: "Ampang, Selangor",
    link: null,
  },
  {
    date: "2026-05-16",
    title: "FOR FUN GIG 3.0",
    venue: "Sarang Suara Studio",
    city: "Seri Kembangan, Selangor",
    link: "https://www.instagram.com/p/DVFMqlFgef7/?igsh=dWxhNTBicjhnNjJn",
  },
];
```

- [ ] **Step 2: Create `lib/shows.ts`**

```ts
import type { Show } from "@/content/shows";
import { parseIsoDate } from "@/lib/i18n";

/** A show is past once its date is before today (a show today still counts as upcoming) */
export function isPast(show: Show, today: Date) {
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return parseIsoDate(show.date) < startOfToday;
}

/**
 * Upcoming shows soonest-first, then past shows newest-first.
 * `today` is null before mount — everything is treated as upcoming so the
 * static HTML and first client render match.
 */
export function orderShows(shows: Show[], today: Date | null) {
  const byDate = (a: Show, b: Show) => a.date.localeCompare(b.date);
  const upcoming = shows.filter((s) => !today || !isPast(s, today)).sort(byDate);
  const past = today ? shows.filter((s) => isPast(s, today)).sort((a, b) => byDate(b, a)) : [];
  return { upcoming, past };
}
```

- [ ] **Step 3: Replace `components/sections/Tour.tsx`**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import LabelDivider from "@/components/ui/LabelDivider";
import { SHOWS, type Show } from "@/content/shows";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { orderShows } from "@/lib/shows";
import { cn, scrollToId } from "@/lib/utils";

export default function Tour() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // "Today" is only known in the browser — read it after mount
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);
  const { upcoming, past } = orderShows(SHOWS, today);
  const rows = [
    ...upcoming.map((show) => ({ show, isPast: false })),
    ...past.map((show) => ({ show, isPast: true })),
  ];

  return (
    <section
      id="tour"
      className="py-24 md:py-32 bg-black/80 backdrop-blur-md border-y border-white/[0.06] grain relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          number="03"
          eyebrow={t(UI.tour.header.eyebrow)}
          title={t(UI.tour.header.title)}
          accent={t(UI.tour.header.accent)}
          inView={isInView}
          compact
        />

        {rows.length === 0 ? (
          <EmptyState inView={isInView} />
        ) : (
          <div className="max-w-5xl mx-auto space-y-3 mb-16">
            {rows.map(({ show, isPast }, index) => (
              <ShowRow
                key={`${show.date}-${show.venue}`}
                show={show}
                isPast={isPast}
                index={index}
                inView={isInView}
              />
            ))}
          </div>
        )}

        <LabelDivider
          label={t(UI.tour.stayUpdated)}
          className="mb-10 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        />

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex justify-center"
        >
          <a
            href="#contact"
            className="text-accent/60 uppercase tracking-[0.4em] text-xs hover:text-accent transition-colors duration-200 font-semibold"
            onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}
          >
            {t(UI.tour.mailingList)}
          </a>
        </motion.div>

      </div>
    </section>
  );
}

function ShowRow({ show, isPast, index, inView }: { show: Show; isPast: boolean; index: number; inView: boolean }) {
  const { t, formatDate } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: isPast ? 0.5 : 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
      className={cn(
        "group flex items-stretch border border-white/10 bg-black/40 transition-all duration-300",
        !isPast && "hover:border-accent/40"
      )}
    >
      {/* Left edge bar — red for upcoming, muted for past */}
      <div className={cn("w-1 flex-shrink-0", isPast ? "bg-white/20" : "bg-accent")} />

      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-6 py-5">

        {/* Date — LEFT */}
        <div className="flex-shrink-0 md:w-56">
          <p
            className={cn(
              "text-3xl md:text-5xl font-black leading-none font-display",
              isPast ? "text-white/60" : "text-accent"
            )}
          >
            {formatDate(show.date)}
          </p>
        </div>

        {/* Thin vertical rule — desktop only */}
        <div className="hidden md:block w-px self-stretch bg-white/[0.06]" />

        {/* Venue + City — CENTER */}
        <div className="flex-1 space-y-1">
          {show.title && (
            <p className="text-accent/60 uppercase tracking-[0.3em] text-[10px] font-semibold mb-0.5">
              {show.title}
            </p>
          )}
          <p className="text-lg font-bold uppercase tracking-wider font-display leading-tight">
            {show.venue}
          </p>
          <div className="flex items-center gap-2 text-white/50">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-sm uppercase tracking-wider">{show.city}</span>
          </div>
        </div>

        {/* Detail link / status — RIGHT (upcoming shows only) */}
        {!isPast && (
          <div className="flex items-center md:justify-end flex-shrink-0">
            {show.link ? (
              <a
                href={show.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-accent/60 px-5 py-2.5 text-accent uppercase tracking-widest text-xs font-black font-display hover:bg-accent hover:text-white transition-all duration-200"
              >
                {t(UI.tour.viewDetails)}
              </a>
            ) : (
              <span className="border border-white/10 px-4 py-2 text-white/30 uppercase tracking-widest text-xs font-semibold font-display">
                {t(UI.tour.comingSoon)}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState({ inView }: { inView: boolean }) {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col items-center justify-center py-24 gap-4"
    >
      <span className="text-[8rem] font-black leading-none select-none font-display text-accent/10">
        —
      </span>
      <p className="text-white/30 uppercase tracking-[0.4em] text-xs font-semibold">
        {t(UI.tour.emptyTitle)}
      </p>
      <p className="text-white/20 uppercase tracking-[0.3em] text-[9px]">
        {t(UI.tour.emptySubtitle)}
      </p>
    </motion.div>
  );
}
```

The dimming is done through framer's `animate.opacity` (0.5), not an `opacity-50` class. Framer writes inline `opacity`, which would override the class.

- [ ] **Step 4: Build.** Expected `exit=0`.

- [ ] **Step 5: Check the logic in the browser.** This is covered in Task 12 (expected order on 2026-10-02: MUSE MADNESS with a button, then 12 Sep and 16 May with no buttons).

- [ ] **Step 6: Commit**

```bash
git add content/shows.ts lib/shows.ts components/sections/Tour.tsx
git commit -m "feat(tour): auto-detect past shows, localize dates, add MUSE MADNESS 4.0

Past shows drop their button/status, dim, and sort below upcoming ones.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: News — localized, ISO dates, Akhir item

**Files:**
- Create: `public/images/akhir-artwork-landscape.jpg`
- Modify: `content/news.ts`, `components/sections/News.tsx`

- [ ] **Step 1: Convert the official 16:9 artwork** (supplied by the user — fits the featured news card; square artwork would be cropped)

```bash
cd /Users/ejazulazim/Work/Outside/estrid.web
sips -s format jpeg -s formatOptions 82 "/Users/ejazulazim/Mac Videos/ESTRID/AKHIR MV/akhir artwork - landscape.png" --out public/images/akhir-artwork-landscape.jpg >/dev/null
file public/images/akhir-artwork-landscape.jpg && du -h public/images/akhir-artwork-landscape.jpg
```

Expected: `JPEG image data ... 1280x720`, roughly 150–300K.

- [ ] **Step 2: Replace `content/news.ts`**

```ts
import type { Localized } from "@/lib/i18n";
import { asset } from "@/lib/utils";

export type NewsItem = {
  title: Localized;
  /** ISO date "YYYY-MM-DD" — displayed per language */
  date: string;
  excerpt: Localized;
  image: string;
  /** External article / video link */
  link: string;
};

/** Newest first. The first item is the large featured story. Keep at least one item. */
export const NEWS: NewsItem[] = [
  {
    title: {
      ms: "Single Baharu 'Akhir.' Kini Tersedia!",
      en: "New Single 'Akhir.' Out Now!",
    },
    date: "2026-09-26",
    excerpt: {
      ms: "'Akhir.' kini boleh didengar di semua platform muzik utama. Tonton video muzik rasminya sekarang.",
      en: "'Akhir.' is out now on all major music platforms. Watch the official music video now.",
    },
    image: asset("/images/akhir-artwork-landscape.jpg"),
    link: "https://youtu.be/pLnVxlmiMF4",
  },
  {
    title: {
      ms: "Single Sulung 'Narsistik' Kini Tersedia!",
      en: "Debut Single 'Narsistik' Out Now!",
    },
    date: "2025-08-16",
    excerpt: {
      ms: "Single pertama kami akhirnya hadir. Dengar 'Narsistik' sekarang di semua platform muzik utama dan rasai tenaga mentah Estrid yang tidak berkompromi.",
      en: "Our first single is finally here. Listen to 'Narsistik' now on all major music platforms and feel Estrid's raw, uncompromising energy.",
    },
    image: asset("/images/estrid-2026.png"),
    link: "https://musicaddicts.my/estrid-meledak-lembaran-baharu-muzik-rock-alternatif-tempatan-dengan-narsistik/",
  },
];
```

- [ ] **Step 3: Build, and expect it to fail.** Expected: type errors in `News.tsx`.

- [ ] **Step 4: Update `components/sections/News.tsx`.** Make these edits to the current file.
  - Imports: add
    ```tsx
    import { UI } from "@/content/ui";
    import { useLang } from "@/lib/i18n";
    ```
  - First line inside `News()`: add `const { t, formatDate } = useLang();`.
  - Replace the header line with:
    ```tsx
    <SectionHeader
      number="05"
      eyebrow={t(UI.news.header.eyebrow)}
      title={t(UI.news.header.title)}
      accent={t(UI.news.header.accent)}
      inView={isInView}
    />
    ```
  - Featured story:
    - `alt={featured.title}` → `alt={t(featured.title)}`
    - `{featured.date}` → `{formatDate(featured.date)}`
    - `{featured.title}` (inside the `h3`) → `{t(featured.title)}`
    - `{featured.excerpt}` → `{t(featured.excerpt)}`
    - `Baca Selanjutnya ↗` → `{t(UI.news.readMore)}`
  - `<time` elements: add `dateTime={featured.date}` to the featured one and `dateTime={item.date}` to the list one.
  - Divider: `Berita Lain` → `{t(UI.news.moreNews)}`
  - Secondary list:
    - `key={item.title}` → `key={item.date}`
    - `{item.date}` → `{formatDate(item.date)}`
    - `{item.title}` → `{t(item.title)}`
  - In the secondary row's `<time>` className, change `w-28` to `w-32`. "16 Ogos 2025" in Inter needs the room.

- [ ] **Step 5: Build.** Expected `exit=0`.

- [ ] **Step 6: Commit**

```bash
git add public/images/akhir-artwork-landscape.jpg content/news.ts components/sections/News.tsx
git commit -m "feat(news): add 'Akhir.' release story; localize news and dates

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Docs

**Files:** Modify `docs/content-guide.md`, `docs/architecture.md`

- [ ] **Step 1: In `docs/content-guide.md`**, replace the intro paragraph that starts with "Images go in `public/images/…`" with:

````markdown
Images go in `public/images/…` and are referenced as `asset("/images/…")` so they work on GitHub Pages. File names with spaces must be written as `%20` (e.g. `Guitar%201.jpg`).

### Two languages (BM / EN)

Anything visitors read is written in both languages as `{ ms: "...", en: "..." }`. The build fails if one is missing. Names (venues, members, song titles) are plain strings. Buttons and headings live in `content/ui.ts`.

### Dates

Dates are written as `"YYYY-MM-DD"` (e.g. `"2026-10-24"`) and shown automatically as "24 Oktober 2026" / "24 October 2026".
````

- [ ] **Step 2: In `docs/content-guide.md`, replace the whole "Show Dates" section with:**

````markdown
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
- Empty list (`[]`) → "Tiada Persembahan Dijadualkan"
````

- [ ] **Step 3: In `docs/content-guide.md`, replace the "Music" section with:**

````markdown
## Music — `content/music.ts`

- **`FEATURED_RELEASE`** — the big card: title (two parts; the second is shown in red), label, artwork, `description` (BM/EN), and `spotifyEmbed` (Spotify → Share → Embed track → copy the `src` URL)
- **`MUSIC_VIDEO`** — `youtubeId` is the part after `youtu.be/` or `watch?v=`
- **`NEW_RELEASE`** — the pop-up shown once per visit. It reuses the featured release; change `slug` when a new song comes out so returning visitors see the pop-up again
- **`PAST_RELEASES`** — older singles shown as small rows (newest first). When a new single comes out, move the current featured one here
- **`PLATFORMS`** — streaming links in the "Tersedia Di" strip

Artwork tip: resize big exports before adding them, e.g.
`sips -s format jpeg -s formatOptions 82 -Z 1200 "artwork.png" --out public/images/name.jpg`
````

- [ ] **Step 4: In `docs/content-guide.md`, update the News example.** Change the date line to `date: "2026-09-26",                     // YYYY-MM-DD`, and make `title` and `excerpt` use `{ ms: "...", en: "..." }`.

- [ ] **Step 5: In `docs/content-guide.md`, update the Site Info section.** After the `SOCIAL_LINKS` bullet, add:

```markdown
- `SITE.whatsapp` — the two WhatsApp buttons in Hubungi Kami (`contact`, `merch`). Format: `https://wa.me/60XXXXXXXXX?text=<url-encoded message>`
```

- [ ] **Step 6: In `docs/architecture.md`.**
  - In the Project Structure tree, add these lines:
    - under `content/`: `│   ├── ui.ts               # Buttons, headings, labels (BM/EN)`
    - under `components/ui/`:
      - `│   │   ├── LanguageToggle.tsx  # BM | EN switch`
      - `│   │   ├── ReleaseModal.tsx    # New-release pop-up (once per session)`
      - `│   │   └── WhatsAppIcon.tsx    # Brand icon (Lucide has none)`
    - under `lib/`:
      - `│   ├── i18n.tsx            # LanguageProvider, useLang(), Localized, date formatting`
      - `│   └── shows.ts            # Past/upcoming ordering`
  - Append this section before "## Environment Variables":

```markdown
## Languages (BM / EN)

- `LanguageProvider` (in `app/page.tsx`) holds the language; components call `const { t, formatDate } = useLang()`.
- `t(value)` picks `value.ms` / `value.en`; `formatDate("2026-10-24")` uses `Intl` (`ms-MY` / `en-GB`).
- The static HTML is always BM; a stored choice (`localStorage["estrid-lang"]`) is applied after mount. SEO metadata is BM-only.
- Anything that depends on the browser (stored language, today's date for past shows, the release pop-up) is read in `useEffect`, so the static HTML and the first client render always match.
```

- [ ] **Step 7: Commit**

```bash
git add docs/content-guide.md docs/architecture.md
git commit -m "docs: document bilingual content, ISO dates, release pop-up and past shows

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: End-to-end verification

**Files:** none in the repo. The scripts go in a temp dir.

- [ ] **Step 1: Set up Playwright in a temp dir.** It uses the installed Google Chrome.

```bash
export VERIFY_DIR="${TMPDIR:-/tmp}/estrid-verify" && mkdir -p "$VERIFY_DIR" && cd "$VERIFY_DIR" && npm init -y >/dev/null && npm i playwright-core >/dev/null 2>&1 && echo ok
```

- [ ] **Step 2: Write `$VERIFY_DIR/verify.js`**

```js
// Behaviour checks against the static build served on :4321
const { chromium } = require("playwright-core");
const assert = require("assert/strict");
const BASE = "http://localhost:4321/";

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  // 1. Release modal opens on first visit
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForSelector("[role=dialog]", { timeout: 4000 });
  assert.match(await page.textContent("#release-modal-title"), /AKHIR\./i);
  assert.equal(await page.getAttribute("[role=dialog] a", "href"), "https://youtu.be/pLnVxlmiMF4");
  // Esc closes it
  await page.keyboard.press("Escape");
  await page.waitForSelector("[role=dialog]", { state: "detached" });
  // Same session → not shown again after reload
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  assert.equal(await page.$("[role=dialog]"), null, "modal re-opened in same session");
  console.log("✓ modal: opens once per session, Esc closes");

  // 2. Shows: upcoming first with button, past rows without button/status
  const rows = await page.$$eval("#tour .max-w-5xl > div", (els) =>
    els.map((el) => ({ text: el.innerText, links: el.querySelectorAll("a").length }))
  );
  assert.equal(rows.length, 3);
  assert.match(rows[0].text, /24 Oktober 2026/);
  assert.match(rows[0].text, /MUSE MADNESS 4\.0/);
  assert.equal(rows[0].links, 1);
  assert.match(rows[1].text, /12 September 2026/);
  assert.match(rows[2].text, /16 Mei 2026/);
  for (const r of rows.slice(1)) {
    assert.equal(r.links, 0, "past show still has a link");
    assert.doesNotMatch(r.text, /Akan Datang|Lihat Butiran/);
  }
  console.log("✓ shows: order, past rows have no button/status");

  // 3. WhatsApp links
  const wa = await page.$$eval("#contact a[href^='https://wa.me']", (as) => as.map((a) => a.href));
  assert.deepEqual(wa, [
    "https://wa.me/60127159784?text=Hi%2C%20I%20want%20to%20know%20more%20about%20ESTRID",
    "https://wa.me/60173308974?text=Hi%2C%20I%20want%20to%20order%20ESTRID%20merch",
  ]);
  console.log("✓ whatsapp: both hrefs exact");

  // 4. Language toggle → EN, persists across reload, sets <html lang>
  assert.equal(await page.getAttribute("html", "lang"), "ms");
  await page.click("nav [role=group] button:has-text('EN')");
  await page.waitForTimeout(300);
  assert.equal(await page.getAttribute("html", "lang"), "en");
  assert.match(await page.textContent("#about h2"), /About/i);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  assert.equal(await page.getAttribute("html", "lang"), "en");
  assert.match(await page.textContent("#tour"), /24 October 2026/);
  assert.match(await page.textContent("#contact"), /WhatsApp Us/);
  assert.match(await page.textContent("#music"), /Previous Releases/);
  console.log("✓ i18n: toggle, persistence, translated sections");

  assert.deepEqual(errors, [], "page errors: " + errors.join(" | "));
  console.log("✓ no page errors");
  await browser.close();
})().catch((e) => { console.error("✗", e.message); process.exit(1); });
```

- [ ] **Step 3: Write `$VERIFY_DIR/shots.js`** to take screenshots for visual review. It has the modal suppressed and covers both languages.

```js
const { chromium } = require("playwright-core");
const out = process.argv[2];
(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  for (const lang of ["ms", "en"]) {
    for (const [label, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
      const ctx = await browser.newContext({ viewport: { width, height } });
      await ctx.addInitScript((l) => {
        sessionStorage.setItem("release-seen-akhir", "1");
        localStorage.setItem("estrid-lang", l);
      }, lang);
      const page = await ctx.newPage();
      await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });
      for (let y = 0; y < 20000; y += 400) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(50); }
      await page.waitForTimeout(2500);
      for (const id of ["home", "about", "music", "tour", "berita", "contact"]) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.locator(`#${id}`).screenshot({ path: `${out}/${lang}-${label}-${id}.png` });
      }
      await ctx.close();
    }
  }
  // Modal itself (fresh session, BM, mobile)
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });
  await page.waitForSelector("[role=dialog]"); await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/modal-mobile.png` });
  await browser.close();
})();
```

- [ ] **Step 4: Build, serve, and run both scripts**

```bash
cd /Users/ejazulazim/Work/Outside/estrid.web && NEXT_PUBLIC_BASE_PATH= yarn build >/dev/null 2>&1 && echo built
(cd out && exec python3 -m http.server 4321 >/dev/null 2>&1) & SRV=$!
sleep 1
node "$VERIFY_DIR/verify.js"
mkdir -p "$VERIFY_DIR/shots" && node "$VERIFY_DIR/shots.js" "$VERIFY_DIR/shots"
kill $SRV
```

Expected: five `✓` lines and no `✗`. The shows assertions assume the run date falls between 2026-09-13 and 2026-10-24.

- [ ] **Step 5: Review the screenshots by eye.** Open them with the Read tool. Check:
  - **Modal:** artwork, AKHIR. with a red dot, red button.
  - **EN shots:** no BM leftovers in nav, headers, buttons or form.
  - **Tour:** past rows dimmed, with no button.
  - **Contact:** two WhatsApp buttons with the icon.
  - **Music:** Akhir artwork, and the Previous Releases row.
  - **Mobile:** nothing overflows horizontally. The EN headers and the date column in Tour are the most likely to wrap.

  Fix anything off, rebuild, and re-run Step 4.

- [ ] **Step 6: Check the basePath build** (GitHub Pages mirror)

```bash
NEXT_PUBLIC_BASE_PATH=/estrid.web yarn build >/dev/null 2>&1 && grep -o 'src="/estrid.web/images/akhir[^"]*"' out/index.html | sort -u
```

Expected: `akhir-artwork.jpg` and `akhir-artwork-landscape.jpg`, both with the `/estrid.web` prefix.

- [ ] **Step 7: Hand off.** Report the results to the user. Do **not** merge or push. `main` deploys to production on Vercel, and the user decides.

---

## Self-review notes

- **Spec coverage:**

| Spec item | Task(s) |
|---|---|
| 1 i18n | 1–5, 7, 9, 10 |
| 2 WhatsApp | 6 |
| 3 modal | 8 |
| 4 Akhir / previous releases | 7 |
| News item (confirmed) | 10 |
| 5 shows | 9 |
| Testing | 12 |
| Docs | 11 |

- **Types used across tasks:**
  - `Localized`, `Lang`, `parseIsoDate`, `formatDateIn` and `useLang` come from Task 1.
  - `UI.*` keys are all defined in Task 1, Step 2. The later tasks only reference keys that are in that object.
  - `NEW_RELEASE` (Task 7) is consumed by Task 8.
  - `Show` (Task 9, Step 1) is consumed by `lib/shows.ts` and `Tour.tsx`.
- **Known accepted trade-off:** EN visitors briefly see BM on first paint, and the Tour rows render "all upcoming" until mount. Both are per the spec.

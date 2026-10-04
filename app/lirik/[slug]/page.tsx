import type { Metadata } from "next";
import { notFound } from "next/navigation";
import T from "@/components/ui/T";
import { SITE } from "@/content/site";
import { UI } from "@/content/ui";
import { pageMetadata } from "@/lib/metadata";
import { getSong, SONGS, toVerses } from "@/lib/songs";
import { buildSongJsonLd } from "@/lib/structuredData";

type Props = { params: Promise<{ slug: string }> };

// Static export: only the songs in content/lyrics.ts get a page
export const dynamicParams = false;

export function generateStaticParams() {
  return SONGS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const song = getSong((await params).slug);
  if (!song) return {};
  const [firstLine, secondLine] = song.lyrics.split("\n");
  return pageMetadata({
    title: `Lirik ${song.title}`,
    description: `Lirik lagu ${song.title} oleh ${SITE.name}: “${firstLine}, ${secondLine}…” Lirik penuh, kredit lagu, dan pautan Spotify serta YouTube.`,
    path: song.path,
    image: song.artwork,
    imageAlt: `${song.title} — ${SITE.name}`,
  });
}

const linkClass =
  "text-white/50 hover:text-accent uppercase tracking-widest text-xs font-semibold font-display transition-colors";

// Lyrics, title and credits are plain server-rendered HTML (no motion) so search engines read them as-is
export default async function LyricsPage({ params }: Props) {
  const song = getSong((await params).slug);
  if (!song) notFound();

  return (
    <article className="relative bg-black/80 backdrop-blur-md grain pt-32 pb-24 md:pt-40 md:pb-32 min-h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSongJsonLd(song)) }}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        <a href="/lirik/" className={`${linkClass} inline-block mb-10`}>
          <span aria-hidden="true">← </span>
          <T v={UI.lyrics.allLyrics} />
        </a>

        <div className="grid md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] gap-10 md:gap-16">
          {/* Artwork, links and credits — beside the lyrics on desktop, after them on mobile */}
          <aside className="order-last md:order-first md:sticky md:top-28 self-start space-y-8">
            <img
              src={song.artwork}
              alt={`${song.title} — ${SITE.name}`}
              width={280}
              height={280}
              className="w-40 md:w-full aspect-square object-cover border border-white/10"
            />

            <div className="flex gap-6">
              <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Spotify <span aria-hidden="true">↗</span>
              </a>
              <a href={song.youtubeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                YouTube <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div>
              <h2 className="text-accent/60 uppercase tracking-[0.35em] text-[10px] font-semibold mb-4">
                <T v={UI.lyrics.credits} />
              </h2>
              <dl className="space-y-3">
                {song.credits.map(({ role, names }) => (
                  <div key={role}>
                    <dt className="text-white/30 uppercase tracking-[0.25em] text-[9px] font-semibold">
                      <T v={UI.lyrics.roles[role]} />
                    </dt>
                    <dd className="text-white/70 text-sm">{names.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          <div className="min-w-0">
            <h1 className="font-display font-black uppercase mb-3">
              <span className="block text-accent uppercase tracking-[0.4em] text-xs font-semibold mb-4">
                <T v={UI.lyrics.lyrics} />
              </span>{" "}
              <span className="block text-5xl md:text-7xl leading-[0.9] tracking-tight">{song.title}</span>
            </h1>
            <p className="text-white/40 uppercase tracking-[0.25em] text-[10px] font-semibold mb-12">
              {SITE.name} · {song.label}
            </p>

            <div className="space-y-8 text-white/80 text-base md:text-lg leading-relaxed">
              {toVerses(song.lyrics).map((lines, i) => (
                <p key={i}>
                  {lines.map((line, j) => (
                    <span key={j} className="block">{line}</span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

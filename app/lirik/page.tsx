import type { Metadata } from "next";
import T from "@/components/ui/T";
import { SITE } from "@/content/site";
import { UI } from "@/content/ui";
import { pageMetadata } from "@/lib/metadata";
import { SONGS } from "@/lib/songs";

export const metadata: Metadata = pageMetadata({
  title: "Lirik Lagu",
  description: `Lirik rasmi lagu-lagu ${SITE.name}: ${SONGS.map((s) => s.title).join(", ")}. Lirik penuh dan kredit setiap lagu.`,
  path: "/lirik/",
  imageAlt: `${SITE.name} Band`,
});

export default function LyricsIndexPage() {
  return (
    <section className="relative bg-black/80 backdrop-blur-md grain pt-32 pb-24 md:pt-40 md:pb-32 min-h-full">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display font-black uppercase mb-4">
          <span className="block text-accent uppercase tracking-[0.4em] text-xs font-semibold mb-4">
            <T v={UI.lyrics.songLyrics} />
          </span>{" "}
          <span className="block text-5xl md:text-7xl leading-[0.9] tracking-tight">{SITE.name}</span>
        </h1>
        <p className="text-white/50 text-sm mb-12">
          <T v={UI.lyrics.indexIntro} />
        </p>

        <ul className="space-y-3">
          {SONGS.map((song) => (
            <li key={song.slug}>
              <a
                href={song.path}
                className="group flex items-center gap-5 border border-white/10 hover:border-accent/40 bg-black/40 p-3 transition-colors duration-300"
              >
                <img
                  src={song.artwork}
                  alt=""
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-base md:text-lg font-black uppercase tracking-widest font-display leading-tight truncate">
                    <T v={UI.lyrics.lyrics} /> {song.title}
                  </p>
                  <p className="text-white/40 uppercase tracking-[0.25em] text-[9px] font-semibold mt-1">
                    {song.label}
                  </p>
                </div>
                {/* Full label from sm up; arrow only on phones so the title has room */}
                <span className="text-white/50 group-hover:text-accent uppercase tracking-widest text-xs font-semibold font-display transition-colors pr-2 shrink-0">
                  <span className="hidden sm:inline"><T v={UI.lyrics.readLyrics} /></span>
                  <span className="sm:hidden" aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

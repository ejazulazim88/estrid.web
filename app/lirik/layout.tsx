import PlasmaBackground from "@/components/background/PlasmaBackground";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/layout/MotionProvider";
import Navigation from "@/components/layout/Navigation";
import { LanguageProvider } from "@/lib/i18n";

/** Shell for /lirik/ pages — same nav, background and footer as home, no release pop-up */
export default function LyricsLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MotionProvider>
        <PlasmaBackground />

        <main className="relative z-10 min-h-screen flex flex-col">
          <Navigation />
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </MotionProvider>
    </LanguageProvider>
  );
}

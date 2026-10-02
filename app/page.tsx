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

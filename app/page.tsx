"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Music from "@/components/Music";
import Tour from "@/components/Tour";
import Gallery from "@/components/Gallery";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Plasma = dynamic(() => import("@/components/Plasma"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Fixed plasma — lives behind the entire page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Plasma
          color="#DC2626"
          speed={0.5}
          direction="forward"
          scale={1.1}
          opacity={0.85}
          mouseInteractive={false}
        />
      </div>

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
    </>
  );
}

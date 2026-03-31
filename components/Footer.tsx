"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Music } from "lucide-react";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/estrid.band" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/estrid.my" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@EstridBand" },
  { name: "Spotify", icon: Music, href: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu" },
];

const footerLinks = [
  { name: "Tentang", href: "#about" },
  { name: "Muzik", href: "#music" },
  { name: "Persembahan", href: "#tour" },
  { name: "Galeri", href: "#gallery" },
  { name: "Berita", href: "#berita" },
  { name: "Hubungi", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black/80 backdrop-blur-md border-t border-white/[0.06] grain overflow-hidden">
      {/* Top section */}
      <div className="container mx-auto px-4 py-20 border-t-2 border-accent/30">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-12 items-start">
          {/* Left — Brand */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[4rem] md:text-[6rem] font-black tracking-widest font-[family-name:var(--font-montserrat)] leading-none mb-4"
              style={{ color: "hsl(0 72.2% 50.6% / 0.25)" }}
            >
              ESTRID
            </motion.h2>
            <p className="text-white/30 text-xs uppercase tracking-[0.2em] max-w-xs">
              Emosi Yang Dibebaskan, Bersuara Melalui Bunyi.
            </p>
          </div>

          {/* Center — Nav links */}
          <nav className="flex flex-col gap-0">
            <p className="text-white/20 uppercase tracking-[0.35em] text-[10px] mb-4">Pautan</p>
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/40 hover:text-accent uppercase tracking-widest text-xs transition-colors py-1 font-[family-name:var(--font-montserrat)]"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right — Social */}
          <div>
            <p className="text-white/20 uppercase tracking-[0.35em] text-[10px] mb-4">Ikuti Kami</p>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 border border-white/10 hover:border-accent flex items-center justify-center transition-all duration-300 hover:bg-accent/5"
                >
                  <social.icon className="w-4 h-4 text-white/40 hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs uppercase tracking-widest">
            &copy; {currentYear} ESTRID
          </p>
          <a
            href="https://linktr.ee/estrid.band"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/60 hover:text-accent text-xs uppercase tracking-widest transition-colors"
          >
            linktr.ee/estrid.band ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

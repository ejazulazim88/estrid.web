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
    <footer className="relative bg-card border-t border-border grain overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold uppercase tracking-widest font-[family-name:var(--font-montserrat)] text-accent mb-4">
              ESTRID
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Emosi Yang Dibebaskan, Bersuara Melalui Bunyi.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-full bg-background border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:glow-red-sm"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-accent" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-xs text-muted-foreground mb-6">Pautan Pantas</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors uppercase tracking-wider"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tagline / Extra */}
          <div>
            <h4 className="font-bold uppercase tracking-[0.2em] text-xs text-muted-foreground mb-6">Ikuti Kami</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Dapatkan berita terkini, tarikh persembahan dan kandungan eksklusif dengan mengikuti Estrid di semua platform.
            </p>
            <a
              href="https://linktr.ee/estrid.band"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm uppercase tracking-wider font-semibold hover:underline"
            >
              linktr.ee/estrid.band
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-widest">
            &copy; {currentYear} ESTRID. Hak Cipta Terpelihara.
          </p>
        </div>
      </div>
    </footer>
  );
}

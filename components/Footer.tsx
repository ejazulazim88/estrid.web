"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Music } from "lucide-react";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/estrid.band" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/estrid.my" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@EstridBand" },
  { name: "Spotify", icon: Music, href: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu?si=jw60k9sgTRiXx6xRIoKkfQ&nd=1&dlsi=1f728258d704467c" },
];

const footerLinks = [
  { name: "Tentang", href: "#about" },
  { name: "Muzik", href: "#music" },
  { name: "Gig", href: "#tour" },
  { name: "Galeri", href: "#gallery" },
  { name: "Berita", href: "#news" },
  { name: "Hubungi", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-accent mb-4">
              ESTRID
            </h3>
            <p className="text-muted-foreground mb-4">
              Emosi Yang Dibebaskan, Bersuara Melalui Bunyi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Pautan Pantas</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors"
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

          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-accent" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-muted-foreground text-sm">
          <p>
            &copy; {currentYear} ESTRID. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


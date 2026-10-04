"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { NAV_SECTIONS, SITE, SOCIAL_LINKS } from "@/content/site";
import { UI } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { scrollToId } from "@/lib/utils";

const footerLinks = NAV_SECTIONS.filter((section) => section.id !== "home");
const linkClass = "text-white/40 hover:text-accent uppercase tracking-widest text-xs transition-colors py-1 font-display";

export default function Footer() {
  const { t } = useLang();
  const onHome = usePathname() === "/";
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[4rem] md:text-[6rem] font-black tracking-widest font-display leading-none mb-4 text-accent/25"
            >
              {SITE.name}
            </motion.h2>
            <p className="text-white/30 text-xs uppercase tracking-[0.2em] max-w-xs">
              {t(SITE.tagline)}
            </p>
          </div>

          {/* Center — Nav links */}
          <nav className="flex flex-col gap-0">
            <p className="text-white/20 uppercase tracking-[0.35em] text-[10px] mb-4">{t(UI.footer.links)}</p>
            {/* Each section, followed by its sub-pages (Muzik → Lirik) */}
            {footerLinks.map((link) => (
              <Fragment key={link.id}>
                <a
                  href={`/#${link.id}`}
                  className={linkClass}
                  onClick={(e) => { if (!onHome) return; e.preventDefault(); scrollToId(link.id); }}
                >
                  {t(link.label)}
                </a>
                {link.children?.map((child) => (
                  <a key={child.href} href={child.href} className={linkClass}>
                    {t(child.label)}
                  </a>
                ))}
              </Fragment>
            ))}
          </nav>

          {/* Right — Social */}
          <div>
            <p className="text-white/20 uppercase tracking-[0.35em] text-[10px] mb-4">{t(UI.common.followUs)}</p>
            <div className="grid grid-cols-2 gap-2">
              {SOCIAL_LINKS.map((social) => (
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
            &copy; {currentYear} {SITE.name}
          </p>
          <a
            href={SITE.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/60 hover:text-accent text-xs uppercase tracking-widest transition-colors"
          >
            {SITE.linktree.replace("https://", "")} ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

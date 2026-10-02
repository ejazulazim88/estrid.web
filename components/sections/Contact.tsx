"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { SITE, SOCIAL_LINKS } from "@/content/site";
import { UI } from "@/content/ui";
import { useLang, type Localized } from "@/lib/i18n";

const contactInfo: { label: Localized; value: string; href: string | null }[] = [
  { label: UI.contact.email, value: SITE.email, href: `mailto:${SITE.email}` },
  { label: { ms: "Linktree", en: "Linktree" }, value: SITE.linktree.replace("https://", ""), href: SITE.linktree },
  { label: UI.contact.location, value: SITE.location, href: null },
];

export default function Contact() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm border border-white/[0.08] p-8 md:p-10"
        >
          <p className="text-accent uppercase tracking-[0.35em] text-[10px] font-semibold mb-8">{t(UI.contact.info)}</p>

          {/* WhatsApp — primary contact + merch orders */}
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
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
      </div>
    </section>
  );
}

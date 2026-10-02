"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { SITE, SOCIAL_LINKS } from "@/content/site";
import { UI } from "@/content/ui";
import { useLang, type Localized } from "@/lib/i18n";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const contactInfo: { label: Localized; value: string; href: string | null }[] = [
  { label: UI.contact.email, value: SITE.email, href: `mailto:${SITE.email}` },
  { label: { ms: "Linktree", en: "Linktree" }, value: SITE.linktree.replace("https://", ""), href: SITE.linktree },
  { label: UI.contact.location, value: SITE.location, href: null },
];

const EMPTY_FORM = { name: "", email: "", message: "" };
type FormData = typeof EMPTY_FORM;
type SubmitStatus = "success" | "error" | null;

export default function Contact() {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          ...formData,
          // Email to the band stays in BM regardless of the visitor's language
          subject: `Mesej dari ${formData.name}`,
          from_name: "Laman Web Estrid",
          to_email: SITE.email,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData(EMPTY_FORM);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-8">
          {/* Left — Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm border border-white/[0.08] p-8 md:p-10"
          >
            <p className="text-accent uppercase tracking-[0.35em] text-[10px] font-semibold mb-8">{t(UI.contact.info)}</p>

            {/* WhatsApp — primary contact + merch orders */}
            <div className="grid gap-3 mb-10">
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

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="bg-black/40 backdrop-blur-sm border border-white/[0.08] p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <Field label={t(UI.contact.nameLabel)} name="name" placeholder={t(UI.contact.namePlaceholder)} value={formData.name} onChange={handleChange} />
              <Field label={t(UI.contact.email)} name="email" type="email" placeholder={t(UI.contact.emailPlaceholder)} value={formData.email} onChange={handleChange} />
              <Field label={t(UI.contact.messageLabel)} name="message" multiline placeholder={t(UI.contact.messagePlaceholder)} value={formData.message} onChange={handleChange} />

              {submitStatus && (
                <p className={`text-xs uppercase tracking-[0.2em] ${submitStatus === "success" ? "text-green-400/70" : "text-red-400/70"}`}>
                  {t(submitStatus === "success" ? UI.contact.success : UI.contact.error)}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-4 uppercase tracking-widest text-xs font-bold font-display flex items-center justify-center gap-3 hover:bg-accent/80 transition-colors disabled:opacity-50"
              >
                <span>{t(isSubmitting ? UI.contact.sending : UI.contact.send)}</span>
                {!isSubmitting && <span className="text-base leading-none">→</span>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const fieldClass =
  "w-full bg-transparent border-b border-white/20 focus:border-accent py-3 text-white/80 focus:outline-none transition-colors text-sm placeholder:text-white/20";

function Field({ label, name, type = "text", multiline = false, placeholder, value, onChange }: {
  label: string;
  name: keyof FormData;
  type?: string;
  multiline?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] uppercase tracking-[0.35em] text-white/30 mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
          rows={5}
          className={`${fieldClass} resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
          className={fieldClass}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

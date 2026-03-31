"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Facebook, Instagram, Youtube, Music } from "lucide-react";

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/estrid.my" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/estrid.band" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@EstridBand" },
  { name: "Spotify", icon: Music, href: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Mesej dari ${formData.name}`,
          from_name: "Laman Web Estrid",
          to_email: "estridband.official@gmail.com",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus({ type: "success", message: "Mesej berjaya dihantar! Kami akan menghubungi anda tidak lama lagi." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Maaf, terdapat masalah menghantar mesej. Sila cuba lagi." });
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
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-end gap-6"
          >
            <span
              className="text-[7rem] md:text-[10rem] font-black leading-none select-none font-[family-name:var(--font-montserrat)]"
              style={{ color: "hsl(0 72.2% 50.6% / 0.12)" }}
            >
              06
            </span>
            <div className="pb-4">
              <p className="text-accent uppercase tracking-[0.35em] text-xs font-semibold mb-1">Berhubung</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest font-[family-name:var(--font-montserrat)] leading-none">
                Hubungi <span className="text-accent">Kami</span>
              </h2>
            </div>
            <div className="flex-1 h-px bg-white/10 mb-6 hidden md:block" />
          </motion.div>
        </div>

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-8">
          {/* Left — Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm border border-white/[0.08] p-8 md:p-10"
          >
            <p className="text-accent uppercase tracking-[0.35em] text-[10px] font-semibold mb-8">Maklumat</p>

            {/* Contact table */}
            <div className="mb-10">
              {[
                { label: "E-mel", value: "estridband.official@gmail.com", href: "mailto:estridband.official@gmail.com" },
                { label: "Linktree", value: "linktr.ee/estrid.band", href: "https://linktr.ee/estrid.band" },
                { label: "Lokasi", value: "Kuala Lumpur, Malaysia", href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="border-b border-white/[0.06] py-4 flex justify-between items-center gap-4">
                  <span className="text-white/30 uppercase tracking-widest text-[10px] shrink-0">{label}</span>
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
              <p className="text-white/20 uppercase tracking-widest text-[10px] mb-5">Ikuti Kami</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 border border-white/10 hover:border-accent flex items-center justify-center transition-all duration-300 hover:bg-accent/5"
                  >
                    <social.icon className="w-4 h-4 text-white/50 group-hover:text-accent" />
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
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.35em] text-white/30 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 focus:border-accent py-3 text-white/80 focus:outline-none transition-colors text-sm placeholder:text-white/20"
                  placeholder="Nama anda"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.35em] text-white/30 mb-2">
                  E-mel
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 focus:border-accent py-3 text-white/80 focus:outline-none transition-colors text-sm placeholder:text-white/20"
                  placeholder="anda@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.35em] text-white/30 mb-2">
                  Mesej
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-transparent border-b border-white/20 focus:border-accent py-3 text-white/80 focus:outline-none transition-colors text-sm resize-none placeholder:text-white/20"
                  placeholder="Mesej anda..."
                />
              </div>

              {/* Status message */}
              {submitStatus.type && (
                <p className={`text-xs uppercase tracking-[0.2em] ${submitStatus.type === "success" ? "text-green-400/70" : "text-red-400/70"}`}>
                  {submitStatus.message}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-4 uppercase tracking-widest text-xs font-bold font-[family-name:var(--font-montserrat)] flex items-center justify-center gap-3 hover:bg-accent/80 transition-colors disabled:opacity-50"
              >
                <span>{isSubmitting ? "Menghantar..." : "Hantar Mesej"}</span>
                {!isSubmitting && <span className="text-base leading-none">→</span>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

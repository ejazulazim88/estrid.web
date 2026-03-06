"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Link2, MapPin, Send, Facebook, Instagram, Youtube, Music } from "lucide-react";

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
    <section id="contact" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">Berhubung</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest font-[family-name:var(--font-montserrat)] mb-4">
            Hubungi <span className="text-accent">Kami</span>
          </h2>
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soalan atau tempahan? Kami sedia mendengar.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)] mb-8">
                Maklumat
              </h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "E-mel", value: "estridband.official@gmail.com", href: "mailto:estridband.official@gmail.com" },
                  { icon: Link2, label: "Linktree", value: "linktr.ee/estrid.band", href: "https://linktr.ee/estrid.band" },
                  { icon: MapPin, label: "Lokasi", value: "Kuala Lumpur, Malaysia", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground mb-1">{label}</h4>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-foreground">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground mb-4">Ikuti Kami</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 hover:glow-red-sm transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-accent" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "name", label: "Nama", type: "text", placeholder: "Nama anda" },
                { id: "email", label: "E-mel", type: "email", placeholder: "anda@email.com" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.15)]"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Mesej
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-accent transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(220,38,38,0.15)] resize-none"
                  placeholder="Mesej anda..."
                />
              </div>

              {submitStatus.type && (
                <div className={`p-4 rounded-lg text-sm ${submitStatus.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-500" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold uppercase tracking-widest text-sm rounded-lg transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-accent/90 hover:scale-[1.02] hover:glow-red"}`}
              >
                <Send className={`w-5 h-5 ${isSubmitting ? "animate-pulse" : ""}`} />
                <span>{isSubmitting ? "Menghantar..." : "Hantar Mesej"}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

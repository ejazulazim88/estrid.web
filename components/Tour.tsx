"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Ticket } from "lucide-react";

const tourDates = [
  {
    id: 1,
    date: "12 September 2026",
    venue: "Garage Space Ampang Hilir",
    city: "Ampang, Selangor",
    status: "Belum Dijual",
  },
];

export default function Tour() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tour" className="py-24 md:py-32 bg-card grain relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">Jumpa Kami</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest font-[family-name:var(--font-montserrat)] mb-4">
            Tarikh <span className="text-accent">Persembahan</span>
          </h2>
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Saksikan kami beraksi secara langsung.
          </p>
        </motion.div>

        {tourDates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16 text-muted-foreground"
          >
            <p className="text-xl">Tiada persembahan dijadualkan buat masa ini.</p>
            <p className="mt-2 text-sm uppercase tracking-widest">Nantikan pengumuman baharu.</p>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {tourDates.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-background border border-border rounded-lg overflow-hidden hover:border-accent transition-all duration-300 hover:glow-red-sm flex"
              >
                {/* Red left accent border */}
                <div className="w-1.5 bg-accent flex-shrink-0 group-hover:bg-accent/80 transition-colors duration-300" />
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 text-accent">
                        <Calendar className="w-5 h-5" />
                        <span className="font-semibold uppercase tracking-wider text-sm">{show.date}</span>
                      </div>
                      <h3 className="text-xl font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)]">
                        {show.venue}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm uppercase tracking-wider">{show.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {show.status === "Belum Dijual" ? (
                        <span className="px-6 py-3 bg-muted text-muted-foreground rounded-full font-semibold uppercase tracking-wider text-sm">
                          Belum Dijual
                        </span>
                      ) : (
                        <a
                          href="#"
                          className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-semibold uppercase tracking-wider text-sm hover:bg-accent/90 transition-all duration-300 hover:scale-105"
                        >
                          <Ticket className="w-5 h-5" />
                          <span>Beli Tiket</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4 text-sm uppercase tracking-wider">
            Mahu tahu tarikh persembahan terkini?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 border-2 border-accent text-accent rounded-full font-semibold uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all duration-300"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Sertai Senarai Mel Kami
          </a>
        </motion.div>
      </div>
    </section>
  );
}

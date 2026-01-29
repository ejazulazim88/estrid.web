"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Ticket } from "lucide-react";

const tourDates = [
  {
    id: 1,
    date: "12 Sepember, 2026",
    venue: "Garage Space Ampang Hilir",
    city: "Ampang, Selangor",
    status: "Not On Sale",
  },
];

export default function Tour() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tour" className="py-20 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-montserrat)] mb-4">
            Tour <span className="text-accent">Dates</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Catch us live! Get your tickets before they sell out.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {tourDates.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background border border-border rounded-lg p-6 hover:border-accent transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 text-accent">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">{show.date}</span>
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-montserrat)]">
                    {show.venue}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{show.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {show.status === "Not On Sale" ? (
                    <span className="px-6 py-3 bg-muted text-muted-foreground rounded-full font-semibold">
                      Not On Sale
                    </span>
                  ) : (
                    <a
                      href="#"
                      className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent/90 transition-colors duration-300 group-hover:scale-105 transform"
                    >
                      <Ticket className="w-5 h-5" />
                      <span>Get Tickets</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Want to stay updated on new tour dates?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 border-2 border-accent text-accent rounded-full font-semibold hover:bg-accent hover:text-white transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Join Our Mailing List
          </a>
        </motion.div>
      </div>
    </section>
  );
}


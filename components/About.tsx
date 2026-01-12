"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Music, Award, Heart } from "lucide-react";

const stats = [
  { icon: Music, label: "Albums Released", value: "5" },
  { icon: Users, label: "Band Members", value: "4" },
  { icon: Award, label: "Awards Won", value: "12" },
  { icon: Heart, label: "Fans Worldwide", value: "500K+" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-montserrat)] mb-4">
            About <span className="text-accent">The Band</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=2069"
                alt="The Renegades Band"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold font-[family-name:var(--font-montserrat)]">
              Our Story
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Born from the underground music scene, The Renegades emerged with a
              mission to bring raw, unfiltered rock back to the masses. Our sound
              is a fusion of classic rock energy and modern edge.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Since our formation, we&apos;ve been pushing boundaries, breaking rules,
              and creating music that resonates with the rebellious spirit in all
              of us. Every chord, every lyric, every performance is a testament to
              our dedication to authentic rock and roll.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join us on this journey as we continue to shake stages and move
              hearts around the world.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="text-center p-6 bg-background rounded-lg border border-border hover:border-accent transition-colors duration-300"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
              <div className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-montserrat)] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


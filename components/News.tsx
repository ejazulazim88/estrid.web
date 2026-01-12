"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "New Album 'Rebel Heart' Out Now!",
    date: "January 10, 2026",
    excerpt:
      "Our latest album is finally here! Stream it now on all major platforms and experience our most powerful work yet.",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=2070",
  },
  {
    id: 2,
    title: "Summer Tour 2026 Announced",
    date: "December 15, 2025",
    excerpt:
      "We're hitting the road this summer! Check out our tour dates and grab your tickets before they're gone.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070",
  },
  {
    id: 3,
    title: "Behind the Scenes: Making of Rebel Heart",
    date: "November 28, 2025",
    excerpt:
      "Go behind the scenes and see how we created our latest album. Exclusive footage and interviews coming soon.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070",
  },
];

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="news" className="py-20 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-montserrat)] mb-4">
            Latest <span className="text-accent">News</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest releases and announcements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-background rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-accent mb-3">
                  <Calendar className="w-4 h-4" />
                  <time>{item.date}</time>
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-montserrat)] mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all duration-300"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


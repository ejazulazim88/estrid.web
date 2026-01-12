"use client";

import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

export default function Hero() {
  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/estrid 2025.jpg')",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="-mt-72"
        >
          <div className="mb-8 flex justify-center items-start">
            <img
              src="/images/estrid logo.png"
              alt="Estrid"
              className="h-64 md:h-96 lg:h-[32rem] w-auto object-contain"
            />
          </div>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8">
            Raw Energy. Powerful Sound. Unforgettable Experience.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="#music"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#music")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Play className="w-5 h-5" />
            <span>Listen Now</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>

          <a
            href="#tour"
            className="group relative inline-flex items-center gap-2 px-8 py-4 border-2 border-accent text-accent font-semibold rounded-full overflow-hidden transition-all duration-300 hover:bg-accent hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#tour")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Tour Dates</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/70 hover:text-accent transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.5 },
        }}
        onClick={scrollToNext}
        aria-label="Scroll down"
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
}


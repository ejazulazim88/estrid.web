"use client";

import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";

export default function Hero() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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
        {/* Mobile Portrait Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden"
          style={{
            backgroundImage:
              `url('${basePath}/images/estrid-2026-portrait.png')`,
          }}
        />
        {/* Desktop Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block"
          style={{
            backgroundImage:
              `url('${basePath}/images/estrid-2026.png')`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-start">
            <img
              src={`${basePath}/images/estrid-logo.png`}
              alt="Estrid"
              className="md: mt-64 lg:-mt-64 h-64 md:h-96 lg:h-[32rem] w-auto object-contain"
            />
          </div>
          <p className="text-2xl md:text-2xl lg:text-3xl text-gray-300 mb-8 -mt-10 md:-mt-32 lg:-mt-32">
            Emosi Yang Dibebaskan, Bersuara Melalui Bunyi.
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
            <span>Dengar Sekarang</span>
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
            <span>Tarikh Persembahan</span>
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


"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const tagline = "Emosi Yang Dibebaskan, Bersuara Melalui Bunyi.";

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${10 + (i * 7.5) % 80}%`,
  top: `${10 + (i * 13) % 75}%`,
  duration: `${5 + (i * 0.7) % 6}s`,
  delay: `${(i * 0.4) % 4}s`,
}));

function MagneticButton({ children, className, href, onClick }: {
  children: React.ReactNode;
  className: string;
  href: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const scrollToNext = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black/80"
    >
      {/* Bottom gradient fade — blends into next section */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          zIndex: 5,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Ghost "ESTRID" — background depth / concert-poster letterform */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 6 }}
        aria-hidden="true"
      >
        <motion.span
          className="font-black uppercase leading-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(6rem, 22vw, 26rem)',
            color: 'hsl(0 72.2% 50.6%)',
            opacity: 0.05,
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          ESTRID
        </motion.span>
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            '--duration': p.duration,
            '--delay': p.delay,
            zIndex: 10,
          } as React.CSSProperties}
        />
      ))}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 gap-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src={`${basePath}/images/estrid-logo.png`}
            alt="Estrid"
            className="h-72 sm:h-64 md:h-80 lg:h-[28rem] w-auto object-contain"
          />
        </motion.div>

        {/* Tagline — word-by-word blur reveal */}
        <div className="text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-300 mb-2 flex flex-wrap justify-center gap-x-2">
          {tagline.split(" ").map((word, wi) => (
            <motion.span
              key={wi}
              initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + wi * 0.08, ease: "easeOut" }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* CTA buttons — sharp edges, no rounded corners */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {/* Primary — filled accent */}
          <MagneticButton
            href="#music"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white border border-accent font-bold uppercase tracking-widest text-sm overflow-hidden transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#music")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Play className="w-4 h-4 flex-shrink-0 relative z-10" />
            <span className="relative z-10">Dengar Sekarang</span>
            {/* Left-to-right white sheen on hover */}
            <span className="absolute inset-0 bg-white/15 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </MagneticButton>

          {/* Secondary — ghost border */}
          <MagneticButton
            href="#tour"
            className="group relative inline-flex items-center gap-3 px-8 py-4 border border-accent/60 text-accent/80 font-bold uppercase tracking-widest text-sm overflow-hidden transition-colors duration-300 hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#tour")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="relative z-10">Tarikh Persembahan</span>
            {/* Fill sweep on hover */}
            <span
              className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"
              style={{ backgroundColor: 'hsl(0 72.2% 50.6%)' }}
            />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/70 hover:text-accent transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.5 },
        }}
        onClick={scrollToNext}
        aria-label="Tatal ke bawah"
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
}

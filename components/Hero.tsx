"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scrollToNext = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden"
          style={{ backgroundImage: `url('${basePath}/images/estrid-2026-portrait.png')` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block"
          style={{ backgroundImage: `url('${basePath}/images/estrid-2026.png')` }}
        />
      </motion.div>

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
      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex justify-center items-start">
            <img
              src={`${basePath}/images/estrid-logo.png`}
              alt="Estrid"
              className="mt-64 lg:-mt-64 h-64 md:h-96 lg:h-[32rem] w-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Tagline — word-by-word blur reveal */}
        <div className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 -mt-10 md:-mt-32 lg:-mt-32 flex flex-wrap justify-center gap-x-2">
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

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <MagneticButton
            href="#music"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all duration-300"
            onClick={(e) => { e.preventDefault(); document.querySelector("#music")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <Play className="w-5 h-5" />
            <span>Dengar Sekarang</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </MagneticButton>

          <MagneticButton
            href="#tour"
            className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-accent text-accent font-semibold uppercase tracking-widest text-sm rounded-full transition-all duration-300 hover:bg-accent hover:text-white"
            onClick={(e) => { e.preventDefault(); document.querySelector("#tour")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <span>Tarikh Persembahan</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/70 hover:text-accent transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2, duration: 0.5 }, y: { repeat: Infinity, duration: 1.5 } }}
        onClick={scrollToNext}
        aria-label="Tatal ke bawah"
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
}

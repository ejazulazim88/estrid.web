"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const navItems = [
  { name: "Laman Utama", href: "#home" },
  { name: "Tentang", href: "#about" },
  { name: "Muzik", href: "#music" },
  { name: "Persembahan", href: "#tour" },
  { name: "Galeri", href: "#gallery" },
  { name: "Berita", href: "#berita" },
  { name: "Hubungi", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map(item => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
          >
            <img
              src={`${basePath}/images/estrid-logo.png`}
              alt="Estrid Logo"
              className="h-20 md:h-28 w-auto"
            />
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 hover:text-accent pt-3"
                  style={{ color: isActive ? "hsl(var(--accent))" : "hsl(var(--foreground))" }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                >
                  {/* Active indicator — small red square dot above text */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent"
                      style={{ borderRadius: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {item.name}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile hamburger toggle */}
          <button
            className="md:hidden text-foreground hover:text-accent transition-colors z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-lg md:hidden flex flex-col items-center justify-center grain"
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "");
                const indexLabel = String(index + 1).padStart(2, "0");
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="group flex items-baseline gap-3 text-3xl font-bold uppercase tracking-widest transition-colors duration-300 hover:text-accent"
                    style={{ color: isActive ? "hsl(var(--accent))" : "hsl(var(--foreground))" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  >
                    {/* Numeric index prefix */}
                    <span
                      className="text-sm font-mono tracking-widest tabular-nums"
                      style={{ color: 'hsl(0 72.2% 50.6%)', opacity: 0.7 }}
                    >
                      {indexLabel}
                    </span>
                    <span className="text-white/30 text-base font-light">—</span>
                    <span>{item.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

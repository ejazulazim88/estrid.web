"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Music, Award, Heart } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const stats = [
  { icon: Music, label: "Jumlah Lagu", value: "3" },
  { icon: Users, label: "Ahli Band", value: "6" },
  { icon: Award, label: "Gig", value: "12" },
  { icon: Heart, label: "Penggemar Setia", value: "10K+" },
];

const members = [
  { name: "MONO", role: "Vokalis", image: `${basePath}/images/Bandmates/Vocalist.jpg` },
  { name: "AGYM", role: "Gitar", image: `${basePath}/images/Bandmates/Guitar%201.jpg` },
  { name: "DARON", role: "Gitar", image: `${basePath}/images/Bandmates/Guitar%202.jpg` },
  { name: "NAZ", role: "Bass", image: `${basePath}/images/Bandmates/Bass.jpg` },
  { name: "BEN", role: "Dram", image: `${basePath}/images/Bandmates/Drummer.jpg` },
  { name: "PEDANG", role: "Kibod", image: `${basePath}/images/Bandmates/Keys.jpg` },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const membersRef = useRef(null);
  const membersInView = useInView(membersRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative pt-24 pb-32 overflow-hidden backdrop-blur-md bg-black/80 border-y border-white/[0.06] grain"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-end gap-6"
          >
            <span
              className="text-[7rem] md:text-[10rem] font-black leading-none select-none font-[family-name:var(--font-montserrat)]"
              style={{ color: 'hsl(0 72.2% 50.6% / 0.12)' }}
            >
              01
            </span>
            <div className="pb-4">
              <p className="text-accent uppercase tracking-[0.35em] text-xs font-semibold mb-1">
                Siapa Kami
              </p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest font-[family-name:var(--font-montserrat)] leading-none">
                Tentang <span className="text-accent">ESTRID</span>
              </h2>
            </div>
            <div className="flex-1 h-px bg-white/10 mb-6 hidden md:block" />
          </motion.div>
        </div>

        {/* ── Story + Photo Block ── */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

          {/* Photo — LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative aspect-square">
              {/* Corner brackets */}
              <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent z-10" />
              <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-accent z-10" />
              <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-accent z-10" />
              <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent z-10" />

              {/* Image */}
              <div className="w-full h-full overflow-hidden bg-black/60 backdrop-blur-sm border border-white/[0.08]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img
                  src={`${basePath}/images/estrid-img-1.jpg`}
                  alt="ESTRID Band"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Bottom label tag */}
              <div className="absolute bottom-0 left-0 z-20 bg-accent px-3 py-1">
                <p className="text-white text-[9px] font-black uppercase tracking-[0.35em] font-[family-name:var(--font-montserrat)]">
                  ESTRID — KL
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story — RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Inline divider */}
            <div className="flex items-center gap-6 mb-2">
              <div className="w-8 h-px bg-accent" />
              <p className="text-white/30 uppercase tracking-[0.4em] text-[9px] font-semibold whitespace-nowrap">
                CERITA KAMI
              </p>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <p className="text-white/60 leading-relaxed text-sm">
              Estrid lahir dari keberanian untuk melawan kebiasaan—menyambar perhatian melalui pentas-pentas ganjil, termasuk sebuah toilet gig yang kemudian menjadi legenda. Dari situ, mereka menjelma sebagai nadi tetap scene muzik tempatan, menggegarkan malam demi malam melalui gig mingguan yang digerakkan oleh kolektif indie.
            </p>
            <p className="text-white/60 leading-relaxed text-sm">
              Single sulung mereka, &ldquo;Narsistik,&rdquo; membuka pintu kepada era baharu yang lebih liar, lebih jujur—dan ini baru permulaannya. Didorong oleh api semangat, tujuan yang jelas, dan bisikan mitologi Norse, Estrid bukan sekadar memainkan muzik. Mereka membina perjalanan cerita dan garapan emosi dalam setiap lagu.
            </p>
            <p className="text-white/60 leading-relaxed text-sm">
              Berpangkalan di Kuala Lumpur, Estrid ialah kumpulan alternative rock yang menyalurkan tenaga dan emosi &lsquo;rare&rsquo; ke setiap pentas yang mereka pijak. Muzik mereka menghentam dengan grit melodik, sarat dengan luka, amarah, dan keindahan.
            </p>
          </motion.div>
        </div>

        {/* ── Stats Strip ── */}
        <div ref={statsRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.03] border-y border-white/[0.06] py-8 mb-24"
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`flex flex-col items-center justify-center py-6 cursor-default group
                    ${index < stats.length - 1 ? 'border-r border-white/[0.06]' : ''}
                    ${index < 2 ? 'border-b border-white/[0.06] md:border-b-0' : ''}
                  `}
                >
                  <div
                    className="text-4xl md:text-5xl font-black leading-none font-[family-name:var(--font-montserrat)] mb-2 transition-colors duration-300 group-hover:text-accent"
                    style={{ color: 'hsl(0 72.2% 50.6%)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/30 uppercase tracking-[0.35em] text-[9px] font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Members Section ── */}
        <div ref={membersRef}>
          {/* Divider with label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={membersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6 mb-12"
          >
            <div className="w-8 h-px bg-accent" />
            <p className="text-white/30 uppercase tracking-[0.4em] text-[9px] font-semibold whitespace-nowrap">
              AHLI BAND
            </p>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Members Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={membersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative aspect-square overflow-hidden bg-black/60 border border-white/[0.08] group-hover:border-accent/60 transition-all duration-300">
                  {/* Corner brackets on hover */}
                  <span className="absolute -top-px -left-px w-4 h-4 border-t border-l border-accent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute -top-px -right-px w-4 h-4 border-t border-r border-accent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-accent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-accent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Photo */}
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                      <Users className="w-10 h-10 text-white/10" />
                    </div>
                  )}

                  {/* Bottom overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                  {/* Name + role overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
                    <p className="text-white text-xs font-black uppercase tracking-widest font-[family-name:var(--font-montserrat)] leading-none mb-1">
                      {member.name}
                    </p>
                    <p
                      className="text-[9px] uppercase tracking-[0.3em] font-semibold"
                      style={{ color: 'hsl(0 72.2% 50.6%)' }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

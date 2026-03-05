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
  { name: "Nama Ahli", role: "Vokalis", image: null },
  { name: "Nama Ahli", role: "Gitar Lead", image: null },
  { name: "Nama Ahli", role: "Gitar Rhythm", image: null },
  { name: "Nama Ahli", role: "Bassist", image: null },
  { name: "Nama Ahli", role: "Pemain Dram", image: null },
  { name: "Nama Ahli", role: "Kibod", image: null },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const membersRef = useRef(null);
  const membersInView = useInView(membersRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative pt-24 pb-32 bg-card grain overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">Siapa Kami</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest font-[family-name:var(--font-montserrat)] mb-4">
            Tentang <span className="text-accent">ESTRID</span>
          </h2>
          <div className="w-24 h-0.5 bg-accent mx-auto" />
        </motion.div>

        {/* Story + Photo */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden">
              {/* Red vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-black/60 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <img
                src={`${basePath}/images/estrid-img-1.jpg`}
                alt="ESTRID Band"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)]">
              Cerita Kami
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estrid lahir dari keberanian untuk melawan kebiasaan—menyambar perhatian melalui pentas-pentas ganjil, termasuk sebuah toilet gig yang kemudian menjadi legenda. Dari situ, mereka menjelma sebagai nadi tetap scene muzik tempatan, menggegarkan malam demi malam melalui gig mingguan yang digerakkan oleh kolektif indie.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Single sulung mereka, &ldquo;Narsistik,&rdquo; membuka pintu kepada era baharu yang lebih liar, lebih jujur—dan ini baru permulaannya. Didorong oleh api semangat, tujuan yang jelas, dan bisikan mitologi Norse, Estrid bukan sekadar memainkan muzik. Mereka membina perjalanan cerita dan garapan emosi dalam setiap lagu.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Berpangkalan di Kuala Lumpur, Estrid ialah kumpulan alternative rock yang menyalurkan tenaga dan emosi &lsquo;rare&rsquo; ke setiap pentas yang mereka pijak. Muzik mereka menghentam dengan grit melodik, sarat dengan luka, amarah, dan keindahan.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-background rounded-lg border border-border hover:border-accent hover:glow-red-sm transition-all duration-300 cursor-default"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
              <div className="text-3xl md:text-4xl font-bold uppercase tracking-wider font-[family-name:var(--font-montserrat)] mb-2">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Band Members */}
        <div ref={membersRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={membersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-accent uppercase tracking-[0.3em] text-sm font-semibold mb-4">Kenali Mereka</p>
            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-widest font-[family-name:var(--font-montserrat)]">
              Ahli Band
            </h3>
            <div className="w-16 h-0.5 bg-accent mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={membersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group text-center"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-background border border-border group-hover:border-accent transition-colors duration-300">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
                      <Users className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h4 className="font-bold uppercase tracking-wider text-sm font-[family-name:var(--font-montserrat)]">
                  {member.name}
                </h4>
                <p className="text-accent text-xs uppercase tracking-widest mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Music, Award, Heart } from "lucide-react";

const stats = [
  { icon: Music, label: "Jumlah Lagu", value: "3" },
  { icon: Users, label: "Ahli Band", value: "6" },
  { icon: Award, label: "Gig", value: "12" },
  { icon: Heart, label: "Penggemar Setia", value: "10K+" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="pt-12 pb-20 md:pt-20 md:pb-32 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-montserrat)] mb-4">
            Tentang <span className="text-accent">ESTRID</span>
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
                src="/images/estrid-img-1.jpg"
                alt="ESTRID Band"
                className="w-full h-full object-cover transition-all duration-500"
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
              Cerita Kami
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estrid lahir dari keberanian untuk melawan kebiasaan—menyambar perhatian melalui pentas-pentas ganjil, termasuk sebuah toilet gig yang kemudian menjadi legenda. Dari situ, mereka menjelma sebagai nadi tetap scene muzik tempatan, menggegarkan malam demi malam melalui gig mingguan yang digerakkan oleh kolektif indie. Single sulung mereka, "Narsistik," membuka pintu kepada era baharu yang lebih liar, lebih jujur—dan ini baru permulaannya.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Didorong oleh api semangat, tujuan yang jelas, dan bisikan mitologi Norse, Estrid bukan sekadar memainkan muzik. Mereka membina perjalanan cerita dan garapan emosi dalam setiap lagu-lagu mereka.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Berpangkalan di Kuala Lumpur, Malaysia, Estrid ialah sebuah kumpulan alternative rock yang bersatu dalam kekacauan terancang. Diasaskan oleh seorang pemuja roh Viking—nama dan jiwanya menjadi teras identiti band—Estrid menyalurkan tenaga dan emosi &apos;rare&apos; ke setiap pentas yang mereka pijak. Walaupun ahli-ahlinya datang dari dunia yang berbeza, namun bersatu dalam satu medan: bunyi yang keras, jujur, dan tidak berkompromi. Muzik mereka menghentam dengan grit melodik, sarat dengan luka, amarah, dan keindahan, mencerminkan pengaruh yang sekacau dan sejujur kehidupan harian mereka.
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


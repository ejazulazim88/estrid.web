"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Music2, ExternalLink } from "lucide-react";

const albums = [
  {
    id: 1,
    title: "Rebel Heart",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=2070",
    tracks: ["Breaking Free", "Midnight Rider", "Electric Soul", "Rebel Heart"],
  },
  {
    id: 2,
    title: "Thunder Road",
    year: "2022",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070",
    tracks: ["Thunder Road", "Wild Nights", "City Lights", "Never Back Down"],
  },
  {
    id: 3,
    title: "Echoes",
    year: "2020",
    cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=2074",
    tracks: ["Echoes", "Lost Highway", "Fire Within", "Shadows"],
  },
];

const platforms = [
  { name: "Spotify", icon: Music2 },
  { name: "Apple Music", icon: Music2 },
  { name: "YouTube", icon: Music2 },
  { name: "SoundCloud", icon: Music2 },
];

export default function Music() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [playingAlbum, setPlayingAlbum] = useState<number | null>(null);

  const togglePlay = (albumId: number) => {
    setPlayingAlbum(playingAlbum === albumId ? null : albumId);
  };

  return (
    <section id="music" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-montserrat)] mb-4">
            Our <span className="text-accent">Music</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our discography and listen to our latest releases
          </p>
        </motion.div>

        {/* Albums Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => togglePlay(album.id)}
                    className="w-16 h-16 rounded-full bg-accent flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    aria-label={playingAlbum === album.id ? "Pause" : "Play"}
                  >
                    {playingAlbum === album.id ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] mb-2">
                  {album.title}
                </h3>
                <p className="text-muted-foreground mb-4">{album.year}</p>
                <div className="space-y-2">
                  {album.tracks.map((track, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="text-accent">{idx + 1}.</span>
                      <span>{track}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Streaming Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] mb-8">
            Available On
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href="#"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-full hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
              >
                <platform.icon className="w-5 h-5 text-accent" />
                <span className="font-medium">{platform.name}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

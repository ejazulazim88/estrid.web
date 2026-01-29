"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Music2, ExternalLink, Youtube, Disc3 } from "lucide-react";

const platforms = [
  {
    name: "Spotify",
    icon: Disc3,
    url: "https://open.spotify.com/artist/25ABCTlTAidsKrupJUfnRu?si=jw60k9sgTRiXx6xRIoKkfQ"
  },
  {
    name: "Apple Music",
    icon: Music2,
    url: "https://music.apple.com/my/artist/estrid/1831023443"
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@EstridBand"
  },
];

export default function Music() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const albums = [
    {
      id: 1,
      title: "Narsistik",
      year: "2025",
      cover: `${basePath}/images/narsistik artwork.png`,
      tracks: ["Breaking Free", "Midnight Rider", "Electric Soul", "Rebel Heart"],
    },
    {
      id: 2,
      title: "Misery",
      year: "Akan Datang",
      cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070",
      tracks: ["Thunder Road", "Wild Nights", "City Lights", "Never Back Down"],
    },
    {
      id: 3,
      title: "Akhir",
      year: "Akan Datang",
      cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=2074",
      tracks: ["Echoes", "Lost Highway", "Fire Within", "Shadows"],
    },
  ];

  const togglePlay = (albumId: number) => {
    // Open Spotify track for Narsistik album
    if (albumId === 1) {
      window.open('https://open.spotify.com/track/10qy02MuJQsxXM4sAOwo1A?si=IN1YtW6VR9iOHJH7moYTcQ', '_blank', 'noopener,noreferrer');
    }
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
            Muzik <span className="text-accent">Kami</span>
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
                {/* Only show play button for released albums (Narsistik) */}
                {album.id === 1 && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => togglePlay(album.id)}
                      className="w-16 h-16 rounded-full bg-accent flex items-center justify-center hover:scale-110 transition-transform duration-300"
                      aria-label="Play Narsistik on Spotify"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] mb-2">
                  {album.title}
                </h3>
                <p className="text-muted-foreground mb-4">{album.year}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Official Music Video */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-montserrat)] text-center mb-8">
            Narsistik - <span className="text-accent">Official Music Video</span>
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-border hover:border-accent transition-colors duration-300"
                src="https://www.youtube.com/embed/Pw14pde3heQ"
                title="Narsistik - Official Music Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>

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
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
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

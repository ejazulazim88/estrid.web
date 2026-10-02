import type { NextConfig } from 'next'

/**
 * Static export, deployed on Vercel at the domain root (estrid.my)
 */
const nextConfig: NextConfig = {
  /** Generate plain HTML/CSS/JS — no Node.js server needed */
  output: 'export',

  /** Next.js Image Optimization isn't available in static export */
  images: {
    unoptimized: true,
  },

  trailingSlash: true,
}

export default nextConfig

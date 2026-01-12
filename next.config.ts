import type { NextConfig } from 'next'

/**
 * Next.js configuration for GitHub Pages static export
 *
 * Note: Set NEXT_PUBLIC_BASE_PATH environment variable when deploying to a repository subdirectory
 * Example: For https://username.github.io/repo-name/, set NEXT_PUBLIC_BASE_PATH=/repo-name
 * For custom domain or username.github.io, leave it empty
 */
const isProd = process.env.NODE_ENV === 'production'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig: NextConfig = {
  /**
   * Enable static export for GitHub Pages
   * This generates static HTML/CSS/JS files that can be served without a Node.js server
   */
  output: 'export',

  /**
   * Base path for GitHub Pages deployment
   * Leave empty for custom domain or username.github.io
   * Set to /repo-name for repository pages
   */
  basePath: basePath,

  /**
   * Disable image optimization for static export
   * GitHub Pages doesn't support Next.js Image Optimization API
   */
  images: {
    unoptimized: true,
  },

  /**
   * Add trailing slash to URLs for better compatibility with static hosting
   */
  trailingSlash: true,

  /**
   * Ensure proper asset prefix for GitHub Pages
   */
  assetPrefix: basePath,
}

export default nextConfig


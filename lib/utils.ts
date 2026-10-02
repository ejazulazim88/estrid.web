import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

/** Prefix a /public path with the deploy base path (e.g. /estrid.web on GitHub Pages) */
export function asset(path: string) {
  return `${basePath}${path}`
}

/** Smooth-scroll to a page section by its id */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

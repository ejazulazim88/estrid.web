import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estrid.my"),
  title: {
    default: "ESTRID | Band Rock Malaysia",
    template: "%s | ESTRID",
  },
  description:
    "ESTRID — band rock Malaysia. Muzik, jadual persembahan, galeri, dan berita terkini.",
  keywords: [
    "ESTRID",
    "band rock Malaysia",
    "muzik rock",
    "persembahan live",
    "konsert Malaysia",
    "band Malaysia",
    "rock band",
  ],
  authors: [{ name: "ESTRID" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ESTRID | Band Rock Malaysia",
    description:
      "ESTRID — band rock Malaysia. Muzik, jadual persembahan, galeri, dan berita terkini.",
    url: "https://estrid.my",
    siteName: "ESTRID",
    images: [
      {
        url: "https://estrid.my/images/og-image.png",
        width: 1248,
        height: 832,
        alt: "ESTRID Band",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESTRID | Band Rock Malaysia",
    description:
      "ESTRID — band rock Malaysia. Muzik, jadual persembahan, galeri, dan berita terkini.",
    images: ["https://estrid.my/images/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "ESTRID",
  url: "https://estrid.my",
  description:
    "ESTRID — band rock Malaysia. Muzik, jadual persembahan, galeri, dan berita terkini.",
  genre: ["Rock", "Malaysian Rock"],
  image: "https://estrid.my/images/og-image.png",
  sameAs: [] as string[],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className="dark">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}


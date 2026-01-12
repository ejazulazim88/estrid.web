import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
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
  title: "The Renegades | Rock Band",
  description: "Official website of The Renegades - A rock band bringing raw energy and powerful music to stages worldwide.",
  keywords: ["rock band", "music", "live shows", "concerts", "tour dates"],
  authors: [{ name: "The Renegades" }],
  openGraph: {
    title: "The Renegades | Rock Band",
    description: "Official website of The Renegades rock band",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


import type { Metadata } from "next";
import { Inter, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-headline",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "MichaelSoft | Coming Soon",
  description: "MichaelSoft is architecting the next generation of digital infrastructure. A new era is surfacing.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <div className="nebula-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        {children}
      </body>
    </html>
  );
}

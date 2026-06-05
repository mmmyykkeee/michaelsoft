import type { Metadata } from "next";
import { Inter, Manrope, Playfair_Display } from "next/font/google";
import Analytics from "@/components/seo/Analytics";
import GlobalSchema from "@/components/seo/GlobalSchema";
import { siteConfig } from "@/lib/seo/config";
import { buildSiteVerificationMetadata } from "@/lib/seo/verification";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";
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
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata({
    title: siteConfig.name,
    description: siteConfig.tagline,
    path: "/",
    swPath: "/sw",
    keywords: [
      "custom software Kenya",
      "AI agents Kenya",
      "procurement software Kenya",
      "product manager Nairobi",
      "MichaelSoft",
      "Michael Kembugua",
    ],
  }),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/michaelsoft_bg.jpg",
  },
  authors: [{ name: siteConfig.founder.name, url: absoluteUrl("/about") }],
  creator: siteConfig.founder.name,
  publisher: siteConfig.name,
  verification: buildSiteVerificationMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE" className={`${inter.variable} ${manrope.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Analytics />
        <GlobalSchema />
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

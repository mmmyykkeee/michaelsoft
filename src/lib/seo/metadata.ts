import type { Metadata } from "next";
import { siteConfig } from "./config";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  /** Swahili alternate path, e.g. "/sw/procurement" */
  swPath?: string;
  locale?: "en_KE" | "sw_KE";
};

function buildLanguageAlternates(path: string, swPath?: string) {
  const enUrl = absoluteUrl(path);
  const languages: Record<string, string> = {
    "en-KE": enUrl,
    "x-default": enUrl,
  };
  if (swPath) {
    languages["sw-KE"] = absoluteUrl(swPath);
  }
  return { canonical: enUrl, languages };
}

export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return path ? `${base}${normalized}` : base;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false,
  swPath,
  locale = "en_KE",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const isSw = locale === "sw_KE" || path.startsWith("/sw");
  const fullTitle = isSw
    ? `${title} | ${siteConfig.name}`
    : path === "" || path === "/"
      ? `${siteConfig.name} | Custom Software, AI Agents & Procurement Kenya`
      : `${title} | ${siteConfig.name}`;

  const enPath = isSw && path.startsWith("/sw") ? path.replace(/^\/sw/, "") || "/" : path;
  const alternates = isSw
    ? {
        canonical: url,
        languages: {
          "sw-KE": url,
          "en-KE": absoluteUrl(enPath === "" ? "/" : enPath),
          "x-default": absoluteUrl(enPath === "" ? "/" : enPath),
        },
      }
    : buildLanguageAlternates(path, swPath);

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "website",
      locale: isSw ? "sw_KE" : siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: absoluteUrl(siteConfig.defaultOgImage),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(siteConfig.defaultOgImage)],
    },
  };
}

export function createArticleMetadata({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  keywords = [],
  swPath,
  locale,
}: PageMetaInput & {
  publishedTime: string;
  modifiedTime?: string;
}): Metadata {
  const base = createPageMetadata({ title, description, path, keywords, swPath, locale });
  const url = absoluteUrl(path);

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      url,
      publishedTime,
      modifiedTime: modifiedTime ?? publishedTime,
      authors: [siteConfig.founder.name],
    },
  };
}

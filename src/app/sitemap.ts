import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/lib/case-studies/studies";
import { getAllPostSlugs } from "@/lib/insights/posts";
import { absoluteUrl } from "@/lib/seo/metadata";

const staticRoutes = [
  "",
  "/about",
  "/contact",
  "/services",
  "/services/custom-software",
  "/services/ai-agents",
  "/services/product-leadership",
  "/procurement",
  "/procurement/egp-kenya-guide",
  "/procurement/private-p2p-kenya",
  "/insights",
  "/projects",
  "/case-studies",
  "/sw",
  "/sw/about",
  "/sw/services",
  "/sw/services/custom-software",
  "/sw/services/ai-agents",
  "/sw/services/product-leadership",
  "/sw/procurement",
  "/sw/contact",
  "/sw/insights",
  "/sw/case-studies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency:
      path === "" || path.startsWith("/insights") || path === "/sw" ? "weekly" : "monthly",
    priority: path === ""
      ? 1
      : path.startsWith("/sw")
        ? 0.85
        : path.startsWith("/services") || path.startsWith("/procurement")
          ? 0.9
          : 0.7,
  }));

  const insightEntries: MetadataRoute.Sitemap = getAllPostSlugs().flatMap((slug) => [
    {
      url: absoluteUrl(`/insights/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl(`/sw/insights/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ]);

  const caseStudyEntries: MetadataRoute.Sitemap = getAllCaseStudySlugs().flatMap((slug) => [
    {
      url: absoluteUrl(`/case-studies/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: absoluteUrl(`/sw/case-studies/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [...staticEntries, ...insightEntries, ...caseStudyEntries];
}

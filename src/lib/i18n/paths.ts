import { getAllCaseStudySlugs } from "@/lib/case-studies/studies";
import { getAllPostSlugs } from "@/lib/insights/posts";

/** English path → Swahili path for language switcher and hreflang */
export function buildSwPathMap(): Record<string, string> {
  const map: Record<string, string> = {
    "/": "/sw",
    "/about": "/sw/about",
    "/contact": "/sw/contact",
    "/services": "/sw/services",
    "/procurement": "/sw/procurement",
    "/insights": "/sw/insights",
    "/case-studies": "/sw/case-studies",
    "/services/custom-software": "/sw/services/custom-software",
    "/services/ai-agents": "/sw/services/ai-agents",
    "/services/product-leadership": "/sw/services/product-leadership",
    "/procurement/egp-kenya-guide": "/sw/procurement/egp-kenya-guide",
    "/procurement/private-p2p-kenya": "/sw/procurement/private-p2p-kenya",
  };

  for (const slug of getAllPostSlugs()) {
    map[`/insights/${slug}`] = `/sw/insights/${slug}`;
  }

  for (const slug of getAllCaseStudySlugs()) {
    map[`/case-studies/${slug}`] = `/sw/case-studies/${slug}`;
  }

  return map;
}

export const swPathByEn = buildSwPathMap();

export const enPathBySw: Record<string, string> = Object.fromEntries(
  Object.entries(swPathByEn).map(([en, swPath]) => [swPath, en])
);

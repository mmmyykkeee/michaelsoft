import JsonLd from "./JsonLd";
import { absoluteUrl } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/config";

const sameAs = [
  siteConfig.founder.linkedIn,
  siteConfig.founder.github,
].filter(Boolean);

export default function GlobalSchema() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.tagline,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: {
      "@type": "Country",
      name: siteConfig.country,
    },
    founder: { "@id": `${absoluteUrl("/")}#person` },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl("/")}#person`,
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.jobTitle,
    worksFor: { "@id": `${absoluteUrl("/")}#organization` },
    url: absoluteUrl("/about"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    knowsAbout: [
      "Custom software development",
      "AI agents",
      "Procurement systems",
      "Product management",
      "Kenya e-procurement",
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl("/")}#service`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.tagline,
    areaServed: {
      "@type": "Country",
      name: siteConfig.country,
    },
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    serviceType: [
      "Custom software development",
      "AI agent development",
      "Procurement software consulting",
      "Product leadership",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
    inLanguage: "en-KE",
  };

  return <JsonLd data={[organization, person, professionalService, website]} />;
}

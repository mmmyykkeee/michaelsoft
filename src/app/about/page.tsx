import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo/config";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About Michael Kembugua & MichaelSoft",
  description:
    "Michael Kembugua is a product leader and software builder in Kenya, founding MichaelSoft to deliver custom software, AI agents, and procurement systems.",
  path: "/about",
  swPath: "/sw/about",
  keywords: ["Michael Kembugua", "MichaelSoft Kenya", "software founder Nairobi"],
});

export default function AboutPage() {
  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.jobTitle,
      worksFor: { "@type": "Organization", name: siteConfig.name },
      description:
        "Product leader and software builder specializing in custom applications, AI agents, and procurement digitization in Kenya.",
      url: absoluteUrl("/about"),
    },
  };

  return (
    <ContentLayout breadcrumbs={[{ label: "About" }]} currentPath="/about">
      <JsonLd data={profilePage} />
      <PageHero
        eyebrow="About"
        title={`${siteConfig.founder.name} · ${siteConfig.name}`}
        lead="MichaelSoft is a Kenya-focused software practice combining product leadership with hands-on engineering—custom apps, AI agents, and procurement systems that ship in the real world."
      />
      <Prose>
        <p>
          <strong>{siteConfig.founder.name}</strong> leads {siteConfig.name} as founder and product leader. The
          practice exists to help organizations move from spreadsheets and fragmented tools to reliable digital
          workflows—especially in procurement, operations, and customer-facing software.
        </p>
        <h2>What we do</h2>
        <ul>
          <li>Custom software development for web and internal tools</li>
          <li>Custom AI agents with human-in-the-loop approvals</li>
          <li>Procurement and procure-to-pay digitization for Kenyan businesses</li>
          <li>Product discovery, roadmaps, and phased delivery leadership</li>
        </ul>
        <h2>Why Kenya-first</h2>
        <p>
          Local context matters: M-Pesa reconciliation, county and national procurement rules, ERP landscapes
          (Sage, QuickBooks, SAP), and teams that collaborate on WhatsApp before they adopt new software. We design
          for that reality instead of copying playbooks from other markets.
        </p>
        <h2>How we work</h2>
        <p>
          Engagements start with discovery—mapping approvals, data sources, and success metrics—then ship in phases
          so stakeholders see value within weeks, not quarters. Engineering and product stay aligned because the same
          leadership owns both.
        </p>
      </Prose>
      <CtaBand />
    </ContentLayout>
  );
}

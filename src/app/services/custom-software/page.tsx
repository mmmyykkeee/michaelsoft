import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import FaqSection from "@/components/seo/FaqSection";
import { customSoftwareFaqs } from "@/lib/seo/faqs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Custom Software Development Kenya",
  description:
    "Custom software development in Kenya by MichaelSoft—web apps, internal tools, ERP integrations, and product-led delivery.",
  path: "/services/custom-software",
  swPath: "/sw/services/custom-software",
  keywords: [
    "custom software development Kenya",
    "software company Nairobi",
    "web application development Kenya",
  ],
});

export default function CustomSoftwarePage() {
  return (
    <ContentLayout
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Custom software" },
      ]}
      currentPath="/services/custom-software"
    >
      <PageHero
        eyebrow="Custom software"
        title="Custom software development in Kenya"
        lead="MichaelSoft designs and builds applications aligned to how your team actually works—integrations, approvals, and UX included—not generic templates."
      />
      <Prose>
        <p>
          Whether you need a customer portal, operations dashboard, or internal tool replacing spreadsheets, we
          start with product discovery and ship iteratively. Our stack favors maintainable Next.js and modern APIs
          with secure auth and observability.
        </p>
        <h2>Typical projects</h2>
        <ul>
          <li>Multi-branch operations and inventory dashboards</li>
          <li>Customer and vendor portals with role-based access</li>
          <li>Integrations with Supabase, PostgreSQL, REST APIs, and ERP exports</li>
          <li>Migration from legacy PHP or Excel-driven processes</li>
        </ul>
        <h2>Delivery approach</h2>
        <p>
          Fixed-scope MVPs, then roadmap phases tied to metrics: time saved, error reduction, or revenue enabled.
          You work directly with leadership that writes code and owns the roadmap.
        </p>
      </Prose>
      <FaqSection faqs={customSoftwareFaqs} />
      <CtaBand />
    </ContentLayout>
  );
}

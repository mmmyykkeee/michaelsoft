import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import FaqSection from "@/components/seo/FaqSection";
import { egpFaqs } from "@/lib/seo/faqs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "e-GP Kenya Guide — EGP-KENYA Registration & Compliance",
  description:
    "Guide to Kenya's Electronic Government Procurement (e-GP) and EGP-KENYA registration for suppliers, with practical steps for 2026.",
  path: "/procurement/egp-kenya-guide",
  keywords: [
    "e-GP Kenya",
    "EGP-KENYA registration",
    "egpkenya supplier signup",
    "electronic government procurement Kenya",
  ],
});

export default function EgpKenyaGuidePage() {
  return (
    <ContentLayout
      breadcrumbs={[
        { label: "Procurement", href: "/procurement" },
        { label: "e-GP Kenya guide" },
      ]}
    >
      <PageHero
        eyebrow="e-GP · Kenya"
        title="e-GP Kenya guide: EGP-KENYA registration & what comes next"
        lead="Kenya's National Treasury rolled out end-to-end electronic government procurement on EGP-KENYA. This guide explains who must register, what the portal does, and how to prepare your business beyond the login."
      />
      <Prose>
        <h2>Official portal</h2>
        <p>
          All government procurement processes run through{" "}
          <a href="https://egpkenya.go.ke" target="_blank" rel="noopener noreferrer">
            https://egpkenya.go.ke
          </a>
          . Suppliers, contractors, and consultants must self-register to participate in tenders, track awards, and
          manage contracts digitally.
        </p>
        <h2>Key dates and context</h2>
        <p>
          From 1 July 2025, procurements through national and county government are conducted on e-GP. The reform
          targets transparency, faster cycles, and standardized data for planning and audit. Public procurement
          represents a large share of Kenya&apos;s annual budget—compliance is strategic for vendors serving government.
        </p>
        <h2>Registration checklist</h2>
        <ul>
          <li>Company registration documents and tax compliance (PIN)</li>
          <li>Bank details and authorized signatories</li>
          <li>Contact persons for procurement notifications</li>
          <li>Category codes relevant to your goods, works, or services</li>
          <li>Training: use supplier training resources on the portal</li>
        </ul>
        <h2>Beyond registration</h2>
        <p>
          Winning government business still depends on pricing, delivery capacity, and compliance evidence.
          MichaelSoft helps suppliers and partners build internal quote management, document storage, and finance
          handoffs so e-GP is not the only digital system in your operation.
        </p>
        <h2>Support channels (verify on portal)</h2>
        <p>
          The National Treasury publishes support email and phone on egpkenya.go.ke, plus webinars and Huduma Centre
          assistance. Always confirm current contacts on the official site.
        </p>
      </Prose>
      <FaqSection faqs={egpFaqs} />
      <CtaBand />
    </ContentLayout>
  );
}

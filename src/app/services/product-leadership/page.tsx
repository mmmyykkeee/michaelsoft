import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import FaqSection from "@/components/seo/FaqSection";
import { productLeadershipFaqs } from "@/lib/seo/faqs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Product Leadership & Product Manager Kenya",
  description:
    "Fractional product leadership in Kenya—discovery, roadmaps, and delivery for software and procurement digitization.",
  path: "/services/product-leadership",
  swPath: "/sw/services/product-leadership",
  keywords: [
    "product manager Kenya",
    "fractional CPO Nairobi",
    "product consultant East Africa",
  ],
});

export default function ProductLeadershipPage() {
  return (
    <ContentLayout
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Product leadership" },
      ]}
      currentPath="/services/product-leadership"
    >
      <PageHero
        eyebrow="Product leadership"
        title="Product leadership for complex digitization"
        lead="Michael Kembugua brings product management discipline to software and procurement programs—so engineering builds the right thing, in the right order."
      />
      <Prose>
        <p>
          Many digitization efforts fail at the process layer, not the technology layer. We facilitate workshops with
          finance, operations, and IT to map workflows, define MVPs, and align executives on phased investment.
        </p>
        <h2>Engagement models</h2>
        <ul>
          <li>Discovery sprints before major builds or vendor selection</li>
          <li>Fractional product leadership alongside your engineering team</li>
          <li>End-to-end delivery leadership when MichaelSoft also builds</li>
        </ul>
        <h2>Outcomes we target</h2>
        <p>
          Shorter procurement cycle times, fewer manual handoffs, clear ownership of product decisions, and roadmaps
          stakeholders can explain to boards and donors.
        </p>
      </Prose>
      <FaqSection faqs={productLeadershipFaqs} />
      <CtaBand />
    </ContentLayout>
  );
}

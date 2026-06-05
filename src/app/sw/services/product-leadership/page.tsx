import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import FaqSection from "@/components/seo/FaqSection";
import { servicePagesSw } from "@/lib/i18n/service-pages-sw";
import { productLeadershipFaqsSw } from "@/lib/seo/faqs-sw";
import { createPageMetadata } from "@/lib/seo/metadata";

const content = servicePagesSw.productLeadership;

export const metadata = createPageMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: "/sw/services/product-leadership",
  locale: "sw_KE",
});

export default function SwProductLeadershipPage() {
  return (
    <ContentLayout
      locale="sw"
      currentPath="/sw/services/product-leadership"
      breadcrumbs={[
        { label: "Huduma", href: "/sw/services" },
        { label: "Uongozi wa bidhaa" },
      ]}
    >
      <PageHero title={content.hero.title} lead={content.hero.lead} />
      <Prose>
        <p>{content.body.intro}</p>
        <h2>{content.body.h2Models}</h2>
        <ul>
          {content.body.models.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <h2>{content.body.h2Outcomes}</h2>
        <p>{content.body.outcomes}</p>
      </Prose>
      <FaqSection title="Maswali yanayoulizwa mara kwa mara" faqs={productLeadershipFaqsSw} />
      <CtaBand locale="sw" />
    </ContentLayout>
  );
}

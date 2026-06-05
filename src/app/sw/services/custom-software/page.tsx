import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import FaqSection from "@/components/seo/FaqSection";
import { servicePagesSw } from "@/lib/i18n/service-pages-sw";
import { customSoftwareFaqsSw } from "@/lib/seo/faqs-sw";
import { createPageMetadata } from "@/lib/seo/metadata";

const content = servicePagesSw.customSoftware;

export const metadata = createPageMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: "/sw/services/custom-software",
  locale: "sw_KE",
});

export default function SwCustomSoftwarePage() {
  return (
    <ContentLayout
      locale="sw"
      currentPath="/sw/services/custom-software"
      breadcrumbs={[
        { label: "Huduma", href: "/sw/services" },
        { label: "Programu maalum" },
      ]}
    >
      <PageHero title={content.hero.title} lead={content.hero.lead} />
      <Prose>
        <p>{content.body.intro}</p>
        <h2>{content.body.h2Projects}</h2>
        <ul>
          {content.body.projects.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <h2>{content.body.h2Delivery}</h2>
        <p>{content.body.delivery}</p>
      </Prose>
      <FaqSection title="Maswali yanayoulizwa mara kwa mara" faqs={customSoftwareFaqsSw} />
      <CtaBand locale="sw" />
    </ContentLayout>
  );
}

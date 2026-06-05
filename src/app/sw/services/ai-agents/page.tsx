import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import FaqSection from "@/components/seo/FaqSection";
import { servicePagesSw } from "@/lib/i18n/service-pages-sw";
import { aiAgentsFaqsSw } from "@/lib/seo/faqs-sw";
import { createPageMetadata } from "@/lib/seo/metadata";

const content = servicePagesSw.aiAgents;

export const metadata = createPageMetadata({
  title: content.meta.title,
  description: content.meta.description,
  path: "/sw/services/ai-agents",
  locale: "sw_KE",
});

export default function SwAiAgentsPage() {
  return (
    <ContentLayout
      locale="sw"
      currentPath="/sw/services/ai-agents"
      breadcrumbs={[
        { label: "Huduma", href: "/sw/services" },
        { label: "Mawakala wa AI" },
      ]}
    >
      <PageHero title={content.hero.title} lead={content.hero.lead} />
      <Prose>
        <p>{content.body.intro}</p>
        <h2>{content.body.h2UseCases}</h2>
        <ul>
          {content.body.useCases.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
        <h2>{content.body.h2Safety}</h2>
        <p>{content.body.safety}</p>
      </Prose>
      <FaqSection title="Maswali yanayoulizwa mara kwa mara" faqs={aiAgentsFaqsSw} />
      <CtaBand locale="sw" />
    </ContentLayout>
  );
}

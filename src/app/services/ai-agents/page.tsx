import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import FaqSection from "@/components/seo/FaqSection";
import { aiAgentsFaqs } from "@/lib/seo/faqs";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Custom AI Agents for Business Kenya",
  description:
    "Build custom AI agents in Kenya for procurement approvals, support, and internal knowledge—with guardrails and integrations.",
  path: "/services/ai-agents",
  swPath: "/sw/services/ai-agents",
  keywords: ["custom AI agents Kenya", "AI automation business", "enterprise AI agents"],
});

export default function AiAgentsPage() {
  return (
    <ContentLayout
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "AI agents" },
      ]}
      currentPath="/services/ai-agents"
    >
      <PageHero
        eyebrow="AI agents"
        title="Custom AI agents for Kenyan businesses"
        lead="Agents that complete real tasks—routing approvals, answering policy questions, summarizing tenders—with your data, your rules, and human oversight."
      />
      <Prose>
        <p>
          We build agent systems, not demos: retrieval over your documents, tool calls to email or ERP APIs, and
          evaluation suites so quality is measurable before rollout.
        </p>
        <h2>Use cases we implement</h2>
        <ul>
          <li>Procurement and finance approval assistants</li>
          <li>Customer support tier-1 with escalation to humans</li>
          <li>Tender and contract document Q&A with citations</li>
          <li>Operations playbooks for distributed teams</li>
        </ul>
        <h2>Responsible automation</h2>
        <p>
          High-impact actions require explicit approval. We document data boundaries and logging so IT and finance
          stakeholders can trust the system.
        </p>
      </Prose>
      <FaqSection faqs={aiAgentsFaqs} />
      <CtaBand />
    </ContentLayout>
  );
}

import Link from "next/link";
import ContentLayout, { CtaBand, PageHero } from "@/components/seo/ContentLayout";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Services — Custom Software, AI Agents & Product Leadership",
  description:
    "MichaelSoft services in Kenya: custom software development, custom AI agents, procurement systems, and product leadership.",
  path: "/services",
  swPath: "/sw/services",
  keywords: ["software services Kenya", "AI development Kenya", "procurement consulting"],
});

const services = [
  {
    href: "/services/custom-software",
    title: "Custom software development",
    description: "Web apps, internal tools, and integrations built for your workflows in Kenya.",
  },
  {
    href: "/services/ai-agents",
    title: "Custom AI agents",
    description: "Agents for approvals, support, and document Q&A—with guardrails and human sign-off.",
  },
  {
    href: "/services/product-leadership",
    title: "Product leadership",
    description: "Discovery, roadmaps, and delivery leadership for complex digitization programs.",
  },
  {
    href: "/procurement",
    title: "Procurement systems",
    description: "Procure-to-pay, vendor management, and e-GP-aligned workflows for Kenyan organizations.",
  },
  {
    href: "/case-studies",
    title: "Case studies",
    description: "Delivery stories: procurement workflows, AI agents, and ERP integration in Kenya.",
  },
];

export default function ServicesPage() {
  return (
    <ContentLayout breadcrumbs={[{ label: "Services" }]} currentPath="/services">
      <PageHero
        eyebrow="Services"
        title="Software, AI agents & product leadership in Kenya"
        lead="MichaelSoft helps teams ship custom software and automation with clear product ownership—from discovery through production."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="block p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 transition-all no-underline group"
          >
            <h2 className="font-headline text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
              {service.title}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
          </Link>
        ))}
      </div>
      <CtaBand />
    </ContentLayout>
  );
}

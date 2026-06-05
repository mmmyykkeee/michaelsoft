import Link from "next/link";
import ContentLayout, { CtaBand, PageHero } from "@/components/seo/ContentLayout";
import { caseStudies, getClientLabel } from "@/lib/case-studies/studies";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Case Studies — Software & Procurement Kenya",
  description:
    "MichaelSoft case studies: MichaelSoft Procurement Terminal, procurement workflows, custom AI agents, and ERP integration in Kenya.",
  path: "/case-studies",
  swPath: "/sw/case-studies",
  keywords: ["software case studies Kenya", "procurement project Kenya", "AI agent case study"],
});

export default function CaseStudiesPage() {
  const sorted = [...caseStudies].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <ContentLayout breadcrumbs={[{ label: "Case studies" }]} currentPath="/case-studies">
      <PageHero
        eyebrow="Case studies"
        title="Real delivery stories from Kenya"
        lead="Named work where we have permission to publish, and anonymized engagements with verified metrics from production or pilot phases."
      />
      <ul className="space-y-6 list-none">
        {sorted.map((study) => (
          <li key={study.slug}>
            <article className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/20 transition-all">
              <p className="text-[0.6rem] text-primary tracking-widest font-headline font-bold mb-2">
                {getClientLabel(study.client)} · {study.industry}
              </p>
              <h2 className="font-headline text-xl font-bold text-white mb-3">
                <Link href={`/case-studies/${study.slug}`} className="no-underline hover:text-primary transition-colors">
                  {study.title}
                </Link>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{study.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {study.metrics.slice(0, 4).map((m) => (
                  <div key={m.label} className="text-center p-2 rounded border border-white/5">
                    <p className="text-[0.5rem] text-white/30 uppercase tracking-wider">{m.label}</p>
                    <p className="text-xs font-bold text-white/80">{m.value}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/case-studies/${study.slug}`}
                className="text-primary text-[0.65rem] font-headline tracking-widest no-underline hover:underline"
              >
                Read case study →
              </Link>
            </article>
          </li>
        ))}
      </ul>
      <CtaBand />
    </ContentLayout>
  );
}

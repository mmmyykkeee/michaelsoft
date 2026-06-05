import Link from "next/link";
import ContentLayout, { CtaBand, PageHero } from "@/components/seo/ContentLayout";
import { getCaseStudiesSw, getClientLabel } from "@/lib/case-studies/studies-sw";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Masomo ya Kesi — Programu na Ununuzi Kenya",
  description:
    "Masomo ya kesi ya MichaelSoft: Procurement Terminal, michakato ya ununuzi, na mawakala wa AI nchini Kenya.",
  path: "/sw/case-studies",
  locale: "sw_KE",
});

export default function SwCaseStudiesPage() {
  const sorted = [...getCaseStudiesSw()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <ContentLayout locale="sw" currentPath="/sw/case-studies" breadcrumbs={[{ label: "Masomo ya kesi" }]}>
      <PageHero
        eyebrow="Masomo ya kesi"
        title="Hadithi halisi za uwasilishaji kutoka Kenya"
        lead="Kazi iliyoorodheshwa kwa idhini, na miradi iliyofichwa jina la mteja yenye vipimo kutoka uzalishaji au majaribio."
      />
      <ul className="space-y-6 list-none">
        {sorted.map((study) => (
          <li key={study.slug}>
            <article className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/20 transition-all">
              <p className="text-[0.6rem] text-primary tracking-widest font-headline font-bold mb-2">
                {getClientLabel(study.client)} · {study.industry}
              </p>
              <h2 className="font-headline text-xl font-bold text-white mb-3">
                <Link href={`/sw/case-studies/${study.slug}`} className="no-underline hover:text-primary transition-colors">
                  {study.title}
                </Link>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{study.description}</p>
              <Link
                href={`/sw/case-studies/${study.slug}`}
                className="text-primary text-[0.65rem] font-headline tracking-widest no-underline hover:underline"
              >
                Soma somo la kesi →
              </Link>
            </article>
          </li>
        ))}
      </ul>
      <CtaBand locale="sw" />
    </ContentLayout>
  );
}

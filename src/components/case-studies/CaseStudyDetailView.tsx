import Link from "next/link";
import {
  CaseStudyClientBadge,
  MetricsGrid,
  PermissionNote,
} from "@/components/case-studies/CaseStudyMetrics";
import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import JsonLd from "@/components/seo/JsonLd";
import type { CaseStudy } from "@/lib/case-studies/studies";
import { siteConfig } from "@/lib/seo/config";
import { absoluteUrl } from "@/lib/seo/metadata";

type CaseStudyDetailViewProps = {
  study: CaseStudy;
  locale: "en" | "sw";
};

export default function CaseStudyDetailView({ study, locale }: CaseStudyDetailViewProps) {
  const isSw = locale === "sw";
  const path = isSw ? `/sw/case-studies/${study.slug}` : `/case-studies/${study.slug}`;
  const listHref = isSw ? "/sw/case-studies" : "/case-studies";
  const listLabel = isSw ? "Masomo ya kesi" : "Case studies";
  const challenge = isSw ? "Changamoto" : "Challenge";
  const solution = isSw ? "Suluhisho" : "Solution";
  const resultsLabel = isSw ? "Matokeo" : "Results";
  const servicesLabel = isSw ? "Huduma zilizotolewa" : "Services delivered";
  const readAll = isSw ? "← Masomo yote ya kesi" : "← All case studies";
  const altLang = isSw ? "Read in English" : "Soma kwa Kiswahili";
  const altHref = isSw ? `/case-studies/${study.slug}` : `/sw/case-studies/${study.slug}`;

  return (
    <ContentLayout
      locale={isSw ? "sw" : "en"}
      currentPath={path}
      breadcrumbs={[
        { label: listLabel, href: listHref },
        { label: study.title },
      ]}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.description,
          datePublished: study.publishedAt,
          inLanguage: isSw ? "sw-KE" : "en-KE",
          author: { "@type": "Person", name: siteConfig.founder.name },
          publisher: { "@type": "Organization", name: siteConfig.name },
          mainEntityOfPage: absoluteUrl(path),
        }}
      />
      <PageHero eyebrow={study.industry} title={study.title} lead={study.description} />
      <CaseStudyClientBadge study={study} />
      <MetricsGrid metrics={study.metrics} />
      <PermissionNote note={study.permissionNote} />
      <Prose>
        <h2>{challenge}</h2>
        <p>{study.challenge}</p>
        <h2>{solution}</h2>
        <p>{study.solution}</p>
        <h2>{resultsLabel}</h2>
        <ul>
          {study.results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <h2>{servicesLabel}</h2>
        <ul>
          {study.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Prose>
      <p className="mt-8 text-sm text-slate-500">
        <Link href={listHref} className="text-primary no-underline hover:underline">
          {readAll}
        </Link>
        {" · "}
        <Link href={altHref} className="text-primary no-underline hover:underline" hrefLang={isSw ? "en-KE" : "sw-KE"}>
          {altLang}
        </Link>
      </p>
      <CtaBand locale={isSw ? "sw" : "en"} />
    </ContentLayout>
  );
}

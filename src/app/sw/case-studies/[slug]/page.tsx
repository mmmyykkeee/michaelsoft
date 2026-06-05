import { notFound } from "next/navigation";
import CaseStudyDetailView from "@/components/case-studies/CaseStudyDetailView";
import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/case-studies/studies";
import { getCaseStudySw } from "@/lib/case-studies/studies-sw";
import { createArticleMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudySw(slug);
  if (!study) return {};

  return createArticleMetadata({
    title: study.title,
    description: study.description,
    path: `/sw/case-studies/${slug}`,
    locale: "sw_KE",
    keywords: study.keywords,
    publishedTime: study.publishedAt,
  });
}

export default async function SwCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudySw(slug);
  if (!study) notFound();
  if (!getCaseStudy(slug)) notFound();

  return <CaseStudyDetailView study={study} locale="sw" />;
}

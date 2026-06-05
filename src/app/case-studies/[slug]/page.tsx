import { notFound } from "next/navigation";
import CaseStudyDetailView from "@/components/case-studies/CaseStudyDetailView";
import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/case-studies/studies";
import { createArticleMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return createArticleMetadata({
    title: study.title,
    description: study.description,
    path: `/case-studies/${slug}`,
    swPath: `/sw/case-studies/${slug}`,
    keywords: study.keywords,
    publishedTime: study.publishedAt,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return <CaseStudyDetailView study={study} locale="en" />;
}

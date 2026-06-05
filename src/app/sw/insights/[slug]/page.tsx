import { notFound } from "next/navigation";
import InsightArticleView from "@/components/insights/InsightArticleView";
import { getAllPostSlugs, getPostBySlug } from "@/lib/insights/posts";
import { createArticleMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "sw");
  if (!post) return {};

  return createArticleMetadata({
    title: post.title,
    description: post.description,
    path: `/sw/insights/${slug}`,
    locale: "sw_KE",
    keywords: post.keywords,
    publishedTime: post.publishedAt,
    modifiedTime: post.modifiedAt,
  });
}

export default async function SwInsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "sw");
  if (!post) notFound();

  return <InsightArticleView post={post} slug={slug} locale="sw" />;
}

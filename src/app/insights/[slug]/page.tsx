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
  const post = getPostBySlug(slug, "en");
  if (!post) return {};

  return createArticleMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${slug}`,
    swPath: `/sw/insights/${slug}`,
    keywords: post.keywords,
    publishedTime: post.publishedAt,
    modifiedTime: post.modifiedAt,
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");
  if (!post) notFound();

  return <InsightArticleView post={post} slug={slug} locale="en" />;
}

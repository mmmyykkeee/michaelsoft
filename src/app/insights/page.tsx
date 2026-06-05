import Link from "next/link";
import ContentLayout, { PageHero } from "@/components/seo/ContentLayout";
import { insightPosts } from "@/lib/insights/posts";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Insights — Procurement, AI Agents & Software in Kenya",
  description:
    "Expert articles on Kenya e-GP, procurement software, custom AI agents, and product leadership from MichaelSoft.",
  path: "/insights",
  swPath: "/sw/insights",
  keywords: ["procurement blog Kenya", "AI agents articles", "software insights Kenya"],
});

export default function InsightsPage() {
  const sorted = [...insightPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <ContentLayout breadcrumbs={[{ label: "Insights" }]} currentPath="/insights">
      <PageHero
        eyebrow="Insights"
        title="Procurement, AI & product leadership in Kenya"
        lead="Practical guides from practitioners building software and procurement systems—not generic AI content."
      />
      <ul className="space-y-6 list-none">
        {sorted.map((post) => (
          <li key={post.slug}>
            <article className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/20 transition-all">
              <time dateTime={post.publishedAt} className="text-[0.6rem] text-white/40 tracking-widest font-headline">
                {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {post.readingMinutes} min read
              </time>
              <h2 className="font-headline text-xl font-bold text-white mt-3 mb-3">
                <Link href={`/insights/${post.slug}`} className="no-underline hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">{post.description}</p>
              <Link
                href={`/insights/${post.slug}`}
                className="inline-block mt-4 text-primary text-[0.65rem] font-headline tracking-widest no-underline hover:underline"
              >
                Read article →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
}

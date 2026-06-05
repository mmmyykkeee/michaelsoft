import Link from "next/link";
import ContentLayout, { PageHero } from "@/components/seo/ContentLayout";
import { insightPostsSw } from "@/lib/insights/posts-sw";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Maarifa — Ununuzi, Mawakala wa AI na Programu Kenya",
  description:
    "Makala za MichaelSoft kuhusu e-GP, programu ya ununuzi, mawakala wa AI, na uongozi wa bidhaa nchini Kenya.",
  path: "/sw/insights",
  locale: "sw_KE",
});

export default function SwInsightsPage() {
  const sorted = [...insightPostsSw].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <ContentLayout locale="sw" currentPath="/sw/insights" breadcrumbs={[{ label: "Maarifa" }]}>
      <PageHero
        eyebrow="Maarifa"
        title="Ununuzi, AI na uongozi wa bidhaa nchini Kenya"
        lead="Mwongozo wa vitendo kutoka kwa wajenzi wa programu na mifumo ya ununuzi."
      />
      <ul className="space-y-6 list-none">
        {sorted.map((post) => (
          <li key={post.slug}>
            <article className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/20 transition-all">
              <time dateTime={post.publishedAt} className="text-[0.6rem] text-white/40 tracking-widest font-headline">
                {new Date(post.publishedAt).toLocaleDateString("sw-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · dakika {post.readingMinutes}
              </time>
              <h2 className="font-headline text-xl font-bold text-white mt-3 mb-3">
                <Link href={`/sw/insights/${post.slug}`} className="no-underline hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">{post.description}</p>
              <div className="flex gap-4 mt-4">
                <Link
                  href={`/sw/insights/${post.slug}`}
                  className="text-primary text-[0.65rem] font-headline tracking-widest no-underline hover:underline"
                >
                  Soma makala →
                </Link>
                <Link
                  href={`/insights/${post.slug}`}
                  className="text-white/40 text-[0.65rem] font-headline tracking-widest no-underline hover:text-primary"
                  hrefLang="en-KE"
                >
                  English
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
}

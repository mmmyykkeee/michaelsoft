import Link from "next/link";
import ContentLayout, { CtaBand, Prose } from "@/components/seo/ContentLayout";
import JsonLd from "@/components/seo/JsonLd";
import type { InsightLocale, InsightPost } from "@/lib/insights/posts";
import { insightEnPath, insightSwPath } from "@/lib/insights/posts";
import { siteConfig } from "@/lib/seo/config";
import { absoluteUrl } from "@/lib/seo/metadata";

type InsightArticleViewProps = {
  post: InsightPost;
  slug: string;
  locale: InsightLocale;
};

export default function InsightArticleView({ post, slug, locale }: InsightArticleViewProps) {
  const isSw = locale === "sw";
  const path = isSw ? insightSwPath(slug) : insightEnPath(slug);
  const insightsLabel = isSw ? "Maarifa" : "Insights";
  const insightsHref = isSw ? "/sw/insights" : "/insights";
  const aboutHref = isSw ? "/sw/about" : "/about";
  const writtenBy = isSw ? "Imeandikwa na" : "Written by";
  const readAll = isSw ? "← Maarifa yote" : "← All insights";
  const dateLocale = isSw ? "sw-KE" : "en-KE";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt ?? post.publishedAt,
    inLanguage: isSw ? "sw-KE" : "en-KE",
    author: {
      "@type": "Person",
      name: siteConfig.founder.name,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(path),
    keywords: post.keywords.join(", "),
  };

  return (
    <ContentLayout
      locale={isSw ? "sw" : "en"}
      currentPath={path}
      breadcrumbs={[
        { label: insightsLabel, href: insightsHref },
        { label: post.title },
      ]}
    >
      <JsonLd data={articleSchema} />
      <article>
        <header className="mb-10">
          <time
            dateTime={post.publishedAt}
            className="text-[0.6rem] text-[#00ff88] tracking-[0.2em] font-headline font-bold"
          >
            {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readingMinutes} min{isSw ? "" : " read"}
          </time>
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            {post.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">{post.description}</p>
          <p className="mt-4 text-xs">
            <Link
              href={isSw ? insightEnPath(slug) : insightSwPath(slug)}
              className="text-primary no-underline hover:underline"
              hrefLang={isSw ? "en-KE" : "sw-KE"}
            >
              {isSw ? "Read in English" : "Soma kwa Kiswahili"}
            </Link>
          </p>
        </header>

        <Prose>
          {post.sections.map((section) => (
            <div key={section.heading ?? section.paragraphs[0]?.slice(0, 40)}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          ))}
        </Prose>

        <p className="mt-10 text-sm text-slate-500">
          {writtenBy}{" "}
          <Link href={aboutHref} className="text-primary no-underline hover:underline">
            {siteConfig.founder.name}
          </Link>
          , {siteConfig.name}.
        </p>
      </article>
      <p className="mt-4">
        <Link href={insightsHref} className="text-sm text-primary no-underline hover:underline">
          {readAll}
        </Link>
      </p>
      <CtaBand locale={isSw ? "sw" : "en"} />
    </ContentLayout>
  );
}

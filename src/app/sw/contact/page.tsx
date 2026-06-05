import ContentLayout, { PageHero } from "@/components/seo/ContentLayout";
import JsonLd from "@/components/seo/JsonLd";
import { sw } from "@/lib/i18n/sw";
import { contactLinks, siteConfig } from "@/lib/seo/config";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Wasiliana na MichaelSoft Kenya",
  description: "Wasiliana na MichaelSoft kwa programu, AI, na ununuzi nchini Kenya.",
  path: "/sw/contact",
  locale: "sw_KE",
});

export default function SwContactPage() {
  return (
    <ContentLayout locale="sw" currentPath="/sw/contact" breadcrumbs={[{ label: sw.nav.contact }]}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/sw/contact"),
          inLanguage: "sw-KE",
          mainEntity: {
            "@type": "Organization",
            name: siteConfig.name,
            telephone: siteConfig.phone,
            email: siteConfig.email,
          },
        }}
      />
      <PageHero title={sw.contact.title} lead={sw.contact.lead} />
      <div className="grid md:grid-cols-3 gap-6">
        <a
          href={contactLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-8 rounded-2xl border border-white/10 bg-white/5 text-center no-underline hover:border-primary/30"
        >
          <h2 className="font-headline text-sm font-bold text-white mb-2">WhatsApp</h2>
          <p className="text-xs text-slate-400">Haraka kwa mazungumzo</p>
        </a>
        <a href={contactLinks.tel} className="block p-8 rounded-2xl border border-white/10 bg-white/5 text-center no-underline">
          <h2 className="font-headline text-sm font-bold text-white mb-2">Simu</h2>
          <p className="text-xs text-slate-400">{siteConfig.phone}</p>
        </a>
        <a href={contactLinks.email} className="block p-8 rounded-2xl border border-white/10 bg-white/5 text-center no-underline">
          <h2 className="font-headline text-sm font-bold text-white mb-2">Barua pepe</h2>
          <p className="text-xs text-slate-400 break-all">{siteConfig.email}</p>
        </a>
      </div>
    </ContentLayout>
  );
}

import ContentLayout, { PageHero } from "@/components/seo/ContentLayout";
import JsonLd from "@/components/seo/JsonLd";
import { contactLinks, siteConfig } from "@/lib/seo/config";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contact MichaelSoft Kenya",
  description:
    "Contact MichaelSoft for custom software, AI agents, and procurement systems in Kenya. WhatsApp, phone, and email.",
  path: "/contact",
  swPath: "/sw/contact",
  keywords: ["contact MichaelSoft", "software consultant Kenya"],
});

export default function ContactPage() {
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: "Kenya",
    },
  };

  return (
    <ContentLayout breadcrumbs={[{ label: "Contact" }]} currentPath="/contact">
      <JsonLd data={contactPage} />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        lead="Reach out for custom software, AI agents, procurement digitization, or product leadership. Based in Kenya, working with teams locally and remotely."
      />
      <div className="grid md:grid-cols-3 gap-6">
        <a
          href={contactLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 transition-all no-underline text-center"
        >
          <h2 className="font-headline text-sm font-bold text-white mb-2">WhatsApp</h2>
          <p className="text-xs text-slate-400">Fastest for discovery chats</p>
        </a>
        <a
          href={contactLinks.tel}
          className="block p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 transition-all no-underline text-center"
        >
          <h2 className="font-headline text-sm font-bold text-white mb-2">Phone</h2>
          <p className="text-xs text-slate-400">{siteConfig.phone}</p>
        </a>
        <a
          href={contactLinks.email}
          className="block p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 transition-all no-underline text-center"
        >
          <h2 className="font-headline text-sm font-bold text-white mb-2">Email</h2>
          <p className="text-xs text-slate-400 break-all">{siteConfig.email}</p>
        </a>
      </div>
    </ContentLayout>
  );
}

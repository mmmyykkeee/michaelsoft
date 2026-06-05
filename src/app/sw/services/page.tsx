import Link from "next/link";
import ContentLayout, { CtaBand, PageHero } from "@/components/seo/ContentLayout";
import { sw } from "@/lib/i18n/sw";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Huduma — Programu, AI na Uongozi wa Bidhaa",
  description:
    "Huduma za MichaelSoft: programu maalum, mawakala wa AI, mifumo ya ununuzi, na uongozi wa bidhaa nchini Kenya.",
  path: "/sw/services",
  locale: "sw_KE",
});

const items = [
  {
    href: "/sw/services/custom-software",
    title: "Programu maalum",
    desc: "Programu za wavuti, zana za ndani, na ujumuishaji wa ERP.",
  },
  {
    href: "/sw/services/ai-agents",
    title: "Mawakala wa AI",
    desc: "Otomatiki kwa idhini, msaada, na hati za ndani.",
  },
  {
    href: "/sw/services/product-leadership",
    title: "Uongozi wa bidhaa",
    desc: "Ugunduzi, vipaumbele, na uwasilishaji.",
  },
  {
    href: "/sw/procurement",
    title: "Ununuzi",
    desc: "P2P, wauzaji, na mwongozo wa e-GP.",
  },
  {
    href: "/sw/case-studies",
    title: "Masomo ya kesi",
    desc: "MichaelSoft Procurement Terminal na miradi ya wateja.",
  },
  {
    href: "/sw/insights",
    title: "Maarifa",
    desc: "Makala kuhusu e-GP, AI, na ununuzi.",
  },
];

export default function SwServicesPage() {
  return (
    <ContentLayout locale="sw" currentPath="/sw/services" breadcrumbs={[{ label: sw.nav.services }]}>
      <PageHero title={sw.services.title} lead={sw.services.lead} />
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-primary/30 no-underline"
          >
            <h2 className="font-headline text-lg font-bold text-white mb-2">{item.title}</h2>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </Link>
        ))}
      </div>
      <CtaBand locale="sw" />
    </ContentLayout>
  );
}

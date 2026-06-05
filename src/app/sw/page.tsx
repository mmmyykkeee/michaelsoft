import Link from "next/link";
import ContentLayout, { CtaBand, PageHero } from "@/components/seo/ContentLayout";
import { sw } from "@/lib/i18n/sw";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Programu Maalum, Mawakala wa AI na Mifumo ya Ununuzi Kenya",
  description:
    "MichaelSoft inajenga programu maalum na mawakala wa AI kwa biashara za Kenya, pamoja na mifumo ya ununuzi na uongozi wa bidhaa. Michael Kembugua.",
  path: "/sw",
  locale: "sw_KE",
  keywords: [
    "programu maalum Kenya",
    "mawakala wa AI Kenya",
    "programu ya ununuzi Kenya",
    "MichaelSoft",
  ],
});

export default function SwahiliHomePage() {
  return (
    <ContentLayout locale="sw" currentPath="/sw">
      <PageHero eyebrow={sw.home.eyebrow} title={sw.home.title} lead={sw.home.lead} />
      <div className="flex flex-wrap gap-4 mb-12">
        <Link
          href="/sw/contact"
          className="bg-primary text-black font-headline font-bold px-6 py-3 rounded-lg text-[0.65rem] tracking-widest no-underline hover:bg-white transition-all"
        >
          {sw.home.ctaPrimary}
        </Link>
        <Link
          href="/sw/procurement"
          className="border border-white/20 text-white font-headline font-bold px-6 py-3 rounded-lg text-[0.65rem] tracking-widest no-underline hover:border-primary transition-all"
        >
          {sw.home.ctaSecondary}
        </Link>
      </div>
      <ul className="space-y-3 text-sm text-slate-400 list-none">
        <li>
          <Link href="/sw/services" className="text-primary no-underline hover:underline">
            Huduma zetu →
          </Link>
        </li>
        <li>
          <Link href="/services/custom-software" className="text-white/50 no-underline hover:text-primary">
            Custom software (English) →
          </Link>
        </li>
        <li>
          <Link href="/insights" className="text-white/50 no-underline hover:text-primary">
            Maarifa / Insights (English) →
          </Link>
        </li>
      </ul>
      <CtaBand locale="sw" />
    </ContentLayout>
  );
}

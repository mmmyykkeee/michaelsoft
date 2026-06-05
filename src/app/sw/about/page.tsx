import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import { sw } from "@/lib/i18n/sw";
import { siteConfig } from "@/lib/seo/config";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Kuhusu Michael Kembugua na MichaelSoft",
  description:
    "Michael Kembugua ni kiongozi wa bidhaa na mbunifu wa programu nchini Kenya. MichaelSoft inatoa programu maalum, mawakala wa AI, na mifumo ya ununuzi.",
  path: "/sw/about",
  locale: "sw_KE",
});

export default function SwAboutPage() {
  return (
    <ContentLayout locale="sw" currentPath="/sw/about" breadcrumbs={[{ label: sw.nav.about }]}>
      <PageHero title={sw.about.title} lead={sw.about.lead} />
      <Prose>
        <p>
          <strong>{siteConfig.founder.name}</strong> anaongoza {siteConfig.name} kama msingisi na kiongozi wa bidhaa.
          Tunasaidia mashirika kuhamia kutoka kwa karatasi na zana zilizotawanyika kwenda michakato ya kidijitali
          inayoaminika—hasa katika ununuzi na uendeshaji.
        </p>
        <h2>Tunachofanya</h2>
        <ul>
          <li>Uundaji wa programu maalum kwa wavuti na zana za ndani</li>
          <li>Mawakala wa AI wenye uangalizi wa binadamu</li>
          <li>Udigitalishaji wa ununuzi na P2P nchini Kenya</li>
          <li>Uongozi wa bidhaa, ramani za barabara, na uwasilishaji wa hatua</li>
        </ul>
        <h2>Kwa nini Kenya kwanza</h2>
        <p>
          Muktadha wa ndani ni muhimu: M-Pesa, sheria za ununuzi, ERP, na timu zinazofanya kazi kupitia WhatsApp. Tunabuni
          kwa uhalisia huo.
        </p>
      </Prose>
      <CtaBand locale="sw" />
    </ContentLayout>
  );
}

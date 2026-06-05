import Link from "next/link";
import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import FaqSection from "@/components/seo/FaqSection";
import { sw } from "@/lib/i18n/sw";
import { procurementFaqs } from "@/lib/seo/faqs";
import { contactLinks } from "@/lib/seo/config";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Programu na Udigitalishaji wa Ununuzi Kenya",
  description:
    "Mifumo ya ununuzi Kenya: P2P, wauzaji, ujumuishaji wa ERP, na mwongozo wa e-GP kutoka MichaelSoft.",
  path: "/sw/procurement",
  locale: "sw_KE",
  keywords: ["programu ya ununuzi Kenya", "ununuzi wa kielektroniki Kenya", "e-GP Kenya"],
});

export default function SwProcurementPage() {
  return (
    <ContentLayout locale="sw" currentPath="/sw/procurement" breadcrumbs={[{ label: sw.nav.procurement }]}>
      <PageHero eyebrow="Ununuzi · Kenya" title={sw.procurement.title} lead={sw.procurement.lead} />
      <Prose>
        <p>
          Ununuzi wa umma unafanyika kupitia{" "}
          <a href="https://egpkenya.go.ke" target="_blank" rel="noopener noreferrer">
            EGP-KENYA
          </a>
          . Sekta binafsi bado inahitaji maombi ya kidijitali, idhini, maagizo ya ununuzi, na rekodi za ukaguzi.
        </p>
        <h2>Uwezo mkuu</h2>
        <ul>
          <li>Usimamizi wa hesabu na ununuzi unaotegemea stoo</li>
          <li>Data ya wauzaji na upatanisho</li>
          <li>Mtiririko wa idhini wenye kumbukumbu</li>
          <li>Ujumuishaji na Sage, QuickBooks, au SAP</li>
        </ul>
        <p>
          <Link href="/procurement/egp-kenya-guide">Mwongozo wa e-GP (Kiingereza)</Link>
          {" · "}
          <Link href="/procurement/private-p2p-kenya">P2P binafsi (Kiingereza)</Link>
        </p>
      </Prose>
      <div className="mt-8">
        <a
          href={contactLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-black font-headline font-bold px-6 py-3 rounded-lg text-[0.65rem] tracking-widest no-underline"
        >
          WhatsApp MichaelSoft
        </a>
      </div>
      <FaqSection title="Maswali yanayoulizwa mara kwa mara" faqs={procurementFaqs} />
      <CtaBand locale="sw" />
    </ContentLayout>
  );
}

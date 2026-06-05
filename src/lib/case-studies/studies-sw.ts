import type { CaseStudy } from "./studies";
import { caseStudies } from "./studies";

/** Swahili overlays keyed by slug — merges with English study for metrics/slugs */
const swOverlays: Record<
  string,
  Pick<CaseStudy, "title" | "description" | "challenge" | "solution" | "results" | "industry">
> = {
  "michaelsoft-procurement-terminal": {
    title: "MichaelSoft Procurement Terminal 1.0 — jukwaa la mnyororo wa usambazaji",
    industry: "Programu ya ununuzi · Kenya na Afrika Mashariki",
    description:
      "Bidhaa ya ununuzi ya MichaelSoft (MS-ERP-P01-2026): hesabu, upatanisho wa wauzaji, na ufikiaji salama wa msimamizi.",
    challenge:
      "Timu zilihitaji uso mmoja wa ununuzi zaidi ya karatasi—kuona hesabu, wauzaji, na tabaka la idhini kabla ya logistiki tabiri.",
    solution:
      "MichaelSoft ilijenga Procurement Terminal 1.0 kwenye usanifu wa subdomain (procurement.michaelsoft.co.ke), na moduli za hesabu na upatanisho wa wauzaji, auth ya Supabase, na ramani ya hatua kwa logistiki tabiri.",
    results: [
      "Moduli hai: usimamizi wa hesabu, upatanisho wa wauzaji, tabaka la idhini (MS-ERP-P01-2026)",
      "Imesambazwa kwenye usanifu wa subdomain pamoja na admin, docs, na status",
      "Moduli ya logistiki tabiri imepangwa kwa hatua inayofuata",
    ],
  },
  "retail-procurement-approvals-nairobi": {
    title: "Idhini za ununuzi za kielektroniki kwa kikundi cha reja reja",
    industry: "Reja reja na usambazaji · Nairobi, Kenya",
    description:
      "Mfumo wa maombi na idhini ulio badala WhatsApp—jina la mteja limefichwa kwa ombi; vipimo kutoka matumizi ya uzalishaji.",
    challenge:
      "Maombi yalikuwa kwenye WhatsApp na barua pepe katika matawi manne. Fedha hazikuweza kuthibitisha idhini za zaidi ya viwango vilivyokabidhiwa.",
    solution:
      "Ugunduzi wa bidhaa, kisha programu ya wavuti: idhini kulingana na jukumu, viwango vya idhini, usafirishaji wa PO kwa uhasibu, na kumbukumbu zisizobadilika.",
    results: [
      "Muda wa idhini: siku 2.1 hadi chini ya saa 6 kwa requisition za kawaida (wastani wa siku 30 baada ya go-live)",
      "100% ya maombi yaliyoidhinishwa yana ID na muhuri wa muda",
      "Maandalizi ya malipo ya mwisho wa mwezi yalipungua ~35% (tafiti ya fedha, n=3)",
    ],
  },
  "ai-agent-internal-policy-qa": {
    title: "Wakala wa AI wa sera za ndani kwa kampuni ya huduma za kitaalamu Kenya",
    industry: "Huduma za kitaalamu · Kenya",
    description:
      "Wakala wa retrieval na marejeo kwa sera za HR, fedha, na uendeshaji—majaribio kabla ya uzinduzi mpana.",
    challenge:
      "Wafanyakazi wapya walirudia maswali; hati nyeti ziliwekwa kwenye zana za AI za umma.",
    solution:
      "Tuliindex PDF zilizoidhinishwa, tukajenga wakala wa marejeo pekee, na tathmini ya maswali 30 kutoka kwa viongozi kabla ya majaribio.",
    results: [
      "Muda wa majibu wa kiwango cha 1: sekunde 8 (maswali 30 ya kigezo)",
      "Rufaa zilizorudiwa chini 42% katika majaribio ya wiki 6",
      "Hakuna malipo au maamuzi ya HR bila binadamu",
    ],
  },
  "vendor-portal-erp-handoff": {
    title: "Portal ya wauzaji na usawazishaji wa ERP kwa msambazaji wa jumla",
    industry: "Jumla · Kenya",
    description:
      "Nukuu na uthibitisho wa utoaji yanasawazishwa na ERP—rekodi za wauzaji zisizorudiwa zilipunguzwa.",
    challenge:
      "Nukuu zilikuwa kwenye karatasi; ERP ilishikilia PO rasmi; utoaji wa sehemu haukuonekana.",
    solution:
      "Portal kwa wauzaji, kazi za usiku kwa wauzaji, PO, na GRN; ugunduzi ulifafanua ni mfumo gani unamiliki kila uwanja.",
    results: [
      "Rekodi za wauzaji zilizorudiwa: 140+ hadi matukio 12 ya pekee",
      "Hali ya utoaji wa sehemu inaonekana kwa ghala na fedha",
      "Hatua ya 2 ya replenishment imepangwa kwenye tabaka lile la ujumuishaji",
    ],
  },
};

export function getCaseStudySw(slug: string): CaseStudy | undefined {
  const base = caseStudies.find((s) => s.slug === slug);
  const overlay = swOverlays[slug];
  if (!base || !overlay) return undefined;
  return { ...base, ...overlay };
}

export { getClientLabel } from "./studies";

export function getCaseStudiesSw(): CaseStudy[] {
  return caseStudies
    .map((s) => getCaseStudySw(s.slug))
    .filter((s): s is CaseStudy => Boolean(s));
}

import { sw } from "./sw";

export const servicePagesSw = {
  customSoftware: {
    meta: {
      title: "Uundaji wa Programu Maalum Kenya",
      description:
        "Programu maalum Kenya kutoka MichaelSoft—programu za wavuti, zana za ndani, na ujumuishaji wa ERP.",
    },
    hero: sw.services.customSoftware,
    body: {
      intro:
        "Iwe unahitaji portal ya mteja, dashibodi ya uendeshaji, au zana ya ndani badala ya karatasi, tunaanza na ugunduzi wa bidhaa na kusafirisha kwa hatua.",
      h2Projects: "Miradi ya kawaida",
      projects: [
        "Dashibodi za uendeshaji na hesabu kwa matawi mengi",
        "Portals za wateja na wauzaji zenye ruhusa kulingana na jukumu",
        "Ujumuishaji na Supabase, PostgreSQL, API, na ERP",
      ],
      h2Delivery: "Njia ya uwasilishaji",
      delivery:
        "MVP zenye wigo maalum, kisha hatua zinazohusiana na vipimo: muda uliookolewa, makosa yaliyopungua, au mapato yaliyowezeshwa.",
    },
  },
  aiAgents: {
    meta: {
      title: "Mawakala Maalum wa AI kwa Biashara Kenya",
      description:
        "Jenga mawakala wa AI Kenya kwa idhini, msaada, na Q&A ya hati—kwa mipaka na uangalizi wa binadamu.",
    },
    hero: {
      title: "Mawakala maalum wa AI kwa biashara za Kenya",
      lead: "Mawakala wanaokamilisha kazi halisi—kupeleka idhini, kujibu sera, muhtasari wa zabuni—kwa data yako na sheria zako.",
    },
    body: {
      intro:
        "Tunajenga mifumo ya mawakala, si maonyesho: retrieval juu ya hati zako, simu za zana, na tathmini kabla ya uzinduzi.",
      h2UseCases: "Matumizi tunayotekeleza",
      useCases: [
        "Wasaidizi wa idhini ya ununuzi na fedha",
        "Msaada wa ngazi ya 1 kwa wateja",
        "Q&A ya hati za zabuni na mikataba na marejeo",
      ],
      h2Safety: "Otomatiki yenye uwajibikaji",
      safety:
        "Vitendo vya athari kubwa vinahitaji idhini wazi. Tunadokumenti mipaka ya data na kumbukumbu ili IT na fedha ziweze kuamini mfumo.",
    },
  },
  productLeadership: {
    meta: {
      title: "Uongozi wa Bidhaa Kenya",
      description:
        "Uongozi wa bidhaa wa muda Kenya—ugunduzi, ramani, na uwasilishaji wa programu na ununuzi.",
    },
    hero: {
      title: "Uongozi wa bidhaa kwa udigitalishaji mgumu",
      lead: "Michael Kembugua analeta nidhamu ya usimamizi wa bidhaa kwa programu na ununuzi—ili uhandisi ujenge kilicho sahihi, kwa mpangilio sahihi.",
    },
    body: {
      intro:
        "Miradi mingi inashindwa kwenye mchakato, si teknolojia. Tunafanya warsha na fedha, uendeshaji, na IT ili kuweka michakato, MVP, na uwekezaji wa hatua wazi.",
      h2Models: "Miundo ya ushirikiano",
      models: [
        "Vipindi vya ugunduzi kabla ya ujenzi mkubwa",
        "Uongozi wa bidhaa wa muda pamoja na timu yako ya uhandisi",
        "Uongozi wa mwisho hadi mwisho wakati MichaelSoft pia inajenga",
      ],
      h2Outcomes: "Matokeo tunayolenga",
      outcomes:
        "Mizunguko ya ununuzi fupi, mikono isiyo ya lazima kidogo, na ramani ambazo wadau wanaweza kuelezea kwa bodi.",
    },
  },
} as const;

import { getPostBySlugSw } from "./posts-sw";

export type InsightPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  keywords: string[];
  readingMinutes: number;
  sections: { heading?: string; paragraphs: string[] }[];
};

export const insightPosts: InsightPost[] = [
  {
    slug: "kenya-egp-rollout-what-smes-need-to-know",
    title: "Kenya e-GP Rollout: What SMEs Need to Know Beyond Supplier Registration",
    description:
      "A practical guide to Kenya's Electronic Government Procurement (e-GP) system, EGP-KENYA, and what private-sector teams should prepare for in 2026.",
    publishedAt: "2026-03-01",
    keywords: [
      "e-GP Kenya",
      "EGP-KENYA",
      "electronic government procurement Kenya",
      "supplier registration Kenya",
    ],
    readingMinutes: 8,
    sections: [
      {
        paragraphs: [
          "From July 2025, Kenya's National Treasury requires government procurement to run through the EGP-KENYA portal at egpkenya.go.ke. If you supply government, registration is mandatory. If you only sell to private companies, e-GP still matters because it reshapes how vendors, auditors, and partners think about procurement compliance in Kenya.",
        ],
      },
      {
        heading: "What changed with e-GP",
        paragraphs: [
          "The system centralizes tender publishing, bidding, contract management, and supplier records. Procuring entities across national and county government must use the platform. That means faster cycles for compliant suppliers—and higher friction for teams still relying on manual PDFs and email threads.",
          "For SMEs, the immediate win is transparency: you can see tenders, track status, and maintain a digital audit trail. The immediate risk is treating registration as the whole project. Registration gets you in the door; your internal quoting, delivery, and finance processes still determine whether you win and get paid on time.",
        ],
      },
      {
        heading: "What private-sector organizations should do",
        paragraphs: [
          "Even if you never bid on government work, your customers may ask for e-GP-aligned vendor data, tax compliance proofs, and digital audit trails. Build a lightweight vendor profile pack: company registration, tax PIN, bank details, insurance, and past performance references.",
          "If you run procurement on Excel or WhatsApp, consider a private procure-to-pay layer: requisitions, approvals, purchase orders, goods received notes, and three-way matching before payment. MichaelSoft helps teams design workflows that complement—not duplicate—national systems.",
        ],
      },
      {
        heading: "When to get implementation help",
        paragraphs: [
          "You need a builder when spreadsheets break: multi-branch approvals, ERP integration (Sage, QuickBooks, SAP), M-Pesa reconciliation, or AI-assisted tender review. Product leadership matters here—map the real approval chain before writing code.",
        ],
      },
    ],
  },
  {
    slug: "custom-ai-agents-for-kenyan-businesses",
    title: "Custom AI Agents for Kenyan Businesses: Use Cases That Actually Ship",
    description:
      "How to scope custom AI agents for support, procurement approvals, and internal knowledge—without boiling the ocean.",
    publishedAt: "2026-03-08",
    keywords: ["custom AI agents Kenya", "AI automation business", "RAG enterprise Kenya"],
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          "Custom AI agents are not chatbots bolted onto a website. They are software systems that observe context, use tools (email, ERP APIs, databases), and complete tasks with guardrails. In Kenya, the best first agents solve one expensive loop: approvals, customer support tier-1, or document Q&A for operations teams.",
        ],
      },
      {
        heading: "High-ROI agent patterns",
        paragraphs: [
          "Procurement approval assistant: reads requisition details, checks budget codes, routes to the right approver, and drafts summaries for finance.",
          "Policy and SOP Q&A: indexes HR, finance, and procurement manuals so new staff get consistent answers with citations.",
          "Tender document assistant: extracts requirements from PDFs, flags missing compliance items, and never submits bids autonomously without human sign-off.",
        ],
      },
      {
        heading: "Architecture choices",
        paragraphs: [
          "Most production agents combine retrieval (RAG) over your documents with structured tool calls to your existing systems. Fine-tuning is rarely step one. Start with evaluation: define 20 real questions your team asks weekly and measure answer quality before scaling.",
          "MichaelSoft builds agents with clear ownership: who can trigger, what data is in scope, and what requires human approval. That design is what makes agents safe enough for finance and procurement.",
        ],
      },
    ],
  },
  {
    slug: "procurement-software-kenya-build-vs-buy",
    title: "Procurement Software in Kenya: When to Build Custom vs Buy SaaS",
    description:
      "A decision framework for Kenyan SMEs and enterprises choosing between off-the-shelf procurement platforms and custom workflows.",
    publishedAt: "2026-03-15",
    keywords: [
      "procurement software Kenya",
      "procure to pay Kenya",
      "custom procurement system",
    ],
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Kenya has mature SaaS options for tenders and vendor management, plus ERP modules from local implementers. Custom software makes sense when your approval hierarchy, branches, or integrations are unique—and when product leadership can keep scope disciplined.",
        ],
      },
      {
        heading: "Buy SaaS when",
        paragraphs: [
          "You need standard procure-to-pay fast, your team fits default workflows, and integrations to Sage or SAP are satisfied by the vendor's connector catalog. Time-to-value beats perfect fit.",
        ],
      },
      {
        heading: "Build custom when",
        paragraphs: [
          "You operate multiple entities with different delegation of authority, you need M-Pesa or local bank rules in the approval path, or you must embed procurement inside a customer portal. Custom also wins when you want AI agents on top of proprietary data without sending it to a generic SaaS model.",
        ],
      },
      {
        heading: "The hybrid path",
        paragraphs: [
          "Many MichaelSoft clients use SaaS for supplier discovery or government compliance, and a custom layer for internal requisitions, inventory, and analytics. Integrate early; don't duplicate master vendor data in two places.",
        ],
      },
    ],
  },
  {
    slug: "product-leadership-for-procurement-digitization",
    title: "Product Leadership for Procurement Digitization in East Africa",
    description:
      "Why procurement digitization fails without product discovery—and how leaders align finance, operations, and IT.",
    publishedAt: "2026-03-22",
    keywords: [
      "product manager Kenya",
      "procurement digitization",
      "fractional product leader",
    ],
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          "Procurement digitization fails when teams buy software before mapping who approves what, at which threshold, with which evidence. Product leadership is the discipline of making that map explicit, prioritizing workflows that save time and reduce fraud risk, and shipping in phases.",
        ],
      },
      {
        heading: "Discovery questions that matter",
        paragraphs: [
          "Who can raise a requisition? Who can approve spend above KES 50,000 vs KES 500,000? Where do quotes live today? How do goods received notes connect to invoices? Answer these on paper before RFPs.",
        ],
      },
      {
        heading: "Phased delivery",
        paragraphs: [
          "Phase 1: digital requisitions and approvals. Phase 2: vendor master and PO generation. Phase 3: inventory and analytics. Phase 4: AI assistance for policy and tender review. Each phase should have measurable cycle-time reduction.",
          "MichaelSoft combines product leadership with hands-on engineering so roadmaps stay grounded in what can ship in Kenya's real IT environments.",
        ],
      },
    ],
  },
];

export type InsightLocale = "en" | "sw";

export function getPostBySlug(slug: string, locale: InsightLocale = "en"): InsightPost | undefined {
  if (locale === "sw") return getPostBySlugSw(slug);
  return insightPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return insightPosts.map((p) => p.slug);
}

export function insightSwPath(slug: string): string {
  return `/sw/insights/${slug}`;
}

export function insightEnPath(slug: string): string {
  return `/insights/${slug}`;
}

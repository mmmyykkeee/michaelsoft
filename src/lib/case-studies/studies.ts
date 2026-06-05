export type CaseStudyMetric = {
  label: string;
  value: string;
};

/** How the client name may appear on the public site */
export type ClientPublishing =
  | { mode: "public"; clientName: string; location?: string }
  | { mode: "anonymized"; sectorLabel: string; location?: string };

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: CaseStudyMetric[];
  services: string[];
  publishedAt: string;
  keywords: string[];
  client: ClientPublishing;
  /** Shown under title when anonymized or for context */
  permissionNote?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "michaelsoft-procurement-terminal",
    title: "MichaelSoft Procurement Terminal 1.0 — supply chain platform",
    industry: "Procurement software · Kenya & East Africa",
    description:
      "MichaelSoft’s own procurement product (MS-ERP-P01-2026): inventory, vendor reconciliation, and secure admin access—scaled for East Africa deployment nodes.",
    challenge:
      "Teams needed a single procurement surface beyond spreadsheets—inventory visibility, vendor matching, and an authorization layer before predictive logistics could ship.",
    solution:
      "MichaelSoft built Procurement Terminal 1.0 on the MichaelSoft multi-subdomain stack (procurement.michaelsoft.co.ke), with core modules for inventory management and vendor reconciliation, Supabase-backed admin auth, and a phased roadmap for predictive logistics.",
    results: [
      "Production modules: inventory management, vendor reconciliation, authorization layer (MS-ERP-P01-2026)",
      "Deployed on MichaelSoft subdomain architecture alongside admin, docs, and status surfaces",
      "Predictive logistics module scoped as next phase on the public product roadmap",
    ],
    metrics: [
      { label: "Product code", value: "MS-ERP-P01-2026" },
      { label: "Core modules live", value: "2 of 3 (predictive logistics on roadmap)" },
      { label: "Deployment", value: "procurement.michaelsoft.co.ke" },
      { label: "Stack", value: "Next.js 16 · Supabase · Vercel" },
    ],
    services: ["Custom software", "Procurement digitization", "Product leadership"],
    publishedAt: "2026-02-01",
    keywords: [
      "MichaelSoft procurement",
      "procurement software Kenya",
      "MS-ERP-P01-2026",
    ],
    client: {
      mode: "public",
      clientName: "MichaelSoft",
      location: "Kenya",
    },
  },
  {
    slug: "retail-procurement-approvals-nairobi",
    title: "Digital procurement approvals for a multi-branch retail group",
    industry: "Retail & distribution · Nairobi, Kenya",
    description:
      "Phased requisition and approval system replacing WhatsApp-led purchasing—client name withheld at their request; metrics from production use after go-live.",
    challenge:
      "Purchase requests were scattered across WhatsApp and email across four branches. Finance could not prove who approved spend above delegated limits, and month-end vendor payments slipped by 4–6 days.",
    solution:
      "MichaelSoft ran product discovery with operations and finance, then delivered a web-based requisition workflow: role-based approvals, delegation-of-authority thresholds, PO export to the incumbent accounting package, and immutable audit logs—without replacing the ERP.",
    results: [
      "Median approval time for standard stock requisitions dropped from 2.1 days to under 6 hours (30-day post go-live average)",
      "100% of approved requisitions carry approver ID and timestamp in the audit log",
      "Month-end vendor payment preparation time reduced by an estimated 35% (finance team survey, n=3)",
    ],
    metrics: [
      { label: "Branches on platform", value: "4" },
      { label: "Active approvers", value: "11" },
      { label: "Median approval time", value: "2.1d → <6h" },
      { label: "Go-live", value: "Q4 2025" },
    ],
    services: ["Procurement digitization", "Custom software", "Product leadership"],
    publishedAt: "2026-02-15",
    keywords: ["procurement workflow Kenya", "retail purchase approval Nairobi"],
    client: {
      mode: "anonymized",
      sectorLabel: "Multi-branch retail group",
      location: "Nairobi, Kenya",
    },
    permissionNote:
      "Client name withheld at client request. Metrics reflect production usage after go-live; individual figures may vary by branch.",
  },
  {
    slug: "ai-agent-internal-policy-qa",
    title: "Private AI policy agent for a Kenya professional services firm",
    industry: "Professional services · Kenya",
    description:
      "Retrieval-based internal agent with citations for HR, finance, and operations policies—piloted before wider rollout.",
    challenge:
      "New hires flooded team leads with repeat policy questions. Staff pasted sensitive PDFs into public chat tools, creating compliance risk.",
    solution:
      "MichaelSoft indexed approved policy and SOP documents in a private knowledge base, shipped a citation-only agent integrated with the client’s identity boundaries, and ran a 30-question evaluation set from team leads before pilot launch. HR and payment actions remain human-only.",
    results: [
      "Median first-response time for tier-1 policy questions: 8 seconds (pilot, n=30 benchmark questions)",
      "Repeat escalations to operations leads down 42% in the 6-week pilot (8-person ops team)",
      "Zero autonomous payments or HR decisions—enforced by agent guardrails and review queue",
    ],
    metrics: [
      { label: "Pilot duration", value: "6 weeks" },
      { label: "Benchmark Q&A set", value: "30 questions" },
      { label: "Escalation reduction", value: "42% (pilot cohort)" },
      { label: "Indexed document sets", value: "HR · Finance · Ops SOPs" },
    ],
    services: ["Custom AI agents", "Product leadership"],
    publishedAt: "2026-01-20",
    keywords: ["custom AI agent Kenya", "RAG internal knowledge base"],
    client: {
      mode: "anonymized",
      sectorLabel: "Professional services firm",
      location: "Kenya",
    },
    permissionNote:
      "Client name withheld at client request. Pilot metrics; full rollout in progress.",
  },
  {
    slug: "vendor-portal-erp-handoff",
    title: "Vendor portal and nightly ERP sync for a wholesale distributor",
    industry: "Wholesale · Kenya",
    description:
      "Vendor quote and delivery confirmations synced to the ERP system of record—duplicate vendor masters eliminated.",
    challenge:
      "Quotes and delivery notes lived in spreadsheets while the ERP held official POs. Warehouse and finance could not see partial deliveries without phone calls.",
    solution:
      "MichaelSoft delivered a vendor-facing portal for quotes and delivery confirmations, plus nightly sync jobs for vendors, POs, and goods-received notes. Discovery documented which system owns each field to prevent conflicting masters.",
    results: [
      "Duplicate vendor records reduced from 140+ to 12 exception cases requiring manual merge (post-migration audit)",
      "Partial delivery status visible to warehouse and finance in one dashboard",
      "Phase-two inventory-triggered replenishment scoped on the same integration layer",
    ],
    metrics: [
      { label: "Vendor master cleanup", value: "140+ → 12 exceptions" },
      { label: "Sync cadence", value: "Nightly ERP job" },
      { label: "Portal users (vendors)", value: "28 active" },
      { label: "Go-live", value: "Q3 2025" },
    ],
    services: ["Custom software", "Procurement digitization", "ERP integration"],
    publishedAt: "2025-11-10",
    keywords: ["ERP integration Kenya", "vendor portal procurement"],
    client: {
      mode: "anonymized",
      sectorLabel: "Wholesale distributor",
      location: "Kenya",
    },
    permissionNote:
      "Client name withheld at client request. ERP vendor not disclosed.",
  },
];

export function getClientLabel(client: ClientPublishing): string {
  if (client.mode === "public") {
    return client.location ? `${client.clientName} · ${client.location}` : client.clientName;
  }
  return client.location ? `${client.sectorLabel} · ${client.location}` : client.sectorLabel;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((s) => s.slug);
}

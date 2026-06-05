import type { FaqItem } from "./faq";

export const procurementFaqs: FaqItem[] = [
  {
    question: "What is procurement software and who needs it in Kenya?",
    answer:
      "Procurement software digitizes requisitions, approvals, purchase orders, vendor records, and invoice matching. Kenyan SMEs use it to reduce maverick spend; enterprises use it for audit trails and ERP integration; suppliers interact through portals or government systems like EGP-KENYA.",
  },
  {
    question: "Do private companies need to use EGP-KENYA?",
    answer:
      "EGP-KENYA is mandatory for suppliers participating in national and county government procurement from July 2025. Private-sector companies that only sell to other businesses do not register on e-GP unless they bid on government tenders—but many adopt similar audit practices.",
  },
  {
    question: "Can MichaelSoft integrate with Sage, QuickBooks, or SAP?",
    answer:
      "Yes. We design custom layers and integrations so procurement events sync with your accounting or ERP system of record, avoiding duplicate vendor masters and manual exports.",
  },
  {
    question: "How long does a custom procurement system take to launch?",
    answer:
      "A focused phase-one (requisitions and approvals) often ships in 6–10 weeks after discovery. Larger programs with inventory and analytics are phased to deliver measurable cycle-time improvements each quarter.",
  },
];

export const aiAgentsFaqs: FaqItem[] = [
  {
    question: "What is a custom AI agent vs ChatGPT?",
    answer:
      "A custom agent connects to your data and tools with defined permissions, audit logs, and approval steps. ChatGPT is a general assistant; agents are productized workflows built for one business process.",
  },
  {
    question: "Is my data safe when building an AI agent?",
    answer:
      "We scope data sources per agent, use private retrieval where possible, and require human approval for high-risk actions such as payments or bid submission.",
  },
  {
    question: "What is the first AI agent most Kenyan businesses should build?",
    answer:
      "Document Q&A over internal policies or a procurement approval assistant that summarizes requisitions and routes them—both have clear ROI and limited blast radius.",
  },
];

export const customSoftwareFaqs: FaqItem[] = [
  {
    question: "How much does custom software cost in Kenya?",
    answer:
      "Cost depends on scope, integrations, and compliance needs. MichaelSoft starts with a discovery phase to define an MVP and phased budget instead of fixed shelf pricing.",
  },
  {
    question: "Do you build mobile apps or web only?",
    answer:
      "We primarily ship responsive web applications and internal tools that work on mobile browsers; native apps are scoped when offline or device hardware is required.",
  },
];

export const productLeadershipFaqs: FaqItem[] = [
  {
    question: "What does a fractional product leader do?",
    answer:
      "They run discovery, prioritize backlogs, align stakeholders, and partner with engineering on delivery—ideal when you need senior product judgment without a full-time hire.",
  },
  {
    question: "Can you lead procurement digitization without building everything custom?",
    answer:
      "Yes. We often recommend hybrid architectures: SaaS where it fits, custom workflows where your approvals and integrations are unique.",
  },
];

export const egpFaqs: FaqItem[] = [
  {
    question: "Where do I register as a government supplier in Kenya?",
    answer:
      "Register on the official EGP-KENYA portal at https://egpkenya.go.ke. The National Treasury provides training and support channels listed on the portal.",
  },
  {
    question: "Does MichaelSoft replace EGP-KENYA?",
    answer:
      "No. e-GP is the government system of record for public procurement. We help private workflows and integrations that complement national platforms.",
  },
];

import Link from "next/link";
import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import FaqSection from "@/components/seo/FaqSection";
import { procurementFaqs } from "@/lib/seo/faqs";
import { contactLinks } from "@/lib/seo/config";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Procurement Software & Digitization Kenya",
  description:
    "Procurement software and digitization for Kenya—procure-to-pay, vendor management, ERP integration, and e-GP guidance by MichaelSoft.",
  path: "/procurement",
  swPath: "/sw/procurement",
  keywords: [
    "procurement software Kenya",
    "procure to pay Kenya",
    "vendor management software Kenya",
    "procurement system East Africa",
  ],
});

export default function ProcurementPage() {
  return (
    <ContentLayout breadcrumbs={[{ label: "Procurement" }]} currentPath="/procurement">
      <PageHero
        eyebrow="Procurement · Kenya"
        title="Procurement software & digitization for Kenya"
        lead="MichaelSoft builds and integrates procurement workflows for private organizations—inventory, vendor reconciliation, approvals, and ERP sync—while helping teams navigate Kenya's e-Government Procurement (e-GP) landscape."
      />
      <Prose>
        <p>
          Public procurement in Kenya runs through{" "}
          <a href="https://egpkenya.go.ke" target="_blank" rel="noopener noreferrer">
            EGP-KENYA
          </a>
          . Private-sector procurement still needs digital requisitions, delegation of authority, purchase orders, and
          audit trails—often connected to Sage, QuickBooks, or SAP.
        </p>
        <h2>Core capabilities</h2>
        <ul>
          <li>Inventory management and stock-triggered purchasing</li>
          <li>Vendor master data and reconciliation</li>
          <li>Multi-level approval workflows with audit logs</li>
          <li>Dashboards for spend visibility and cycle times</li>
          <li>AI-assisted policy and tender document review (human-approved)</li>
        </ul>
        <h2>Guides</h2>
        <ul>
          <li>
            <Link href="/procurement/egp-kenya-guide">e-GP Kenya supplier & compliance guide</Link>
          </li>
          <li>
            <Link href="/procurement/private-p2p-kenya">Private procure-to-pay (P2P) in Kenya</Link>
          </li>
        </ul>
      </Prose>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
          <h2 className="font-headline text-sm font-bold text-white mb-4 tracking-widest">For government suppliers</h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Register on EGP-KENYA and keep internal quoting, delivery, and finance processes ready for audits.
          </p>
          <Link
            href="/procurement/egp-kenya-guide"
            className="text-primary text-[0.65rem] font-headline tracking-widest no-underline hover:underline"
          >
            Read e-GP guide →
          </Link>
        </div>
        <div className="p-8 rounded-2xl border border-primary/20 bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.08)_0%,transparent_70%)]">
          <h2 className="font-headline text-sm font-bold text-white mb-4 tracking-widest">Request a discovery call</h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Discuss custom procurement portals, ERP integration, or AI agents for your team.
          </p>
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-black font-headline font-bold px-5 py-3 rounded-lg text-[0.65rem] tracking-widest hover:bg-white transition-all no-underline"
          >
            WhatsApp MichaelSoft
          </a>
        </div>
      </div>

      <FaqSection faqs={procurementFaqs} />
      <CtaBand />
    </ContentLayout>
  );
}

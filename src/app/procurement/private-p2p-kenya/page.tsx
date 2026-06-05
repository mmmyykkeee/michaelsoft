import ContentLayout, { CtaBand, PageHero, Prose } from "@/components/seo/ContentLayout";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Private Procure-to-Pay (P2P) Software Kenya",
  description:
    "Procure-to-pay and purchase order systems for private companies in Kenya—approvals, vendor management, and ERP integration.",
  path: "/procurement/private-p2p-kenya",
  keywords: [
    "procure to pay Kenya",
    "purchase order system Kenya",
    "P2P software SME Kenya",
  ],
});

export default function PrivateP2pPage() {
  return (
    <ContentLayout
      breadcrumbs={[
        { label: "Procurement", href: "/procurement" },
        { label: "Private P2P Kenya" },
      ]}
    >
      <PageHero
        eyebrow="Private sector"
        title="Private procure-to-pay (P2P) in Kenya"
        lead="Private companies need digital requisitions, approvals, purchase orders, goods received notes, and invoice matching—integrated with how finance actually pays vendors in Kenya."
      />
      <Prose>
        <h2>Typical P2P flow</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Requester raises a requisition with budget code</li>
          <li>Manager approves per delegation of authority</li>
          <li>Procurement issues PO to vendor</li>
          <li>Warehouse confirms goods received (GRN)</li>
          <li>Finance matches invoice to PO and GRN before payment</li>
        </ol>
        <h2>Local realities</h2>
        <p>
          Teams coordinate on WhatsApp and email; M-Pesa and bank transfers need clear references; multi-branch retailers
          need consolidated vendor masters. Software must fit these habits, not fight them.
        </p>
        <h2>Build vs buy</h2>
        <p>
          SaaS P2P works when workflows are standard. Custom or hybrid fits unique approval matrices, embedded portals,
          or AI on proprietary data. See our{" "}
          <a href="/insights/procurement-software-kenya-build-vs-buy">build vs buy article</a> for a decision framework.
        </p>
        <h2>MichaelSoft approach</h2>
        <p>
          Phase one: digital approvals and audit trail. Phase two: vendor master and PO automation. Phase three:
          inventory analytics and optional AI assistants—each phase measured by cycle-time reduction.
        </p>
      </Prose>
      <CtaBand />
    </ContentLayout>
  );
}

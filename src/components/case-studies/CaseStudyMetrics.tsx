import type { CaseStudy, CaseStudyMetric } from "@/lib/case-studies/studies";
import { getClientLabel } from "@/lib/case-studies/studies";

export function CaseStudyClientBadge({ study }: { study: CaseStudy }) {
  const label = getClientLabel(study.client);
  const isPublic = study.client.mode === "public";

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <span
        className={`text-[0.6rem] font-headline font-bold tracking-widest px-3 py-1 rounded-full border ${
          isPublic ? "border-primary/40 text-primary bg-primary/10" : "border-white/20 text-white/60 bg-white/5"
        }`}
      >
        {isPublic ? "Published with client consent" : "Client anonymized"}
      </span>
      <span className="text-sm text-slate-400">{label}</span>
    </div>
  );
}

export function MetricsGrid({ metrics }: { metrics: CaseStudyMetric[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
      {metrics.map((m) => (
        <div key={m.label} className="p-4 rounded-xl border border-white/10 bg-white/5 text-center">
          <p className="text-[0.55rem] text-white/40 font-headline tracking-widest uppercase mb-2">{m.label}</p>
          <p className="text-sm font-headline font-bold text-primary">{m.value}</p>
        </div>
      ))}
    </div>
  );
}

export function PermissionNote({ note }: { note?: string }) {
  if (!note) return null;
  return <p className="text-xs text-slate-500 italic border-l-2 border-white/10 pl-4 my-6">{note}</p>;
}

"use client";

import { useEffect, useState } from "react";

export default function StatusPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-body relative overflow-hidden flex flex-col items-center justify-center p-8">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-xl w-full text-center relative z-10">
        <div className="mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
          <span className="text-[0.65rem] font-headline font-bold uppercase tracking-widest text-[#00ff88]">All Systems Operational</span>
        </div>

        <h1 className="font-headline text-5xl font-extrabold tracking-tight mb-4 text-white uppercase italic">
          Infrastructure Status
        </h1>
        <p className="text-slate-400 text-sm mb-12">
          Real-time metrics of the MichaelSoft global network.
        </p>

        <div className="space-y-4">
           {/* Component Status */}
           {[
             { name: "API Gateway", status: "Operational", uptime: "99.98%" },
             { name: "Cloud Databases", status: "Operational", uptime: "100%" },
             { name: "Edge Caching", status: "Operational", uptime: "99.99%" },
             { name: "CI/CD Pipeline", status: "Operational", uptime: "100%" }
           ].map((sys) => (
             <div key={sys.name} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-default group">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]"></div>
                   <span className="text-sm font-medium">{sys.name}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[0.65rem] font-bold text-white/40 uppercase tracking-widest">{sys.uptime}</span>
                    <span className="text-[0.65rem] font-bold text-[#00ff88] uppercase tracking-widest">{sys.status}</span>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-12 text-[0.6rem] text-slate-500 uppercase tracking-widest_extra font-bold">
          Last updated: {new Date().toLocaleTimeString()} (UTC)
        </div>
      </div>
    </div>
  );
}

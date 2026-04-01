"use client";

import { useEffect, useState } from "react";

export default function ProcurementPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-body relative overflow-hidden flex flex-col items-center justify-center p-8">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="max-w-4xl w-full relative z-10">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
          <div>
             <div className="flex items-center gap-2 mb-4 text-[#00ff88] text-[0.6rem] font-bold tracking-[0.3em] uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></div>
                Supply Chain Synchronization
             </div>
             <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase italic">
                Procurement<br/>Terminal 1.0
             </h1>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xl">
             <div className="text-[0.6rem] text-white/30 uppercase tracking-widest mb-1">Authorization Layer</div>
             <div className="text-xs font-mono font-bold text-primary">MS-ERP-P01-2026</div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
           <div className="space-y-6">
              <p className="text-slate-400 text-sm leading-loose">
                 The MichaelSoft Procurement Terminal integrates global inventory channels with automated logistics fulfillment. Currently scaling clusters in East Africa nodes.
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
                 <h4 className="text-[0.65rem] font-bold text-white/40 uppercase tracking-widest mb-4">Core Modules</h4>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm">
                       <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                       Inventory Management
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                       <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                       Vendor Reconciliation
                    </li>
                    <li className="flex items-center gap-3 text-sm opacity-50">
                       <span className="w-1 h-1 rounded-full bg-white/10"></span>
                       Predictive Logistics (Coming Soon)
                    </li>
                 </ul>
              </div>
           </div>

           <div className="flex flex-col justify-center items-center text-center p-8 border border-white/5 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.1)_0%,transparent_100%)]">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              </div>
              <h3 className="text-lg font-headline font-bold mb-3 uppercase tracking-wider italic">Secure Portal</h3>
              <p className="text-xs text-white/40 mb-8 max-w-xs leading-relaxed">
                 Administrative access required to manage procurement schemas.
              </p>
              <button 
                 onClick={() => alert("Access Denied: Cluster is currently initializing")}
                 className="w-full bg-primary text-black font-headline font-bold py-3 rounded-lg text-[0.65rem] uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
              >
                 Initialize Authentication
              </button>
           </div>
        </div>

        <div className="flex justify-between items-center text-[0.6rem] text-white/20 uppercase tracking-widest_extra font-bold border-t border-white/5 pt-8">
           <span>Session Status: Active</span>
           <span>MichaelSoft Ecosystem &copy; 2026</span>
        </div>
      </div>
    </div>
  );
}

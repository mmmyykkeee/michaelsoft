"use client";

import { useEffect, useState } from "react";

export default function DocsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-body relative overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 p-8 bg-black/20 backdrop-blur-xl z-20">
         <div className="mb-10 font-headline font-bold text-xs tracking-widest uppercase flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center border border-primary/40 text-[0.6rem] text-primary">D</div>
            Docs 1.0
         </div>

         <nav className="space-y-6">
            <div>
               <h4 className="text-[0.65rem] font-bold text-white/40 uppercase tracking-widest mb-3">Getting Started</h4>
               <ul className="space-y-2">
                  <li className="text-sm text-primary font-medium cursor-pointer">Quickstart</li>
                  <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Architecture</li>
               </ul>
            </div>
            <div>
               <h4 className="text-[0.65rem] font-bold text-white/40 uppercase tracking-widest mb-3">Core Modules</h4>
               <ul className="space-y-2">
                  <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Nebula OS</li>
                  <li className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">Data Sync</li>
               </ul>
            </div>
         </nav>
      </aside>

      <main className="flex-1 p-8 md:p-16 relative z-10 max-w-4xl mx-auto overflow-y-auto">
        <header className="mb-16">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight mb-4 text-white uppercase italic">
            Documentation
          </h1>
          <p className="text-slate-400 text-lg">
            Technical specifications and implementation guides for the MichaelSoft ecosystem.
          </p>
        </header>

        <section className="prose prose-invert max-w-none">
           <h2 className="text-2xl font-bold mb-4 text-white">Introduction</h2>
           <p className="text-slate-400 mb-8 leading-relaxed">
             MichaelSoft is building a unified digital substrate. Our documentation provides the primitives needed to integrate with our upcoming infrastructure.
           </p>

           <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
              <h3 className="text-primary font-bold mb-2">Notice</h3>
              <p className="text-primary/70 text-sm">
                This documentation is currently in pre-alpha. Specifications are subject to change as the infrastructure matures.
              </p>
           </div>

           <h2 className="text-2xl font-bold mb-4 text-white">Core Philosophy</h2>
           <p className="text-slate-400 mb-4 leading-relaxed">
             We believe software should be as resilient as biological systems. Every module in the MichaelSoft stack is designed with:
           </p>
           <ul className="list-disc list-inside text-slate-400 space-y-2 mb-8">
              <li>Self-healing capabilities</li>
              <li>Atmospheric scalability</li>
              <li>Invisible synchronization</li>
           </ul>
        </section>
      </main>
    </div>
  );
}

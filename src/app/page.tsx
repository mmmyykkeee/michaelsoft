"use client";

import { useEffect, useRef } from "react";
import ProgressIndicator from "@/components/ProgressIndicator";

function MouseEffect() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const orbs = document.querySelectorAll<HTMLElement>(".orb");
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.5;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center" id="app">
      <MouseEffect />

      {/* Header (Desktop Only) */}
      <header className="fixed top-0 left-0 w-full px-20 py-12 flex justify-between items-center max-[768px]:hidden z-10">
        <div className="flex items-center gap-4 group cursor-default">
          <div className="w-7 h-7 rounded-[10px] bg-[url('/michaelsoft_bg_new.png')] bg-cover bg-center border-[1.5px] border-white/10 shadow-lg transition-all duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:scale-110 group-hover:-rotate-6 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]"></div>
          <div className="font-headline font-bold tracking-widest_extra text-[0.7rem] uppercase transition-all duration-300 group-hover:tracking-[0.2em] group-hover:text-white">
            MichaelSoft
          </div>
        </div>
        <nav>
          <ul className="flex list-none gap-8 items-center">
            <li>
              <a 
                href="#vision" 
                className="no-underline text-on-surface-variant font-headline font-medium text-[0.65rem] tracking-widest_extra uppercase transition-all duration-300 hover:text-on-surface relative peer"
                data-tooltip="Coming Soon"
              >
                Vision
              </a>
            </li>
            <li className="flex items-center">
              <a 
                href="#archive" 
                className="no-underline text-on-surface-variant font-headline font-medium text-[0.65rem] tracking-widest_extra uppercase transition-all duration-300 hover:text-on-surface relative peer"
                data-tooltip="Coming Soon"
              >
                Archive
                <span className="w-1.25 h-1.25 rounded-full bg-[#00ff88] ml-3 shadow-[0_0_10px_rgba(0,255,136,0.5)] status-dot-pulse"></span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="hero max-w-[1200px] w-full">
        <h1 className="font-headline text-[clamp(2.5rem,8vw,8.5rem)] font-extrabold tracking-tightest uppercase mb-[-1rem] drop-shadow-2xl animate-radial-glow bg-clip-text text-transparent bg-[radial-gradient(circle_at_50%_50%,var(--primary)_0%,#4e8cff_30%,var(--secondary)_60%,var(--tertiary)_100%)] max-[768px]:text-[3.2rem] max-[768px]:mb-[-0.5rem] leading-[1.1] whitespace-nowrap">
          MichaelSoft
        </h1>
        <h2 className="font-accent text-[2rem] md:text-[3.8rem] italic font-normal text-white mb-6 md:mb-10 opacity-95 tracking-[-0.01em]">
          Coming Soon
        </h2>
        <p className="text-[0.75rem] md:text-xs leading-loose text-white/85 max-w-[280px] md:max-w-[420px] mx-auto font-normal tracking-widest mt-4">
          We&apos;re architecting the next generation of digital infrastructure. 
          A new era of MichaelSoft is surfacing.
        </p>

        <ProgressIndicator />
      </div>

      {/* Footer (Desktop Only) */}
      <footer className="fixed bottom-0 left-0 w-full px-20 py-12 flex justify-between items-center text-[0.6rem] tracking-v_widest text-white/40 max-[768px]:hidden">
        <div className="flex gap-6 items-center">
          <span>MICHAELSOFT</span>
          <span>A SOFTWARE COMPANY BY MICHAEL</span>
        </div>
        <div className="flex gap-8">
          <a href="#privacy" className="hover:text-on-surface transition-colors duration-300 no-underline">PRIVACY</a>
          <a href="#contact" className="hover:text-on-surface transition-colors duration-300 no-underline">CONTACT</a>
        </div>
      </footer>

      {/* Mobile Navigation Bar (Mobile Only) */}
      <nav className="mobile-nav hidden max-[768px]:flex fixed bottom-0 left-0 w-full p-6 bg-[#0a0f13]/80 backdrop-blur-3xl border-t border-white/5 justify-around z-[100]">
        <a href="#vision" className="flex flex-col items-center gap-2 text-white/40 text-[0.6rem] uppercase tracking-widest_extra font-headline font-semibold hover:text-on-surface transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-primary transition-colors"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6z"/><path d="M12 10a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/></svg>
          <span>Vision</span>
        </a>
        <a href="#archive" className="flex flex-col items-center gap-2 text-white/40 text-[0.6rem] uppercase tracking-widest_extra font-headline font-semibold hover:text-on-surface transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-primary transition-colors"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>Archive</span>
        </a>
        <a href="#contact" className="flex flex-col items-center gap-2 text-white/40 text-[0.6rem] uppercase tracking-widest_extra font-headline font-semibold hover:text-on-surface transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-primary transition-colors"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>Contact</span>
        </a>
      </nav>
    </main>
  );
}

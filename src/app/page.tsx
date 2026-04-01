"use client";

import { useEffect, useRef, useState } from "react";
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

const ContactLinks = () => (
  <>
    <a href="tel:+254704472009" className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors text-xs font-headline tracking-wider p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Call
    </a>
     <a href="mailto:0mykembugua@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-[#ea4335] transition-colors text-[0.65rem] font-headline tracking-widest p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 break-all">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      E-Mail
    </a>
    <a href="https://api.whatsapp.com/send?phone=254704472009" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-[#25D366] transition-colors text-xs font-headline tracking-wider p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      WhatsApp
    </a>
   
  </>
);

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const desktopContactRef = useRef<HTMLDivElement>(null);
  const mobileContactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        (desktopContactRef.current && desktopContactRef.current.contains(target)) ||
        (mobileContactRef.current && mobileContactRef.current.contains(target))
      ) {
        return;
      }
      setContactOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center" id="app">
      <MouseEffect />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-8 md:px-20 py-8 md:py-12 flex justify-between items-center z-10">
        <div className="flex items-center gap-3 md:gap-4 group cursor-default">
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-[10px] bg-[url('/michaelsoft_bg_new.png')] bg-cover bg-center border-[1.5px] border-white/10 shadow-lg transition-all duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:scale-110 group-hover:-rotate-6 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,242,255,0.2)]"></div>
          <div className="font-headline font-bold tracking-widest_extra text-[0.6rem] md:text-[0.7rem] uppercase transition-all duration-300 group-hover:tracking-[0.2em] group-hover:text-white">
            MichaelSoft
          </div>
        </div>
        <nav className="hidden md:block">
          <ul className="flex list-none gap-8 items-center text-[0.65rem] tracking-widest_extra uppercase">
            <li>
              <a 
                href="#vision" 
                className="no-underline text-on-surface-variant font-headline font-medium text-[0.65rem] tracking-widest_extra uppercase transition-all duration-300 hover:text-on-surface relative peer"
                data-tooltip="Coming Soon"
              >
                Vision
              </a>
            </li>
            <li>
              <a 
                href="/projects" 
                className="flex items-center gap-3 no-underline text-on-surface-variant font-headline font-medium text-[0.65rem] tracking-widest_extra uppercase transition-all duration-300 hover:text-on-surface relative peer"
              >
                Projects Archive
                <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.5)] status-dot-pulse shrink-0"></span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="hero max-w-300 w-full">
        <h1 className="font-headline text-[clamp(2.5rem,8vw,8.5rem)] font-extrabold tracking-tightest uppercase -mb-4 drop-shadow-2xl animate-radial-glow bg-clip-text text-transparent bg-[radial-gradient(circle_at_50%_50%,var(--color-primary)_0%,#4e8cff_30%,var(--color-secondary)_60%,var(--color-tertiary)_100%)] max-[768px]:text-[3.2rem] max-[768px]:-mb-2 leading-[1.1] whitespace-nowrap">
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
      <footer className="fixed bottom-0 left-0 w-full px-20 py-12 flex justify-between items-center text-[0.6rem] tracking-v_widest text-white/40 max-[768px]:hidden z-[100]">
        <div className="flex gap-6 items-center">
          <span>MICHAELSOFT</span>
          <span>A SOFTWARE COMPANY BY MICHAEL</span>
        </div>
        <div className="flex gap-8 items-center">
          <a href="#privacy" className="hover:text-on-surface transition-colors duration-300 no-underline">PRIVACY</a>
          
          <div className="relative" ref={desktopContactRef}>
            <button 
              onClick={() => setContactOpen(!contactOpen)} 
              className={`hover:text-on-surface transition-colors duration-300 no-underline uppercase tracking-v_widest cursor-pointer ${contactOpen ? 'text-on-surface' : ''}`}
            >
              CONTACT
            </button>
            
            <div className={`absolute bottom-[calc(100%+1.5rem)] right-0 bg-[#0a0f13]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 flex flex-col min-w-[240px] shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-[calc(100%-20px)_bottom] ${contactOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}>
              <ContactLinks />
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Bar (Mobile Only) */}
      <nav className="mobile-nav hidden max-[768px]:flex flex-col fixed bottom-0 left-0 w-full px-6 pt-5 pb-6 bg-[#0a0f13]/80 backdrop-blur-3xl border-t border-white/5 z-[100] gap-5">
        <div className="flex justify-around items-center w-full">
          <a href="#vision" className="flex flex-col items-center gap-2 text-white/40 text-[0.6rem] uppercase tracking-widest_extra font-headline font-semibold hover:text-on-surface transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-primary transition-colors"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6z"/><path d="M12 10a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/></svg>
            <span>Vision</span>
          </a>
          <a href="/projects" className="flex flex-col items-center gap-2 text-white/40 text-[0.6rem] uppercase tracking-widest_extra font-headline font-semibold hover:text-on-surface transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-primary transition-colors"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>Projects Archive</span>
          </a>
          
          <div className="relative flex flex-col items-center" ref={mobileContactRef}>
            <div className={`absolute bottom-[calc(100%+1rem)] right-[-1.5rem] bg-[#0a0f13]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 flex flex-col min-w-[240px] shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-[calc(100%-30px)_bottom] ${contactOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}>
              <ContactLinks />
            </div>
            
            <button 
              onClick={() => setContactOpen(!contactOpen)} 
              className={`flex flex-col items-center gap-2 text-[0.6rem] uppercase tracking-widest_extra font-headline font-semibold transition-colors group cursor-pointer ${contactOpen ? 'text-on-surface' : 'text-white/40 hover:text-on-surface'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${contactOpen ? 'stroke-primary' : 'group-hover:stroke-primary'} transition-colors`}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>Contact</span>
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center w-full border-t border-white/5 pt-4">
          <span className="text-[0.45rem] tracking-[0.2em] text-white/30 uppercase font-headline">
            MICHAELSOFT &mdash; A SOFTWARE COMPANY BY MICHAEL
          </span>
        </div>
      </nav>
    </main>
  );
}

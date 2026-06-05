"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProgressIndicator from "@/components/ProgressIndicator";

const ContactLinks = () => (
  <>
    <a
      href="tel:+254704472009"
      className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors text-xs font-headline tracking-wider p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5"
    >
      Call
    </a>
    <a
      href="mailto:0mykembugua@gmail.com"
      className="flex items-center gap-3 text-white/70 hover:text-[#ea4335] transition-colors text-[0.65rem] font-headline tracking-widest p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 break-all"
    >
      E-Mail
    </a>
    <a
      href="https://api.whatsapp.com/send?phone=254704472009"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-white/70 hover:text-[#25D366] transition-colors text-xs font-headline tracking-wider p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5"
    >
      WhatsApp
    </a>
  </>
);

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

export default function HomeClient() {
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
    <>
      <MouseEffect />

      <header className="fixed top-0 left-0 w-full px-8 md:px-20 py-8 md:py-12 flex justify-between items-center z-10">
        <Link href="/" className="flex items-center gap-3 md:gap-4 group no-underline">
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-[10px] bg-[url('/michaelsoft_bg_new.png')] bg-cover bg-center border-[1.5px] border-white/10 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-primary" />
          <div className="font-headline font-bold tracking-widest_extra text-[0.6rem] md:text-[0.7rem] text-white group-hover:text-primary transition-all">
            MichaelSoft
          </div>
        </Link>
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex list-none gap-6 items-center text-[0.65rem] tracking-widest_extra">
            <li>
              <Link href="/services" className="no-underline text-on-surface-variant font-headline font-medium hover:text-on-surface transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/procurement" className="no-underline text-on-surface-variant font-headline font-medium hover:text-on-surface transition-colors">
                Procurement
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="no-underline text-on-surface-variant font-headline font-medium hover:text-on-surface transition-colors">
                Case studies
              </Link>
            </li>
            <li>
              <Link href="/insights" className="no-underline text-on-surface-variant font-headline font-medium hover:text-on-surface transition-colors">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/sw" className="no-underline text-on-surface-variant font-headline font-medium hover:text-on-surface transition-colors" hrefLang="sw-KE">
                Kiswahili
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="flex items-center gap-3 no-underline text-on-surface-variant font-headline font-medium hover:text-on-surface transition-colors"
              >
                Projects
                <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.5)] status-dot-pulse shrink-0" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="hero max-w-300 w-full">
        <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.25em] text-[#00ff88] font-headline font-bold mb-4 uppercase">
          Kenya · Software · AI Agents · Procurement
        </p>
        <h1 className="font-headline text-[clamp(2rem,7vw,6rem)] font-extrabold tracking-tightest -mb-2 drop-shadow-2xl animate-radial-glow bg-clip-text text-transparent bg-[radial-gradient(circle_at_50%_50%,var(--color-primary)_0%,#4e8cff_30%,var(--color-secondary)_60%,var(--color-tertiary)_100%)] max-[768px]:text-[2.4rem] leading-[1.1]">
          Custom Software &amp; AI Agents
        </h1>
        <p className="font-headline text-lg md:text-2xl font-semibold text-white/90 mb-4 tracking-tight max-w-xl mx-auto">
          Procurement systems &amp; product leadership — MichaelSoft
        </p>
        <p className="text-[0.75rem] md:text-sm leading-relaxed text-white/85 max-w-[320px] md:max-w-[520px] mx-auto font-normal tracking-wide mt-2">
          MichaelSoft builds custom software and AI agents for Kenyan businesses, with deep expertise in
          procurement digitization, ERP integration, and e-GP-ready workflows. Led by Michael Kembugua.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-4">
          <Link
            href="/contact"
            className="bg-primary text-black font-headline font-bold px-5 py-2.5 rounded-lg text-[0.65rem] tracking-widest hover:bg-white transition-all no-underline"
          >
            Work with us
          </Link>
          <Link
            href="/procurement"
            className="border border-white/20 text-white font-headline font-bold px-5 py-2.5 rounded-lg text-[0.65rem] tracking-widest hover:border-primary transition-all no-underline"
          >
            Procurement Kenya
          </Link>
        </div>

        <ProgressIndicator />
      </div>

      <section
        className="mt-16 max-w-2xl mx-auto text-left px-4 pb-32 md:pb-24"
        aria-labelledby="home-explore"
      >
        <h2 id="home-explore" className="sr-only">
          Explore MichaelSoft services
        </h2>
        <ul className="grid gap-3 text-[0.7rem] font-headline tracking-wide list-none">
          <li>
            <Link href="/services/custom-software" className="text-white/60 hover:text-primary no-underline">
              Custom software development in Kenya →
            </Link>
          </li>
          <li>
            <Link href="/services/ai-agents" className="text-white/60 hover:text-primary no-underline">
              Custom AI agents for business automation →
            </Link>
          </li>
          <li>
            <Link href="/services/product-leadership" className="text-white/60 hover:text-primary no-underline">
              Product leadership &amp; discovery →
            </Link>
          </li>
          <li>
            <Link href="/case-studies" className="text-white/60 hover:text-primary no-underline">
              Case studies — procurement &amp; AI delivery →
            </Link>
          </li>
          <li>
            <Link href="/insights" className="text-white/60 hover:text-primary no-underline">
              Insights on e-GP, procurement software &amp; AI →
            </Link>
          </li>
          <li>
            <Link href="/sw" className="text-white/60 hover:text-primary no-underline" hrefLang="sw-KE">
              Toleo la Kiswahili →
            </Link>
          </li>
        </ul>
      </section>

      <footer className="fixed bottom-0 left-0 w-full px-20 py-12 flex justify-between items-center text-[0.6rem] tracking-v_widest text-white/40 max-[768px]:hidden z-[100]">
        <div className="flex gap-6 items-center">
          <span>MICHAELSOFT</span>
          <span>KENYA · SOFTWARE · PROCUREMENT · AI</span>
        </div>
        <div className="flex gap-8 items-center">
          <Link href="/about" className="hover:text-on-surface transition-colors no-underline">
            ABOUT
          </Link>
          <div className="relative" ref={desktopContactRef}>
            <button
              type="button"
              onClick={() => setContactOpen(!contactOpen)}
              className={`hover:text-on-surface transition-colors tracking-v_widest cursor-pointer bg-transparent border-0 text-[0.6rem] text-white/40 font-inherit ${contactOpen ? "text-on-surface" : ""}`}
            >
              CONTACT
            </button>
            <div
              className={`absolute bottom-[calc(100%+1.5rem)] right-0 bg-[#0a0f13]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 flex flex-col min-w-[240px] shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-400 origin-[calc(100%-20px)_bottom] ${contactOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}
            >
              <ContactLinks />
            </div>
          </div>
        </div>
      </footer>

      <nav className="mobile-nav hidden max-[768px]:flex flex-col fixed bottom-0 left-0 w-full px-6 pt-5 pb-6 bg-[#0a0f13]/80 backdrop-blur-3xl border-t border-white/5 z-[100] gap-4">
        <div className="flex justify-around items-center w-full">
          <Link href="/services" className="flex flex-col items-center gap-1 text-white/40 text-[0.55rem] tracking-widest font-headline no-underline">
            Services
          </Link>
          <Link href="/procurement" className="flex flex-col items-center gap-1 text-white/40 text-[0.55rem] tracking-widest font-headline no-underline">
            Procurement
          </Link>
          <Link href="/projects" className="flex flex-col items-center gap-1 text-white/40 text-[0.55rem] tracking-widest font-headline no-underline">
            Projects
          </Link>
          <div className="relative flex flex-col items-center" ref={mobileContactRef}>
            <div
              className={`absolute bottom-[calc(100%+1rem)] right-[-1.5rem] bg-[#0a0f13]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 flex flex-col min-w-[240px] transition-all ${contactOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
              <ContactLinks />
            </div>
            <button
              type="button"
              onClick={() => setContactOpen(!contactOpen)}
              className="text-white/40 text-[0.55rem] tracking-widest font-headline bg-transparent border-0"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { supabase } from "@/lib/supabase";

const ContactLinks = () => (
  <>
    <a href="tel:+254704472009" className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors text-xs font-headline tracking-wider p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      Call
    </a>
    <a href="https://api.whatsapp.com/send?phone=254704472009" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-[#25D366] transition-colors text-xs font-headline tracking-wider p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      WhatsApp
    </a>
    <a href="mailto:0mykembugua@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-[#ea4335] transition-colors text-[0.65rem] font-headline tracking-widest p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 break-all">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      E-Mail
    </a>
  </>
);

function MouseEffect() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const orbs = document.querySelectorAll<HTMLElement>(".orb-projects");
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

export default function ProjectsPage() {
  const [contentReady, setContentReady] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContentReady(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (contactRef.current && !contactRef.current.contains(target)) {
        setContactOpen(false);
      }
    };

    if (contactOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [contactOpen]);

  // Projects will be fetched from Supabase
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data || []);
      }
      setIsLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <>
      {/* Background */}
      <div className="nebula-bg" />
      
      {/* Animated orbs */}
      <div className="orb orb-projects orb-1 absolute pointer-events-none" />
      <div className="orb orb-projects orb-2 absolute pointer-events-none" />
      <div className="orb orb-projects orb-3 absolute pointer-events-none" />
      <MouseEffect />

      {/* Main content */}
      <main className="relative min-h-screen w-full">

      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-background/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-on-surface hover:text-primary transition-colors cursor-pointer">
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-headline tracking-wider">Back</span>
          </Link>
          <h1 className="text-xl md:text-2xl font-headline font-bold text-primary">
            PROJECT PORTFOLIO
          </h1>
          <div className="w-12" />
        </div>
      </nav>

      {/* Content */}
      <section className="relative z-10 max-w-6xl mx-auto w-full px-4 md:px-8 py-16 md:py-24">
        {/* Header */}
        <div
          className={`mb-16 opacity-0 animate-fadeIn ${
            contentReady ? "[animation-delay:0.2s]" : ""
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-on-surface leading-tight">
            Showcase of{" "}
            <span className="text-primary drop-shadow-[0_0_20px_rgba(0,242,255,0.4)]">
              Innovation
            </span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Explore a curated selection of projects, from web applications to
            enterprise solutions. Each project represents a commitment to
            excellence and modern development practices.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 animate-fadeIn ${
            contentReady ? "[animation-delay:0.4s]" : ""
          }`}
        >
          {isLoading ? (
             <div className="col-span-full py-20 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <span className="text-xs text-white/20 uppercase tracking-widest">Scanning Archive...</span>
             </div>
          ) : projects.length === 0 ? (
             <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-2xl">
                <p className="text-white/20 uppercase tracking-widest text-xs">No projects found in the archive.</p>
             </div>
          ) : (
            projects.map((project, index) => {
              let tags = [];
              try {
                tags = typeof project.technologies === "string" ? JSON.parse(project.technologies) : (project.technologies || []);
              } catch (e) {
                console.error("Error parsing technologies:", e);
              }
              
              return (
                <div key={project.id || index} className="animate-fadeIn" style={{animationDelay: `${0.4 + index * 0.05}s`}}>
                  <ProjectCard 
                    title={project.name}
                    description={project.description}
                    link={project.link}
                    tags={tags}
                    image={project.thumbnail}
                    featured={project.featured}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Call to action */}
        <div
          className={`mt-20 text-center opacity-0 animate-fadeIn ${
            contentReady ? "[animation-delay:1s]" : ""
          }`}
        >
          <p className="text-on-surface-variant mb-6 text-sm md:text-base tracking-wide">
            Interested in collaborating or learning more?
          </p>
          <div className="relative inline-block" ref={contactRef}>
            <button
              onClick={() => setContactOpen(!contactOpen)}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 font-headline tracking-wider text-sm hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] cursor-pointer"
            >
              <span>Get in Touch</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            <div className={`absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 bg-[#0a0f13]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 flex flex-col min-w-[240px] shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${contactOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}>
              <ContactLinks />
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}

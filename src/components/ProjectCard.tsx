"use client";

import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  image,
  featured = false,
}: ProjectCardProps) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <div
        className={`group relative ${image ? "grid grid-rows-2" : "flex flex-col"} overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 cursor-pointer h-full ${
          featured
            ? "col-span-1 md:col-span-2 bg-gradient-to-br from-surface-container to-surface hover:shadow-[0_0_40px_rgba(0,242,255,0.15)]"
            : "bg-surface-container/40 hover:shadow-[0_0_30px_rgba(0,242,255,0.1)]"
        }`}
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image section if provided */}
        {image && (
          <div className="relative w-full h-full overflow-hidden bg-surface-container-high border-b border-white/5">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative p-4 md:p-5 flex flex-col h-full bg-[#0a0f13]/40">
          {/* Header & Description */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-headline font-bold text-on-surface group-hover:text-primary transition-colors duration-300 tracking-wide uppercase italic">
                {title}
              </h3>
              <svg
                className="w-5 h-5 text-primary/50 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10M7 17L17 7" />
              </svg>
            </div>

            <p className="text-xs text-on-surface-variant group-hover:text-on-surface/80 transition-colors duration-300 leading-relaxed line-clamp-3 font-medium">
              {description}
            </p>
          </div>

          {/* Tags - Moved closer to content */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.6rem] px-2 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/5 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all duration-300 font-headline font-bold uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer - Pushed to bottom of content area */}
          <div className="mt-auto flex items-center text-primary text-[0.6rem] font-bold font-headline tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity duration-300 uppercase italic">
            Visit Project
            <svg
              className="w-3 h-3 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-primary/0 to-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Link>
  );
}

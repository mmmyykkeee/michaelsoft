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
        className={`group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 cursor-pointer h-full ${
          featured
            ? "col-span-1 md:col-span-2 bg-gradient-to-br from-surface-container to-surface hover:shadow-[0_0_40px_rgba(0,242,255,0.15)]"
            : "bg-surface-container/40 hover:shadow-[0_0_30px_rgba(0,242,255,0.1)]"
        }`}
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image section if provided */}
        {image && (
          <div className="relative h-40 md:h-48 overflow-hidden bg-surface-container-high">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative p-6 md:p-8 flex flex-col justify-between h-full">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg md:text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors duration-300 tracking-wide">
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

            <p className="text-sm text-on-surface-variant group-hover:text-on-surface/80 transition-colors duration-300 leading-relaxed mb-4">
              {description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 font-headline tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer with subtle indicator */}
          <div className="flex items-center text-primary text-xs font-headline tracking-widest opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            VIEW PROJECT
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

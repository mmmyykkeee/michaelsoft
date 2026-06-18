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
        className={`group h-full flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200 cursor-pointer bg-white dark:bg-neutral-900 ${
          featured ? "md:col-span-2" : ""
        }`}
      >
        {image && (
          <div className="relative w-full h-40 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
              {title}
            </h3>
            <svg
              className="w-4 h-4 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors flex-shrink-0 ml-2 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7h10v10M7 17L17 7" />
            </svg>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4 flex-1">
            {description}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[0.65rem] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-medium"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="text-[0.65rem] px-2 py-0.5 text-neutral-400 dark:text-neutral-500">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

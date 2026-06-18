"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import { supabase } from "@/lib/supabase";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("featured", { ascending: false })
        .order("display_order", { ascending: true })
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
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      {/* Nav */}
      <nav className="border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <Image
              src="/michaelsoft_bg_new.png"
              alt="MichaelSoft"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              MichaelSoft
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Projects
            </h1>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-base">
              A curated selection of work from the MichaelSoft ecosystem.
            </p>
          </div>

          {isLoading ? (
            <div className="py-20 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-neutral-300 dark:border-neutral-600 border-t-neutral-900 dark:border-t-neutral-100 rounded-full mx-auto mb-4" />
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                Loading projects...
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                No projects found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, index) => {
                let tags: string[] = [];
                try {
                  tags =
                    typeof project.technologies === "string"
                      ? JSON.parse(project.technologies)
                      : project.technologies || [];
                } catch {
                  tags = [];
                }

                return (
                  <ProjectCard
                    key={project.id || index}
                    title={project.name}
                    description={project.description}
                    link={project.link}
                    tags={tags}
                    image={project.thumbnail}
                    featured={project.featured}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-100 dark:border-neutral-800 py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
          <a
            href="https://michaelsoft.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
          >
            MichaelSoft
          </a>
          <span>
            &copy; {new Date().getFullYear()} MichaelSoft. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2, Pin, PinOff } from "lucide-react";

interface Project {
  id?: number;
  name: string;
  description: string;
  link: string;
  technologies: string;
  thumbnail: string | null;
  featured: boolean;
  display_order?: number;
}

interface SortableProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  onTogglePin: (project: Project) => void;
}

export function SortableProjectCard({
  project,
  onEdit,
  onDelete,
  onTogglePin,
}: SortableProjectCardProps) {
  const cacheBuster = useRef(Date.now());

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  const technologies = (() => {
    try {
      return (JSON.parse(project.technologies) as string[]) || [];
    } catch {
      return [];
    }
  })();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-start gap-4 px-5 py-4 border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors ${
        isDragging
          ? "bg-white dark:bg-neutral-900 shadow-lg rounded-lg"
          : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-neutral-300 dark:text-neutral-600 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors flex-shrink-0 mt-1"
      >
        <GripVertical size={16} />
      </div>

      <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
        {project.thumbnail ? (
          <img
            src={`${project.thumbnail}?cb=${cacheBuster.current}`}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-300 dark:text-neutral-600"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
            {project.name}
          </h3>
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[0.6rem] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
              <Pin size={8} />
              Pinned
            </span>
          )}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mb-2">
          {project.link}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
          {project.description}
        </p>
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[0.6rem] text-neutral-400 dark:text-neutral-500"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={() => onTogglePin(project)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            project.featured
              ? "text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800"
              : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          }`}
          title={project.featured ? "Unpin" : "Pin"}
        >
          {project.featured ? (
            <Pin size={14} className="fill-current" />
          ) : (
            <PinOff size={14} />
          )}
        </button>
        <button
          onClick={() => onEdit(project)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title="Edit"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => project.id && onDelete(project.id)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors cursor-pointer"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
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
  onTogglePin 
}: SortableProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.6 : 1,
  };

  const technologies = (() => {
    try {
      return (JSON.parse(project.technologies) as string[]) || [];
    } catch (e) {
      return [];
    }
  })();

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`group p-8 border-b border-white/5 hover:bg-white/[0.02] transition-all flex items-start gap-8 relative overflow-hidden ${isDragging ? 'shadow-2xl shadow-primary/20 bg-white/[0.05]' : ''}`}
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners} 
        className="cursor-grab active:cursor-grabbing p-2 text-white/20 hover:text-primary transition-colors flex-shrink-0"
      >
        <GripVertical size={20} />
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      <div className="w-32 h-32 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10 flex-shrink-0 relative z-10 bg-black/40">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/10">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
        )}
      </div>
      
      <div className="flex-1 relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <h3 className="font-headline font-bold text-2xl text-white group-hover:text-primary transition-colors tracking-tight italic">{project.name}</h3>
               {project.featured && (
                 <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[0.5rem] font-bold uppercase tracking-widest border border-primary/20 flex items-center gap-1">
                   <Pin size={8} className="fill-current" />
                   Pinned
                 </span>
               )}
            </div>
            <span className="text-[0.6rem] text-slate-500 font-mono tracking-widest">{project.link}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onTogglePin(project)}
              className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all ${project.featured ? 'text-primary border-primary/50' : 'text-white/40 hover:text-white'}`}
              title={project.featured ? "Unpin Project" : "Pin Project"}
            >
              {project.featured ? <Pin size={16} className="fill-current" /> : <PinOff size={16} />}
            </button>
            <button 
              onClick={() => onEdit(project)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-primary/50 transition-all flex items-center justify-center"
              title="Edit Project"
            >
              <Pencil size={16} />
            </button>
            <button 
              onClick={() => project.id && onDelete(project.id)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-red-400 hover:border-red-400/50 transition-all flex items-center justify-center"
              title="Delete Project"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <p className="mt-4 text-slate-400 font-medium text-xs leading-relaxed line-clamp-2 max-w-lg">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map(t => (
            <span key={t} className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/30">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

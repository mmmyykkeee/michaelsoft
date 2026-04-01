"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent 
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable";
import { SortableProjectCard } from "@/components/SortableProjectCard";

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

const FALLBACK_TECHS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "TailwindCSS", 
  "Supabase", "PostgreSQL", "Prisma", "Go", "Rust", "Python", "Django", 
  "Flask", "FastAPI", "Docker", "Kubernetes", "Vercel", "AWS", "Google Cloud"
];

const CustomStyles = () => (
  <style>{`
    @keyframes fadeInToast {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes toastProgress {
      from { width: 100%; }
      to { width: 0%; }
    }
    .animate-fadeInToast {
      animation: fadeInToast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-toastProgress {
      animation: toastProgress 5s linear forwards;
    }
  `}</style>
);

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  
  // Tag State
  const [techInput, setTechInput] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allTechs, setAllTechs] = useState<string[]>([]);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // File Upload State
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<Project>({
    name: "",
    description: "",
    link: "",
    technologies: "[]",
    thumbnail: null,
    featured: false
  });

  useEffect(() => {
    fetchProjects();
    fetchTechs();
    setupStorage();
  }, []);

  // Notification Helper
  const notify = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  async function setupStorage() {
    try {
        await supabase.storage.createBucket('thumbnails', { public: true });
    } catch (e) {}
  }

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

  async function fetchTechs() {
    const { data, error } = await supabase
        .from("technologies")
        .select("name")
        .order("name", { ascending: true });
    
    if (error) {
        console.error("Error fetching techs:", error);
        // If DB fails (likely RLS), use our fallback list
        setAllTechs(FALLBACK_TECHS);
    } else {
        const dbTechs = data.map((t: any) => t.name);
        // Merge DB techs with fallbacks to ensure solid UI
        const merged = Array.from(new Set([...FALLBACK_TECHS, ...dbTechs])).sort();
        setAllTechs(merged);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `project-thumbnails/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('thumbnails')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, thumbnail: publicUrl }));
      notify("Visual asset successfully synchronized to storage.", "success");
    } catch (error: any) {
      notify(`Synchronization failure: ${error.message}`, "error");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const submissionData = {
        name: formData.name,
        description: formData.description,
        link: formData.link,
        technologies: JSON.stringify(selectedTechs),
        thumbnail: formData.thumbnail,
        featured: formData.featured
    };

    if (isEditing && currentProject?.id) {
      const { error } = await supabase
        .from("projects")
        .update(submissionData)
        .eq("id", currentProject.id);
      
      if (error) {
          notify(`Schematic update failed: ${error.message}`, "error");
      } else {
          notify("Data core successfully updated.", "success");
          resetForm();
      }
    } else {
      const { error } = await supabase
        .from("projects")
        .insert([submissionData]);
      
      if (error) {
          notify(`Schematic deployment failed: ${error.message}`, "error");
      } else {
          notify("Project successfully deployed into registry.", "success");
          resetForm();
      }
    }

    fetchProjects();
  }

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      link: "",
      technologies: "[]",
      thumbnail: null,
      featured: false
    });
    setSelectedTechs([]);
    setTechInput("");
    setIsEditing(false);
    setCurrentProject(null);
  }

  function handleEdit(project: Project) {
    setIsEditing(true);
    setCurrentProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      link: project.link,
      technologies: project.technologies,
      thumbnail: project.thumbnail,
      featured: project.featured
    });
    
    try {
        setSelectedTechs(JSON.parse(project.technologies));
    } catch (e) {
        setSelectedTechs([]);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDeleteConfirm() {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);
    
    if (error) {
        notify(`Registry deletion failed: ${error.message}`, "error");
    } else {
        notify("Project successfully expunged from database.", "success");
        fetchProjects();
    }
  }

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex(p => p.id === active.id);
      const newIndex = projects.findIndex(p => p.id === over?.id);
      
      const newProjects = arrayMove(projects, oldIndex, newIndex) as Project[];
      setProjects(newProjects);
      
      // Persist the new order in background
      await updateProjectOrder(newProjects);
    }
  }

  async function updateProjectOrder(projectList: Project[]) {
    try {
      // Update each project's display_order
      const updates = projectList.map((p, index) => ({
        id: p.id,
        display_order: index
      }));
      
      // Next.js Supabase client doesn't support bulk updates very gracefully for multiple filters,
      // so we do them sequentially or in small batches. 
      // For a small list of projects, individual updates are fine.
      for (const update of updates) {
        await supabase
          .from("projects")
          .update({ display_order: update.display_order })
          .eq("id", update.id!);
      }
      
      notify("Project sequence synchronized.", "success");
    } catch (error) {
      notify("Failed to synchronize sequence.", "error");
    }
  }

  async function handleTogglePin(project: Project) {
    if (!project.id) return;
    const newStatus = !project.featured;
    
    const { error } = await supabase
      .from("projects")
      .update({ featured: newStatus })
      .eq("id", project.id);
      
    if (error) {
      notify("Pin status update failed.", "error");
    } else {
      notify(newStatus ? "Project pinned to top." : "Project unpinned.", "success");
      fetchProjects();
    }
  }

  function handleDeleteClick(id: number) {
    setDeleteId(id);
  }

  // Tech Suggestion Logic
  useEffect(() => {
    if (techInput.trim() === "") {
        setSuggestions([]);
        return;
    }
    const filtered = allTechs.filter(t => 
        t.toLowerCase().includes(techInput.toLowerCase()) && 
        !selectedTechs.includes(t)
    ).slice(0, 5);
    
    // If input isn't in our DB list, add it as a "Create New" suggestion
    const exactMatch = allTechs.some(t => t.toLowerCase() === techInput.toLowerCase().trim());
    if (techInput.trim() && !exactMatch) {
        setSuggestions([`+ Add "${techInput.trim()}"`, ...filtered]);
    } else {
        setSuggestions(filtered);
    }
  }, [techInput, selectedTechs, allTechs]);

  const addTech = async (t: string) => {
    // If it's the "+ Add..." placeholder, clean it up
    let formatted = t.startsWith('+ Add "') ? t.replace('+ Add "', '').replace('"', '').trim() : t.trim();
    
    if (!formatted) return;

    if (!selectedTechs.includes(formatted)) {
        setSelectedTechs([...selectedTechs, formatted]);
    }

    // If this tech isn't in our DB list, add it
    if (!allTechs.some(a => a.toLowerCase() === formatted.toLowerCase())) {
        const { error } = await supabase
            .from("technologies")
            .insert([{ name: formatted }]);
        
        if (error && error.code !== "23505") {
            console.error("Error saving new tech:", error);
        } else {
            fetchTechs();
        }
    }

    setTechInput("");
    setSuggestions([]);
  };

  const removeTech = (t: string) => {
    setSelectedTechs(selectedTechs.filter(i => i !== t));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-body p-4 md:p-8">
      <CustomStyles />
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold font-headline italic text-white tracking-tight">
              Innovation Terminal
            </h1>
            <p className="text-slate-400 text-sm mt-1">Management interface for your high-end portfolio.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
             <span className="text-[0.6rem] font-bold tracking-widest uppercase">Kernel Active</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-12">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">
              <h2 className="text-2xl font-headline font-bold mb-8 text-primary italic flex items-center gap-4">
                <div className="w-8 h-[1px] bg-primary"></div>
                {isEditing ? "Modify Schematic" : "Initialize New Schematic"}
              </h2>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-6">
                    <div>
                    <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-white/40 mb-2">Project Identity</label>
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Project Name"
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-primary/50 focus:ring-0 outline-none transition-all placeholder:text-white/10 font-medium"
                    />
                    </div>

                    <div>
                    <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-white/40 mb-2">Access URL</label>
                    <input 
                        type="url" 
                        value={formData.link}
                        onChange={(e) => setFormData({...formData, link: e.target.value})}
                        placeholder="https://..."
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-primary/50 focus:ring-0 outline-none transition-all placeholder:text-white/10 font-mono"
                    />
                    </div>

                    <div>
                    <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-white/40 mb-2">Technological Stack</label>
                    <div className="relative">
                        <div className="flex flex-wrap gap-2 min-h-[52px] w-full bg-black/40 border border-white/10 rounded-xl p-2 mb-2">
                            {selectedTechs.map(t => (
                                <span key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[0.65rem] font-bold uppercase tracking-wider">
                                    {t}
                                    <button type="button" onClick={() => removeTech(t)} className="hover:text-white transition-colors">&times;</button>
                                </span>
                            ))}
                            <input 
                                type="text"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                placeholder="Add technology..."
                                className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm p-1 placeholder:text-white/10"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && techInput.trim()) {
                                        e.preventDefault();
                                        addTech(techInput.trim());
                                    }
                                }}
                            />
                        </div>
                        {suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full z-50 mt-1 bg-[#0a0f13] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                {suggestions.map(s => (
                                    <button 
                                        key={s}
                                        type="button"
                                        onClick={() => addTech(s)}
                                        className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all decoration-none"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-white/40 mb-2">Visual Manifestation (Screenshot)</label>
                        <div className="flex gap-4 items-start">
                            <div 
                                className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-primary/50 transition-all relative"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {formData.thumbnail ? (
                                    <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-primary transition-colors"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                         <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-[0.65rem] font-medium text-slate-500 mb-2 italic">Upload high-resolution screenshot or paste URL below.</p>
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <input 
                                    type="text" 
                                    value={formData.thumbnail || ""}
                                    onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                                    placeholder="Or paste image URL"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs focus:ring-0 outline-none transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                    <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-white/40 mb-2">Abstract / Summary</label>
                    <textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Detailed technical overview..."
                        required
                        rows={5}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-primary/50 focus:ring-0 outline-none transition-all placeholder:text-white/10 resize-none font-medium"
                    />
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
                    <div className="flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                            className="w-5 h-5 bg-black/40 border-white/10 rounded text-primary focus:ring-0 accent-primary"
                        />
                        <label htmlFor="featured" className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40 cursor-pointer">Pin to Showcase Layout</label>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        {isEditing && (
                            <button 
                            type="button" 
                            onClick={resetForm}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white/60 font-headline font-bold rounded-xl text-[0.65rem] uppercase tracking-widest hover:bg-white/10 transition-all flex-1 md:flex-none"
                            >
                            Abort
                            </button>
                        )}
                        <button 
                            type="submit" 
                            disabled={isLoading || uploading}
                            className="px-12 py-4 bg-primary text-black font-headline font-bold rounded-xl text-[0.65rem] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(0,242,255,0.2)] hover:shadow-[0_0_40px_rgba(0,242,255,0.4)] flex-1 md:flex-none"
                        >
                            {isEditing ? "Synchronize Changes" : "Deploy Schematic"}
                        </button>
                    </div>
                </div>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-12 mt-12">
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/40 mb-8 flex items-center gap-4">
               Active Schematic Registry
               <div className="flex-1 h-[1px] bg-white/5"></div>
            </h2>
            
            <div className="grid grid-cols-1 group/list">
              {isLoading && projects.length === 0 ? (
                <div className="col-span-full p-20 text-center">
                   <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                   <span className="text-xs text-white/20 uppercase tracking-widest">Accessing Secure Logs...</span>
                </div>
              ) : (
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={projects.map(p => p.id!)}
                    strategy={verticalListSortingStrategy}
                  >
                    {projects.map((project) => (
                      <SortableProjectCard 
                        key={project.id}
                        project={project}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        onTogglePin={handleTogglePin}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Overlay */}
      {notification && (
        <div className={`fixed bottom-8 right-8 z-50 p-5 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all duration-500 flex items-center gap-4 group animate-fadeIn pointer-events-none translate-y-0
            ${notification.type === 'success' ? 'bg-[#00ff88]/10 border-[#00ff88]/30 text-[#00ff88]' : 
              notification.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 
              'bg-primary/10 border-primary/30 text-primary'}`}>
          <div className={`w-2 h-2 rounded-full animate-pulse
            ${notification.type === 'success' ? 'bg-[#00ff88]' : 
              notification.type === 'error' ? 'bg-red-500' : 
              'bg-primary'}`}></div>
          <div className="flex flex-col">
             <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-40 mb-0.5">System Message</span>
             <p className="text-xs font-bold leading-tight tracking-wide">{notification.message}</p>
          </div>
          <div className="absolute bottom-0 left-0 h-[2px] bg-current opacity-20 w-full animate-toastProgress"></div>
        </div>
      )}

      {/* Confirmation Modal */}
      {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-sm animate-fadeIn">
              <div className="max-w-md w-full bg-[#0a0f13] border border-red-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(239,68,68,0.15)] relative overflow-hidden">
                  {/* Warning Glow */}
                  <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl opacity-50"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </div>
                    <h3 className="text-xl font-headline font-bold text-white mb-3 italic">Initiate Expungement?</h3>
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                        This sequence will permanently remove this schematic from the global registry. This action cannot be reversed.
                    </p>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setDeleteId(null)}
                            className="flex-1 py-3 bg-white/5 border border-white/10 text-white/60 font-headline font-bold rounded-xl text-[0.65rem] uppercase tracking-widest hover:bg-white/10 transition-all font-mono"
                        >
                            Abort Process
                        </button>
                        <button 
                            onClick={handleDeleteConfirm}
                            className="flex-1 py-3 bg-red-500/20 border border-red-500/50 text-red-400 font-headline font-bold rounded-xl text-[0.65rem] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        >
                            Confirm Deletion
                        </button>
                    </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}

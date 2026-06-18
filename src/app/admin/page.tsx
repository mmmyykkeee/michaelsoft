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
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
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
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "TailwindCSS",
  "Supabase",
  "PostgreSQL",
  "Prisma",
  "Go",
  "Rust",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "Docker",
  "Kubernetes",
  "Vercel",
  "AWS",
  "Google Cloud",
];

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const [techInput, setTechInput] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allTechs, setAllTechs] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Project>({
    name: "",
    description: "",
    link: "",
    technologies: "[]",
    thumbnail: null,
    featured: false,
  });

  useEffect(() => {
    fetchProjects();
    fetchTechs();
    setupStorage();
  }, []);

  const notify = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  async function setupStorage() {
    try {
      await supabase.storage.createBucket("thumbnails", { public: true });
    } catch {}
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
      setAllTechs(FALLBACK_TECHS);
    } else {
      const dbTechs = data.map((t: any) => t.name);
      const merged = Array.from(new Set([...FALLBACK_TECHS, ...dbTechs])).sort();
      setAllTechs(merged);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `project-thumbnails/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("thumbnails")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("thumbnails").getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, thumbnail: publicUrl }));
      notify("Image uploaded successfully.", "success");
    } catch (error: any) {
      notify(`Upload failed: ${error.message}`, "error");
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
      featured: formData.featured,
    };

    if (isEditing && currentProject?.id) {
      const { error } = await supabase
        .from("projects")
        .update(submissionData)
        .eq("id", currentProject.id);

      if (error) {
        notify(`Update failed: ${error.message}`, "error");
      } else {
        notify("Project updated.", "success");
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from("projects")
        .insert([submissionData]);

      if (error) {
        notify(`Create failed: ${error.message}`, "error");
      } else {
        notify("Project created.", "success");
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
      featured: false,
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
      featured: project.featured,
    });

    try {
      setSelectedTechs(JSON.parse(project.technologies));
    } catch {
      setSelectedTechs([]);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
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
      notify(`Delete failed: ${error.message}`, "error");
    } else {
      notify("Project deleted.", "success");
      fetchProjects();
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over?.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex) as Project[];
      setProjects(newProjects);

      await updateProjectOrder(newProjects);
    }
  }

  async function updateProjectOrder(projectList: Project[]) {
    try {
      const updates = projectList.map((p, index) => ({
        id: p.id,
        display_order: index,
      }));

      for (const update of updates) {
        await supabase
          .from("projects")
          .update({ display_order: update.display_order })
          .eq("id", update.id!);
      }

      notify("Order updated.", "success");
    } catch {
      notify("Failed to update order.", "error");
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
      notify("Failed to update pin status.", "error");
    } else {
      notify(newStatus ? "Project pinned." : "Project unpinned.", "success");
      fetchProjects();
    }
  }

  function handleDeleteClick(id: number) {
    setDeleteId(id);
  }

  useEffect(() => {
    if (techInput.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = allTechs
      .filter(
        (t) =>
          t.toLowerCase().includes(techInput.toLowerCase()) &&
          !selectedTechs.includes(t)
      )
      .slice(0, 5);

    const exactMatch = allTechs.some(
      (t) => t.toLowerCase() === techInput.toLowerCase().trim()
    );
    if (techInput.trim() && !exactMatch) {
      setSuggestions([`+ Add "${techInput.trim()}"`, ...filtered]);
    } else {
      setSuggestions(filtered);
    }
  }, [techInput, selectedTechs, allTechs]);

  const addTech = async (t: string) => {
    let formatted = t.startsWith('+ Add "')
      ? t.replace('+ Add "', "").replace('"', "").trim()
      : t.trim();

    if (!formatted) return;

    if (!selectedTechs.includes(formatted)) {
      setSelectedTechs([...selectedTechs, formatted]);
    }

    if (!allTechs.some((a) => a.toLowerCase() === formatted.toLowerCase())) {
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
    setSelectedTechs(selectedTechs.filter((i) => i !== t));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <nav className="border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Admin
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Active
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Form */}
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            {isEditing ? "Edit Project" : "New Project"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Project name"
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 focus:border-neutral-300 dark:focus:border-neutral-600 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  placeholder="https://..."
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 focus:border-neutral-300 dark:focus:border-neutral-600 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                Technologies
              </label>
              <div className="relative">
                <div className="flex flex-wrap gap-1.5 min-h-[40px] w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                  {selectedTechs.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTech(t)}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add technology..."
                    className="flex-1 min-w-[120px] bg-transparent border-none focus:ring-0 outline-none text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && techInput.trim()) {
                        e.preventDefault();
                        addTech(techInput.trim());
                      }
                    }}
                  />
                </div>
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full z-50 mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-lg">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => addTech(s)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Thumbnail
                </label>
                <div className="flex gap-3 items-start">
                  <div
                    className="w-20 h-20 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {formData.thumbnail ? (
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-neutral-400"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-neutral-300 dark:border-neutral-600 border-t-neutral-900 dark:border-t-neutral-100 rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
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
                      onChange={(e) =>
                        setFormData({ ...formData, thumbnail: e.target.value })
                      }
                      placeholder="Or paste image URL"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Project description..."
                  required
                  rows={4}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 focus:border-neutral-300 dark:focus:border-neutral-600 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 focus:ring-neutral-200 dark:focus:ring-neutral-700"
                />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Pin to top
                </span>
              </label>

              <div className="flex gap-3">
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-600 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading || uploading}
                  className="px-5 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.97] transition-all duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Project List */}
        <div>
          <h2 className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
            Projects
          </h2>

          {isLoading && projects.length === 0 ? (
            <div className="py-16 text-center">
              <div className="animate-spin w-5 h-5 border-2 border-neutral-300 dark:border-neutral-600 border-t-neutral-900 dark:border-t-neutral-100 rounded-full mx-auto mb-3" />
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                Loading...
              </p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={projects.map((p) => p.id!)}
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

      {/* Toast */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg border shadow-lg text-sm font-medium transition-all duration-200 ${
            notification.type === "success"
              ? "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
              : notification.type === "error"
                ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/80">
          <div className="max-w-sm w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Delete project?
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { Plus, Edit3, Trash2 } from "lucide-react";

export default function ProjectsTab({
  projects,
  openItemModal,
  deleteProject,
  showToast
}) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Projects Portfolio</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Add, update, or reorder your showcased work.</p>
        </div>

        <button
          onClick={() => openItemModal("project")}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 hover:scale-105 transition cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id || proj._id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {proj.category}
                </span>
                {proj.featured && (
                  <span className="text-[10px] font-mono text-amber-400">★ Featured</span>
                )}
              </div>

              {/* Project Image & Details */}
              <div className="flex gap-3 mb-3">
                {proj.image && (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop";
                      }}
                    />
                    {Array.isArray(proj.images) && proj.images.length > 1 && (
                      <span className="absolute bottom-0 right-0 px-1 py-0.2 rounded-tl bg-slate-950/90 text-[9px] font-mono text-cyan-400 font-bold">
                        +{proj.images.length}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-base mb-1 truncate">{proj.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2">{proj.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div className="flex gap-1.5">
                {proj.tags?.slice(0, 2).map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-slate-500">#{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openItemModal("project", proj)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete project "${proj.title}"?`)) {
                      deleteProject(proj.id || proj._id);
                      showToast("Project removed");
                    }
                  }}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

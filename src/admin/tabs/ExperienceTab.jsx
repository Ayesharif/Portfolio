import { Plus, Edit3, Trash2 } from "lucide-react";

export default function ExperienceTab({
  experiences,
  openItemModal,
  deleteExperience,
  showToast
}) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Work Experiences</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Manage career timeline, positions, and company details.</p>
        </div>

        <button
          onClick={() => openItemModal("experience")}
          className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 hover:scale-105 transition cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id || exp._id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{exp.role}</span>
                <span className="text-xs font-mono text-emerald-400">@{exp.company}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>{exp.period}</span>
                <span>•</span>
                <span>{exp.location || "Remote"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => openItemModal("experience", exp)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Edit"
              >
                <Edit3 size={15} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete experience at ${exp.company}?`)) {
                    deleteExperience(exp.id || exp._id);
                    showToast("Experience removed");
                  }
                }}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                title="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

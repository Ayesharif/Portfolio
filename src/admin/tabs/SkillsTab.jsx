import { Plus, Edit3, Trash2 } from "lucide-react";

export default function SkillsTab({
  skills,
  openItemModal,
  deleteSkill,
  showToast
}) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Skills & Tools</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Manage technologies, proficiency levels, and categories.</p>
        </div>

        <button
          onClick={() => openItemModal("skill")}
          className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 hover:scale-105 transition cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id || skill._id}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2"
          >
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">{skill.name}</div>
              <div className="text-[10px] text-slate-400 font-mono">
                {skill.category} • {skill.level || 85}%
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => openItemModal("skill", skill)}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <Edit3 size={13} />
              </button>
              <button
                onClick={() => {
                  deleteSkill(skill.id || skill._id);
                  showToast("Skill deleted");
                }}
                className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

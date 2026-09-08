import { Plus, Edit3, Trash2 } from "lucide-react";

export default function EducationTab({
  education,
  openItemModal,
  deleteEducation,
  showToast
}) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Academic Education</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Manage your degrees, university, and school information.</p>
        </div>

        <button
          onClick={() => openItemModal("education")}
          className="px-4 py-2 rounded-xl bg-purple-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-500/25 hover:scale-105 transition cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id || edu._id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4"
          >
            <div>
              <h4 className="font-bold text-white text-base">{edu.degree}</h4>
              <div className="text-xs text-purple-400 font-mono mt-0.5">
                {edu.institution} ({edu.period})
              </div>
              {edu.grade && (
                <div className="text-xs text-emerald-400 mt-1">Grade / CGPA: {edu.grade}</div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openItemModal("education", edu)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => {
                  deleteEducation(edu.id || edu._id);
                  showToast("Education entry deleted");
                }}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Plus, Edit3, Trash2 } from "lucide-react";

export default function CertificationsTab({
  certifications,
  openItemModal,
  deleteCertification,
  showToast
}) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Certifications & Honors</h2>
          <p className="text-slate-400 text-xs sm:text-sm">Manage courses, licenses, and verified credentials.</p>
        </div>

        <button
          onClick={() => openItemModal("certification")}
          className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/25 hover:scale-105 transition cursor-pointer"
        >
          <Plus size={14} />
          <span>Add Certificate</span>
        </button>
      </div>

      <div className="space-y-3">
        {certifications.map((cert) => (
          <div
            key={cert.id || cert._id}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4"
          >
            <div>
              <h4 className="font-bold text-white text-sm">{cert.title}</h4>
              <div className="text-xs text-amber-400 font-mono mt-0.5">
                {cert.issuer} • {cert.date}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openItemModal("certification", cert)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => {
                  deleteCertification(cert.id || cert._id);
                  showToast("Certification deleted");
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

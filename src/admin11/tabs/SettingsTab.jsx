import { Database, Download, Upload, KeyRound, RefreshCw } from "lucide-react";

export default function SettingsTab({
  seedBackend,
  exportDataJSON,
  handleJsonImport,
  newPinCode,
  setNewPinCode,
  updateAdminPinCode,
  resetToDefaults,
  profile,
  setProfileForm,
  showToast
}) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Database, Backup & PIN Settings</h2>
        <p className="text-slate-400 text-xs sm:text-sm">Manage MongoDB seeding, JSON exports, and security credentials.</p>
      </div>

      {/* MongoDB 1-Click Database Seeding */}
      <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
        <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
          <Database size={18} />
          <span>MongoDB Database Seeder</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Populate your MongoDB database in 1 click with all default portfolio data (profile, projects, skills, certifications, and education).
        </p>
        <button
          onClick={async () => {
            const res = await seedBackend();
            if (res.success) {
              showToast("MongoDB database seeded successfully!");
            } else {
              alert("Seed note: " + (res.error || "Check backend connection"));
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:scale-105 transition cursor-pointer"
        >
          <Database size={15} />
          <span>Seed MongoDB Database Now</span>
        </button>
      </div>

      {/* Data Export / Import */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Download size={18} className="text-emerald-400" />
          <span>Data Export & Import (JSON)</span>
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          Download a complete backup of your portfolio data to transfer between devices or keep safe.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={exportDataJSON}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 border border-slate-700 transition cursor-pointer"
          >
            <Download size={15} />
            <span>Export JSON Backup</span>
          </button>

          <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-2 border border-slate-700 transition cursor-pointer">
            <Upload size={15} />
            <span>Import JSON File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleJsonImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* PIN Change */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <KeyRound size={18} className="text-cyan-400" />
          <span>Change Quick Access PIN</span>
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="password"
            placeholder="Enter new PIN"
            value={newPinCode}
            onChange={(e) => setNewPinCode(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-xl glass-input text-sm font-mono"
          />
          <button
            onClick={() => {
              if (!newPinCode) return;
              updateAdminPinCode(newPinCode);
              setNewPinCode("");
              showToast("PIN updated successfully!");
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer"
          >
            Update PIN
          </button>
        </div>
      </div>

      {/* Factory Reset */}
      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-3">
        <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
          <RefreshCw size={18} />
          <span>Reset to Factory Defaults</span>
        </h3>
        <p className="text-slate-400 text-xs">
          Restore the initial rich default data for Muhammad Ayesh.
        </p>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to reset all portfolio data back to defaults?")) {
              resetToDefaults();
              setProfileForm(profile);
              showToast("Portfolio reset to default dataset.");
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-semibold text-xs transition cursor-pointer"
        >
          Reset Everything
        </button>
      </div>

    </div>
  );
}

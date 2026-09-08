import { Link } from "react-router-dom";
import { Shield, Eye, LogOut } from "lucide-react";

export default function AdminHeader({ isBackendConnected, currentUser, profile, logoutAdmin }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Shield size={20} className="text-emerald-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-base sm:text-lg text-white">Portfolio Admin Panel</h1>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
              isBackendConnected
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            }`}>
              {isBackendConnected ? "● MongoDB Atlas Connected" : "○ Connecting to Database..."}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400">
            Logged in as: <span className="text-emerald-400">{currentUser?.email || profile?.name || "Admin"}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 hover:text-white transition"
        >
          <Eye size={14} />
          <span>View Live Site</span>
        </Link>

        <button
          onClick={logoutAdmin}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs text-red-400 transition cursor-pointer"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

import {
  User,
  Mail,
  Briefcase,
  FolderGit2,
  Code2,
  Award,
  GraduationCap,
  Settings,
  Sparkles
} from "lucide-react";

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  messages,
  experiences,
  projects,
  skills,
  certifications,
  education
}) {
  const unreadCount = messages?.filter((m) => !m.isRead).length || 0;

  const tabs = [
    { id: "profile", label: "Profile & Bio", icon: <User size={16} /> },
    {
      id: "messages",
      label: "Inbox & Messages",
      icon: <Mail size={16} />,
      count: unreadCount > 0 ? `${unreadCount} new` : messages?.length
    },
    { id: "experience", label: "Work Experience", icon: <Briefcase size={16} />, count: experiences?.length },
    { id: "projects", label: "Projects", icon: <FolderGit2 size={16} />, count: projects?.length },
    { id: "skills", label: "Skills & Tech", icon: <Code2 size={16} />, count: skills?.length },
    { id: "certifications", label: "Certifications", icon: <Award size={16} />, count: certifications?.length },
    { id: "education", label: "Education", icon: <GraduationCap size={16} />, count: education?.length },
    { id: "settings", label: "Database & Settings", icon: <Settings size={16} /> }
  ];

  return (
    <div className="lg:col-span-3 space-y-2">
      <div className="glass-panel p-3 rounded-2xl border border-slate-800 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
            {tab.count !== undefined && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
          <Sparkles size={14} />
          <span>Full-Stack Live Sync</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Modifications are securely authenticated via JWT cookies, persisted to MongoDB, and reflected on your live site immediately.
        </p>
      </div>
    </div>
  );
}

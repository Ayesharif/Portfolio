import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Lock, 
  LogOut, 
  User, 
  Briefcase, 
  FolderGit2, 
  Code2, 
  Award, 
  GraduationCap, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  Eye, 
  CheckCircle2, 
  X,
  Sparkles,
  Database,
  KeyRound,
  Mail,
  Clock,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function AdminPanel() {
  const {
    profile,
    experiences,
    skills,
    projects,
    certifications,
    education,
    updateProfile,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    addEducation,
    updateEducation,
    deleteEducation,
    resetToDefaults,
    seedBackend,
    exportDataJSON,
    importDataJSON,
    isAdminAuthenticated,
    currentUser,
    loginWithBackend,
    registerWithBackend,
    authenticateAdmin,
    logoutAdmin,
    updateAdminPinCode,
    isBackendConnected,
    messages,
    fetchMessages,
    markMessageAsRead,
    deleteMessage
  } = usePortfolio();

  // Auth form states
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register' | 'pin'
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("Muhammad Ayesh");
  const [enteredPin, setEnteredPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Admin tabs & feedback
  const [activeTab, setActiveTab] = useState("profile");
  const [toastMessage, setToastMessage] = useState(null);

  // Modals & form states
  const [editingItem, setEditingItem] = useState(null); // { type, isNew, data }
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Profile form local state
  const [profileForm, setProfileForm] = useState(profile || {});

  // PIN change state
  const [newPinCode, setNewPinCode] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError("");

    const res = await loginWithBackend(loginEmail, loginPassword);
    setIsAuthLoading(false);

    if (res.success) {
      setProfileForm(profile);
      showToast(`Welcome back, ${res.user?.name || "Muhammad Ayesh"}!`);
    } else {
      setAuthError(res.message || "Invalid email or password.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError("");

    const res = await registerWithBackend(registerName, loginEmail, loginPassword);
    setIsAuthLoading(false);

    if (res.success) {
      setProfileForm(profile);
      showToast("Account created and logged in successfully!");
    } else {
      setAuthError(res.message || "Registration failed.");
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (authenticateAdmin(enteredPin)) {
      setAuthError("");
      setEnteredPin("");
      setProfileForm(profile);
      showToast("Admin access unlocked via PIN.");
    } else {
      setAuthError("Incorrect PIN. Please try again.");
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast("Profile details updated successfully!");
  };

  const openItemModal = (type, item = null) => {
    setEditingItem({
      type,
      isNew: !item,
      data: item ? JSON.parse(JSON.stringify(item)) : getEmptyItem(type)
    });
    setIsModalOpen(true);
  };

  const getEmptyItem = (type) => {
    switch (type) {
      case "experience":
        return {
          role: "",
          company: "",
          location: "Remote",
          period: "2024 - Present",
          type: "Full-Time",
          description: "",
          achievements: [""],
          technologies: ["React.js", "Node.js"]
        };
      case "project":
        return {
          title: "",
          category: "Full Stack",
          featured: false,
          description: "",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
          tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
          liveUrl: "",
          githubUrl: ""
        };
      case "skill":
        return {
          name: "",
          category: "Frontend",
          level: 85
        };
      case "certification":
        return {
          title: "",
          issuer: "",
          date: new Date().getFullYear().toString(),
          credentialId: "",
          credentialUrl: "",
          description: ""
        };
      case "education":
        return {
          degree: "",
          institution: "",
          location: "Lahore, Pakistan",
          period: "2020 - 2024",
          grade: "",
          description: "",
          highlights: [""]
        };
      default:
        return {};
    }
  };

  const saveModalItem = (e) => {
    e.preventDefault();
    const { type, isNew, data: itemData } = editingItem;

    if (type === "experience") {
      if (isNew) addExperience(itemData);
      else updateExperience(itemData.id, itemData);
    } else if (type === "project") {
      if (isNew) addProject(itemData);
      else updateProject(itemData.id, itemData);
    } else if (type === "skill") {
      if (isNew) addSkill(itemData);
      else updateSkill(itemData.id, itemData);
    } else if (type === "certification") {
      if (isNew) addCertification(itemData);
      else updateCertification(itemData.id, itemData);
    } else if (type === "education") {
      if (isNew) addEducation(itemData);
      else updateEducation(itemData.id, itemData);
    }

    setIsModalOpen(false);
    setEditingItem(null);
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully!`);
  };

  const handleJsonImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importDataJSON(event.target.result);
      if (res.success) {
        showToast("Data imported successfully!");
      } else {
        alert("Import failed: " + res.error);
      }
    };
    reader.readAsText(file);
  };

  // If not authenticated, show modern Auth Gateway
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl text-center">
          
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-lg shadow-emerald-500/20">
            <Shield size={28} />
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-1">Admin Authentication</h2>
          <p className="text-slate-400 text-xs mb-6">
            Sign in with your MongoDB / JWT credentials or enter quick PIN.
          </p>

          {/* Mode Selector Tabs */}
          <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 mb-6 text-xs">
            <button
              onClick={() => { setAuthMode("login"); setAuthError(""); }}
              className={`flex-1 py-2 rounded-lg font-medium transition cursor-pointer ${
                authMode === "login"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Email Login
            </button>
            <button
              onClick={() => { setAuthMode("register"); setAuthError(""); }}
              className={`flex-1 py-2 rounded-lg font-medium transition cursor-pointer ${
                authMode === "register"
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => { setAuthMode("pin"); setAuthError(""); }}
              className={`flex-1 py-2 rounded-lg font-medium transition cursor-pointer ${
                authMode === "pin"
                  ? "bg-slate-700 text-white font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Quick PIN
            </button>
          </div>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono">
              {authError}
            </div>
          )}

          {/* 1. Email Login Form */}
          {authMode === "login" && (
            <form onSubmit={handleEmailLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. ayesharif@gmail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
              >
                {isAuthLoading ? "Authenticating..." : "Login to Admin Panel"}
              </button>
            </form>
          )}

          {/* 2. Register Form */}
          {authMode === "register" && (
            <form onSubmit={handleRegister} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ayesharif@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Set Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
              >
                {isAuthLoading ? "Registering..." : "Create Admin Account"}
              </button>
            </form>
          )}

          {/* 3. PIN Code Form */}
          {authMode === "pin" && (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter PIN (Default: admin123)"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input text-center text-lg tracking-widest font-mono"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition cursor-pointer"
              >
                Unlock via PIN
              </button>
            </form>
          )}

          {/* Bottom Info Bar */}
          <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono text-[11px]">
              Postman: <code className="text-cyan-400">/api/auth/register</code>
            </span>
            <Link to="/" className="text-slate-400 hover:text-white transition">
              ← View Portfolio
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // Logged-in Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-sm shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header */}
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

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="glass-panel p-3 rounded-2xl border border-slate-800 space-y-1">
            {[
              { id: "profile", label: "Profile & Bio", icon: <User size={16} /> },
              {
                id: "messages",
                label: "Inbox & Messages",
                icon: <Mail size={16} />,
                count: messages?.filter((m) => !m.isRead).length > 0 ? `${messages.filter((m) => !m.isRead).length} new` : messages?.length
              },
              { id: "experience", label: "Work Experience", icon: <Briefcase size={16} />, count: experiences?.length },
              { id: "projects", label: "Projects", icon: <FolderGit2 size={16} />, count: projects?.length },
              { id: "skills", label: "Skills & Tech", icon: <Code2 size={16} />, count: skills?.length },
              { id: "certifications", label: "Certifications", icon: <Award size={16} />, count: certifications?.length },
              { id: "education", label: "Education", icon: <GraduationCap size={16} />, count: education?.length },
              { id: "settings", label: "Database & Settings", icon: <Settings size={16} /> },
            ].map((tab) => (
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

        {/* Content Area (9 cols) */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: PROFILE */}
          {activeTab === "profile" && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Profile & Personal Information</h2>
                <p className="text-slate-400 text-xs sm:text-sm">Manage your name, roles, bio, contact details, and links.</p>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={profileForm.title || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Hero Tagline / Summary</label>
                  <textarea
                    rows="2"
                    value={profileForm.tagline || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Full Biography (About Me)</label>
                  <textarea
                    rows="4"
                    value={profileForm.bio || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={profileForm.email || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={profileForm.phone || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={profileForm.location || ""}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={profileForm.socials?.github || ""}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          socials: { ...profileForm.socials, github: e.target.value }
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={profileForm.socials?.linkedin || ""}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          socials: { ...profileForm.socials, linkedin: e.target.value }
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Availability Status</label>
                  <input
                    type="text"
                    value={profileForm.availability || ""}
                    onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Save size={16} />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: MESSAGES / INBOX */}
          {activeTab === "messages" && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl font-bold text-white">Client Inquiries & Messages</h2>
                    {messages?.filter((m) => !m.isRead).length > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        {messages.filter((m) => !m.isRead).length} Unread
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Direct inquiries submitted by recruiters, clients, and visitors via your portfolio contact form.
                  </p>
                </div>

                <button
                  onClick={async () => {
                    await fetchMessages();
                    showToast("Inbox refreshed");
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer self-start sm:self-auto border border-slate-700"
                >
                  <RefreshCw size={14} />
                  <span>Refresh Inbox</span>
                </button>
              </div>

              {/* Messages List */}
              {(!messages || messages.length === 0) ? (
                <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 p-8 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                    <Mail size={26} />
                  </div>
                  <h3 className="text-base font-semibold text-white">Your inbox is empty</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    When visitors submit messages on your portfolio contact form, they will appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`p-5 rounded-2xl border transition-all duration-200 ${
                        !msg.isRead
                          ? "bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20"
                          : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-bold text-white text-sm sm:text-base">
                              {msg.name}
                            </span>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs font-mono text-cyan-400 hover:underline"
                            >
                              {msg.email}
                            </a>
                            {!msg.isRead && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-slate-950">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-emerald-300 mt-1">
                            Subject: {msg.subject || "General Inquiry"}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
                          <Clock size={13} />
                          <span>
                            {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })
                              : "Recently"}
                          </span>
                        </div>
                      </div>

                      {/* Message body */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-4">
                        {msg.message}
                      </p>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              markMessageAsRead(msg._id, !msg.isRead);
                              showToast(msg.isRead ? "Marked as unread" : "Marked as read");
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
                              msg.isRead
                                ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                                : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40"
                            }`}
                          >
                            {msg.isRead ? "Mark as Unread" : "Mark as Read"}
                          </button>

                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent(
                              "Re: " + (msg.subject || "Your Portfolio Inquiry")
                            )}`}
                            className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition"
                          >
                            <ExternalLink size={13} />
                            <span>Reply via Email</span>
                          </a>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm("Delete this message?")) {
                              deleteMessage(msg._id);
                              showToast("Message deleted");
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EXPERIENCE */}
          {activeTab === "experience" && (
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
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === "projects" && (
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
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="text-[10px] font-mono text-amber-400">★ Featured</span>
                        )}
                      </div>
                      <h3 className="font-bold text-white text-base mb-1">{proj.title}</h3>
                      <p className="text-slate-400 text-xs line-clamp-2 mb-3">{proj.description}</p>
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
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === "skills" && (
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
          )}

          {/* TAB 5: CERTIFICATIONS */}
          {activeTab === "certifications" && (
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
          )}

          {/* TAB 6: EDUCATION */}
          {activeTab === "education" && (
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
          )}

          {/* TAB 7: DATABASE & SETTINGS */}
          {activeTab === "settings" && (
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
          )}

        </div>

      </div>

      {/* Dynamic Item Add/Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white capitalize">
                {editingItem.isNew ? "Add New" : "Edit"} {editingItem.type}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveModalItem} className="space-y-4">
              
              {/* EXPERIENCE FIELDS */}
              {editingItem.type === "experience" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Job Role</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.role}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, role: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Company</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.company}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, company: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Period</label>
                      <input
                        type="text"
                        placeholder="e.g. 2023 - Present"
                        value={editingItem.data.period}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, period: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Remote / Lahore"
                        value={editingItem.data.location}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, location: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
                    <textarea
                      rows="3"
                      value={editingItem.data.description}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, description: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Technologies (comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="React.js, Node.js, Express, MongoDB"
                      value={
                        Array.isArray(editingItem.data.technologies)
                          ? editingItem.data.technologies.join(", ")
                          : editingItem.data.technologies || ""
                      }
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: {
                            ...editingItem.data,
                            technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                </>
              )}

              {/* PROJECT FIELDS */}
              {editingItem.type === "project" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.title}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, title: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
                      <select
                        value={editingItem.data.category}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, category: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={editingItem.data.image}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, image: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
                    <textarea
                      rows="3"
                      value={editingItem.data.description}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, description: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Tags (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, MongoDB, Tailwind"
                      value={
                        Array.isArray(editingItem.data.tags)
                          ? editingItem.data.tags.join(", ")
                          : editingItem.data.tags || ""
                      }
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: {
                            ...editingItem.data,
                            tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Live URL</label>
                      <input
                        type="url"
                        value={editingItem.data.liveUrl || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, liveUrl: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">GitHub URL</label>
                      <input
                        type="url"
                        value={editingItem.data.githubUrl || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, githubUrl: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="featured-check"
                      checked={!!editingItem.data.featured}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, featured: e.target.checked }
                        })
                      }
                      className="rounded text-emerald-500"
                    />
                    <label htmlFor="featured-check" className="text-xs text-slate-300">
                      Mark as Featured Project
                    </label>
                  </div>
                </>
              )}

              {/* SKILL FIELDS */}
              {editingItem.type === "skill" && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={editingItem.data.name}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, name: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
                      <select
                        value={editingItem.data.category}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, category: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="DevOps & Tools">DevOps & Tools</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Proficiency ({editingItem.data.level || 85}%)
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={editingItem.data.level || 85}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, level: Number(e.target.value) }
                          })
                        }
                        className="w-full mt-2 accent-emerald-400"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* CERTIFICATION FIELDS */}
              {editingItem.type === "certification" && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Certificate Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem.data.title}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, title: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Issuing Organization</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.issuer}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, issuer: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Issue Year</label>
                      <input
                        type="text"
                        value={editingItem.data.date}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, date: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Credential ID</label>
                      <input
                        type="text"
                        value={editingItem.data.credentialId || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, credentialId: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Credential URL</label>
                      <input
                        type="url"
                        value={editingItem.data.credentialUrl || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, credentialUrl: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
                    <textarea
                      rows="2"
                      value={editingItem.data.description || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, description: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                    ></textarea>
                  </div>
                </>
              )}

              {/* EDUCATION FIELDS */}
              {editingItem.type === "education" && (
                <>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Degree / Program</label>
                    <input
                      type="text"
                      required
                      value={editingItem.data.degree}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, degree: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Institution</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.institution}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, institution: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Period</label>
                      <input
                        type="text"
                        placeholder="2020 - 2024"
                        value={editingItem.data.period}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, period: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Grade / CGPA</label>
                      <input
                        type="text"
                        placeholder="3.5 / 4.0 CGPA"
                        value={editingItem.data.grade || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, grade: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="Lahore, Pakistan"
                        value={editingItem.data.location || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, location: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
                    <textarea
                      rows="2"
                      value={editingItem.data.description || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, description: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
                    ></textarea>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Save Item
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

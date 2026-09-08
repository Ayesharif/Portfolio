import React, { useState } from "react";
import { 
  Code2, 
  Layers, 
  Database, 
  Server, 
  Cpu, 
  Terminal, 
  Globe, 
  Shield, 
  Palette, 
  Zap, 
  Box, 
  Sparkles,
  GitBranch,
  Layout
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

function Skills() {
  const { skills } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Frontend", "Backend", "Database", "DevOps & Tools"];

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category?.toLowerCase() === selectedCategory.toLowerCase());

  const getCategoryColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case "frontend":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
      case "backend":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "database":
        return "text-purple-400 bg-purple-500/10 border-purple-500/30";
      case "devops & tools":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/30";
    }
  };

  const getSkillIcon = (name) => {
    const n = name?.toLowerCase() || "";
    if (n.includes("react") || n.includes("next")) return <Layers size={20} className="text-cyan-400" />;
    if (n.includes("node") || n.includes("express")) return <Server size={20} className="text-emerald-400" />;
    if (n.includes("mongo") || n.includes("sql") || n.includes("data")) return <Database size={20} className="text-purple-400" />;
    if (n.includes("tailwind") || n.includes("css") || n.includes("html")) return <Palette size={20} className="text-pink-400" />;
    if (n.includes("git") || n.includes("docker")) return <GitBranch size={20} className="text-amber-400" />;
    if (n.includes("auth") || n.includes("jwt")) return <Shield size={20} className="text-blue-400" />;
    return <Code2 size={20} className="text-emerald-400" />;
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Sparkles size={14} />
            <span>TECH STACK & EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient-emerald">Technologies</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Modern tools and technologies I use to build scalable full-stack applications.
          </p>
        </div>

        {/* Core MERN Spotlight Banner */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">Core Specialization</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">The MERN Stack Architecture</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                End-to-end JavaScript mastery connecting MongoDB database layers to dynamic React frontend applications.
              </p>
            </div>
            
            <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full md:w-auto">
              <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center hover:border-emerald-500/50 transition">
                <Database size={24} className="text-emerald-400 mb-1" />
                <span className="text-xs font-bold text-white">Mongo</span>
                <span className="text-[9px] text-slate-400 font-mono">DB</span>
              </div>

              <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center hover:border-emerald-500/50 transition">
                <Server size={24} className="text-cyan-400 mb-1" />
                <span className="text-xs font-bold text-white">Express</span>
                <span className="text-[9px] text-slate-400 font-mono">JS</span>
              </div>

              <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center hover:border-emerald-500/50 transition">
                <Layers size={24} className="text-cyan-300 mb-1" />
                <span className="text-xs font-bold text-white">React</span>
                <span className="text-[9px] text-slate-400 font-mono">JS</span>
              </div>

              <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center hover:border-emerald-500/50 transition">
                <Cpu size={24} className="text-emerald-300 mb-1" />
                <span className="text-xs font-bold text-white">Node</span>
                <span className="text-[9px] text-slate-400 font-mono">JS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25 scale-105"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {getSkillIcon(skill.name)}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${getCategoryColor(
                      skill.category
                    )}`}
                  >
                    {skill.category}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {skill.name}
                </h4>
              </div>

              {/* Proficiency meter bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[11px] text-slate-400 font-mono">Proficiency</span>
                  <span className="font-mono text-emerald-400 font-semibold">{skill.level || 85}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level || 85}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;

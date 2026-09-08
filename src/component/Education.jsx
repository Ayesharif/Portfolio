import React from "react";
import { GraduationCap, Calendar, MapPin, Sparkles, CheckCircle2, BookOpen } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

function Education() {
  const { education } = usePortfolio();

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
            <GraduationCap size={14} />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & <span className="text-gradient-cyan">Studies</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Academic foundations in computer science, software engineering principles, and core computing.
          </p>
        </div>

        {/* Education Cards */}
        {education && education.length > 0 ? (
          <div className="space-y-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 transition-transform">
                      <GraduationCap size={24} />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {edu.degree}
                      </h3>
                      <div className="text-base font-medium text-emerald-400 mt-0.5">
                        {edu.institution}
                      </div>
                      {edu.location && (
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                          <MapPin size={12} /> {edu.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {edu.grade && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {edu.grade}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1.5">
                      <Calendar size={12} className="text-purple-400" />
                      {edu.period}
                    </span>
                  </div>
                </div>

                {edu.description && (
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4 mt-2">
                    {edu.description}
                  </p>
                )}

                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                      <BookOpen size={13} className="text-purple-400" />
                      <span>Key Highlights & Coursework</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {edu.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 rounded-3xl glass-panel text-slate-400">
            No education entries added yet.
          </div>
        )}

      </div>
    </section>
  );
}

export default Education;

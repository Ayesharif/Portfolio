import React from "react";
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

function Experience() {
  const { experiences } = usePortfolio();

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Briefcase size={14} />
            <span>CAREER PATH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work <span className="text-gradient-cyan">Experience</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            My professional journey, roles, and key contributions in web development.
          </p>
        </div>

        {/* Experience Timeline */}
        {experiences && experiences.length > 0 ? (
          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id || index} className="relative pl-8 md:pl-12 group">
                
                {/* Timeline Glowing Node */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:bg-cyan-400 transition-colors"></div>
                </div>

                {/* Optional Period Pill on desktop left side */}
                <div className="hidden md:block absolute -left-36 top-2 text-right w-24">
                  <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-1 rounded-md bg-emerald-950/60 border border-emerald-900/50">
                    {exp.period}
                  </span>
                </div>

                {/* Experience Card */}
                <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
                  
                  {/* Card Top Row: Role, Company, Period (mobile) */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300 mt-1">
                        <span className="font-semibold text-emerald-400">{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="text-slate-600">•</span>
                            <span className="flex items-center gap-1 text-slate-400 text-xs">
                              <MapPin size={12} /> {exp.location}
                            </span>
                          </>
                        )}
                        {exp.type && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                            {exp.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mobile Period Badge */}
                    <div className="md:hidden flex items-center gap-1.5 text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                      <Calendar size={13} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Summary / Description */}
                  {exp.description && (
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                      {exp.description}
                    </p>
                  )}

                  {/* Bulleted Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack tags */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 mr-1">Stack:</span>
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 text-xs font-mono hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 rounded-3xl glass-panel text-slate-400">
            No work experiences added yet. Add some in the Admin Panel!
          </div>
        )}

      </div>
    </section>
  );
}

export default Experience;

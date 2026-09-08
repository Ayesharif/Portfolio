import React, { useState } from "react";
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  Eye, 
  Layers, 
  ArrowUpRight 
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { usePortfolio } from "../context/PortfolioContext";
import ProjectModal from "./ProjectModal";

function Projects() {
  const { projects } = usePortfolio();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ["All", "Full Stack", "Frontend", "Backend"];

  const filteredProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter(
          (p) => p.category?.toLowerCase() === selectedFilter.toLowerCase()
        );

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <FolderGit2 size={14} />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recent <span className="text-gradient-cyan">Projects</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            A selection of MERN stack applications, responsive web apps, and API services I've developed.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedFilter.toLowerCase() === cat.toLowerCase()
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 scale-105"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-950/30 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Card Image Container */}
                  <div className="relative w-full h-52 bg-slate-950 overflow-hidden">
                    <img
                      src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    {/* Category & Featured Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-950/80 text-cyan-400 backdrop-blur-md border border-cyan-500/30">
                        {project.category || "Full Stack"}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/80 text-slate-950 font-bold backdrop-blur-md flex items-center gap-1">
                          <Sparkles size={10} /> Featured
                        </span>
                      )}
                    </div>

                    {/* Multiple Images Indicator Badge */}
                    {Array.isArray(project.images) && project.images.length > 1 && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 text-[10px] font-mono flex items-center gap-1 shadow-md">
                        <Layers size={11} />
                        <span>{project.images.length} Photos</span>
                      </div>
                    )}

                    {/* Quick Eye View Button */}
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/90 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 backdrop-blur-md border border-slate-700/80 hover:border-cyan-400 transition shadow-lg cursor-pointer"
                      title="Quick Preview"
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 text-[11px] font-mono border border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 text-[10px] font-mono">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
                        title="GitHub Repo"
                      >
                        <GithubIcon size={15} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/30 transition"
                        title="Live Demo"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 rounded-3xl glass-panel text-slate-400">
            No projects found in this category.
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}

export default Projects;

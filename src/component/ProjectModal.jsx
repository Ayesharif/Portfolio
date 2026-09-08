import React, { useState, useEffect } from "react";
import { 
  X, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Image as ImageIcon 
} from "lucide-react";
import { GithubIcon } from "./Icons";

function ProjectModal({ project, onClose }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Extract all available images
  const allImages = React.useMemo(() => {
    if (!project) return [];
    if (Array.isArray(project.images) && project.images.length > 0) {
      const filtered = project.images.filter(Boolean);
      if (filtered.length > 0) return filtered;
    }
    return project.image ? [project.image] : [];
  }, [project]);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (allImages.length > 1) {
        if (e.key === "ArrowLeft") {
          setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
        } else if (e.key === "ArrowRight") {
          setActiveImgIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, allImages.length]);

  if (!project) return null;

  const currentImage = allImages[activeImgIndex] || project.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Content Box */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyan-950/40 z-10 flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {project.category || "Full Stack"}
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Sparkles size={10} /> Featured
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition focus:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Project Image Gallery Box */}
          {currentImage && (
            <div className="space-y-3">
              <div className="relative w-full h-64 sm:h-84 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <img
                  src={currentImage}
                  alt={`${project.title} screenshot ${activeImgIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop";
                  }}
                />

                {/* Left / Right Carousel Controls */}
                {allImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-cyan-500 hover:text-slate-950 text-white transition border border-slate-700 shadow-xl cursor-pointer"
                      title="Previous photo"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImgIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-cyan-500 hover:text-slate-950 text-white transition border border-slate-700 shadow-xl cursor-pointer"
                      title="Next photo"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Image Counter Badge */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 text-xs font-mono flex items-center gap-1 shadow-lg">
                      <ImageIcon size={12} />
                      <span>{activeImgIndex + 1} / {allImages.length}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-1">
                  {allImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border shrink-0 transition-all cursor-pointer ${
                        idx === activeImgIndex
                          ? "border-cyan-400 ring-2 ring-cyan-500/40 scale-105"
                          : "border-slate-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Title & Description */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies Used */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Technologies & Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <span>Live Demo</span>
                <ExternalLink size={16} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <GithubIcon size={16} />
                <span>Source Code</span>
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProjectModal;

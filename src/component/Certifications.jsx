import React, { useState, useEffect } from "react";
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon 
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function Certifications() {
  const { certifications } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openCertModal = (cert) => {
    setSelectedCert(cert);
    setActiveImageIndex(0);
  };

  const closeCertModal = () => {
    setSelectedCert(null);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeCertModal();
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  // Helper to extract images from a certificate
  const getCertImages = (cert) => {
    if (!cert) return [];
    if (Array.isArray(cert.images) && cert.images.length > 0) {
      return cert.images.filter(Boolean);
    }
    return cert.image ? [cert.image] : [];
  };

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Award size={14} />
            <span>CREDENTIALS & HONORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Licenses & <span className="text-gradient-gold">Certifications</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Verified proof of technical competence, full-stack knowledge, and continuous learning.
          </p>
        </div>

        {/* Certifications Grid */}
        {certifications && certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => {
              const certImages = getCertImages(cert);
              const previewImage = cert.image || certImages[0];

              return (
                <div
                  key={cert.id || cert._id}
                  className="glass-panel glass-panel-hover rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Certificate Image Banner (if available) */}
                    {previewImage ? (
                      <div 
                        onClick={() => openCertModal(cert)}
                        className="relative w-full h-48 bg-slate-950 overflow-hidden cursor-pointer group/img border-b border-slate-800/80"
                      >
                        <img
                          src={previewImage}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

                        {/* Top corner image count indicator */}
                        {certImages.length > 1 && (
                          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-[10px] font-mono flex items-center gap-1">
                            <ImageIcon size={11} />
                            <span>{certImages.length} Images</span>
                          </div>
                        )}

                        {/* Hover Quick View overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-[2px]">
                          <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg shadow-amber-500/30 scale-95 group-hover/img:scale-100 transition-transform">
                            <Eye size={14} />
                            <span>View Certificate</span>
                          </span>
                        </div>
                      </div>
                    ) : null}

                    {/* Card Body */}
                    <div className="p-6 sm:p-8">
                      {/* Top Bar: Icon + Issuer & Date */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-amber-400 transition-all">
                          <Award size={24} />
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                          <Calendar size={13} className="text-amber-400" />
                          <span>{cert.date}</span>
                        </div>
                      </div>

                      {/* Title & Issuer */}
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                        {cert.title}
                      </h3>
                      <div className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-1.5">
                        <ShieldCheck size={16} />
                        <span>{cert.issuer}</span>
                      </div>

                      {/* Description */}
                      {cert.description && (
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                          {cert.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer: Credential ID & Verification / Image View Link */}
                  <div className="px-6 sm:px-8 py-4 border-t border-slate-800/80 bg-slate-950/40 flex flex-wrap items-center justify-between gap-2">
                    {cert.credentialId ? (
                      <div className="text-[11px] font-mono text-slate-400">
                        ID: <span className="text-slate-300">{cert.credentialId}</span>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    <div className="flex items-center gap-3">
                      {certImages.length > 0 && (
                        <button
                          type="button"
                          onClick={() => openCertModal(cert)}
                          className="inline-flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-amber-400 transition cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>Image</span>
                        </button>
                      )}

                      {cert.credentialUrl && cert.credentialUrl !== "#" ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 transition"
                        >
                          <span>Verify</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="text-[11px] font-mono text-emerald-400/80 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-12 rounded-3xl glass-panel text-slate-400">
            No certifications added yet.
          </div>
        )}

      </div>

      {/* Certificate Fullscreen Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={closeCertModal}></div>

          <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur-md">
              <div>
                <h3 className="text-lg font-bold text-white line-clamp-1">{selectedCert.title}</h3>
                <p className="text-xs text-amber-400 font-mono">{selectedCert.issuer} • {selectedCert.date}</p>
              </div>

              <button
                onClick={closeCertModal}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content / Lightbox Viewer */}
            <div className="p-6 overflow-y-auto space-y-4">
              {(() => {
                const images = getCertImages(selectedCert);
                const currentImg = images[activeImageIndex] || images[0];

                if (!currentImg) {
                  return (
                    <div className="p-12 text-center text-slate-400 font-mono text-xs">
                      No image attached for this certificate.
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {/* Main Image Box */}
                    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[300px] max-h-[60vh]">
                      <img
                        src={currentImg}
                        alt={`${selectedCert.title} certificate`}
                        className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
                      />

                      {/* Prev / Next navigation for multiple images */}
                      {images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition border border-slate-700 cursor-pointer shadow-lg"
                            title="Previous image"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition border border-slate-700 cursor-pointer shadow-lg"
                            title="Next image"
                          >
                            <ChevronRight size={20} />
                          </button>

                          {/* Image index counter */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-mono text-amber-400 border border-amber-500/30">
                            {activeImageIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnail strip if multiple images */}
                    {images.length > 1 && (
                      <div className="flex gap-2 justify-center overflow-x-auto py-1">
                        {images.map((imgUrl, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setActiveImageIndex(i)}
                            className={`w-16 h-12 rounded-lg overflow-hidden border transition shrink-0 ${
                              i === activeImageIndex
                                ? "border-amber-400 ring-2 ring-amber-500/30"
                                : "border-slate-800 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={imgUrl} alt="thumb" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Certificate Details */}
              {selectedCert.description && (
                <p className="text-slate-300 text-sm leading-relaxed pt-2 border-t border-slate-800">
                  {selectedCert.description}
                </p>
              )}

              {/* Credential Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {selectedCert.credentialId && (
                  <span className="text-xs font-mono text-slate-400">
                    Credential ID: <span className="text-white font-bold">{selectedCert.credentialId}</span>
                  </span>
                )}

                {selectedCert.credentialUrl && selectedCert.credentialUrl !== "#" && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/25 hover:scale-105 transition"
                  >
                    <span>Verify at {selectedCert.issuer}</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

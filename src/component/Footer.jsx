import React from "react";
import { ArrowUp, Mail, Heart, Sparkles, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";

function Footer() {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/60 items-center">
          
          {/* Brand Col */}
          <div className="md:col-span-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <span className="font-bold text-xs text-emerald-400 font-mono">&lt;MA/&gt;</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {profile?.name || "Your Name"}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md">
              Full Stack MERN Developer crafting high-performance, accessible, and modern digital applications.
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-center md:justify-end gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-emerald-400 transition">About</a>
            <a href="#experience" className="hover:text-emerald-400 transition">Experience</a>
            <a href="#skills" className="hover:text-emerald-400 transition">Skills</a>
            <a href="#projects" className="hover:text-emerald-400 transition">Projects</a>
            <a href="#certifications" className="hover:text-emerald-400 transition">Certifications</a>
            <a href="#education" className="hover:text-emerald-400 transition">Education</a>
            <a href="#contact" className="hover:text-emerald-400 transition">Contact</a>
            <Link to="/admin" className="hover:text-cyan-400 transition flex items-center gap-1 font-mono">
              <Shield size={12} /> Admin
            </Link>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {profile?.name || "Your Name"}. Built with React & Tailwind CSS.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 transition shadow-sm cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

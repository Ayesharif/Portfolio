import React, { useState, useEffect, useMemo } from "react";
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Sparkles, 
  Terminal, 
  Layers, 
  Database, 
  Server, 
  Code2,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { usePortfolio } from "../context/PortfolioContext";
import defaultAvatar from "../assets/pic2.png";

function Hero() {
  const { profile } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = useMemo(() => {
    const baseRoles = [profile?.title, profile?.tagline, 'Full Stack Developer'];
    return baseRoles.filter(Boolean).map((role) => String(role));
  }, [profile?.title, profile?.tagline]);

  useEffect(() => {
    if (!roles.length) {
      setDisplayText('');
      return;
    }

    const currentRole = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  const avatarSrc = profile?.avatar || defaultAvatar;

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl -z-10 pointer-events-none animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl -z-10 pointer-events-none animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-blob animation-delay-4000"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-lg shadow-emerald-950/40 mb-6 hover:border-emerald-500/60 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile?.availability || "Open for work"}</span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2 mb-4">
              <p className="text-slate-400 text-lg sm:text-xl font-medium tracking-wide">
                Hi there, I'm
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                <span className="block text-gradient-emerald">
                  {profile?.name || "Your Name"}
                </span>
              </h1>
            </div>

            {/* Dynamic Animated Role */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-3xl font-semibold text-slate-200 font-mono">
                {displayText}
              </span>
              <span className="inline-block w-0.5 h-6 sm:h-8 bg-emerald-400 ml-1 animate-pulse"></span>
            </div>

            {/* Bio / Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
              {profile?.tagline || "Add your tagline here."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
              >
                <span>View My Work</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-medium text-sm sm:text-base border border-slate-700/80 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-950/30 transition-all duration-200 flex items-center gap-2"
              >
                <Mail size={18} className="text-emerald-400" />
                <span>Contact Me</span>
              </a>

              {profile?.resumeUrl && profile.resumeUrl !== "#" ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-emerald-400 text-sm font-medium border border-slate-800 transition-all duration-200 flex items-center gap-2"
                >
                  <Download size={16} />
                  <span>Resume</span>
                </a>
              ) : null}
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 w-full justify-center lg:justify-start">
              <span className="text-xs font-mono text-slate-400">Connect with me:</span>
              
              {profile?.socials?.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-emerald-500/60 hover:bg-slate-800/90 transition-all duration-200 hover:-translate-y-1 shadow-sm"
                  title="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
              )}

              {profile?.socials?.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/60 hover:bg-slate-800/90 transition-all duration-200 hover:-translate-y-1 shadow-sm"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
              )}

              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/60 hover:bg-slate-800/90 transition-all duration-200 hover:-translate-y-1 shadow-sm"
                  title="Email Me"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>

          </div>

          {/* Right Column: Hero Visual with pic2.png & Floating Badges */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[440px]">
              
              {/* Outer Glowing Rings */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-purple-500/30 blur-2xl opacity-75 animate-pulse-ring -z-10"></div>
              
              {/* Backdrop Frame Card */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-slate-800/90 to-slate-950/90 border border-slate-700/60 shadow-2xl backdrop-blur-xl overflow-hidden group">
                
                {/* Subtle Decorative Top Bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Code2 size={12} className="text-emerald-400" />
                    <span>muhammad-ayesh.dev</span>
                  </div>
                </div>

                {/* Main Profile Image Container */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 aspect-[4/5] flex items-end justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
                  
                  <img
                    src={avatarSrc}
                    alt={profile?.name || "Profile image"}
                    className="w-full h-full object-contain object-bottom transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = defaultAvatar;
                    }}
                  />
                  
                  {/* Bottom Image Overlay Badge */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                      <span className="text-xs font-semibold text-white">Full Stack MERN</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">Node & React</span>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: React.js (Top Right) */}
              <div className="absolute -top-4 -right-4 sm:-right-6 p-3 rounded-2xl bg-slate-950/90 border border-cyan-500/40 shadow-xl backdrop-blur-md animate-float flex items-center gap-2.5 z-30">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Layers size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">React.js</div>
                  <div className="text-[10px] text-cyan-400 font-mono">Modern UI</div>
                </div>
              </div>

              {/* Floating Badge 2: Node & MongoDB (Bottom Left) */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 p-3 rounded-2xl bg-slate-950/90 border border-emerald-500/40 shadow-xl backdrop-blur-md animate-float-delayed flex items-center gap-2.5 z-30">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Database size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">MongoDB & Node</div>
                  <div className="text-[10px] text-emerald-400 font-mono">REST & Scalable APIs</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;

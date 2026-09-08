import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, Sparkles, Code2, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { profile } = usePortfolio();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (isHome) {
        const sections = [
          "hero",
          "about",
          "experience",
          "skills",
          "projects",
          "certifications",
          "education",
          "contact",
        ];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const closeMenu = () => setIsOpened(false);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Certifications", href: "#certifications", id: "certifications" },
    { name: "Education", href: "#education", id: "education" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-emerald-950/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("hero");
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-lg text-emerald-400 font-mono">&lt;MA/&gt;</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-emerald-400 transition-colors">
              {profile?.name || "Your Name"}
            </span>
            <span className="text-[11px] text-emerald-400/80 font-mono flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              MERN Stack Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {isHome ? (
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        ) : (
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/"
              className="text-xs px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
            >
              ← Back to Portfolio
            </Link>
          </div>
        )}

        {/* Action Buttons & Admin link */}
        <div className="hidden md:flex items-center gap-3">
          {isHome && (
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-medium rounded-full group bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-200 bg-slate-950 rounded-full group-hover:bg-opacity-0 flex items-center gap-1.5">
                <span>Hire / Contact</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          )}

          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 px-3 py-2 rounded-full transition-all duration-200"
            title="Admin Panel"
          >
            <Shield size={14} className="text-emerald-400" />
            <span className="font-mono">Admin</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/admin"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400"
            title="Admin"
          >
            <Shield size={18} />
          </Link>
          <button
            onClick={() => setIsOpened(!isOpened)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpened ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpened && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/80 px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-300">
          {isHome && (
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={closeMenu}
                  className={`text-sm py-2 px-3 rounded-lg font-medium transition ${
                    activeSection === link.id
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-2 text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-semibold text-sm shadow-lg shadow-emerald-500/20"
              >
                Get In Touch
              </a>
            </div>
          )}
          {!isHome && (
            <Link
              to="/"
              onClick={closeMenu}
              className="block text-center py-2 px-4 rounded-lg bg-slate-900 text-slate-200 hover:text-white text-sm"
            >
              ← Back to Portfolio
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
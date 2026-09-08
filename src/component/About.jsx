import React from "react";
import { 
  Code, 
  Cpu, 
  Database, 
  Globe, 
  Sparkles, 
  CheckCircle, 
  MapPin, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  Rocket 
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

function About() {
  const { profile } = usePortfolio();

  const highlights = [
    {
      icon: <Code className="text-emerald-400" size={24} />,
      title: "Clean & Maintainable Code",
      description: "Writing modular, reusable React components and robust Express endpoints adhering to industry best practices."
    },
    {
      icon: <Database className="text-cyan-400" size={24} />,
      title: "Efficient Database Design",
      description: "Structuring optimized MongoDB schemas with aggregation pipelines and high-performance querying."
    },
    {
      icon: <Cpu className="text-purple-400" size={24} />,
      title: "Scalable REST APIs",
      description: "Building secure, authenticated, and well-documented microservices with Node.js and Express."
    },
    {
      icon: <Rocket className="text-amber-400" size={24} />,
      title: "Fast Performance & UX",
      description: "Prioritizing responsive design, low latency, and smooth UI animations using modern CSS & Vite."
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Sparkles size={14} />
            <span>GET TO KNOW ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient-emerald">{profile?.name || "Your Name"}</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            A developer dedicated to blending engineering excellence with seamless user experience.
          </p>
        </div>

        {/* Top Info Grid: Bio + Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Main Story & Philosophy (8 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                {profile?.title || "Your Title"}
              </h3>
              
              <div className="text-slate-300 text-sm sm:text-base space-y-4 leading-relaxed">
                <p>
                  {profile?.bio || "Add your bio here."}
                </p>
                <p>
                  Your story, experience, and strengths are managed dynamically through the admin panel and synced directly with MongoDB.
                </p>
              </div>
            </div>

            {/* Quick stats counter badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-slate-800">
              {profile?.stats?.map((stat) => (
                <div key={stat.id || stat.label} className="text-center p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gradient-emerald font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info / Personal Details (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-xl bg-gradient-to-b from-slate-900/90 to-slate-950/90">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase size={18} className="text-emerald-400" />
                Quick Info & Contact
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Location</div>
                    <div className="text-white font-medium">{profile?.location || "Add your location"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Mail size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-slate-400 font-mono">Email</div>
                    <a href={profile?.email ? `mailto:${profile.email}` : '#contact'} className="text-white font-medium hover:text-emerald-400 transition truncate block">
                      {profile?.email || "Add your email"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Education</div>
                    <div className="text-white font-medium">BS Computer Science</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">Status</div>
                    <div className="text-emerald-400 font-medium text-xs">Open for Opportunities</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href="#contact"
                className="w-full block text-center py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs border border-slate-700 transition"
              >
                Let's Discuss A Project →
              </a>
            </div>
          </div>

        </div>

        {/* Highlights / Strengths Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800/90 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default About;

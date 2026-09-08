import React from "react";
import Navbar from "./component/navbar";
import Hero from "./component/Hero";
import About from "./component/About";
import Experience from "./component/Experience";
import Skills from "./component/Skills";
import Projects from "./component/Projects";
import Certifications from "./component/Certifications";
import Education from "./component/Education";
import Contact from "./component/Contact";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden relative">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

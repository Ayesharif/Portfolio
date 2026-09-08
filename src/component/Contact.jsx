import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  MapPin, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { usePortfolio } from "../context/PortfolioContext";

function Contact() {
  const { profile, sendMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await sendMessage(formData);
      setIsSubmitting(false);
      setStatusMessage({
        type: "success",
        text: res?.message || "Thank you! Your message has been sent successfully. I will get back to you promptly."
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatusMessage(null), 6000);
    } catch (err) {
      setIsSubmitting(false);
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to send message. Please try again or reach out directly via email."
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <MessageSquare size={14} />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In <span className="text-gradient-emerald">Touch</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Have a project in mind, want to discuss an opportunity, or just want to say hi? Send me a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Contact Information
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Feel free to reach out directly through email, social channels, or the contact form. I typically respond within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Card */}
                <a
                  href={`mailto:${profile?.email || "ayesharif@gmail.com"}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Mail size={22} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-mono text-slate-400">Email Me</div>
                    <div className="text-white font-medium text-sm sm:text-base truncate group-hover:text-emerald-400 transition-colors">
                      {profile?.email || "Add your email"}
                    </div>
                  </div>
                </a>

                {/* Location Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Location</div>
                    <div className="text-white font-medium text-sm sm:text-base">
                      {profile?.location || "Add your location"}
                    </div>
                  </div>
                </div>

                {/* Phone Card (Optional) */}
                {profile?.phone && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <Phone size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Phone / WhatsApp</div>
                      <div className="text-white font-medium text-sm sm:text-base">
                        {profile.phone}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-3">Professional Profiles</div>
                <div className="flex gap-3">
                  {profile?.socials?.github && (
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 flex items-center gap-2 text-xs font-mono transition"
                    >
                      <GithubIcon size={16} />
                      <span>GitHub</span>
                    </a>
                  )}

                  {profile?.socials?.linkedin && (
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 flex items-center gap-2 text-xs font-mono transition"
                    >
                      <LinkedinIcon size={16} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Fill out this quick form and I will get back to you as soon as possible.
              </p>

              {statusMessage && (
                <div
                  className={`p-4 rounded-2xl mb-6 text-sm flex items-center gap-2.5 ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
                      : "bg-red-500/15 border border-red-500/40 text-red-300"
                  }`}
                >
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Tell me about your project, timeline, or requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;

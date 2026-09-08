import { Save } from "lucide-react";

export default function ProfileTab({ profileForm, setProfileForm, handleProfileSave }) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Profile & Personal Information</h2>
        <p className="text-slate-400 text-xs sm:text-sm">Manage your name, roles, bio, contact details, and links.</p>
      </div>

      <form onSubmit={handleProfileSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={profileForm.name || ""}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Professional Title</label>
            <input
              type="text"
              value={profileForm.title || ""}
              onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Hero Tagline / Summary</label>
          <textarea
            rows="2"
            value={profileForm.tagline || ""}
            onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Full Biography (About Me)</label>
          <textarea
            rows="4"
            value={profileForm.bio || ""}
            onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={profileForm.email || ""}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Phone</label>
            <input
              type="text"
              value={profileForm.phone || ""}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={profileForm.location || ""}
              onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">GitHub URL</label>
            <input
              type="url"
              value={profileForm.socials?.github || ""}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  socials: { ...profileForm.socials, github: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={profileForm.socials?.linkedin || ""}
              onChange={(e) =>
                setProfileForm({
                  ...profileForm,
                  socials: { ...profileForm.socials, linkedin: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Availability Status</label>
          <input
            type="text"
            value={profileForm.availability || ""}
            onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition flex items-center gap-2 cursor-pointer"
          >
            <Save size={16} />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}

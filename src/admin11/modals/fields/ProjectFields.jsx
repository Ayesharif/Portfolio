import CommaSeparatedInput from "../../components/CommaSeparatedInput";

export default function ProjectFields({ editingItem, setEditingItem }) {
  const { data } = editingItem;
  const itemKey = editingItem.isNew ? "new" : data.id || data._id;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Title</label>
          <input
            type="text"
            required
            value={data.title}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, title: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
          <select
            value={data.category}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, category: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
          >
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-300 mb-1">Image URL</label>
        <input
          type="url"
          value={data.image}
          onChange={(e) =>
            setEditingItem({ ...editingItem, data: { ...data, image: e.target.value } })
          }
          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
        <textarea
          rows="3"
          value={data.description}
          onChange={(e) =>
            setEditingItem({ ...editingItem, data: { ...data, description: e.target.value } })
          }
          className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
        ></textarea>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-300 mb-1">Tags (comma-separated)</label>
        <CommaSeparatedInput
          key={`tags-${itemKey}`}
          initialValue={data.tags}
          placeholder="React, Node.js, MongoDB, Tailwind"
          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          onChange={(tags) => setEditingItem({ ...editingItem, data: { ...data, tags } })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Live URL</label>
          <input
            type="url"
            value={data.liveUrl || ""}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, liveUrl: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">GitHub URL</label>
          <input
            type="url"
            value={data.githubUrl || ""}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, githubUrl: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="featured-check"
          checked={!!data.featured}
          onChange={(e) =>
            setEditingItem({ ...editingItem, data: { ...data, featured: e.target.checked } })
          }
          className="rounded text-emerald-500"
        />
        <label htmlFor="featured-check" className="text-xs text-slate-300">
          Mark as Featured Project
        </label>
      </div>
    </>
  );
}

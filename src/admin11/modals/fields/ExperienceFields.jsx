import CommaSeparatedInput from "../../components/CommaSeparatedInput";

export default function ExperienceFields({ editingItem, setEditingItem }) {
  const { data } = editingItem;
  const itemKey = editingItem.isNew ? "new" : data.id || data._id;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Job Role</label>
          <input
            type="text"
            required
            value={data.role}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, role: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Company</label>
          <input
            type="text"
            required
            value={data.company}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, company: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Period</label>
          <input
            type="text"
            placeholder="e.g. 2023 - Present"
            value={data.period}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, period: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
          <input
            type="text"
            placeholder="e.g. Remote / Lahore"
            value={data.location}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, location: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
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
        <label className="block text-xs font-mono text-slate-300 mb-1">
          Technologies (comma-separated)
        </label>
        <CommaSeparatedInput
          key={`tech-${itemKey}`}
          initialValue={data.technologies}
          placeholder="React.js, Node.js, Express, MongoDB"
          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          onChange={(technologies) =>
            setEditingItem({ ...editingItem, data: { ...data, technologies } })
          }
        />
      </div>
    </>
  );
}

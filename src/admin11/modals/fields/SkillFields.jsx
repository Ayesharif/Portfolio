export default function SkillFields({ editingItem, setEditingItem }) {
  const { data } = editingItem;

  return (
    <>
      <div>
        <label className="block text-xs font-mono text-slate-300 mb-1">Skill Name</label>
        <input
          type="text"
          required
          value={data.name}
          onChange={(e) =>
            setEditingItem({ ...editingItem, data: { ...data, name: e.target.value } })
          }
          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
          <select
            value={data.category}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, category: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps & Tools">DevOps & Tools</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">
            Proficiency ({data.level || 85}%)
          </label>
          <input
            type="range"
            min="50"
            max="100"
            value={data.level || 85}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, level: Number(e.target.value) } })
            }
            className="w-full mt-2 accent-emerald-400"
          />
        </div>
      </div>
    </>
  );
}

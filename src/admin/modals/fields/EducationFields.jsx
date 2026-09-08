import ListEditor from "../../components/ListEditor";

export default function EducationFields({ editingItem, setEditingItem }) {
  const { data } = editingItem;

  return (
    <>
      <div>
        <label className="block text-xs font-mono text-slate-300 mb-1">Degree / Program</label>
        <input
          type="text"
          required
          value={data.degree}
          onChange={(e) =>
            setEditingItem({ ...editingItem, data: { ...data, degree: e.target.value } })
          }
          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Institution</label>
          <input
            type="text"
            required
            value={data.institution}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, institution: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Period</label>
          <input
            type="text"
            placeholder="2020 - 2024"
            value={data.period}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, period: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Grade / CGPA</label>
          <input
            type="text"
            placeholder="3.5 / 4.0 CGPA"
            value={data.grade || ""}
            onChange={(e) =>
              setEditingItem({ ...editingItem, data: { ...data, grade: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
          <input
            type="text"
            placeholder="Lahore, Pakistan"
            value={data.location || ""}
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
          rows="2"
          value={data.description || ""}
          onChange={(e) =>
            setEditingItem({ ...editingItem, data: { ...data, description: e.target.value } })
          }
          className="w-full px-3 py-2 rounded-xl glass-input text-xs resize-none"
        ></textarea>
      </div>

      <ListEditor
        label="Highlights"
        items={data.highlights}
        placeholder="e.g. Graduated with Honors, Dean's List 2023"
        onChange={(highlights) =>
          setEditingItem({ ...editingItem, data: { ...data, highlights } })
        }
      />
    </>
  );
}

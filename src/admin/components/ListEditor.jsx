import { Plus, Trash2 } from "lucide-react";

/**
 * Edits an array of plain-text lines (e.g. achievements, highlights) —
 * one input per line, with add / remove controls. Unlike a comma-separated
 * field, each line can freely contain commas, since every entry is typed
 * in its own box instead of being split out of one string.
 */
export default function ListEditor({ label, items, onChange, placeholder }) {
  const lines = items && items.length > 0 ? items : [""];

  const updateLine = (idx, value) => {
    const next = [...lines];
    next[idx] = value;
    onChange(next);
  };

  const addLine = () => {
    onChange([...lines, ""]);
  };

  const removeLine = (idx) => {
    const next = lines.filter((_, i) => i !== idx);
    onChange(next.length > 0 ? next : [""]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs font-mono text-slate-300">{label}</label>
        <button
          type="button"
          onClick={addLine}
          className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 cursor-pointer"
        >
          <Plus size={12} />
          <span>Add line</span>
        </button>
      </div>

      <div className="space-y-2">
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              value={line}
              placeholder={placeholder}
              onChange={(e) => updateLine(idx, e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
            <button
              type="button"
              onClick={() => removeLine(idx)}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 shrink-0"
              title="Remove line"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

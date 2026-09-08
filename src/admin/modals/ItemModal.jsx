import { X } from "lucide-react";
import ExperienceFields from "./fields/ExperienceFields";
import ProjectFields from "./fields/ProjectFields";
import SkillFields from "./fields/SkillFields";
import CertificationFields from "./fields/CertificationFields";
import EducationFields from "./fields/EducationFields";

const FIELD_COMPONENTS = {
  experience: ExperienceFields,
  project: ProjectFields,
  skill: SkillFields,
  certification: CertificationFields,
  education: EducationFields
};

export default function ItemModal({
  editingItem,
  setEditingItem,
  isModalOpen,
  setIsModalOpen,
  saveModalItem
}) {
  if (!isModalOpen || !editingItem) return null;

  const FieldsComponent = FIELD_COMPONENTS[editingItem.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">

        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white capitalize">
            {editingItem.isNew ? "Add New" : "Edit"} {editingItem.type}
          </h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={saveModalItem} className="space-y-4">
          {FieldsComponent && (
            <FieldsComponent editingItem={editingItem} setEditingItem={setEditingItem} />
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

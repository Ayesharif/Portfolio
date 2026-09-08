import { CheckCircle2 } from "lucide-react";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-sm shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
      <CheckCircle2 size={18} />
      <span>{message}</span>
    </div>
  );
}

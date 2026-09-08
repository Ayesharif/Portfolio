import { Mail, RefreshCw, Clock, ExternalLink, Trash2 } from "lucide-react";

export default function MessagesTab({
  messages,
  fetchMessages,
  markMessageAsRead,
  deleteMessage,
  showToast
}) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-white">Client Inquiries & Messages</h2>
            {messages?.filter((m) => !m.isRead).length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                {messages.filter((m) => !m.isRead).length} Unread
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Direct inquiries submitted by recruiters, clients, and visitors via your portfolio contact form.
          </p>
        </div>

        <button
          onClick={async () => {
            await fetchMessages();
            showToast("Inbox refreshed");
          }}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer self-start sm:self-auto border border-slate-700"
        >
          <RefreshCw size={14} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Messages List */}
      {(!messages || messages.length === 0) ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 p-8 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
            <Mail size={26} />
          </div>
          <h3 className="text-base font-semibold text-white">Your inbox is empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            When visitors submit messages on your portfolio contact form, they will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                !msg.isRead
                  ? "bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-white text-sm sm:text-base">
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs font-mono text-cyan-400 hover:underline"
                    >
                      {msg.email}
                    </a>
                    {!msg.isRead && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-slate-950">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-emerald-300 mt-1">
                    Subject: {msg.subject || "General Inquiry"}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
                  <Clock size={13} />
                  <span>
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      : "Recently"}
                  </span>
                </div>
              </div>

              {/* Message body */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-4">
                {msg.message}
              </p>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      markMessageAsRead(msg._id, !msg.isRead);
                      showToast(msg.isRead ? "Marked as unread" : "Marked as read");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
                      msg.isRead
                        ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                        : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40"
                    }`}
                  >
                    {msg.isRead ? "Mark as Unread" : "Mark as Read"}
                  </button>

                  <a
                    href={`mailto:${msg.email}?subject=${encodeURIComponent(
                      "Re: " + (msg.subject || "Your Portfolio Inquiry")
                    )}`}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition"
                  >
                    <ExternalLink size={13} />
                    <span>Reply via Email</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    if (confirm("Delete this message?")) {
                      deleteMessage(msg._id);
                      showToast("Message deleted");
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

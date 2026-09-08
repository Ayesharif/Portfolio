import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function AuthGateway({
  authMode,
  setAuthMode,
  authError,
  setAuthError,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  registerName,
  setRegisterName,
  enteredPin,
  setEnteredPin,
  isAuthLoading,
  handleEmailLogin,
  handleRegister,
  handlePinSubmit
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl text-center">

        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-lg shadow-emerald-500/20">
          <Shield size={28} />
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-1">Admin Authentication</h2>
        <p className="text-slate-400 text-xs mb-6">
          Sign in with your MongoDB / JWT credentials or enter quick PIN.
        </p>

        {/* Mode Selector Tabs */}
        {/* <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 mb-6 text-xs">
          <button
            onClick={() => { setAuthMode("login"); setAuthError(""); }}
            className={`flex-1 py-2 rounded-lg font-medium transition cursor-pointer ${
              authMode === "login"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Email Login
          </button>
          <button
            onClick={() => { setAuthMode("register"); setAuthError(""); }}
            className={`flex-1 py-2 rounded-lg font-medium transition cursor-pointer ${
              authMode === "register"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Register
          </button>
          <button
            onClick={() => { setAuthMode("pin"); setAuthError(""); }}
            className={`flex-1 py-2 rounded-lg font-medium transition cursor-pointer ${
              authMode === "pin"
                ? "bg-slate-700 text-white font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Quick PIN
          </button>
        </div> */}

        {authError && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono">
            {authError}
          </div>
        )}

        {/* 1. Email Login Form */}
        {authMode === "login" && (
          <form onSubmit={handleEmailLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="e.g. ayesharif@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
            >
              {isAuthLoading ? "Authenticating..." : "Login to Admin Panel"}
            </button>
          </form>
        )}


        {/* {authMode === "register" && (
          <form onSubmit={handleRegister} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. ayesharif@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Set Password</label>
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
            >
              {isAuthLoading ? "Registering..." : "Create Admin Account"}
            </button>
          </form>
        )}


        {authMode === "pin" && (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter PIN (Default: admin123)"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-input text-center text-lg tracking-widest font-mono"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition cursor-pointer"
            >
              Unlock via PIN
            </button>
          </form>
        )} */}

        {/* Bottom Info Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
         
          <Link to="/" className="text-slate-400 hover:text-white transition">
            ← View Portfolio
          </Link>
        </div>

      </div>
    </div>
  );
}

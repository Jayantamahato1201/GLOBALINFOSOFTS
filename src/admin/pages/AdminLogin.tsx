import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { AdminForgotPasswordModal } from './AdminForgotPasswordModal';
import { BrandLogo } from '../../components/BrandLogo';

interface AdminLoginProps {
  onSwitchToSignup?: () => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSwitchToSignup, onBackToWebsite }) => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await login(email, password, rememberMe);
    setIsLoading(false);
    if (!res.success) {
      setError(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07090E] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Link */}
      <div className="mb-6 flex items-center justify-between w-full max-w-md">
        <button
          onClick={onBackToWebsite}
          className="text-xs text-slate-400 hover:text-cyan-400 transition flex items-center gap-1.5"
        >
          ← Return to Public Website
        </button>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
          CMS Portal v2.5
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-6">
          <div className="mb-3 flex justify-center">
            <BrandLogo size={52} showGlow={true} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin & CMS Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Global InfoSoft Enterprise Management System</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@globalinfosoft.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-[11px] text-cyan-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <span>Remember this workstation</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-900/30 transition duration-200 flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Registration switch link */}
        {onSwitchToSignup && (
          <div className="mt-5 text-center text-xs text-slate-400">
            Need an authorized account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-cyan-400 hover:underline font-medium"
            >
              Register New Admin
            </button>
          </div>
        )}
      </div>

      <AdminForgotPasswordModal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </div>
  );
};

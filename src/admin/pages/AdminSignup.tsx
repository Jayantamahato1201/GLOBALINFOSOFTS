import React, { useState } from 'react';
import { UserPlus, User, Mail, Lock, ArrowRight, ShieldCheck, Check, X } from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { BrandLogo } from '../../components/BrandLogo';

interface AdminSignupProps {
  onSwitchToLogin: () => void;
  onBackToWebsite: () => void;
}

export const AdminSignup: React.FC<AdminSignupProps> = ({ onSwitchToLogin, onBackToWebsite }) => {
  const { signup } = useAdminAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password requirements inspection
  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hasMinLen || !hasUpper || !hasLower || !hasNum || !hasSpecial) {
      setError('Password does not meet all security requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const res = await signup(fullName, email, password, confirmPassword);
    setIsLoading(false);
    if (!res.success) {
      setError(res.error || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07090E] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-6 flex items-center justify-between w-full max-w-md">
        <button
          onClick={onBackToWebsite}
          className="text-xs text-slate-400 hover:text-cyan-400 transition flex items-center gap-1.5"
        >
          ← Return to Public Website
        </button>
        <button
          onClick={onSwitchToLogin}
          className="text-xs text-cyan-400 hover:underline"
        >
          Already have an account? Sign In
        </button>
      </div>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-6">
          <div className="mb-3 flex justify-center">
            <BrandLogo size={52} showGlow={true} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Admin Account</h1>
          <p className="text-xs text-slate-400 mt-1">Register for Global InfoSoft CMS Administration</p>
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
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Rajnish Kumar"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Work Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rajnish@globalinfosoft.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
          </div>

          {/* Password checklist meter */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5 text-[11px]">
            <p className="text-slate-400 font-medium mb-1">Security Standards:</p>
            <div className="grid grid-cols-2 gap-1.5">
              <span className={`flex items-center gap-1.5 ${hasMinLen ? 'text-emerald-400' : 'text-slate-500'}`}>
                {hasMinLen ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 8+ characters
              </span>
              <span className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-400' : 'text-slate-500'}`}>
                {hasUpper ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 1 uppercase
              </span>
              <span className={`flex items-center gap-1.5 ${hasLower ? 'text-emerald-400' : 'text-slate-500'}`}>
                {hasLower ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 1 lowercase
              </span>
              <span className={`flex items-center gap-1.5 ${hasNum ? 'text-emerald-400' : 'text-slate-500'}`}>
                {hasNum ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 1 number
              </span>
              <span className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-400' : 'text-slate-500'}`}>
                {hasSpecial ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 1 special symbol
              </span>
              <span className={`flex items-center gap-1.5 ${isMatch ? 'text-emerald-400' : 'text-slate-500'}`}>
                {isMatch ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Passwords match
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-900/30 transition duration-200 flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Creating Profile...</span>
              </>
            ) : (
              <>
                <span>Register Administrator Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-400">
          Already registered?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-cyan-400 hover:underline font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

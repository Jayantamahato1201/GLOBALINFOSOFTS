import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminForgotPasswordModal: React.FC<AdminForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mode, setMode] = useState<'request' | 'reset'>('request');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setStatusMsg({ type: 'success', text: data.message });
      setMode('reset');
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Request failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatusMsg({ type: 'success', text: 'Password reset successfully. You may now log in with your new password.' });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Reset failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Reset Admin Password</h3>
            <p className="text-xs text-slate-400">Direct self-service admin credential recovery</p>
          </div>
        </div>

        {statusMsg && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs flex items-center gap-2 ${
              statusMsg.type === 'success'
                ? 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/70 border border-rose-500/30 text-rose-300'
            }`}
          >
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {mode === 'request' ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@globalinfosoft.com"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg font-semibold transition"
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                disabled
                className="w-full px-3 py-2 text-sm bg-slate-950/60 border border-slate-800 rounded-lg text-slate-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Enter New Secure Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMode('request')}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg font-semibold transition"
              >
                {isLoading ? 'Updating...' : 'Set New Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

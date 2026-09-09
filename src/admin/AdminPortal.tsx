import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';
import { AdminLogin } from './pages/AdminLogin';
import { AdminSignup } from './pages/AdminSignup';
import { AdminLayout } from './AdminLayout';

interface AdminPortalProps {
  onBackToWebsite: () => void;
  initialView?: 'login' | 'signup' | 'dashboard';
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onBackToWebsite,
  initialView = 'login'
}) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>(
    initialView === 'signup' ? 'signup' : 'login'
  );

  useEffect(() => {
    if (initialView === 'signup') {
      setAuthView('signup');
    } else if (initialView === 'login') {
      setAuthView('login');
    }
  }, [initialView]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#07090E] flex flex-col items-center justify-center text-slate-400 gap-3">
        <div className="w-8 h-8 border-2 border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
        <p className="text-xs font-mono tracking-wider uppercase">Loading Admin Console...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <AdminLayout />;
  }

  if (authView === 'signup') {
    return (
      <AdminSignup
        onSwitchToLogin={() => setAuthView('login')}
        onBackToWebsite={onBackToWebsite}
      />
    );
  }

  return (
    <AdminLogin
      onSwitchToSignup={() => setAuthView('signup')}
      onBackToWebsite={onBackToWebsite}
    />
  );
};

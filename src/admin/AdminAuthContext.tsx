import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AdminUser } from '../../server/cmsTypes';

interface AdminAuthContextType {
  token: string | null;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: AdminUser['role'];
    lastLogin?: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, password: string, confirmPassword: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  apiFetch: (endpoint: string, options?: RequestInit) => Promise<any>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  previewMode: boolean;
  setPreviewMode: (val: boolean) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  canManageUsers: boolean;
  canDelete: boolean;
  canPublish: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const TOKEN_KEY = 'gi_admin_token';
const USER_KEY = 'gi_admin_user';

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AdminAuthContextType['user']>(() => {
    const cached = localStorage.getItem(USER_KEY);
    return cached ? JSON.parse(cached) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Validate session on mount
  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          localStorage.setItem(USER_KEY, JSON.stringify(userData));
        } else {
          // Token expired or invalid
          setToken(null);
          setUser(null);
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
      } catch (err) {
        console.warn('[AdminAuth] Verification check failed, keeping offline session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [token]);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      showToast(`Welcome back, ${data.user.fullName}!`, 'success');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network connection failed' };
    }
  };

  const signup = async (fullName: string, email: string, password: string, confirmPassword: string) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, confirmPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Signup failed' };
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      showToast(`Account created successfully as ${data.user.role}!`, 'success');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during signup' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    showToast('Logged out securely.', 'info');
  };

  // Helper to make authenticated API requests
  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    const res = await fetch(endpoint, {
      ...options,
      headers
    });

    const isMutating = ['POST', 'PUT', 'PATCH', 'DELETE'].includes((options.method || 'GET').toUpperCase());
    if (res.ok && isMutating) {
      // Notify website listeners to revalidate public cache!
      window.dispatchEvent(new CustomEvent('cms-data-updated'));
    }

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json.error || `HTTP error ${res.status}`);
    }
    return json;
  };

  const canManageUsers = user?.role === 'super_admin';
  const canDelete = user?.role === 'super_admin' || user?.role === 'admin';
  const canPublish = user?.role === 'super_admin' || user?.role === 'admin';

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        signup,
        logout,
        apiFetch,
        activeTab,
        setActiveTab,
        previewMode,
        setPreviewMode,
        toast,
        showToast,
        isSearchOpen,
        setIsSearchOpen,
        canManageUsers,
        canDelete,
        canPublish
      }}
    >
      {/* Toast Notification HUD */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`px-4 py-3 rounded-lg shadow-2xl border text-sm font-medium flex items-center gap-3 backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
                : 'bg-slate-900/90 border-slate-700 text-slate-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                toast.type === 'success'
                  ? 'bg-emerald-400'
                  : toast.type === 'error'
                  ? 'bg-rose-400'
                  : 'bg-cyan-400'
              }`}
            />
            {toast.message}
          </div>
        </div>
      )}
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  Lock,
  User,
  Mail,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { AdminUser } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const UserManagement: React.FC = () => {
  const { apiFetch, showToast, canManageUsers, user: currentUser } = useAdminAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const [newUser, setNewUser] = useState<{
    fullName: string;
    email: string;
    password: string;
    role: AdminUser['role'];
  }>({
    fullName: '',
    email: '',
    password: '',
    role: 'editor'
  });

  const loadUsers = async () => {
    try {
      const data = await apiFetch('/api/auth/users');
      setUsers(data || []);
    } catch (err: any) {
      console.error('Failed to load users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiFetch('/api/auth/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
      });
      setUsers((prev) => [...prev, created]);
      showToast(`User account created for ${created.fullName}.`);
      setIsCreating(false);
      setNewUser({ fullName: '', email: '', password: '', role: 'editor' });
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await apiFetch(`/api/auth/users/${deleteTarget.id}`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      showToast('Admin account removed.');
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleRoleChange = async (userId: string, newRole: AdminUser['role']) => {
    try {
      const updated = await apiFetch(`/api/auth/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole })
      });
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      showToast(`Role updated to ${newRole.toUpperCase()}.`);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            Administrator Accounts & Role-Based Access Control (RBAC)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Super Admins, Admins, and Editors with granular read/write privileges.
          </p>
        </div>

        {canManageUsers && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-indigo-950/40"
          >
            <UserPlus className="w-4 h-4" />
            Create Admin User
          </button>
        )}
      </div>

      {/* Roles Legend / Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="font-bold text-indigo-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Super Admin
          </p>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Full authority over user creation, roles, deletions, settings, and audits.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="font-bold text-cyan-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Administrator
          </p>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Publish, edit, and delete blogs, jobs, pages, and catalog items.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="font-bold text-emerald-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Editor
          </p>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Create and edit content drafts; cannot delete assets or modify critical site configs.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Loading users list...
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold uppercase">
                        {u.fullName.charAt(0)}
                      </div>
                      <span>{u.fullName}</span>
                      {u.id === currentUser?.id && (
                        <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                          You
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{u.email}</td>
                    <td className="py-3 px-4">
                      {canManageUsers && u.id !== currentUser?.id ? (
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u.id, e.target.value as AdminUser['role'])
                          }
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                        >
                          <option value="super_admin">Super Admin</option>
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.role === 'super_admin'
                              ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                              : u.role === 'admin'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {u.role.replace('_', ' ')}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'First Session'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {canManageUsers && u.id !== currentUser?.id && (
                        <button
                          onClick={() => setDeleteTarget(u)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                          title="Remove user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Creation Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-indigo-400" />
              Create New Admin User
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Add authorized personnel with role assignments.
            </p>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  placeholder="e.g. Rajnish Kumar"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="e.g. rajnish@globalinfosoft.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Initial Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Role Assignment</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value as AdminUser['role'] })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-semibold"
                >
                  <option value="editor">Content Editor (Draft & Edit Content)</option>
                  <option value="admin">Administrator (Publish & Modify Site Data)</option>
                  <option value="super_admin">Super Admin (All Privileges)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold rounded-lg transition"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Revoke Admin Access?"
        message={`Are you sure you want to delete the account for "${deleteTarget?.fullName}" (${deleteTarget?.email})?`}
        confirmLabel="Revoke Access"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

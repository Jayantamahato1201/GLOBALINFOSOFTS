import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  User,
  Mail,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Users,
  Key,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { AdminUser } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const UserManagement: React.FC = () => {
  const { apiFetch, showToast, canManageUsers, user: currentUser, setActiveTab } = useAdminAuth();
  const [activeSubTab, setActiveSubTab] = useState<'accounts' | 'password'>('accounts');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  // New user state
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

  // Password update form state
  const [selectedTargetUserId, setSelectedTargetUserId] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState<string | null>(null);
  const [copiedGeneratedPassword, setCopiedGeneratedPassword] = useState(false);
  const [dbStatus, setDbStatus] = useState<any>(null);

  const loadUsers = async () => {
    try {
      const data = await apiFetch('/api/auth/users');
      setUsers(data || []);
      // If no target user is selected yet, default to current user
      if (currentUser?.id && !selectedTargetUserId) {
        setSelectedTargetUserId(currentUser.id);
      }
    } catch (err: any) {
      console.error('Failed to load users:', err);
    } finally {
      setIsLoading(false);
    }

    try {
      const status = await apiFetch('/api/database/status');
      if (status) setDbStatus(status);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (currentUser?.id && !selectedTargetUserId) {
      setSelectedTargetUserId(currentUser.id);
    }
  }, [currentUser]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await apiFetch('/api/auth/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
      });
      setUsers((prev) => [...prev, created]);
      showToast(`User account created for ${created.fullName}.`, 'success');
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
      showToast('Admin account removed.', 'info');
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleRoleChange = async (userId: string, newRole: AdminUser['role']) => {
    try {
      await apiFetch(`/api/auth/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: newRole })
      });
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      showToast(`Role updated to ${newRole.toUpperCase()}.`, 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // Helper: switch to password tab with targeted user
  const handleOpenPasswordTabForUser = (user: AdminUser) => {
    setSelectedTargetUserId(user.id);
    setActiveSubTab('password');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordSuccessMessage(null);
  };

  // Generate strong random password
  const generateStrongPassword = () => {
    const specials = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowers = 'abcdefghijkmnpqrstuvwxyz';
    const numbers = '23456789';

    let pass = '';
    pass += uppers[Math.floor(Math.random() * uppers.length)];
    pass += lowers[Math.floor(Math.random() * lowers.length)];
    pass += numbers[Math.floor(Math.random() * numbers.length)];
    pass += specials[Math.floor(Math.random() * specials.length)];

    const allChars = uppers + lowers + numbers + specials;
    for (let i = 0; i < 10; i++) {
      pass += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle
    pass = pass.split('').sort(() => 0.5 - Math.random()).join('');
    setNewPassword(pass);
    setConfirmPassword(pass);
    setShowNewPassword(true);
    setShowConfirmPassword(true);
    setCopiedGeneratedPassword(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedGeneratedPassword(true);
    showToast('Password copied to clipboard!', 'info');
    setTimeout(() => setCopiedGeneratedPassword(false), 3000);
  };

  // Password requirements calculation
  const reqLength = newPassword.length >= 8;
  const reqUpper = /[A-Z]/.test(newPassword);
  const reqLower = /[a-z]/.test(newPassword);
  const reqNum = /[0-9]/.test(newPassword);
  const reqSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const criteriaCount = [reqLength, reqUpper, reqLower, reqNum, reqSpecial].filter(Boolean).length;
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const getStrengthLabel = () => {
    if (newPassword.length === 0) return { label: 'None', color: 'bg-slate-700', text: 'text-slate-400', width: 'w-0' };
    if (criteriaCount <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-400', width: 'w-1/4' };
    if (criteriaCount <= 3) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400', width: 'w-2/4' };
    if (criteriaCount <= 4) return { label: 'Good', color: 'bg-cyan-500', text: 'text-cyan-400', width: 'w-3/4' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400', width: 'w-full' };
  };

  const strength = getStrengthLabel();

  // Find target user object
  const targetUser = users.find((u) => u.id === selectedTargetUserId) || currentUser;
  const isEditingOwnAccount = !targetUser || targetUser.id === currentUser?.id;

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccessMessage(null);

    if (newPassword.length < 8) {
      showToast('New password must be at least 8 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New password and confirmation do not match.', 'error');
      return;
    }

    setIsSubmittingPassword(true);
    try {
      const payload: any = {
        newPassword,
        targetUserId: targetUser?.id,
        userEmail: targetUser?.email
      };

      if (isEditingOwnAccount && currentPassword) {
        payload.currentPassword = currentPassword;
      }

      const response = await apiFetch('/api/auth/change-password', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      const successText = response?.message || `Password for ${targetUser?.fullName} (${targetUser?.email}) was updated successfully!`;
      setPasswordSuccessMessage(successText);
      showToast(successText, 'success');

      // Clear sensitive fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast(err.message || 'Failed to update password. Please check your credentials.', 'error');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tab Switcher */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              Administrator Accounts & Security Credentials
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Manage authorized portal administrators, role permissions, and access passwords.
            </p>
          </div>

          {canManageUsers && activeSubTab === 'accounts' && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-indigo-950/40"
            >
              <UserPlus className="w-4 h-4" />
              Create Admin User
            </button>
          )}
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 pt-4">
          <button
            onClick={() => setActiveSubTab('accounts')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeSubTab === 'accounts'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Accounts & Roles</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950/60 border border-slate-700/60">
              {users.length || 1}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('password')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeSubTab === 'password'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Change / Update Password</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950/30 font-mono">
              Security
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ACCOUNTS & ROLES                                                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'accounts' && (
        <div className="space-y-6">
          {/* Roles Matrix Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <p className="font-bold text-indigo-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Super Admin
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Full authority over user creation, roles, password resets, site configs, and audits.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <p className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Administrator
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Publish, edit, and delete blogs, jobs, catalog items, and change passwords.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Editor
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Create and edit content drafts; can update their personal account password.
              </p>
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="px-4 py-3 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Admin Team Members ({users.length})
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Click <span className="text-cyan-400 font-semibold">Change Password</span> on any row to set a new password.
              </span>
            </div>

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
                        Loading admin team...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        No admin accounts found.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold uppercase">
                            {u.fullName?.charAt(0) || 'A'}
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
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Key / Change Password Button */}
                            <button
                              onClick={() => handleOpenPasswordTabForUser(u)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 font-medium text-[11px] flex items-center gap-1.5 border border-slate-700/60 transition group"
                              title="Update account password"
                            >
                              <KeyRound className="w-3.5 h-3.5 text-cyan-400 group-hover:text-slate-950" />
                              <span>Change Password</span>
                            </button>

                            {/* Delete User Button */}
                            {canManageUsers && u.id !== currentUser?.id && (
                              <button
                                onClick={() => setDeleteTarget(u)}
                                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                                title="Revoke Admin Access"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CHANGE / UPDATE PASSWORD                                           */}
      {/* ========================================================================= */}
      {activeSubTab === 'password' && (
        <div className="space-y-6">
          {/* Target Account Selector */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  Target Account Selection
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Choose the administrator account whose password you wish to update or reset.
                </p>
              </div>

              {/* Account Dropdown (if Super Admin or Admin) */}
              {canManageUsers && users.length > 0 && (
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-400 font-medium whitespace-nowrap">Select User:</label>
                  <select
                    value={selectedTargetUserId || currentUser?.id}
                    onChange={(e) => {
                      setSelectedTargetUserId(e.target.value);
                      setPasswordSuccessMessage(null);
                    }}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-medium focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.fullName} ({u.email}) - {u.role.replace('_', ' ').toUpperCase()}
                        {u.id === currentUser?.id ? ' (You)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Target User Info Card */}
            {targetUser && (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 font-bold flex items-center justify-center text-sm">
                    {targetUser.fullName?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{targetUser.fullName}</span>
                      {targetUser.id === currentUser?.id && (
                        <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                          Logged In Account
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-400">{targetUser.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                      targetUser.role === 'super_admin'
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                        : targetUser.role === 'admin'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {targetUser.role.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Success Banner if just updated */}
          {passwordSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 flex items-start gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-emerald-300">Password Updated Successfully!</p>
                <p className="text-xs text-emerald-200/80 leading-relaxed">{passwordSuccessMessage}</p>
                <p className="text-[11px] text-slate-400 pt-1">
                  You can now use this new password on next login or during administrative verifications.
                </p>
              </div>
            </div>
          )}

          {/* Password Update Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-cyan-400" />
                    Set New Password
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isEditingOwnAccount
                      ? 'Update your personal portal login password.'
                      : `Super Admin override: Setting password for ${targetUser?.fullName}.`}
                  </p>
                </div>

                {/* Quick Generator Button & Cloud Persistence Status */}
                <div className="flex items-center gap-2">
                  {dbStatus?.connected ? (
                    <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[10px] items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      MongoDB Cloud Active
                    </span>
                  ) : (
                    <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px] items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Server Storage Mode
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={generateStrongPassword}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
                    title="Generate a cryptographically sound password"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Generate Password</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {/* Current Password Field (Only when editing self) */}
                {isEditingOwnAccount && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        Current Password <span className="text-rose-400">*</span>
                      </label>
                      <span className="text-[11px] text-slate-500">
                        Initial default: <code className="text-slate-400">AdminPassword@2026</code>
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        required
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono pr-10 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {!isEditingOwnAccount && (
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                    <span>
                      Super Admin Override: You can assign a new password directly without needing the user's old password.
                    </span>
                  </div>
                )}

                {/* New Password Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>New Password <span className="text-rose-400">*</span></span>
                    {newPassword && (
                      <span className={`text-[11px] font-bold ${strength.text}`}>
                        Strength: {strength.label}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter strong new password (min. 8 characters)"
                      required
                      minLength={8}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono pr-10 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Visual Bar */}
                  {newPassword && (
                    <div className="space-y-1 pt-1">
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm New Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">
                      Confirm New Password <span className="text-rose-400">*</span>
                    </label>
                    {confirmPassword && (
                      <span
                        className={`text-[11px] font-semibold flex items-center gap-1 ${
                          passwordsMatch ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {passwordsMatch ? (
                          <>
                            <Check className="w-3 h-3" /> Passwords match
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3" /> Passwords do not match
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type your new password"
                      required
                      minLength={8}
                      className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-white text-xs font-mono pr-10 focus:outline-none ${
                        confirmPassword
                          ? passwordsMatch
                            ? 'border-emerald-700 focus:ring-1 focus:ring-emerald-500'
                            : 'border-rose-700 focus:ring-1 focus:ring-rose-500'
                          : 'border-slate-800 focus:ring-1 focus:ring-cyan-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Generated Password Copy Helper Banner */}
                {newPassword && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <Key className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="font-mono text-slate-300 truncate select-all">{newPassword}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(newPassword)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700 flex-shrink-0 transition"
                    >
                      {copiedGeneratedPassword ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setPasswordSuccessMessage(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                  >
                    Reset Form
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingPassword || !passwordsMatch || newPassword.length < 8}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-950/40"
                  >
                    {isSubmittingPassword ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Update Password Now</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Password Security Rules & Tips Sidebar */}
            <div className="space-y-4">
              {/* Security Checklist Card */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Password Criteria Checklist
                </h4>

                <div className="space-y-2 text-xs">
                  <div className={`flex items-center gap-2 ${reqLength ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${reqLength ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>At least 8 characters long</span>
                  </div>

                  <div className={`flex items-center gap-2 ${reqUpper ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${reqUpper ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Contains uppercase letter (A-Z)</span>
                  </div>

                  <div className={`flex items-center gap-2 ${reqLower ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${reqLower ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Contains lowercase letter (a-z)</span>
                  </div>

                  <div className={`flex items-center gap-2 ${reqNum ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${reqNum ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Contains numeric digit (0-9)</span>
                  </div>

                  <div className={`flex items-center gap-2 ${reqSpecial ? 'text-emerald-400' : 'text-slate-500'}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${reqSpecial ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span>Contains special symbol (!@#$%^&*)</span>
                  </div>
                </div>
              </div>

              {/* Security Recommendations Card */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  Credential Policy
                </h4>
                <div className="space-y-2 text-[11px] text-slate-400 leading-relaxed">
                  <p>
                    Passwords are encrypted using industry-standard <span className="text-slate-200 font-mono">bcrypt</span> with 10 salt rounds before storage.
                  </p>
                  <p>
                    Avoid reusing passwords across different systems. Changes take effect immediately across all active login sessions.
                  </p>
                  <p>
                    All password update actions are immutably logged into the system audit trail with user identity and timestamp.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('activity')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 transition"
                  >
                    <span>View Security Audit Trail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Linkedin,
  Github,
  Mail,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsTeamMember } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const TeamManager: React.FC = () => {
  const { apiFetch, showToast, canDelete } = useAdminAuth();
  const [team, setTeam] = useState<CmsTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<Partial<CmsTeamMember> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CmsTeamMember | null>(null);

  const loadTeam = async () => {
    try {
      const data = await apiFetch('/api/team');
      setTeam(data || []);
    } catch (err) {
      console.error('Failed to load team:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setIsSaving(true);
    try {
      if (editingMember.id) {
        const updated = await apiFetch(`/api/team/${editingMember.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingMember)
        });
        setTeam((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
        showToast(`Team member "${updated.name}" updated.`);
      } else {
        const created = await apiFetch('/api/team', {
          method: 'POST',
          body: JSON.stringify(editingMember)
        });
        setTeam((prev) => [...prev, created]);
        showToast(`Team member "${created.name}" added.`);
      }
      setEditingMember(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await apiFetch(`/api/team/${deleteTarget.id}`, { method: 'DELETE' });
      setTeam((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      showToast('Team member removed.');
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleOpenNew = () => {
    setEditingMember({
      name: '',
      role: 'Senior Software Engineer',
      bio: '',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      department: 'Engineering',
      socialLinks: {
        linkedin: '',
        github: '',
        email: ''
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-400" />
            Leadership & Engineering Team CMS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage company leadership, executive directors, and technical leads displayed on the website.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-rose-950/40"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs">
            Loading team profiles...
          </div>
        ) : team.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            No team members added yet.
          </div>
        ) : (
          team.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="h-44 w-full relative overflow-hidden bg-slate-950">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {member.department && (
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-950/80 text-rose-300 border border-rose-800/40 backdrop-blur-sm">
                        {member.department}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="text-sm font-bold text-white leading-tight">{member.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{member.role}</p>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  {member.socialLinks?.linkedin && <Linkedin className="w-3.5 h-3.5" />}
                  {member.socialLinks?.github && <Github className="w-3.5 h-3.5" />}
                  {member.socialLinks?.email && <Mail className="w-3.5 h-3.5" />}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingMember(member)}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => setDeleteTarget(member)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-400" />
              {editingMember.id ? 'Edit Team Profile' : 'Add Team Member'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Update biographical info, official job title, department, and contact links.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Official Title / Role</label>
                  <input
                    type="text"
                    required
                    value={editingMember.role || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Department</label>
                  <input
                    type="text"
                    value={editingMember.department || ''}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, department: e.target.value })
                    }
                    placeholder="e.g. Executive, Engineering"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Profile Image URL</label>
                  <input
                    type="text"
                    value={editingMember.image || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                    placeholder="https://... or /src/assets/..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Biography</label>
                  <textarea
                    rows={3}
                    value={editingMember.bio || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={editingMember.socialLinks?.linkedin || ''}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        socialLinks: { ...editingMember.socialLinks, linkedin: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Official Contact Email</label>
                  <input
                    type="email"
                    value={editingMember.socialLinks?.email || ''}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        socialLinks: { ...editingMember.socialLinks, email: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-lg transition"
                >
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Team Member?"
        message={`Are you sure you want to remove "${deleteTarget?.name}" from the company directory?`}
        confirmLabel="Delete Profile"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Mail,
  Calendar,
  X
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsCareer } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const CareerManager: React.FC = () => {
  const { apiFetch, showToast, canDelete } = useAdminAuth();
  const [careers, setCareers] = useState<CmsCareer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCareer, setEditingCareer] = useState<Partial<CmsCareer> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CmsCareer | null>(null);
  const [careersPageEnabled, setCareersPageEnabled] = useState<boolean>(true);
  const [careersPageId, setCareersPageId] = useState<string>('page-careers');
  const [confirmPageModal, setConfirmPageModal] = useState<boolean>(false);

  // Helper strings for list editors
  const [newResp, setNewResp] = useState('');
  const [newReq, setNewReq] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const loadCareers = async () => {
    try {
      const data = await apiFetch('/api/careers?includeClosed=true');
      setCareers(data || []);
    } catch (err) {
      console.error('Failed to load careers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPageStatus = async () => {
    try {
      const pages = await apiFetch('/api/pages');
      const careersPage = pages?.find((p: any) => p.route === 'careers' || p.id === 'page-careers');
      if (careersPage) {
        setCareersPageId(careersPage.id);
        setCareersPageEnabled(careersPage.enabled !== false);
      }
    } catch (err) {
      console.error('Failed to load careers page status:', err);
    }
  };

  useEffect(() => {
    loadCareers();
    loadPageStatus();
  }, []);

  const handleToggleCareersPage = async () => {
    const nextStatus = !careersPageEnabled;
    try {
      await apiFetch(`/api/pages/${careersPageId}`, {
        method: 'PATCH',
        body: JSON.stringify({ enabled: nextStatus })
      });
      setCareersPageEnabled(nextStatus);
      showToast(
        `Careers page is now ${nextStatus ? 'LIVE' : 'HIDDEN'}.`
      );
      window.dispatchEvent(new Event('cms-data-updated'));
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setConfirmPageModal(false);
    }
  };

  const handleSaveCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCareer) return;

    setIsSaving(true);
    try {
      if (editingCareer.id) {
        const updated = await apiFetch(`/api/careers/${editingCareer.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingCareer)
        });
        setCareers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        showToast(`Job opening "${updated.title}" updated.`);
      } else {
        const created = await apiFetch('/api/careers', {
          method: 'POST',
          body: JSON.stringify(editingCareer)
        });
        setCareers((prev) => [...prev, created]);
        showToast(`Job opening "${created.title}" created.`);
      }
      setEditingCareer(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await apiFetch(`/api/careers/${deleteTarget.id}`, { method: 'DELETE' });
      setCareers((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      showToast(`Position deleted.`);
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleToggleStatus = async (job: CmsCareer) => {
    const nextStatus = job.status === 'open' ? 'closed' : 'open';
    try {
      const updated = await apiFetch(`/api/careers/${job.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...job, status: nextStatus })
      });
      setCareers((prev) => prev.map((c) => (c.id === job.id ? updated : c)));
      showToast(`Position set to ${nextStatus.toUpperCase()}`);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleOpenNew = () => {
    setEditingCareer({
      title: '',
      department: 'Engineering Division',
      location: 'Jamshedpur (On-site / Hybrid)',
      type: 'Full-Time',
      experience: '1 - 3 Years',
      salary: '₹3,60,000 - ₹6,00,000 / year',
      summary: '',
      responsibilities: [
        'Develop and maintain enterprise software modules and web portals.',
        'Collaborate with technical architects and support teams.'
      ],
      requirements: [
        'Degree in Computer Science, BCA/MCA, or relevant field experience.',
        'Strong problem-solving and clean code engineering practices.'
      ],
      skills: ['TypeScript', 'React', 'C# .NET', 'SQL Server'],
      benefits: [
        'Competitive salary with annual performance bonuses',
        'Health coverage and paid technical certifications'
      ],
      applicationEmail: 'info@globalinfosoft.com',
      deadline: '2025-12-31',
      status: 'open'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            Careers & Job Openings CMS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Post and update engineering roles, salary ranges, technical requirements, and applications.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-amber-950/40"
        >
          <Plus className="w-4 h-4" />
          Add Job Vacancy
        </button>
      </div>

      {/* Two-Level Visibility Banner: Level 1 Page-Level Status */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
              careersPageEnabled
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
            }`}
          >
            {careersPageEnabled ? 'LIVE' : 'OFF'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Level 1: Careers Page Visibility
              </h3>
              {careersPageEnabled ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ● LIVE ON WEBSITE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-400 border border-amber-800 text-[10px] font-bold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  ○ HIDDEN FROM PUBLIC
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {careersPageEnabled
                ? 'The Careers page is currently published in the header navigation and footer.'
                : 'The Careers route is hidden from public view. Direct URL visits show a friendly maintenance notice.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setConfirmPageModal(true)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer flex items-center gap-2 border ${
            careersPageEnabled
              ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30'
              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
          }`}
        >
          {careersPageEnabled ? 'Hide Careers Page' : 'Make Careers Page Live'}
        </button>
      </div>

      {/* Confirmation Modal for Careers Page Toggle */}
      {confirmPageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-slate-100 space-y-4">
            <h3 className="font-['Sora'] text-lg font-bold text-white">
              {careersPageEnabled ? 'Hide Careers Page?' : 'Publish Careers Page?'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {careersPageEnabled
                ? 'Are you sure you want to hide the Careers page? The page will no longer be visible to public visitors, but all existing content will remain safely stored.'
                : 'Are you sure you want to make the Careers page live? It will become visible in the navigation and accessible to public visitors.'}
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmPageModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggleCareersPage}
                className={`px-5 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition cursor-pointer shadow-lg ${
                  careersPageEnabled
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                {careersPageEnabled ? 'Hide Page' : 'Make Live'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Level 2: Job Openings List Header */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>Level 2: Individual Job Postings</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono">
            {careers.length} Roles
          </span>
        </h3>
        <span className="text-[11px] text-slate-500">
          Toggle individual roles to Open or Closed below
        </span>
      </div>

      {/* Careers List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 text-xs">Loading career listings...</div>
        ) : careers.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            No job openings configured yet. Click "Add Job Vacancy" above.
          </div>
        ) : (
          careers.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition"
            >
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-base font-bold text-white truncate">{job.title}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      job.status === 'open'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {job.status}
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {job.department}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{job.summary}</p>

                <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {job.type} • {job.experience}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-200">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    {job.salary}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <button
                  onClick={() => handleToggleStatus(job)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    job.status === 'open'
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      : 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {job.status === 'open' ? 'Close Opening' : 'Re-open Opening'}
                </button>

                <button
                  onClick={() => setEditingCareer(job)}
                  className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {canDelete && (
                  <button
                    onClick={() => setDeleteTarget(job)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Career Editor Modal */}
      {editingCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" />
              {editingCareer.id ? 'Edit Job Opening' : 'Create Job Opening'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter job details, department, requirements, and compensation.
            </p>

            <form onSubmit={handleSaveCareer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Job Title</label>
                  <input
                    type="text"
                    required
                    value={editingCareer.title || ''}
                    onChange={(e) => setEditingCareer({ ...editingCareer, title: e.target.value })}
                    placeholder="e.g. Senior Full-Stack .NET Engineer"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Department</label>
                  <input
                    type="text"
                    required
                    value={editingCareer.department || ''}
                    onChange={(e) => setEditingCareer({ ...editingCareer, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    required
                    value={editingCareer.location || ''}
                    onChange={(e) => setEditingCareer({ ...editingCareer, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Employment Type</label>
                  <select
                    value={editingCareer.type || 'Full-Time'}
                    onChange={(e) => setEditingCareer({ ...editingCareer, type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Experience</label>
                  <input
                    type="text"
                    value={editingCareer.experience || ''}
                    onChange={(e) => setEditingCareer({ ...editingCareer, experience: e.target.value })}
                    placeholder="e.g. 2 - 4 Years"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Salary Package</label>
                  <input
                    type="text"
                    value={editingCareer.salary || ''}
                    onChange={(e) => setEditingCareer({ ...editingCareer, salary: e.target.value })}
                    placeholder="e.g. ₹5,00,000 - ₹8,00,000 / year"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Application Email</label>
                  <input
                    type="email"
                    value={editingCareer.applicationEmail || ''}
                    onChange={(e) =>
                      setEditingCareer({ ...editingCareer, applicationEmail: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Role Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={editingCareer.summary || ''}
                    onChange={(e) => setEditingCareer({ ...editingCareer, summary: e.target.value })}
                    placeholder="Explain the role and mission..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Responsibilities list editor */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Key Responsibilities</label>
                <div className="space-y-1 mb-2">
                  {editingCareer.responsibilities?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2 rounded bg-slate-950 border border-slate-800 text-[11px]"
                    >
                      <span>• {item}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...(editingCareer.responsibilities || [])];
                          list.splice(idx, 1);
                          setEditingCareer({ ...editingCareer, responsibilities: list });
                        }}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newResp}
                    onChange={(e) => setNewResp(e.target.value)}
                    placeholder="Add a responsibility item..."
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newResp.trim()) return;
                      setEditingCareer({
                        ...editingCareer,
                        responsibilities: [...(editingCareer.responsibilities || []), newResp.trim()]
                      });
                      setNewResp('');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Requirements list editor */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Requirements & Qualifications</label>
                <div className="space-y-1 mb-2">
                  {editingCareer.requirements?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2 rounded bg-slate-950 border border-slate-800 text-[11px]"
                    >
                      <span>• {item}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...(editingCareer.requirements || [])];
                          list.splice(idx, 1);
                          setEditingCareer({ ...editingCareer, requirements: list });
                        }}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newReq}
                    onChange={(e) => setNewReq(e.target.value)}
                    placeholder="Add a requirement item..."
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newReq.trim()) return;
                      setEditingCareer({
                        ...editingCareer,
                        requirements: [...(editingCareer.requirements || []), newReq.trim()]
                      });
                      setNewReq('');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCareer(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition"
                >
                  {isSaving ? 'Saving...' : 'Save Job Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Job Opening?"
        message={`Are you sure you want to remove the opening for "${deleteTarget?.title}"? Candidates will no longer see this position on the careers portal.`}
        confirmLabel="Delete Vacancy"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Globe,
  Tag,
  Calendar,
  X
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsProject } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const ProjectsManager: React.FC = () => {
  const { apiFetch, showToast, canDelete } = useAdminAuth();
  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<CmsProject> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CmsProject | null>(null);

  const [newResult, setNewResult] = useState('');
  const [newTech, setNewTech] = useState('');

  const loadProjects = async () => {
    try {
      const data = await apiFetch('/api/projects');
      setProjects(data || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setIsSaving(true);
    try {
      if (editingProject.id) {
        const updated = await apiFetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingProject)
        });
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        showToast(`Project "${updated.title}" updated.`);
      } else {
        const created = await apiFetch('/api/projects', {
          method: 'POST',
          body: JSON.stringify(editingProject)
        });
        setProjects((prev) => [...prev, created]);
        showToast(`Project "${created.title}" created.`);
      }
      setEditingProject(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await apiFetch(`/api/projects/${deleteTarget.id}`, { method: 'DELETE' });
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      showToast('Project deleted successfully.');
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleOpenNew = () => {
    setEditingProject({
      title: '',
      client: '',
      industry: 'Enterprise Technology',
      description: '',
      challenge: '',
      solution: '',
      results: ['35% increase in operational throughput', '99.9% uptime achieved'],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://globalinfosofts.com',
      completionDate: '2025'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Case Studies & Client Projects CMS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Showcase enterprise deliveries, client results, technology stacks, and live links.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-purple-950/40"
        >
          <Plus className="w-4 h-4" />
          Add Case Study
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs">
            Loading project case studies...
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            No projects added yet. Click "Add Case Study" above.
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition group"
            >
              <div>
                <div className="h-40 w-full relative overflow-hidden bg-slate-950">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-2 left-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950/80 text-purple-300 border border-purple-800/40">
                      {proj.industry}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">{proj.client}</span>
                    <span className="font-mono text-[11px]">{proj.completionDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{proj.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies?.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 text-slate-400 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                {proj.liveUrl ? (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-cyan-400 transition flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit Project
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500">Internal Deployment</span>
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingProject(proj)}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => setDeleteTarget(proj)}
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

      {/* Project Editor Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              {editingProject.id ? 'Edit Case Study' : 'Create Case Study'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter project specifics, challenge, solution, and measurable business outcomes.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Project Name</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Client Name</label>
                  <input
                    type="text"
                    required
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Industry</label>
                  <input
                    type="text"
                    value={editingProject.industry || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Cover Image URL</label>
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    placeholder="https://... or /src/assets/..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Live Website URL</label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Completion Year</label>
                  <input
                    type="text"
                    value={editingProject.completionDate || '2025'}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, completionDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Summary Description</label>
                  <textarea
                    rows={2}
                    required
                    value={editingProject.description || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Client Challenge</label>
                  <textarea
                    rows={3}
                    value={editingProject.challenge || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, challenge: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Engineered Solution</label>
                  <textarea
                    rows={3}
                    value={editingProject.solution || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, solution: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Measurable Results Editor */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Measurable Outcomes</label>
                <div className="space-y-1 mb-2">
                  {editingProject.results?.map((res, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2 rounded bg-slate-950 border border-slate-800 text-[11px]"
                    >
                      <span>✓ {typeof res === 'string' ? res : `${res.label}: ${res.value}`}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...(editingProject.results || [])];
                          list.splice(idx, 1);
                          setEditingProject({ ...editingProject, results: list });
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
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value)}
                    placeholder="e.g. 40% reduction in checkout latency..."
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newResult.trim()) return;
                      setEditingProject({
                        ...editingProject,
                        results: [...(editingProject.results || []), newResult.trim()]
                      });
                      setNewResult('');
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
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold rounded-lg transition"
                >
                  {isSaving ? 'Saving...' : 'Save Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Project Case Study?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete Project"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

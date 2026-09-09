import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Code,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink,
  X
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsService, CmsSolution } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const ServiceSolutionManager: React.FC = () => {
  const { apiFetch, showToast, canDelete } = useAdminAuth();
  const [activeSubTab, setActiveSubTab] = useState<'services' | 'solutions'>('services');
  const [services, setServices] = useState<CmsService[]>([]);
  const [solutions, setSolutions] = useState<CmsSolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Editor Modal States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'service' | 'solution'; item: any } | null>(null);

  // Helper inputs for tags/features
  const [newFeature, setNewFeature] = useState('');
  const [newTech, setNewTech] = useState('');

  const loadData = async () => {
    try {
      const [svcData, solData] = await Promise.all([
        apiFetch('/api/services'),
        apiFetch('/api/solutions')
      ]);
      setServices(svcData || []);
      setSolutions(solData || []);
    } catch (err) {
      console.error('Failed to load services/solutions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSaving(true);
    const isService = activeSubTab === 'services';
    const endpoint = isService ? '/api/services' : '/api/solutions';

    try {
      if (editingItem.id) {
        const updated = await apiFetch(`${endpoint}/${editingItem.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingItem)
        });
        if (isService) {
          setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        } else {
          setSolutions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        }
        showToast(`${isService ? 'Service' : 'Solution'} "${updated.title}" updated.`);
      } else {
        const created = await apiFetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(editingItem)
        });
        if (isService) {
          setServices((prev) => [...prev, created]);
        } else {
          setSolutions((prev) => [...prev, created]);
        }
        showToast(`Created new ${isService ? 'Service' : 'Solution'}: "${created.title}".`);
      }
      setEditingItem(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const isService = deleteTarget.type === 'service';
    const endpoint = isService ? `/api/services/${deleteTarget.item.id}` : `/api/solutions/${deleteTarget.item.id}`;

    try {
      await apiFetch(endpoint, { method: 'DELETE' });
      if (isService) {
        setServices((prev) => prev.filter((s) => s.id !== deleteTarget.item.id));
      } else {
        setSolutions((prev) => prev.filter((s) => s.id !== deleteTarget.item.id));
      }
      showToast('Item deleted successfully.');
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleOpenNew = () => {
    if (activeSubTab === 'services') {
      setEditingItem({
        title: '',
        shortDescription: '',
        fullDescription: '',
        iconName: 'Code',
        features: ['Custom business logic', 'Enterprise grade security', 'Scalable architecture'],
        techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        deliverables: ['Source Code', 'System Architecture Document', 'Deployment Runbook']
      });
    } else {
      setEditingItem({
        title: '',
        category: 'ERP & Systems',
        shortDescription: '',
        fullDescription: '',
        iconName: 'Boxes',
        keyFeatures: ['Automated workflows', 'Multi-branch sync', 'Real-time financial analytics'],
        industries: ['Enterprise', 'Manufacturing', 'Retail']
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Boxes className="w-5 h-5 text-cyan-400" />
            Services & Industry Solutions CMS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your service catalog, ERP industry suites, feature matrices, and technologies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sub-tab switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSubTab('services')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeSubTab === 'services'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Services ({services.length})
            </button>
            <button
              onClick={() => setActiveSubTab('solutions')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeSubTab === 'solutions'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Solutions ({solutions.length})
            </button>
          </div>

          <button
            onClick={handleOpenNew}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            Add {activeSubTab === 'services' ? 'Service' : 'Solution'}
          </button>
        </div>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs">
            Loading catalog data...
          </div>
        ) : activeSubTab === 'services' ? (
          services.map((svc) => (
            <div
              key={svc.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400">
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                    {svc.iconName}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{svc.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {svc.shortDescription}
                  </p>
                </div>

                {/* Features Pill list */}
                {svc.features && svc.features.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase text-slate-500">Key Features</p>
                    <div className="flex flex-wrap gap-1">
                      {svc.features.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {f}
                        </span>
                      ))}
                      {svc.features.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-500">
                          +{svc.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {svc.techStack?.length || 0} tech tags
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingItem(svc)}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => setDeleteTarget({ type: 'service', item: svc })}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          solutions.map((sol) => (
            <div
              key={sol.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-400">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-850">
                    {sol.category || 'Enterprise'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{sol.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {sol.shortDescription}
                  </p>
                </div>

                {sol.keyFeatures && sol.keyFeatures.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase text-slate-500">Modules</p>
                    <div className="flex flex-wrap gap-1">
                      {sol.keyFeatures.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {f}
                        </span>
                      ))}
                      {sol.keyFeatures.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-500">
                          +{sol.keyFeatures.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  {sol.industries?.join(', ') || 'General'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingItem(sol)}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => setDeleteTarget({ type: 'solution', item: sol })}
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
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-cyan-400" />
              {editingItem.id ? 'Edit' : 'Create'} {activeSubTab === 'services' ? 'Service' : 'Solution'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Specify title, description, icon identifier, and feature list.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Icon Identifier</label>
                  <input
                    type="text"
                    value={editingItem.iconName || 'Boxes'}
                    onChange={(e) => setEditingItem({ ...editingItem, iconName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>

                {activeSubTab === 'solutions' && (
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Industry Category</label>
                    <input
                      type="text"
                      value={editingItem.category || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      placeholder="e.g. ERP & Retail"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Short Summary</label>
                  <textarea
                    rows={2}
                    required
                    value={editingItem.shortDescription || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, shortDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Full In-depth Overview</label>
                  <textarea
                    rows={4}
                    value={editingItem.fullDescription || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, fullDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs"
                  />
                </div>
              </div>

              {/* Dynamic Feature list editor */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">
                  {activeSubTab === 'services' ? 'Service Features' : 'Key Modules'}
                </label>
                <div className="space-y-1 mb-2">
                  {((activeSubTab === 'services' ? editingItem.features : editingItem.keyFeatures) || []).map(
                    (f: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2 rounded bg-slate-950 border border-slate-800 text-[11px]"
                      >
                        <span>• {f}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const key = activeSubTab === 'services' ? 'features' : 'keyFeatures';
                            const list = [...(editingItem[key] || [])];
                            list.splice(idx, 1);
                            setEditingItem({ ...editingItem, [key]: list });
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add feature item..."
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newFeature.trim()) return;
                      const key = activeSubTab === 'services' ? 'features' : 'keyFeatures';
                      setEditingItem({
                        ...editingItem,
                        [key]: [...(editingItem[key] || []), newFeature.trim()]
                      });
                      setNewFeature('');
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
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition"
                >
                  {isSaving ? 'Saving...' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title={`Delete ${deleteTarget?.type === 'service' ? 'Service' : 'Solution'}?`}
        message={`Are you sure you want to delete "${deleteTarget?.item?.title}"? This item will be removed from the public navigation and catalog.`}
        confirmLabel="Delete Item"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

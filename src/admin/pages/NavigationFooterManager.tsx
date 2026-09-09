import React, { useState, useEffect } from 'react';
import {
  Compass,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Plus,
  Save,
  Trash2,
  ExternalLink,
  Edit2,
  CheckCircle2,
  LayoutTemplate
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsNavigationItem, CmsFooterSettings } from '../cmsTypes';

export const NavigationFooterManager: React.FC = () => {
  const { apiFetch, showToast } = useAdminAuth();
  const [navItems, setNavItems] = useState<CmsNavigationItem[]>([]);
  const [footer, setFooter] = useState<CmsFooterSettings>({
    companyDescription: '',
    copyrightText: '',
    address: '',
    phone: '',
    email: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      github: '',
      youtube: ''
    },
    enabledColumns: {
      brand: true,
      solutions: true,
      services: true,
      quickLinks: true,
      contact: true
    }
  });

  const [activeTab, setActiveTab] = useState<'navigation' | 'footer'>('navigation');
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingFooter, setIsSavingFooter] = useState(false);
  const [editingNavItem, setEditingNavItem] = useState<Partial<CmsNavigationItem> | null>(null);

  const loadData = async () => {
    try {
      const [navData, footerData] = await Promise.all([
        apiFetch('/api/navigation'),
        apiFetch('/api/footer')
      ]);
      setNavItems(navData || []);
      if (footerData) setFooter(footerData);
    } catch (err) {
      console.error('Failed to load navigation & footer:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleNavEnabled = async (item: CmsNavigationItem) => {
    const nextEnabled = !item.enabled;
    const updatedList = navItems.map((n) => (n.id === item.id ? { ...n, enabled: nextEnabled } : n));
    setNavItems(updatedList);
    try {
      await apiFetch('/api/navigation', {
        method: 'PUT',
        body: JSON.stringify({ items: updatedList })
      });
      showToast(`Nav item "${item.label}" ${nextEnabled ? 'Enabled' : 'Disabled'}.`);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleMoveNav = async (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= navItems.length) return;

    const list = [...navItems];
    const [moved] = list.splice(index, 1);
    list.splice(newIdx, 0, moved);

    setNavItems(list);
    try {
      await apiFetch('/api/navigation', {
        method: 'PUT',
        body: JSON.stringify({ items: list })
      });
      showToast('Navigation menu order updated.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleSaveNavItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNavItem) return;

    let updatedList: CmsNavigationItem[];
    if (editingNavItem.id) {
      updatedList = navItems.map((n) => (n.id === editingNavItem.id ? ({ ...n, ...editingNavItem } as CmsNavigationItem) : n));
    } else {
      const newItem: CmsNavigationItem = {
        id: `nav-${Date.now()}`,
        label: editingNavItem.label || 'New Link',
        href: editingNavItem.href || '/',
        page: editingNavItem.page || (editingNavItem.href?.replace('/', '') || 'home'),
        path: editingNavItem.path || editingNavItem.href || '/',
        order: navItems.length + 1,
        displayOrder: navItems.length + 1,
        enabled: true,
        isSecondary: false,
        isExternal: editingNavItem.isExternal || false
      };
      updatedList = [...navItems, newItem];
    }

    setNavItems(updatedList);
    try {
      await apiFetch('/api/navigation', {
        method: 'PUT',
        body: JSON.stringify({ items: updatedList })
      });
      showToast('Navigation menu saved.');
      setEditingNavItem(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteNavItem = async (id: string) => {
    const updatedList = navItems.filter((n) => n.id !== id);
    setNavItems(updatedList);
    try {
      await apiFetch('/api/navigation', {
        method: 'PUT',
        body: JSON.stringify({ items: updatedList })
      });
      showToast('Menu item removed.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingFooter(true);
    try {
      const updated = await apiFetch('/api/footer', {
        method: 'PUT',
        body: JSON.stringify(footer)
      });
      setFooter(updated);
      showToast('Footer settings and links updated successfully!');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSavingFooter(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            Navigation Menu & Global Footer CMS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure header navigation structure, ordering, and footer columns with immediate synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('navigation')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'navigation'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Header Menu ({navItems.length})
          </button>
          <button
            onClick={() => setActiveTab('footer')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'footer'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Footer Configuration
          </button>
        </div>
      </div>

      {activeTab === 'navigation' ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-white">Header Navigation Links</h3>
              <p className="text-xs text-slate-400">
                Click buttons to reorder, toggle visibility on the live website, or add custom menu links.
              </p>
            </div>

            <button
              onClick={() =>
                setEditingNavItem({
                  label: '',
                  href: '#',
                  enabled: true,
                  isExternal: false
                })
              }
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Add Menu Link
            </button>
          </div>

          <div className="space-y-2">
            {navItems.map((item, idx) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
                  item.enabled
                    ? 'bg-slate-950/70 border-slate-800 text-slate-200'
                    : 'bg-slate-950/30 border-slate-850 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-400 text-xs font-mono flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                    <p className="text-xs text-slate-400 font-mono truncate">{item.href}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleToggleNavEnabled(item)}
                    className={`p-1.5 rounded-lg transition ${
                      item.enabled
                        ? 'text-emerald-400 hover:bg-emerald-950/40'
                        : 'text-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    {item.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setEditingNavItem(item)}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveNav(idx, 'up')}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition disabled:opacity-20"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>

                  <button
                    disabled={idx === navItems.length - 1}
                    onClick={() => handleMoveNav(idx, 'down')}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition disabled:opacity-20"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteNavItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Footer Settings Form */
        <form onSubmit={handleSaveFooter} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Global Website Footer</h3>
            <p className="text-xs text-slate-400">
              Customize company description, contact numbers, official addresses, and social media handles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-medium">Company Description in Footer</label>
              <textarea
                rows={3}
                value={footer.companyDescription}
                onChange={(e) => setFooter({ ...footer, companyDescription: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-medium">Copyright Notice Text</label>
              <input
                type="text"
                value={footer.copyrightText}
                onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Contact Phone</label>
              <input
                type="text"
                value={footer.phone}
                onChange={(e) => setFooter({ ...footer, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Contact Email</label>
              <input
                type="email"
                value={footer.email}
                onChange={(e) => setFooter({ ...footer, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-medium">Registered Office Address</label>
              <input
                type="text"
                value={footer.address}
                onChange={(e) => setFooter({ ...footer, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Social Media Accounts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">LinkedIn URL</label>
                <input
                  type="text"
                  value={footer.socialLinks?.linkedin || ''}
                  onChange={(e) =>
                    setFooter({
                      ...footer,
                      socialLinks: { ...footer.socialLinks, linkedin: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Twitter / X URL</label>
                <input
                  type="text"
                  value={footer.socialLinks?.twitter || ''}
                  onChange={(e) =>
                    setFooter({
                      ...footer,
                      socialLinks: { ...footer.socialLinks, twitter: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Facebook URL</label>
                <input
                  type="text"
                  value={footer.socialLinks?.facebook || ''}
                  onChange={(e) =>
                    setFooter({
                      ...footer,
                      socialLinks: { ...footer.socialLinks, facebook: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">GitHub Organization URL</label>
                <input
                  type="text"
                  value={footer.socialLinks?.github || ''}
                  onChange={(e) =>
                    setFooter({
                      ...footer,
                      socialLinks: { ...footer.socialLinks, github: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSavingFooter}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-cyan-950/40"
            >
              <Save className="w-4 h-4" />
              {isSavingFooter ? 'Updating Footer...' : 'Save Footer Settings'}
            </button>
          </div>
        </form>
      )}

      {/* Nav Item Modal Editor */}
      {editingNavItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            <h3 className="text-base font-bold text-white mb-3">
              {editingNavItem.id ? 'Edit Menu Link' : 'Add Navigation Link'}
            </h3>

            <form onSubmit={handleSaveNavItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Menu Label</label>
                <input
                  type="text"
                  required
                  value={editingNavItem.label || ''}
                  onChange={(e) => setEditingNavItem({ ...editingNavItem, label: e.target.value })}
                  placeholder="e.g. Solutions"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Target URL / Hash Path</label>
                <input
                  type="text"
                  required
                  value={editingNavItem.href || ''}
                  onChange={(e) => setEditingNavItem({ ...editingNavItem, href: e.target.value })}
                  placeholder="e.g. /solutions or #contact"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="externalCheck"
                  checked={!!editingNavItem.isExternal}
                  onChange={(e) =>
                    setEditingNavItem({ ...editingNavItem, isExternal: e.target.checked })
                  }
                  className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                />
                <label htmlFor="externalCheck" className="text-slate-300 cursor-pointer">
                  Open in new tab (External link)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingNavItem(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  X,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  Power,
  RefreshCw,
  Search,
  Check,
  Radio,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsNotification } from '../cmsTypes';
import { AnnouncementPopup } from '../../components/AnnouncementPopup';

export const NotificationManager: React.FC = () => {
  const { apiFetch, showToast, canPublish } = useAdminAuth();
  const [notifications, setNotifications] = useState<CmsNotification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'draft'>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingNotif, setEditingNotif] = useState<Partial<CmsNotification> | null>(null);
  const [previewNotif, setPreviewNotif] = useState<CmsNotification | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchNotifications = async (silent: boolean = false) => {
    if (!silent) setIsLoading(true);
    try {
      const data = await apiFetch('/api/notifications');
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err: any) {
      if (!silent) showToast(err.message || 'Failed to load announcements', 'error');
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingNotif({
      title: '',
      subtitle: '',
      message: '',
      imageUrl: '',
      badgeText: 'Company Notice',
      type: 'announcement',
      ctaText: 'Learn More',
      ctaLink: '#contact',
      secondaryButtonText: 'Close',
      isActive: true,
      startDate: new Date().toISOString(),
      endDate: '',
      autoDeleteOnEnd: false,
      showCountdownTimer: false,
      isScheduled: false,
      showOncePerSession: false,
      displayDelayMs: 300,
      themeColor: 'cyan',
      enableConfetti: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (notif: CmsNotification) => {
    setEditingNotif({ ...notif });
    setIsModalOpen(true);
  };

  const handlePushNow = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      await apiFetch(`/api/notifications/${id}/push-now`, {
        method: 'POST'
      });
      // Clear any dismissal markers in this browser so creator immediately sees the popup
      try {
        Object.keys(sessionStorage).forEach((k) => {
          if (k.startsWith('gis_announcement_dismissed_')) {
            sessionStorage.removeItem(k);
          }
        });
      } catch {}
      showToast('Announcement is now LIVE on the website for all visitors across all devices.', 'success');
      window.dispatchEvent(new Event('cms-data-updated'));
      await fetchNotifications(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to push announcement live', 'error');
    }
  };

  const handleToggleActive = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = await apiFetch(`/api/notifications/${id}/toggle`, {
        method: 'PATCH'
      });
      if (updated.isActive) {
        try {
          Object.keys(sessionStorage).forEach((k) => {
            if (k.startsWith('gis_announcement_dismissed_')) {
              sessionStorage.removeItem(k);
            }
          });
        } catch {}
      }
      showToast(
        updated.isActive
          ? 'Announcement is now LIVE on the website.'
          : 'Announcement deactivated and moved to drafts.',
        'success'
      );
      window.dispatchEvent(new Event('cms-data-updated'));
      await fetchNotifications(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to toggle status', 'error');
    }
  };

  const handleSaveNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotif?.title?.trim()) {
      showToast('Announcement title is required', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Partial<CmsNotification> = {
        ...editingNotif,
        autoDeleteOnEnd: false, // Always permanent in database
        isScheduled: false,
        displayDelayMs: 300
      };

      if (editingNotif.id) {
        await apiFetch(`/api/notifications/${editingNotif.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        showToast('Announcement updated and saved successfully.', 'success');
      } else {
        await apiFetch('/api/notifications', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        showToast(
          payload.isActive
            ? 'New announcement pushed LIVE across all devices.'
            : 'Announcement saved to drafts.',
          'success'
        );
      }

      // If active, clear dismissal markers so creator can immediately see it on the live site
      if (payload.isActive) {
        try {
          Object.keys(sessionStorage).forEach((k) => {
            if (k.startsWith('gis_announcement_dismissed_')) {
              sessionStorage.removeItem(k);
            }
          });
        } catch {}
      }

      setIsModalOpen(false);
      setEditingNotif(null);
      window.dispatchEvent(new Event('cms-data-updated'));
      await fetchNotifications(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to save announcement', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await apiFetch(`/api/notifications/${id}`, {
        method: 'DELETE'
      });
      showToast('Announcement deleted from database', 'info');
      setDeleteConfirmId(null);
      window.dispatchEvent(new Event('cms-data-updated'));
      await fetchNotifications(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to delete announcement', 'error');
    }
  };

  const handleDuplicate = (notif: CmsNotification) => {
    setEditingNotif({
      ...notif,
      id: undefined,
      title: `${notif.title} (Copy)`,
      isActive: false
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      showToast('Image file size must be less than 4MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setEditingNotif((prev) => (prev ? { ...prev, imageUrl: base64String } : null));
      showToast('Image uploaded successfully', 'success');
    };
    reader.onerror = () => {
      showToast('Failed to read image file', 'error');
    };
    reader.readAsDataURL(file);
  };

  const activeNotif = notifications.find((n) => n.isActive);

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch =
      (n.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.message || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.badgeText || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'live') return n.isActive;
    if (statusFilter === 'draft') return !n.isActive;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Executive Top Header */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                Corporate Announcements
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2.5 font-['Sora']">
              <Bell className="w-6 h-6 text-cyan-400" />
              Website Announcements & Alerts
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Publish global announcements, holiday notices, and service alerts. Live announcements appear prominently for all visitors across all devices, desktops, and mobiles.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {activeNotif && (
              <button
                type="button"
                onClick={() => setPreviewNotif(activeNotif)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Preview Live Popup</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/25 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create Announcement</span>
            </button>

            <button
              type="button"
              onClick={() => fetchNotifications(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition"
              title="Refresh announcements list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Live Status Banner */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-slate-400 font-medium">Broadcast Status:</span>
            {activeNotif ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live on Website:</span>
                <span className="text-white max-w-xs truncate font-medium">"{activeNotif.title}"</span>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-medium text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                No announcement currently live
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
            <span>Total: <strong className="text-slate-200">{notifications.length}</strong></span>
            <span>Live: <strong className="text-emerald-400">{notifications.filter((n) => n.isActive).length}</strong></span>
            <span>Drafts: <strong className="text-slate-300">{notifications.filter((n) => !n.isActive).length}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              statusFilter === 'all'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Announcements ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('live')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              statusFilter === 'live'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live ({notifications.filter((n) => n.isActive).length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              statusFilter === 'draft'
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Drafts ({notifications.filter((n) => !n.isActive).length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or badge..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* 3. Announcements List */}
      {isLoading ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800">
          <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading announcements database...</p>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <Bell className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">No Announcements Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? 'No announcements matched your search query.'
              : 'Create an announcement to broadcast notices, offers, or alerts to your website visitors.'}
          </p>
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold inline-flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Announcement</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotifications.map((notif) => {
            const isLive = Boolean(notif.isActive);

            return (
              <div
                key={notif.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                  isLive
                    ? 'bg-slate-900/95 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Card Header Strip */}
                  <div
                    className={`px-4 py-2.5 flex items-center justify-between text-xs border-b ${
                      isLive
                        ? 'bg-emerald-950/50 border-emerald-900/60 text-emerald-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                        }`}
                      />
                      <span>{isLive ? 'LIVE ON WEBSITE' : 'DRAFT'}</span>
                    </div>

                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 border border-white/5 text-slate-300">
                      {notif.badgeText || 'Notice'}
                    </span>
                  </div>

                  {/* Thumbnail Banner (if present) */}
                  {notif.imageUrl && (
                    <div className="relative h-36 bg-slate-950 overflow-hidden border-b border-slate-800">
                      <img
                        src={notif.imageUrl}
                        alt={notif.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content Area */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {notif.title}
                    </h3>
                    {notif.subtitle && (
                      <p className="text-xs text-cyan-300/90 font-medium line-clamp-1">
                        {notif.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {notif.message}
                    </p>

                    {/* Metadata */}
                    <div className="pt-2 text-[11px] font-mono text-slate-500 space-y-1">
                      {notif.ctaText && (
                        <div className="flex items-center gap-1 text-slate-400 truncate">
                          <span className="text-slate-500">Action:</span>
                          <span className="text-cyan-400 font-semibold">{notif.ctaText}</span>
                          {notif.ctaLink && <span className="text-slate-500 font-sans">({notif.ctaLink})</span>}
                        </div>
                      )}
                      {notif.endDate && (
                        <div className="flex items-center gap-1 text-slate-400">
                          <span className="text-slate-500">Expires:</span>
                          <span>{new Date(notif.endDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-3 bg-slate-950/40 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div>
                    {isLive ? (
                      <button
                        type="button"
                        onClick={(e) => handleToggleActive(notif.id, e)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition flex items-center gap-1.5"
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>Deactivate</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handlePushNow(notif.id, e)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-emerald-600/30"
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>Push Live Now</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPreviewNotif(notif)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                      title="Preview popup"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicate(notif)}
                      className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(notif)}
                      className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
                      title="Edit announcement"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(notif.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                      title="Delete announcement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Streamlined, Professional Announcement Modal */}
      {isModalOpen && editingNotif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {editingNotif.id ? 'Edit Announcement' : 'New Website Announcement'}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Publish an announcement to visitors across all devices and browsers.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNotification} className="mt-5 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              {/* Broadcast State Selector */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Broadcast Publishing State
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingNotif({ ...editingNotif, isActive: true })}
                    className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${
                      editingNotif.isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Publish & Make Live Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingNotif({ ...editingNotif, isActive: false })}
                    className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${
                      !editingNotif.isActive
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    <span>Save as Inactive Draft</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  {editingNotif.isActive
                    ? 'This announcement will immediately display to every visitor on the website.'
                    : 'Saved securely in your database. You can preview or push it live at any time.'}
                </p>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Headline / Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Office Relocation, Holiday Offer, Security Notice"
                    value={editingNotif.title || ''}
                    onChange={(e) => setEditingNotif({ ...editingNotif, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Badge Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Notice, Offer, Update"
                    value={editingNotif.badgeText || ''}
                    onChange={(e) => setEditingNotif({ ...editingNotif, badgeText: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Subtitle / Tagline (Optional)</label>
                <input
                  type="text"
                  placeholder="Brief highlight or summary line"
                  value={editingNotif.subtitle || ''}
                  onChange={(e) => setEditingNotif({ ...editingNotif, subtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Message Details */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Write message details for website visitors..."
                  value={editingNotif.message || ''}
                  onChange={(e) => setEditingNotif({ ...editingNotif, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              {/* Banner Graphic / Poster (Optional) */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Banner Image / Poster (Optional)</span>
                  </label>
                  {editingNotif.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setEditingNotif({ ...editingNotif, imageUrl: '' })}
                      className="text-[11px] text-red-400 hover:underline"
                    >
                      Remove image
                    </button>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Paste image URL or click Upload"
                    value={editingNotif.imageUrl || ''}
                    onChange={(e) => setEditingNotif({ ...editingNotif, imageUrl: e.target.value })}
                    className="flex-1 px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                  <label className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 cursor-pointer flex items-center gap-1.5 shrink-0 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {editingNotif.imageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-slate-700 max-h-32 bg-black flex items-center justify-center">
                    <img
                      src={editingNotif.imageUrl}
                      alt="Banner Preview"
                      className="max-h-32 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Action Button Link (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Action Button Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Contact Us, View Solutions"
                    value={editingNotif.ctaText || ''}
                    onChange={(e) => setEditingNotif({ ...editingNotif, ctaText: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Button Link / Page Target</label>
                  <input
                    type="text"
                    placeholder="e.g. #contact, /services, or URL"
                    value={editingNotif.ctaLink || ''}
                    onChange={(e) => setEditingNotif({ ...editingNotif, ctaLink: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Expiry Date (Optional) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Expiry Date (Optional)
                  </label>
                  {editingNotif.endDate && (
                    <button
                      type="button"
                      onClick={() => setEditingNotif({ ...editingNotif, endDate: '' })}
                      className="text-[10px] text-slate-400 hover:text-red-300"
                    >
                      Clear Expiry (Keep Permanent)
                    </button>
                  )}
                </div>
                <input
                  type="date"
                  value={editingNotif.endDate ? editingNotif.endDate.slice(0, 10) : ''}
                  onChange={(e) => setEditingNotif({ ...editingNotif, endDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500"
                />
                <p className="text-[11px] text-slate-500">
                  Leave blank if you want the announcement to stay active indefinitely until manually deactivated.
                </p>
              </div>

              {/* Form Submission Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 transition flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {editingNotif.isActive ? 'Save & Push Live Now' : 'Save as Draft'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Delete Announcement?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to permanently delete this announcement? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteNotification(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Live Popup Preview Modal */}
      {previewNotif && (
        <AnnouncementPopup
          previewData={previewNotif}
          onClosePreview={() => setPreviewNotif(null)}
        />
      )}
    </div>
  );
};

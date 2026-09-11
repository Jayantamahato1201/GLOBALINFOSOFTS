import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  ShieldAlert,
  Phone,
  Mail,
  Building,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Database,
  RefreshCw,
  Download,
  Upload,
  Server,
  Cloud,
  Check,
  Copy
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsSiteSettings } from '../cmsTypes';

interface DatabaseStatus {
  configured: boolean;
  connected: boolean;
  databaseName: string;
  storageType: string;
  serverUptime?: number;
  error?: string | null;
  suggestion?: string | null;
  lastCheckedAt?: string;
}

export const SiteSettingsManager: React.FC = () => {
  const { apiFetch, showToast, canPublish } = useAdminAuth();
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [isRestoringDb, setIsRestoringDb] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [settings, setSettings] = useState<CmsSiteSettings>({
    companyName: 'Global InfoSoft',
    tagline: '',
    subTagline: '',
    logoUrl: '/logo.png',
    faviconUrl: '/logo.png',
    phone: '',
    altPhone: '',
    salesPhone: '',
    contactEmail: '',
    supportEmail: '',
    officialEmail: '',
    headOfficeAddress: '',
    supportHours: '',
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing scheduled maintenance.',
    allowPublicSignup: true,
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      github: '',
      youtube: ''
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadDbStatus = async () => {
    try {
      const status = await apiFetch('/api/database/status');
      if (status) setDbStatus(status);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await apiFetch('/api/settings');
        if (data) setSettings(data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
    loadDbStatus();
  }, [apiFetch]);

  const handleSyncDatabase = async () => {
    setIsSyncingDb(true);
    try {
      const res = await apiFetch('/api/database/sync', { method: 'POST' });
      showToast(res.message || 'Database synchronized successfully!');
      if (res.status) setDbStatus(res.status);
    } catch (err: any) {
      showToast(err.message || 'Database synchronization failed', 'error');
    } finally {
      setIsSyncingDb(false);
    }
  };

  const handleDownloadBackup = async () => {
    try {
      const token = localStorage.getItem('gi_admin_token') || localStorage.getItem('gis_admin_token') || sessionStorage.getItem('gis_admin_token');
      const res = await fetch('/api/database/backup', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error('Backup download failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `globalinfosoft_cms_backup_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showToast('Database backup downloaded successfully!');
    } catch (err: any) {
      showToast(err.message || 'Failed to download backup', 'error');
    }
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsRestoringDb(true);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed.users || !parsed.pages) {
        throw new Error('Invalid backup file. Missing required users or pages data.');
      }
      const res = await apiFetch('/api/database/restore', {
        method: 'POST',
        body: JSON.stringify({ data: parsed })
      });
      showToast(res.message || 'Database restored successfully! Reloading...');
      window.dispatchEvent(new Event('cms-data-updated'));
      setTimeout(() => window.location.reload(), 1200);
    } catch (err: any) {
      showToast(err.message || 'Failed to restore backup.', 'error');
    } finally {
      setIsRestoringDb(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await apiFetch('/api/settings', {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      setSettings(updated);
      showToast('Global website settings and emergency triggers saved successfully!');
      window.dispatchEvent(new Event('cms-data-updated'));
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-400" />
            Global Site Configuration & Maintenance Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure enterprise brand metadata, direct telephone hotlines, helpdesk hours, and emergency maintenance mode.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Maintenance Mode Emergency Alert Banner Card */}
        <div
          className={`p-5 rounded-2xl border transition ${
            settings.maintenanceMode
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
              : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-xl ${
                  settings.maintenanceMode
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Emergency Maintenance Mode</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  When toggled ON, the public website displays a live maintenance notification banner.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                checked={!!settings.maintenanceMode}
                onChange={(e) =>
                  setSettings({ ...settings, maintenanceMode: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {settings.maintenanceMode && (
            <div className="mt-4 pt-3 border-t border-amber-500/20">
              <label className="block text-amber-300 font-medium mb-1">
                Maintenance Notice Broadcast Message
              </label>
              <input
                type="text"
                value={settings.maintenanceMessage || ''}
                onChange={(e) =>
                  setSettings({ ...settings, maintenanceMessage: e.target.value })
                }
                placeholder="Scheduled updates underway. Normal service resumes shortly."
                className="w-full px-3 py-2 bg-slate-950 border border-amber-500/40 rounded-lg text-white"
              />
            </div>
          )}
        </div>

        {/* Brand & Corporate Metadata */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Brand Identity & Core Slogans
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Company Name</label>
              <input
                type="text"
                required
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Official Brand Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-medium">Sub-Tagline / Capability Summary</label>
              <textarea
                rows={2}
                value={settings.subTagline}
                onChange={(e) => setSettings({ ...settings, subTagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Logo Asset Path / URL</label>
              <input
                type="text"
                value={settings.logoUrl}
                onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Favicon URL</label>
              <input
                type="text"
                value={settings.faviconUrl}
                onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Corporate Communication & Hotline Directory */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            Telephone Hotlines & Customer Support
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Primary Office Phone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Support & Emergency Line</label>
              <input
                type="text"
                value={settings.altPhone}
                onChange={(e) => setSettings({ ...settings, altPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Sales Hotline</label>
              <input
                type="text"
                value={settings.salesPhone}
                onChange={(e) => setSettings({ ...settings, salesPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">General Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Technical Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Official Executive Email</label>
              <input
                type="email"
                value={settings.officialEmail}
                onChange={(e) => setSettings({ ...settings, officialEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-medium">Head Office Address</label>
              <input
                type="text"
                value={settings.headOfficeAddress}
                onChange={(e) => setSettings({ ...settings, headOfficeAddress: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Support Operating Schedule</label>
              <input
                type="text"
                value={settings.supportHours}
                onChange={(e) => setSettings({ ...settings, supportHours: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* DATABASE & PERMANENT CLOUD STORAGE (MONGODB ATLAS) */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                Permanent Cloud Database Integration (MongoDB Atlas)
              </h3>
              <p className="text-slate-400 mt-0.5 text-[11px]">
                Ensures admin passwords, blog posts, careers, and settings are saved permanently across page refreshes, different devices, and Vercel serverless instances.
              </p>
            </div>

            {/* Live Connection Badge */}
            <div className="flex items-center gap-2">
              {dbStatus?.connected ? (
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px] flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  MongoDB Atlas Connected (Permanent Cloud Storage)
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-[11px] flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Local File Storage Mode (Active & Safe)
                </span>
              )}
            </div>
          </div>

          {/* Error & Configuration Diagnostic Banner */}
          {dbStatus?.error && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs space-y-2">
              <div className="font-semibold flex items-center gap-2 text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cloud Database Connection Note: {dbStatus.error}</span>
              </div>
              {dbStatus.suggestion && (
                <p className="text-[11px] text-amber-100/90 leading-relaxed pl-6">
                  💡 <strong>How to resolve:</strong> {dbStatus.suggestion}
                </p>
              )}
              <p className="text-[11px] text-slate-400 pl-6">
                Your website is fully operating in local persistent storage (<code className="text-slate-300">data/cms_data.json</code>). All page edits, blogs, events, and notifications are saved safely.
              </p>
            </div>
          )}

          {/* Database Details & Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                <span>Active Storage Target</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                {dbStatus?.storageType || 'Local Server JSON Database'}
              </p>
              {dbStatus?.databaseName && (
                <div className="text-[10px] text-slate-500 font-mono">
                  Database: {dbStatus.databaseName}
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
                <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                <span>Live Cloud Sync</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Forces synchronization between local memory and MongoDB Atlas cloud collection.
              </p>
              <button
                type="button"
                onClick={handleSyncDatabase}
                disabled={isSyncingDb}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncingDb ? 'animate-spin' : ''}`} />
                <span>{isSyncingDb ? 'Syncing...' : 'Sync with Cloud Database'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>One-Click Backup & Restore</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Export complete database or restore anytime.
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] flex items-center gap-1 transition border border-slate-700"
                >
                  <Download className="w-3 h-3 text-purple-400" />
                  <span>Download Backup</span>
                </button>

                <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] flex items-center gap-1 transition border border-slate-700 cursor-pointer">
                  <Upload className="w-3 h-3 text-cyan-400" />
                  <span>{isRestoringDb ? 'Restoring...' : 'Restore'}</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleRestoreBackup}
                    disabled={isRestoringDb}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Vercel & Cloud Setup Guidance */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Cloud className="w-3.5 h-3.5 text-cyan-400" />
                How to activate MongoDB Atlas for Vercel / Cloud deployment:
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/globalinfosoft?retryWrites=true&w=majority"');
                  setCopiedEnv(true);
                  setTimeout(() => setCopiedEnv(false), 2000);
                }}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                {copiedEnv ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Env Variable</span>
                  </>
                )}
              </button>
            </div>
            <ol className="list-decimal list-inside text-[11px] text-slate-400 space-y-1.5 pl-1">
              <li>Create a free cluster on <strong className="text-slate-300">mongodb.com/atlas</strong> (takes 60 seconds).</li>
              <li>
                <strong className="text-amber-300">Crucial Network Access:</strong> In Atlas left menu, go to <strong className="text-slate-200">Security ➔ Network Access</strong> ➔ click <strong className="text-slate-200">Add IP Address</strong> ➔ choose <strong className="text-cyan-300">Allow Access from Anywhere (0.0.0.0/0)</strong>. This prevents SSL Alert 80 blocks when connecting from cloud hosting.
              </li>
              <li>In your settings or hosting environment variables, add <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">MONGODB_URI</code> with your connection string.</li>
              <li>Once added, click <strong className="text-indigo-400">"Sync with Cloud Database"</strong> above to synchronize all pages, blogs, and settings permanently!</li>
            </ol>
          </div>
        </div>

        {/* Action Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-purple-950/40 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Synchronizing Settings...' : 'Save Site Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

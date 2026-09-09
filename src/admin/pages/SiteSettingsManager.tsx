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
  Globe
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsSiteSettings } from '../cmsTypes';

export const SiteSettingsManager: React.FC = () => {
  const { apiFetch, showToast, canPublish } = useAdminAuth();
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
  }, [apiFetch]);

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

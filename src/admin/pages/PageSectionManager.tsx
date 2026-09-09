import React, { useState, useEffect } from 'react';
import {
  Globe,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Edit3,
  Save,
  CheckCircle2,
  RefreshCw,
  History,
  RotateCcw,
  Sliders,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileText,
  Search,
  Check,
  X,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsPage, CmsSection, CmsRevision } from '../cmsTypes';

export const PageSectionManager: React.FC = () => {
  const { apiFetch, showToast, canPublish } = useAdminAuth();
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string>('page-home');
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pageSearchQuery, setPageSearchQuery] = useState('');

  // Confirmation Modal state for toggling page visibility
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    page: CmsPage | null;
    targetStatus: boolean;
  }>({
    isOpen: false,
    page: null,
    targetStatus: false
  });

  // Editing state for Page SEO
  const [pageSeo, setPageSeo] = useState<{
    name: string;
    route: string;
    enabled: boolean;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    canonicalUrl: string;
  }>({
    name: '',
    route: '',
    enabled: true,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonicalUrl: ''
  });

  // Section editor modal / state
  const [editingSection, setEditingSection] = useState<CmsSection | null>(null);
  const [revisions, setRevisions] = useState<CmsRevision[]>([]);
  const [showRevisions, setShowRevisions] = useState(false);
  const [previewSectionId, setPreviewSectionId] = useState<string | null>(null);

  // Fetch all pages
  const loadPages = async () => {
    try {
      const data = await apiFetch('/api/pages');
      setPages(data || []);
      if (data && data.length > 0 && !selectedPageId) {
        setSelectedPageId(data[0].id);
      }
    } catch (err) {
      console.error('Failed to load pages:', err);
    }
  };

  // Fetch sections for current page
  const loadSections = async (pageRoute: string) => {
    try {
      const data = await apiFetch(`/api/sections?pageId=${pageRoute}`);
      setSections(data || []);
    } catch (err) {
      console.error('Failed to load sections:', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await loadPages();
      setIsLoading(false);
    };
    init();
  }, []);

  const currentPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  useEffect(() => {
    if (currentPage) {
      setPageSeo({
        name: currentPage.name || '',
        route: currentPage.route || '',
        enabled: currentPage.enabled ?? true,
        seoTitle: currentPage.seoTitle || '',
        seoDescription: currentPage.seoDescription || '',
        seoKeywords: currentPage.seoKeywords || '',
        ogTitle: currentPage.ogTitle || '',
        ogDescription: currentPage.ogDescription || '',
        ogImage: currentPage.ogImage || '',
        canonicalUrl: currentPage.canonicalUrl || ''
      });
      loadSections(currentPage.route);
      loadRevisions(currentPage.id);
    }
  }, [selectedPageId, currentPage?.id]);

  const loadRevisions = async (pageId: string) => {
    try {
      const revs = await apiFetch(`/api/revisions/page/${pageId}`);
      setRevisions(revs || []);
    } catch (err) {
      console.error('Failed to load revisions:', err);
    }
  };

  // Prompt confirmation modal before changing visibility
  const requestTogglePageVisibility = (page: CmsPage) => {
    setConfirmModal({
      isOpen: true,
      page,
      targetStatus: !page.enabled
    });
  };

  const handleConfirmPageVisibility = async () => {
    if (!confirmModal.page) return;
    const { page, targetStatus } = confirmModal;
    try {
      const updated = await apiFetch(`/api/pages/${page.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ enabled: targetStatus })
      });
      setPages((prev) => prev.map((p) => (p.id === page.id ? updated : p)));
      showToast(
        `Page "${page.name}" is now ${targetStatus ? 'LIVE' : 'HIDDEN'}.`
      );
      // Dispatch event so public website updates instantly
      window.dispatchEvent(new Event('cms-data-updated'));
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setConfirmModal({ isOpen: false, page: null, targetStatus: false });
    }
  };

  const handleSavePageSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPage) return;
    setIsSaving(true);
    try {
      const updated = await apiFetch(`/api/pages/${currentPage.id}`, {
        method: 'PATCH',
        body: JSON.stringify(pageSeo)
      });
      setPages((prev) => prev.map((p) => (p.id === currentPage.id ? updated : p)));
      showToast(`SEO settings for "${pageSeo.name}" saved successfully.`);
      loadRevisions(currentPage.id);
      window.dispatchEvent(new Event('cms-data-updated'));
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleSection = async (sec: CmsSection) => {
    try {
      const updated = await apiFetch(`/api/sections/${sec.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ enabled: !sec.enabled })
      });
      setSections((prev) => prev.map((s) => (s.id === sec.id ? updated : s)));
      showToast(`Section "${sec.title}" set to ${!sec.enabled ? 'LIVE' : 'HIDDEN'}.`);
      window.dispatchEvent(new Event('cms-data-updated'));
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleMoveSection = async (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= sections.length) return;

    const list = [...sections];
    const [moved] = list.splice(index, 1);
    list.splice(newIdx, 0, moved);

    setSections(list);

    try {
      const orderedIds = list.map((s) => s.id);
      await apiFetch('/api/sections/reorder', {
        method: 'POST',
        body: JSON.stringify({ orderedIds })
      });
      showToast('Section order saved to database.');
      window.dispatchEvent(new Event('cms-data-updated'));
    } catch (err: any) {
      showToast(err.message, 'error');
      if (currentPage) loadSections(currentPage.route);
    }
  };

  const handleSaveSectionContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    setIsSaving(true);
    try {
      const updated = await apiFetch(`/api/sections/${editingSection.id}`, {
        method: 'PATCH',
        body: JSON.stringify(editingSection)
      });
      setSections((prev) => prev.map((s) => (s.id === editingSection.id ? updated : s)));
      showToast(`Section "${editingSection.title}" content published.`);
      setEditingSection(null);
      window.dispatchEvent(new Event('cms-data-updated'));
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestoreRevision = async (revId: string) => {
    try {
      await apiFetch(`/api/revisions/${revId}/restore`, { method: 'POST' });
      showToast('Previous version restored successfully!');
      loadPages();
      setShowRevisions(false);
      window.dispatchEvent(new Event('cms-data-updated'));
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const filteredPages = pages.filter(
    (p) =>
      p.name.toLowerCase().includes(pageSearchQuery.toLowerCase()) ||
      p.route.toLowerCase().includes(pageSearchQuery.toLowerCase())
  );

  const livePagesCount = pages.filter((p) => p.enabled !== false).length;
  const hiddenPagesCount = pages.length - livePagesCount;

  return (
    <div className="space-y-8">
      {/* 1. Page Visibility Manager Top Banner & Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        {/* Banner Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider">
                Admin Panel • Website • Pages
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5 mt-1 font-['Sora']">
              <Globe className="w-6 h-6 text-cyan-400" />
              Page Visibility Manager
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Control public access to every website route. When set to <strong className="text-amber-400">HIDDEN</strong>, navigation links and footer references are automatically removed, and direct visitors see a professional unavailable notice without losing any content.
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-['JetBrains_Mono'] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{livePagesCount} LIVE</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs font-['JetBrains_Mono'] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{hiddenPagesCount} HIDDEN</span>
            </div>
            <button
              onClick={loadPages}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-700 transition"
              title="Refresh pages list"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-5 py-3 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={pageSearchQuery}
              onChange={(e) => setPageSearchQuery(e.target.value)}
              placeholder="Search pages by name or /route..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Total Pages Configured: {pages.length}
          </span>
        </div>

        {/* Visibility Table matching prompt requirements */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-['JetBrains_Mono'] uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Page Name</th>
                <th className="py-3.5 px-4 font-semibold">Route Path</th>
                <th className="py-3.5 px-4 font-semibold">Visibility Status</th>
                <th className="py-3.5 px-4 font-semibold">Visibility Action</th>
                <th className="py-3.5 px-4 font-semibold text-right">Page Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredPages.map((page) => {
                const isLive = page.enabled !== false;
                const isCurrent = page.id === selectedPageId;
                return (
                  <tr
                    key={page.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isCurrent ? 'bg-cyan-950/15' : ''
                    }`}
                  >
                    {/* Page Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                            isLive
                              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {page.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span>{page.name}</span>
                            {page.route === '' && (
                              <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-800 text-slate-400">
                                Default Landing
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono">
                            ID: {page.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Route */}
                    <td className="py-3.5 px-4 font-['JetBrains_Mono']">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                        /{page.route}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {isLive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[11px] font-['JetBrains_Mono'] font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>● LIVE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 text-[11px] font-['JetBrains_Mono'] font-bold">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>○ HIDDEN</span>
                        </span>
                      )}
                    </td>

                    {/* Visibility Toggle Switch */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => requestTogglePageVisibility(page)}
                        className={`relative inline-flex h-7 w-28 items-center rounded-full p-1 transition-colors cursor-pointer select-none font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wider ${
                          isLive
                            ? 'bg-emerald-600/90 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                        title={isLive ? 'Click to hide page' : 'Click to make live'}
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white transition-transform shadow-md ${
                            isLive ? 'translate-x-20' : 'translate-x-0'
                          }`}
                        />
                        <span
                          className={`absolute text-center w-full px-2 pointer-events-none transition-opacity ${
                            isLive ? 'text-left pl-3 text-white' : 'text-right pr-3 text-slate-300'
                          }`}
                        >
                          {isLive ? 'LIVE' : 'HIDDEN'}
                        </span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedPageId(page.id);
                            const el = document.getElementById('section-editor-view');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                            isCurrent
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                          }`}
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Sections</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedPageId(page.id);
                            const el = document.getElementById('seo-meta-editor');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-semibold transition cursor-pointer"
                          title="Edit SEO & Meta details"
                        >
                          SEO
                        </button>

                        <a
                          href={page.route ? `#${page.route}` : '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-cyan-400 transition"
                          title="Open live URL in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Section Ordering & Content Manager */}
      <div id="section-editor-view" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-['Sora']">
                Sections in "{currentPage?.name}"
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Reorder section sequence or toggle visibility of individual modular blocks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Switch Page:</span>
            <select
              value={selectedPageId}
              onChange={(e) => setSelectedPageId(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-cyan-500"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.enabled !== false ? 'LIVE' : 'HIDDEN'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Page Content & Section Layout Controls */}
        {currentPage && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Sections reordering & toggling */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Modular Page Blocks</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono">
                        {sections.length} Available
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Use the Up / Down arrows to adjust rendering hierarchy.
                    </p>
                  </div>
                  <button
                    onClick={() => loadSections(currentPage.route)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
                    title="Refresh sections"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {sections.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
                    <p className="font-semibold text-slate-300">Unified Page Component</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      This page operates as a unified functional component view (e.g. Careers listings, Contact portal, Tech Support console, or dynamic Blogs index). Content items are managed in their dedicated CMS modules.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {sections.map((sec, idx) => (
                      <div
                        key={sec.id}
                        className={`p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
                          sec.enabled
                            ? 'bg-slate-950/70 border-slate-800 text-slate-200'
                            : 'bg-slate-950/30 border-slate-850 text-slate-500 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-white truncate">{sec.title}</p>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                {sec.sectionKey}
                              </span>
                            </div>
                            {sec.subtitle && (
                              <p className="text-xs text-slate-400 truncate mt-0.5">{sec.subtitle}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {/* Section editor button */}
                          <button
                            onClick={() => setEditingSection(sec)}
                            title="Edit section content"
                            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Visibility toggle button */}
                          <button
                            onClick={() => handleToggleSection(sec)}
                            title={sec.enabled ? 'Hide section' : 'Show section'}
                            className={`p-1.5 rounded-lg transition ${
                              sec.enabled
                                ? 'text-emerald-400 hover:bg-emerald-950/40'
                                : 'text-slate-500 hover:bg-slate-800'
                            }`}
                          >
                            {sec.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>

                          {/* Move Up */}
                          <button
                            disabled={idx === 0}
                            onClick={() => handleMoveSection(idx, 'up')}
                            title="Move section up"
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition disabled:opacity-20 cursor-pointer"
                          >
                            <MoveUp className="w-4 h-4" />
                          </button>

                          {/* Move Down */}
                          <button
                            disabled={idx === sections.length - 1}
                            onClick={() => handleMoveSection(idx, 'down')}
                            title="Move section down"
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition disabled:opacity-20 cursor-pointer"
                          >
                            <MoveDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Revision History Viewer */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <History className="w-4 h-4 text-cyan-400" />
                    Version History & Snapshots
                  </h4>
                  <button
                    onClick={() => setShowRevisions(!showRevisions)}
                    className="text-xs text-cyan-400 hover:underline cursor-pointer font-medium"
                  >
                    {showRevisions ? 'Hide Revisions' : `View Revisions (${revisions.length})`}
                  </button>
                </div>

                {showRevisions && (
                  <div className="space-y-2 mt-3 pt-3 border-t border-slate-800">
                    {revisions.length === 0 ? (
                      <p className="text-xs text-slate-500">No revisions recorded for this page yet.</p>
                    ) : (
                      revisions.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-semibold text-slate-200">
                              v{rev.versionNumber} • {rev.summary}
                            </p>
                            <p className="text-slate-500 text-[11px]">
                              Modified by {rev.updatedBy} on {new Date(rev.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRestoreRevision(rev.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 transition cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                            Restore
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Page Settings & Meta SEO */}
            <div id="seo-meta-editor" className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white">Page SEO & Meta Tags</h4>
                  <button
                    type="button"
                    onClick={() => requestTogglePageVisibility(currentPage)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      currentPage.enabled !== false
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentPage.enabled !== false ? 'bg-emerald-400' : 'bg-amber-500'
                      }`}
                    />
                    {currentPage.enabled !== false ? 'LIVE' : 'HIDDEN'}
                  </button>
                </div>

                <form onSubmit={handleSavePageSeo} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Page Title</label>
                    <input
                      type="text"
                      value={pageSeo.name}
                      onChange={(e) => setPageSeo({ ...pageSeo, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Route Path</label>
                    <input
                      type="text"
                      disabled
                      value={`/${pageSeo.route}`}
                      className="w-full px-3 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-500 cursor-not-allowed font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">SEO Meta Title (&lt;title&gt;)</label>
                    <input
                      type="text"
                      value={pageSeo.seoTitle}
                      onChange={(e) => setPageSeo({ ...pageSeo, seoTitle: e.target.value })}
                      placeholder="Page Title | Global InfoSoft"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Meta Description</label>
                    <textarea
                      rows={3}
                      value={pageSeo.seoDescription}
                      onChange={(e) => setPageSeo({ ...pageSeo, seoDescription: e.target.value })}
                      placeholder="Brief description for Google search engines..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Target SEO Keywords</label>
                    <input
                      type="text"
                      value={pageSeo.seoKeywords}
                      onChange={(e) => setPageSeo({ ...pageSeo, seoKeywords: e.target.value })}
                      placeholder="software development, ERP, retail pos"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">OpenGraph Social Banner Image</label>
                    <input
                      type="text"
                      value={pageSeo.ogImage}
                      onChange={(e) => setPageSeo({ ...pageSeo, ogImage: e.target.value })}
                      placeholder="https://... /og-image.jpg"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full mt-4 py-2.5 rounded-xl btn-primary text-slate-950 font-bold flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-lg active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Updating SEO...' : 'Save SEO Configuration'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Confirmation Modal for Page Visibility Toggle */}
      {confirmModal.isOpen && confirmModal.page && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  !confirmModal.targetStatus
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {!confirmModal.targetStatus ? (
                  <EyeOff className="w-6 h-6" />
                ) : (
                  <CheckCircle2 className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="font-['Sora'] text-lg font-bold text-white">
                  {!confirmModal.targetStatus
                    ? `Hide this page?`
                    : `Publish ${confirmModal.page.name} page?`}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Target Route: /{confirmModal.page.route}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {!confirmModal.targetStatus
                ? `Are you sure you want to hide the ${confirmModal.page.name} page? The page will no longer be visible to public visitors, but all existing content will remain safely stored.`
                : `Are you sure you want to make the ${confirmModal.page.name} page live? It will become visible in the navigation and accessible to public visitors.`}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmModal({ isOpen: false, page: null, targetStatus: false })}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmPageVisibility}
                className={`px-5 py-2 rounded-xl font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-lg active:scale-95 ${
                  !confirmModal.targetStatus
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                {!confirmModal.targetStatus ? 'Hide Page' : 'Make Live'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Section Content Modal Editor */}
      {editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-['JetBrains_Mono'] font-bold uppercase text-cyan-400">
                  Section Content Editor
                </span>
                <h3 className="text-base font-bold text-white font-['Sora']">
                  {editingSection.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingSection(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSectionContent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Section Heading *</label>
                <input
                  type="text"
                  required
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Section Subtitle / Description</label>
                <textarea
                  rows={2}
                  value={editingSection.subtitle || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Special content fields for Hero Section */}
              {editingSection.content && (
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-cyan-400 font-['JetBrains_Mono']">
                    Extended Visual Properties
                  </p>
                  {editingSection.content.headline !== undefined && (
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Headline</label>
                      <input
                        type="text"
                        value={editingSection.content.headline}
                        onChange={(e) =>
                          setEditingSection({
                            ...editingSection,
                            content: { ...editingSection.content, headline: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                      />
                    </div>
                  )}
                  {editingSection.content.subheadline !== undefined && (
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Subheadline</label>
                      <textarea
                        rows={2}
                        value={editingSection.content.subheadline}
                        onChange={(e) =>
                          setEditingSection({
                            ...editingSection,
                            content: { ...editingSection.content, subheadline: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white resize-none"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {editingSection.content.primaryBtnText !== undefined && (
                      <div>
                        <label className="block text-slate-400 mb-1 font-medium">Primary Button</label>
                        <input
                          type="text"
                          value={editingSection.content.primaryBtnText}
                          onChange={(e) =>
                            setEditingSection({
                              ...editingSection,
                              content: { ...editingSection.content, primaryBtnText: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                        />
                      </div>
                    )}
                    {editingSection.content.secondaryBtnText !== undefined && (
                      <div>
                        <label className="block text-slate-400 mb-1 font-medium">Secondary Button</label>
                        <input
                          type="text"
                          value={editingSection.content.secondaryBtnText}
                          onChange={(e) =>
                            setEditingSection({
                              ...editingSection,
                              content: { ...editingSection.content, secondaryBtnText: e.target.value }
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 btn-primary text-slate-950 font-bold rounded-xl cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSaving ? 'Publishing...' : 'Publish Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

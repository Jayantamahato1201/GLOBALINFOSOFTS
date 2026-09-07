import React, { useState, useEffect, useRef } from 'react';
import {
  SERVICES_DATA,
  SOLUTIONS_DATA,
  CASE_STUDIES,
  BLOG_POSTS
} from '../data/companyData';
import { PageId } from '../types';
import {
  Search,
  X,
  Layers,
  Sparkles,
  Briefcase,
  FileText,
  DollarSign,
  HelpCircle,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (page: PageId, sectionOrId?: string) => void;
  onSelectService?: (serviceId: string) => void;
  onSelectSolution?: (solutionId: string) => void;
  onSelectProject?: (projectId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
  onSelectService,
  onSelectSolution,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Pages
  const pages: { id: PageId; title: string; desc: string; icon: any }[] = [
    { id: 'home', title: 'Home', desc: 'Main introduction & software services overview', icon: Compass },
    { id: 'services', title: 'Services Catalog', desc: 'Custom software, web design, mobile apps & GST billing', icon: Layers },
    { id: 'solutions', title: 'Software Solutions', desc: 'Retail POS, optical store, jewelry & accounting software', icon: Sparkles },
    { id: 'projects', title: 'Projects & Case Studies', desc: 'Software portfolio and client deployments in Jamshedpur', icon: Briefcase },
    { id: 'pricing', title: 'Pricing & Packages', desc: 'Transparent software pricing & price estimator', icon: DollarSign },
    { id: 'about', title: 'About Global InfoSoft', desc: 'Company overview, Jamshedpur head office & history', icon: Users },
    { id: 'team', title: 'Our Team', desc: 'Developers, web designers, and support staff', icon: Users },
    { id: 'support', title: 'Tech Support & FAQs', desc: 'Software support, AnyDesk remote help & FAQs', icon: HelpCircle },
    { id: 'blog', title: 'Tech Blog & Insights', desc: 'GST billing tips, software guides & articles', icon: FileText },
    { id: 'contact', title: 'Contact & Enquiry', desc: 'Contact details, phone, address & WhatsApp', icon: Compass }
  ];

  const matchedPages = pages.filter(
    (p) => !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
  );

  const matchedServices = SERVICES_DATA.filter(
    (s) =>
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.technologies.some((t) => t.toLowerCase().includes(q))
  );

  const matchedSolutions = SOLUTIONS_DATA.filter(
    (sol) =>
      !q ||
      sol.title.toLowerCase().includes(q) ||
      sol.industry.toLowerCase().includes(q) ||
      sol.shortDesc.toLowerCase().includes(q)
  );

  const matchedProjects = CASE_STUDIES.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.industry.toLowerCase().includes(q)
  );

  const matchedBlogs = BLOG_POSTS.filter(
    (b) => !q || b.title.toLowerCase().includes(q) || b.tags.some((t) => t.toLowerCase().includes(q))
  );

  const totalResults =
    (q ? matchedPages.length : 0) +
    matchedServices.length +
    matchedSolutions.length +
    matchedProjects.length +
    matchedBlogs.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 flex flex-col max-h-[78vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-3 sm:p-3.5 border-b border-slate-200 dark:border-white/10 flex items-center gap-2.5 bg-slate-50 dark:bg-slate-950/60">
          <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search software, services, solutions (e.g. POS, Web, Pricing)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white"
              aria-label="Clear query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-white/10">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-4 text-xs">
          {totalResults === 0 && q ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400">
              <p>No matching software or content found for "{query}".</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Try searching for "POS", "Billing", "Optical", "Web", or "Contact".</p>
            </div>
          ) : null}

          {/* Quick Pages */}
          {matchedPages.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-0.5">
                Website Navigation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {matchedPages.slice(0, q ? 6 : 4).map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onNavigatePage(p.id);
                        onClose();
                      }}
                      className="p-2 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 border border-slate-200/80 dark:border-white/5 hover:border-cyan-500/30 text-left flex items-center gap-2.5 transition-all group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-200 truncate">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {p.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Services */}
          {matchedServices.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 px-2 py-0.5 flex items-center justify-between">
                <span>Services ({matchedServices.length})</span>
                {!q && <span className="text-[9px] text-slate-500 dark:text-slate-400">Featured</span>}
              </div>
              {matchedServices.slice(0, q ? 5 : 3).map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    if (onSelectService) {
                      onSelectService(s.id);
                    } else {
                      onNavigatePage('services', s.id);
                    }
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 border border-slate-200/80 dark:border-white/5 hover:border-cyan-500/30 text-left flex items-center justify-between transition-all group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
                      {s.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {s.shortDesc}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Solutions */}
          {matchedSolutions.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 px-2 py-0.5 flex items-center justify-between">
                <span>Software Products & POS ({matchedSolutions.length})</span>
              </div>
              {matchedSolutions.slice(0, q ? 5 : 3).map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => {
                    if (onSelectSolution) {
                      onSelectSolution(sol.id);
                    } else {
                      onNavigatePage('solutions', sol.id);
                    }
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 border border-slate-200/80 dark:border-white/5 hover:border-emerald-500/30 text-left flex items-center justify-between transition-all group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 flex items-center gap-1.5">
                      <span>{sol.title}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        {sol.industry}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {sol.shortDesc}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Client Projects */}
          {matchedProjects.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300 px-2 py-0.5">
                Client Projects & Deployments
              </div>
              {matchedProjects.slice(0, q ? 3 : 2).map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    if (onSelectProject) {
                      onSelectProject(proj.id);
                    } else {
                      onNavigatePage('projects', proj.id);
                    }
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] hover:bg-sky-500/10 dark:hover:bg-sky-500/15 border border-slate-200/80 dark:border-white/5 hover:border-sky-500/30 text-left flex items-center justify-between transition-all group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-300">
                      {proj.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {proj.client} • {proj.industry}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Blog Articles */}
          {matchedBlogs.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400 px-2 py-0.5">
                Blog Articles & Guides
              </div>
              {matchedBlogs.slice(0, q ? 3 : 2).map((blog) => (
                <button
                  key={blog.id}
                  onClick={() => {
                    onNavigatePage('blog', blog.slug);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] hover:bg-rose-500/10 dark:hover:bg-rose-500/15 border border-slate-200/80 dark:border-white/5 hover:border-rose-500/30 text-left flex items-center justify-between transition-all group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                      {blog.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {blog.category} • {blog.readTime}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-500 px-4">
          <span className="font-medium">Quick search across Global InfoSoft resources</span>
          <span className="font-mono text-slate-400">Esc to close</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ExternalLink, FileText, Briefcase, Code, Boxes, Users, Image, Globe, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';

interface SearchResult {
  type: string;
  id: string;
  title: string;
  subtitle: string;
  url?: string;
}

export const GlobalSearchDialog: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, apiFetch, setActiveTab } = useAdminAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await apiFetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        setResults(data || []);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, apiFetch]);

  if (!isSearchOpen) return null;

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Page': return <Globe className="w-4 h-4 text-blue-400" />;
      case 'Blog': return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'Career Opening': return <Briefcase className="w-4 h-4 text-amber-400" />;
      case 'Service': return <Code className="w-4 h-4 text-purple-400" />;
      case 'Solution': return <Boxes className="w-4 h-4 text-cyan-400" />;
      case 'Project': return <ExternalLink className="w-4 h-4 text-indigo-400" />;
      case 'Team Member': return <Users className="w-4 h-4 text-pink-400" />;
      case 'Media': return <Image className="w-4 h-4 text-teal-400" />;
      default: return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleSelectResult = (item: SearchResult) => {
    setIsSearchOpen(false);
    if (item.type === 'Page') setActiveTab('pages');
    else if (item.type === 'Blog') setActiveTab('blogs');
    else if (item.type === 'Career Opening') setActiveTab('careers');
    else if (item.type === 'Service') setActiveTab('services');
    else if (item.type === 'Solution') setActiveTab('solutions');
    else if (item.type === 'Project') setActiveTab('projects');
    else if (item.type === 'Team Member') setActiveTab('team');
    else if (item.type === 'Media') setActiveTab('media');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, blogs, jobs, services, projects, media..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 text-sm focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 text-xs px-2 py-1 rounded bg-slate-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-800/50">
          {isSearching ? (
            <div className="p-8 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-600 border-t-cyan-400 rounded-full animate-spin" />
              Searching CMS records...
            </div>
          ) : query && results.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No matching records found for "{query}".
            </div>
          ) : !query ? (
            <div className="p-6 text-center text-slate-500 text-xs">
              <p className="font-medium text-slate-400 mb-1">Quick Navigation Shortcuts</p>
              <p>Type to search across any content module or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Esc</kbd> to dismiss.</p>
            </div>
          ) : (
            results.map((item) => (
              <button
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelectResult(item)}
                className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 flex-shrink-0">
                    {getIconForType(item.type)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      <span className="inline-block font-mono text-[10px] uppercase text-cyan-400/90 mr-2 bg-cyan-950/60 border border-cyan-800/40 px-1.5 py-0.2 rounded">
                        {item.type}
                      </span>
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition flex-shrink-0 ml-3" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-950/50 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search Global InfoSoft CMS</span>
          <div className="flex items-center gap-2">
            <span>Navigation: Click or Enter</span>
            <span>•</span>
            <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Esc</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

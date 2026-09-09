import React, { useState } from 'react';
import { X, Smartphone, Tablet, Monitor, ExternalLink, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';

export const PreviewModal: React.FC = () => {
  const { previewMode, setPreviewMode } = useAdminAuth();
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  if (!previewMode) return null;

  const getWidth = () => {
    switch (device) {
      case 'mobile': return 'max-w-[400px] h-[780px]';
      case 'tablet': return 'max-w-[768px] h-[850px]';
      case 'desktop': return 'w-full h-full';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Controller Bar */}
      <div className="h-14 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Website Live Preview
          </span>
          <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Real-time CMS Sync
          </span>
        </div>

        {/* Viewport Selectors */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition ${
              device === 'desktop' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`px-3 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition ${
              device === 'tablet' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            Tablet
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition ${
              device === 'mobile' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setKey((prev) => prev + 1)}
            title="Refresh Preview"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition flex items-center gap-1 text-xs"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => setPreviewMode(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/70">
        <div
          className={`transition-all duration-300 w-full rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-white ${getWidth()}`}
        >
          <iframe
            key={key}
            src="/"
            title="Global InfoSoft Public Preview"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
};

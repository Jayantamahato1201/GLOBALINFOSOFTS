import React, { useEffect } from 'react';
import { DetailModalData } from '../types';
import { X, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export interface DetailModalProps {
  data: DetailModalData | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (data) {
      window.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/65 backdrop-blur-[8px] animate-fadeIn transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] rounded-2xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-2xl text-slate-900 dark:text-white flex flex-col overflow-hidden transition-all duration-250 animate-scaleUp text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button at top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-slate-100/80 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Content Scrollable Container */}
        <div className="p-5 sm:p-7 md:p-8 overflow-y-auto max-h-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Image */}
            <div className="md:col-span-6 w-full">
              <div className="relative rounded-xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-100 dark:bg-slate-950 aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/11] shadow-sm group">
                <img
                  src={data.image}
                  alt={data.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Minimal Enterprise Info */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Badges / Category & Metadata */}
                <div className="flex items-center gap-2 flex-wrap pr-8">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                    {data.category}
                  </span>
                  {data.duration && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      {data.duration}
                    </span>
                  )}
                  {data.metadata && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {data.metadata}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2
                  id="detail-modal-title"
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit'] leading-snug"
                >
                  {data.title}
                </h2>

                {/* Short Description (2-3 lines) */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {data.description}
                </p>

                {/* Technology Stack Pills */}
                {data.technologies && data.technologies.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Technologies & Tools
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {data.technologies.slice(0, 6).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-mono font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {data.primaryActionLabel && (
                  <button
                    onClick={() => {
                      if (data.onPrimaryAction) {
                        data.onPrimaryAction();
                      }
                      onClose();
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                  >
                    <span>{data.primaryActionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {data.secondaryActionLabel && (
                  <button
                    onClick={() => {
                      if (data.onSecondaryAction) {
                        data.onSecondaryAction();
                      }
                      onClose();
                    }}
                    className="py-2.5 px-4 rounded-xl glass-card text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-300 border-slate-200 dark:border-white/10 hover:border-cyan-500/40 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{data.secondaryActionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

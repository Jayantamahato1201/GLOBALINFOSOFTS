import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DetailModalData } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import {
  X,
  ArrowRight,
  Phone,
  Clock,
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  Calculator,
  TrendingUp,
  Cpu,
  Layers,
  MessageSquare,
  Check
} from 'lucide-react';

export interface DetailModalProps {
  data: DetailModalData | null;
  onClose: () => void;
}

const getServiceIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Code2':
      return Code2;
    case 'Globe':
      return Globe;
    case 'Smartphone':
      return Smartphone;
    case 'Calculator':
      return Calculator;
    case 'TrendingUp':
      return TrendingUp;
    case 'Headphones':
      return Sparkles;
    case 'Cpu':
      return Cpu;
    case 'Layers':
      return Layers;
    default:
      return Sparkles;
  }
};

export const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  // ESC key handler and body overflow locking
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

  const IconComponent = getServiceIcon(data.iconName);
  const whatsappPrefill = `Hello Global InfoSoft, I would like to learn more and enquire about: ${data.title}`;
  const keyHighlights = (data.deliverables || data.features || data.benefits || []).slice(0, 4);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
      >
        {/* 1. Backdrop: Fading in with deep blur and subtle radial ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 dark:bg-black/85 backdrop-blur-md"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        {/* 2. Main Centered Responsive Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl md:max-w-2xl max-h-[82vh] rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200/90 dark:border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] text-slate-900 dark:text-white flex flex-col overflow-hidden z-10 text-left"
        >
          {/* Clean Floating Close Button in Top-Right */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-slate-900/70 hover:bg-slate-900 dark:bg-white/15 dark:hover:bg-white/25 backdrop-blur-xl border border-white/20 text-white transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 group cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-3.5 h-3.5 transition-transform group-hover:rotate-90 duration-200" />
          </button>

          {/* Top Section: Compact Header with Dark Gradient Overlay */}
          <div className="relative w-full h-28 sm:h-32 md:h-36 shrink-0 overflow-hidden bg-slate-950">
            <img
              src={data.image}
              alt={data.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-90 transition-transform duration-700 hover:scale-105"
            />
            {/* Dark gradient overlay so text is crisp */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d]/85 via-transparent to-transparent pointer-events-none" />

            {/* Header Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-4.5 flex flex-col justify-end text-left">
              {/* Badges Row */}
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 backdrop-blur-md shadow-sm">
                  <IconComponent className="w-3 h-3" />
                  <span>{data.category}</span>
                </span>
                {data.duration && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-slate-900/70 border border-white/10 backdrop-blur-md">
                    <Clock className="w-2.5 h-2.5 text-cyan-400" />
                    <span>{data.duration}</span>
                  </span>
                )}
                {data.metadata && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 backdrop-blur-md">
                    {data.metadata}
                  </span>
                )}
              </div>

              {/* Service Title */}
              <h2
                id="detail-modal-title"
                className="text-lg sm:text-xl md:text-2xl font-bold font-['Sora'] text-white tracking-tight leading-snug drop-shadow-md max-w-xl"
              >
                {data.title}
              </h2>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-4 custom-scrollbar">
            {/* Overview */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-3.5 rounded-full bg-cyan-500" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Overview
                </h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                {data.description || data.longDesc}
              </p>
            </div>

            {/* Key Highlights / Details (Refined 2-column or chips, not cluttered) */}
            {keyHighlights.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {keyHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <div className="w-4 h-4 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 flex items-center justify-center shrink-0 text-cyan-600 dark:text-cyan-400">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </div>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips (if available) */}
            {data.technologies && data.technologies.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-xs text-slate-400 font-medium">Stack:</span>
                {data.technologies.slice(0, 5).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Industry Website Style Action Footer */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Phone & Support Details */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <a
                  href={`tel:${COMPANY_INFO.primaryPhone}`}
                  className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>{COMPANY_INFO.primaryPhone}</span>
                </a>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="hidden sm:inline">{COMPANY_INFO.supportHours}</span>
              </div>

              {/* Real Industry Buttons */}
              <div className="flex items-center gap-2 justify-end">
                {data.secondaryActionLabel && (
                  <button
                    onClick={() => {
                      if (data.onSecondaryAction) {
                        data.onSecondaryAction();
                      }
                      onClose();
                    }}
                    className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {data.secondaryActionLabel}
                  </button>
                )}

                {/* WhatsApp Action */}
                <a
                  href={getWhatsAppUrl(COMPANY_INFO.salesPhone, whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                {/* Primary CTA */}
                {data.primaryActionLabel && (
                  <button
                    onClick={() => {
                      if (data.onPrimaryAction) {
                        data.onPrimaryAction();
                      }
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-semibold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>{data.primaryActionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { ArrowLeft, Lock, ShieldAlert, PhoneCall, Mail, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface PageUnavailableProps {
  pageName: string;
  onBackToHome: () => void;
}

export const PageUnavailable: React.FC<PageUnavailableProps> = ({ pageName, onBackToHome }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden bg-slate-50 dark:bg-[#07090E] transition-colors duration-300">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full text-center relative z-10 p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xl backdrop-blur-xl"
      >
        <div className="flex justify-center mb-6">
          <BrandLogo size={44} showGlow />
        </div>

        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-5">
          <Lock className="w-7 h-7" />
        </div>

        <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold block mb-2">
          Status: Unpublished
        </span>

        <h1 className="font-['Sora'] text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {pageName} Page Unavailable
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          The <strong>{pageName}</strong> section is currently hidden from public visitors by our administrators. All page content remains safely preserved and will return when republished.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto px-6 py-3 rounded-xl btn-primary text-white font-['JetBrains_Mono'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <a
            href={`mailto:${COMPANY_INFO.contactEmail}`}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 font-['JetBrains_Mono'] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Support</span>
          </a>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Head Office: Jamshedpur, Jharkhand</span>
          <button
            onClick={() => {
              window.location.hash = 'admin';
            }}
            className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>Administrator Access</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

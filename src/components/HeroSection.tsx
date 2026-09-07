import React from 'react';
import { motion } from 'motion/react';
import { Hero3DCanvas } from './3d/Hero3DCanvas';
import { Card3DTilt } from './3d/Card3DTilt';
import { COMPANY_INFO } from '../data/companyData';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEstimator,
  onOpenContact
}) => {
  return (
    <section id="hero" className="relative flex items-center justify-center pt-14 sm:pt-18 pb-8 sm:pb-12 overflow-hidden mesh-bg bg-tech-dots">
      {/* 3D WebGL Interactive Background Canvas */}
      <Hero3DCanvas className="opacity-95" />

      {/* Layered Multi-Color Ambient Glows */}
      <div className="absolute abstract-shape-cyan w-[500px] h-[500px] -top-24 -left-20 animate-pulse-glow pointer-events-none" />
      <div className="absolute abstract-shape-violet w-[550px] h-[550px] top-1/4 -right-28 animate-pulse-glow pointer-events-none" style={{ animationDelay: '-3s' }} />
      <div className="absolute abstract-shape-teal w-[420px] h-[420px] bottom-0 left-1/3 animate-pulse-glow pointer-events-none" style={{ animationDelay: '-6s' }} />

      {/* Subtle Radial Gradient Overlay that adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-body)]/50 via-transparent to-[var(--bg-body)] pointer-events-none transition-colors duration-300" />

      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
          {/* Live Status Pill with subtle motion entrance */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel shadow-sm border border-cyan-500/30 dark:border-cyan-400/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="text-[11px] font-bold text-cyan-800 dark:text-cyan-300 tracking-wide uppercase font-mono">
              Global InfoSoft • Jamshedpur
            </span>
            <span className="hidden sm:inline text-[11px] text-slate-500 dark:text-slate-400 font-medium">• Established 2014</span>
          </motion.div>

          {/* Main Display Headline with staggered entry */}
          <div className="space-y-2.5">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-[1.12]"
            >
              Architecting{' '}
              <span className="hero-accent-gradient drop-shadow-sm">
                Intelligent Software
              </span>{' '}
              & Modern Digital Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm lg:text-base font-normal max-w-3xl mx-auto leading-relaxed"
            >
              We design, engineer, and deploy tailor-made <strong className="text-slate-900 dark:text-white font-semibold">Custom Software & ERP Systems</strong>,{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">GST Billing & POS Solutions</strong>,{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Corporate Websites</strong>, and{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Mobile Apps</strong> from Jamshedpur to businesses nationwide.
            </motion.p>
          </div>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 pt-1 w-full sm:w-auto"
          >
            <button
              id="hero-btn-estimator"
              onClick={onOpenEstimator}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl btn-primary text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 active:scale-95 group shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span>Interactive Cost Estimator</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-btn-contact"
              onClick={onOpenContact}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl glass-panel text-slate-800 dark:text-white font-semibold text-xs sm:text-sm transition-all duration-250 shadow-sm flex items-center justify-center gap-2 active:scale-95 hover:border-cyan-500/60 hover:text-cyan-700 dark:hover:text-cyan-300"
            >
              <span>Schedule Free Consultation</span>
            </button>
          </motion.div>

          {/* Key Value Proof Badges with Distinct Colors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-y-2 gap-x-3.5 text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 pt-1"
          >
            <div className="flex items-center gap-1.5 glass-panel px-3 py-1 rounded-full border border-blue-200/80 dark:border-blue-500/20 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>100% Data Security & Ownership</span>
            </div>
            <div className="flex items-center gap-1.5 glass-panel px-3 py-1 rounded-full border border-violet-200/80 dark:border-violet-500/20 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              <span>6 Months Free Warranty & Support</span>
            </div>
            <div className="flex items-center gap-1.5 glass-panel px-3 py-1 rounded-full border border-emerald-200/80 dark:border-emerald-500/20 shadow-sm">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Guaranteed 24-Hour SLA Support</span>
            </div>
          </motion.div>
        </div>

        {/* 3D Floating Interactive Metrics Bento Grid with Colorful Accents */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 sm:mt-8"
        >
          {/* Bento Card 1: Cyan / Blue Gradient Accent */}
          <Card3DTilt intensity={10} className="p-3.5 sm:p-4 rounded-2xl glass-panel text-left group hover:border-cyan-500/60 dark:hover:border-cyan-400/70 transition-all shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              {COMPANY_INFO.yearsOfExperience}
            </div>
            <div className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mt-0.5">Established Excellence</div>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">Delivering software and IT services since 2014 in Jamshedpur.</p>
          </Card3DTilt>

          {/* Bento Card 2: Electric Blue / Indigo Accent */}
          <Card3DTilt intensity={10} className="p-3.5 sm:p-4 rounded-2xl glass-panel text-left group hover:border-blue-500/60 dark:hover:border-blue-400/70 transition-all shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            <div className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-['Outfit'] tracking-tight group-hover:scale-[1.02] transition-transform origin-left">
              {COMPANY_INFO.projectsCompleted}
            </div>
            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-0.5">Projects Delivered</div>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">From desktop POS billing to custom ERP and dynamic web portals.</p>
          </Card3DTilt>

          {/* Bento Card 3: Violet / Pink Accent */}
          <Card3DTilt intensity={10} className="p-3.5 sm:p-4 rounded-2xl glass-panel text-left group hover:border-pink-500/60 dark:hover:border-pink-400/70 transition-all shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors">
              {COMPANY_INFO.uptimeSla}
            </div>
            <div className="text-[11px] font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider mt-0.5">Reliability SLA</div>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">High-reliability desktop databases & secure cloud hosting.</p>
          </Card3DTilt>

          {/* Bento Card 4: Emerald / Teal Accent */}
          <Card3DTilt intensity={10} className="p-3.5 sm:p-4 rounded-2xl glass-panel text-left group hover:border-emerald-500/60 dark:hover:border-emerald-400/70 transition-all shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-['Outfit'] tracking-tight group-hover:scale-[1.02] transition-transform origin-left">
              {COMPANY_INFO.clientSatisfaction}
            </div>
            <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mt-0.5">Client Satisfaction</div>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">Trusted by 150+ retail stores, clinics, schools and enterprises.</p>
          </Card3DTilt>
        </motion.div>

        {/* Scroll down indicator */}
        <div className="flex justify-center mt-5">
          <a
            href="#services"
            className="flex flex-col items-center gap-0.5 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-[11px] font-mono group"
            aria-label="Scroll to services"
          >
            <span>EXPLORE SERVICES</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
          </a>
        </div>
      </div>
    </section>
  );
};


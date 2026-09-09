import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { DetailModalData } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import {
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  Play,
  Smartphone,
  Globe,
  Code2,
  Calculator,
  TrendingUp,
  Cpu,
  Database,
  Cloud,
  Server,
  Atom,
  Flame,
  Check,
  Lightbulb
} from 'lucide-react';

export interface DetailModalProps {
  data: DetailModalData | null;
  onClose: () => void;
}

const getCategoryIcon = (iconName?: string, category?: string) => {
  const norm = (iconName || category || '').toLowerCase();
  if (norm.includes('phone') || norm.includes('mobile') || norm.includes('app')) return Smartphone;
  if (norm.includes('web') || norm.includes('globe') || norm.includes('portal')) return Globe;
  if (norm.includes('code') || norm.includes('software') || norm.includes('erp')) return Code2;
  if (norm.includes('calc') || norm.includes('pos') || norm.includes('account')) return Calculator;
  if (norm.includes('trend') || norm.includes('market') || norm.includes('seo')) return TrendingUp;
  if (norm.includes('cpu') || norm.includes('hardware')) return Cpu;
  if (norm.includes('data') || norm.includes('sql')) return Database;
  return Layers;
};

// Tech brand icon/color mapper with adaptive light and dark theme styling
const getTechBadge = (tech: string) => {
  const lower = tech.toLowerCase();
  if (lower.includes('flutter')) {
    return {
      icon: Smartphone,
      color: 'text-cyan-600 dark:text-cyan-400',
      border: 'hover:border-cyan-500/50',
      label: tech
    };
  }
  if (lower.includes('react')) {
    return {
      icon: Atom,
      color: 'text-sky-600 dark:text-cyan-300',
      border: 'hover:border-sky-400/50',
      label: tech
    };
  }
  if (lower.includes('kotlin')) {
    return {
      icon: Code2,
      color: 'text-purple-600 dark:text-purple-400',
      border: 'hover:border-purple-400/50',
      label: tech
    };
  }
  if (lower.includes('java')) {
    return {
      icon: Code2,
      color: 'text-orange-600 dark:text-orange-400',
      border: 'hover:border-orange-400/50',
      label: tech
    };
  }
  if (lower.includes('firebase')) {
    return {
      icon: Flame,
      color: 'text-amber-600 dark:text-amber-400',
      border: 'hover:border-amber-400/50',
      label: tech
    };
  }
  if (lower.includes('rest') || lower.includes('api') || lower.includes('cloud')) {
    return {
      icon: Cloud,
      color: 'text-blue-600 dark:text-sky-400',
      border: 'hover:border-blue-400/50',
      label: tech
    };
  }
  if (lower.includes('sql') || lower.includes('database') || lower.includes('postgres')) {
    return {
      icon: Database,
      color: 'text-indigo-600 dark:text-blue-400',
      border: 'hover:border-indigo-400/50',
      label: tech
    };
  }
  return {
    icon: Server,
    color: 'text-slate-600 dark:text-slate-300',
    border: 'hover:border-slate-400/50',
    label: tech
  };
};

export const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Keyboard navigation & body scroll locking
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

  const CategoryIcon = getCategoryIcon(data.iconName, data.category);
  const whatsappPrefill = `Hello Global InfoSoft, I would like to consult with your team and enquire about: ${data.title}`;

  // Title formatting: highlight the last word with cyan/blue accent matching the reference image
  const words = data.title.trim().split(' ');
  const hasMultipleWords = words.length > 1;
  const mainTitlePart = hasMultipleWords ? words.slice(0, -1).join(' ') : data.title;
  const highlightWord = hasMultipleWords ? words[words.length - 1] : '';

  // Format category name cleanly
  const displayCategory =
    data.category.toLowerCase().includes('mobile')
      ? 'Mobile Solutions'
      : data.category.toLowerCase().includes('software') || data.category.toLowerCase().includes('erp')
      ? 'Enterprise Software'
      : data.category.toLowerCase().includes('web')
      ? 'Web Platforms'
      : data.category.toUpperCase();

  // Curate 6 crisp deliverables matching the reference image standard
  const rawDeliverables = data.deliverables || data.features || data.benefits || [];
  let deliverablesList: string[] = [];

  if (rawDeliverables.length >= 4) {
    deliverablesList = rawDeliverables.slice(0, 6);
  } else if (data.id === 'mobile-apps' || data.title.toLowerCase().includes('mobile')) {
    deliverablesList = [
      'Native Android (Kotlin / Java) App Development',
      'Cross-Platform (Flutter & React Native) Apps',
      'B2B Field Sales & Delivery Tracking Apps',
      'Customer Loyalty & Mobile Ordering Apps',
      'App Store Deployment & Support',
      'Performance Optimization & Maintenance'
    ];
  } else if (data.id === 'custom-software' || data.title.toLowerCase().includes('software')) {
    deliverablesList = [
      'Custom Windows Desktop Applications (.NET & C#)',
      'Enterprise Resource Planning (ERP) Core Modules',
      'High-Speed Barcode Scanning & POS Integration',
      'Multi-Branch Database Synchronization',
      'Automated Daily Cloud Backups & Encryption',
      'Role-Based Staff Access & Audit Logs'
    ];
  } else if (data.id === 'web-development' || data.title.toLowerCase().includes('web')) {
    deliverablesList = [
      'Responsive Corporate Web Design & Branding',
      'High-Conversion E-Commerce & Online Catalogs',
      'Custom Admin Portal & Content Management',
      'Search Engine Optimization (SEO) & Speed Tuning',
      'Multi-Language & Regional Currency Integration',
      'SSL Security & Cloud Server Configuration'
    ];
  } else {
    deliverablesList = [
      ...rawDeliverables,
      'Full Source Code & Architecture Handover',
      'Dedicated Post-Launch Warranty & Support',
      'Enterprise Cloud Scalability & Monitoring'
    ].slice(0, 6);
  }

  // Technologies list
  const techList =
    data.technologies && data.technologies.length > 0
      ? data.technologies
      : ['Flutter', 'React Native', 'Kotlin', 'Java', 'Firebase', 'REST APIs'];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
      >
        {/* 1. Backdrop: Ambient Glass with theme adaptive dark/light backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 dark:bg-black/65 backdrop-blur-xl transition-colors duration-200"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-600/15 dark:bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
        </motion.div>

        {/* 2. Main Modal Card Container (Adapts seamlessly between Light & Dark themes with frosted blur) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[95vw] max-w-[780px] max-h-[82vh] sm:max-h-[80vh] rounded-[20px] bg-white/95 dark:bg-[#070B14]/80 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_20px_60px_rgba(15,23,42,0.18),0_0_25px_rgba(0,163,255,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(0,163,255,0.12)] text-slate-900 dark:text-white flex flex-col overflow-hidden z-10 text-left font-['Outfit'] transition-colors duration-200"
        >
          {/* Specular Edge Sheen Highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/35 dark:via-cyan-400/40 to-transparent pointer-events-none z-30" />

          {/* Clean Floating Close Button in Top-Right */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-40 w-6.5 h-6.5 rounded-full flex items-center justify-center bg-slate-100/90 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-300/80 dark:bg-black/60 dark:hover:bg-black/90 dark:text-white/80 dark:hover:text-white dark:border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm group focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Close modal"
          >
            <X className="w-3 h-3 transition-transform group-hover:rotate-90 duration-200" />
          </button>

          {/* =========================================================================
              HERO HEADER SECTION: Compact Atmospheric Backdrop + Left Content + Right Device Mockup
              Theme-adaptive for both Light & Dark modes
              ========================================================================= */}
          <div className="relative w-full shrink-0 overflow-hidden bg-slate-50/90 dark:bg-[#070B14]/60 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 transition-colors duration-200">
            {/* Ambient Background Layer with Soft Depth & Blurred Desk Setup */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter opacity-15 dark:opacity-100 brightness-110 dark:brightness-[0.14] blur-sm scale-105 transition-all duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50/95 via-slate-50/85 to-slate-100/60 dark:from-[#070B14]/90 dark:via-[#070B14]/75 dark:to-[#070B14]/50 transition-colors duration-200" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/85 to-transparent dark:from-[#070B14]/90 dark:via-[#070B14]/80 dark:to-transparent transition-colors duration-200" />
              {/* Subtle Cyan glow behind phone mockup */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/15 dark:bg-cyan-500/12 rounded-full blur-[80px] pointer-events-none" />
            </div>

            {/* CSS Selector 1: Header content row - small, sleek, compact, fully theme-adaptive */}
            <div className="relative z-10 px-4 sm:px-5 pt-3 pb-2.5 sm:pt-3.5 sm:pb-3 flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-4">
              {/* Left Column: Category, Title, Subtitle, Quick Specs */}
              <div className="w-full md:max-w-sm lg:max-w-md text-left space-y-1.5">
                {/* Category Pill with Glowing Blue Icon Square */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 dark:bg-blue-600/90 flex items-center justify-center text-white shadow-sm shadow-blue-600/25 border border-blue-400/30 shrink-0 backdrop-blur-xs">
                    <CategoryIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tracking-wide transition-colors duration-200">
                    {displayCategory}
                  </span>
                </div>

                {/* Two-Tone Title Matching Theme */}
                <h2
                  id="detail-modal-title"
                  className="text-base sm:text-lg md:text-xl font-bold font-['Sora'] text-slate-900 dark:text-white tracking-tight leading-tight drop-shadow-xs transition-colors duration-200"
                >
                  {mainTitlePart}{' '}
                  {highlightWord && (
                    <span className="text-[#0070F3] dark:text-[#00A3FF] font-extrabold">
                      {highlightWord}
                    </span>
                  )}
                </h2>

                {/* Subtitle / Short Description */}
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed max-w-sm font-normal line-clamp-2 transition-colors duration-200">
                  {data.description}
                </p>

                {/* Quick Specs Pill Badges (Theme-reactive frosted glass) */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-slate-700 dark:text-slate-200 bg-slate-200/70 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 backdrop-blur-md shadow-xs transition-colors duration-200">
                    <Clock className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{data.duration || '6 – 10 Weeks'}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-slate-700 dark:text-slate-200 bg-slate-200/70 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 backdrop-blur-md shadow-xs transition-colors duration-200">
                    <Zap className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{data.metadata || 'Native Speed'}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-slate-700 dark:text-slate-200 bg-slate-200/70 dark:bg-white/[0.05] border border-slate-300/80 dark:border-white/10 backdrop-blur-md shadow-xs transition-colors duration-200">
                    <Layers className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Scalable Architecture</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Fidelity Mini Floating Device Showcase Mockup (Theme-Adaptive) */}
              <div className="hidden md:flex items-center justify-center shrink-0 pr-0.5">
                <div className="relative group">
                  {/* Floating Ambient Backlight */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-[22px] blur-md opacity-70 group-hover:opacity-100 transition duration-300" />

                  {/* Smartphone Obsidian / Light Slate Mockup Frame */}
                  <div className="relative w-[130px] sm:w-[138px] rounded-[18px] border-[2px] border-slate-300/90 dark:border-slate-700/70 bg-white/95 dark:bg-[#070B14]/85 backdrop-blur-md p-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.12)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.85)] transform lg:-rotate-1 group-hover:rotate-0 transition-all duration-300 overflow-hidden">
                    {/* Glass Specular Glare */}
                    <div className="absolute -top-10 -left-10 w-28 h-28 bg-gradient-to-br from-white/30 dark:from-white/15 to-transparent rounded-full blur-sm pointer-events-none" />

                    {/* Top Notch / Status Bar */}
                    <div className="flex items-center justify-between px-1 pt-0.5 pb-1">
                      <span className="text-[7px] font-semibold text-slate-500 dark:text-slate-400 font-mono">14:04</span>
                      <div className="w-8 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-900" />
                      </div>
                      <div className="flex items-center gap-0.5">
                        <div className="w-1.5 h-1 border border-slate-400 dark:border-slate-400 rounded-xs" />
                      </div>
                    </div>

                    {/* Simulated Mobile Enterprise Dashboard */}
                    <div className="space-y-1 p-0.5 text-left">
                      {/* Greeting */}
                      <div>
                        <div className="text-[7px] text-slate-500 dark:text-slate-400">Good Morning</div>
                        <div className="text-[8px] font-bold text-slate-900 dark:text-white leading-tight">
                          Enterprise Portal
                        </div>
                      </div>

                      {/* 3 Metric Pills */}
                      <div className="grid grid-cols-3 gap-0.5 pt-0.5 text-center">
                        <div className="bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded p-0.5 backdrop-blur-xs">
                          <div className="text-[6px] text-slate-500 dark:text-slate-400">Projects</div>
                          <div className="text-[8px] font-bold text-cyan-600 dark:text-cyan-400">12</div>
                        </div>
                        <div className="bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded p-0.5 backdrop-blur-xs">
                          <div className="text-[6px] text-slate-500 dark:text-slate-400">Users</div>
                          <div className="text-[8px] font-bold text-blue-600 dark:text-blue-400">8.4K</div>
                        </div>
                        <div className="bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded p-0.5 backdrop-blur-xs">
                          <div className="text-[6px] text-slate-500 dark:text-slate-400">Growth</div>
                          <div className="text-[7.5px] font-bold text-emerald-600 dark:text-emerald-400">+12%</div>
                        </div>
                      </div>

                      {/* Recent Activity Mini List */}
                      <div className="space-y-0.5 pt-0.5">
                        <div className="flex items-center justify-between p-0.5 rounded bg-slate-100/80 dark:bg-white/[0.03] text-[6.5px] backdrop-blur-xs">
                          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-200">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-[5px]">
                              ✓
                            </div>
                            <span className="truncate max-w-[65px]">Active deployment</span>
                          </div>
                          <span className="text-slate-400 dark:text-slate-500 text-[5.5px]">Live</span>
                        </div>
                        <div className="flex items-center justify-between p-0.5 rounded bg-slate-100/80 dark:bg-white/[0.03] text-[6.5px] backdrop-blur-xs">
                          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-200">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[5px]">
                              ₹
                            </div>
                            <span className="truncate max-w-[65px]">Payment verified</span>
                          </div>
                          <span className="text-slate-400 dark:text-slate-500 text-[5.5px]">Done</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              CSS Selector 2: MODAL BODY - Fully Theme Adaptive (Light & Dark Theme)
              ========================================================================= */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-3.5 custom-scrollbar transition-colors duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3.5 items-start">
              {/* LEFT COLUMN (67% width on desktop) */}
              <div className="lg:col-span-8 space-y-2.5 text-left">
                {/* 1. Overview Section */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-3 bg-blue-600 dark:bg-blue-500 rounded-full shadow-[0_0_6px_rgba(37,99,235,0.4)] dark:shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                    <h3 className="text-[11px] font-bold text-slate-900 dark:text-white tracking-wide uppercase font-['Sora'] transition-colors duration-200">
                      Overview
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed flex-1 transition-colors duration-200">
                      {data.longDesc ||
                        data.description ||
                        'We build high-performance, secure, and user-friendly software and applications designed to deliver seamless performance, intuitive UI/UX, and real business value.'}
                    </p>

                    {/* Interactive Promo Teaser Card: Theme adaptive */}
                    <div
                      onClick={() => setIsPlayingTeaser(!isPlayingTeaser)}
                      className="shrink-0 w-full sm:w-[195px] rounded-lg bg-slate-100/85 dark:bg-white/[0.03] backdrop-blur-md border border-slate-200/90 dark:border-white/10 p-1.5 flex items-center justify-between gap-2 relative overflow-hidden group hover:bg-slate-200/70 dark:hover:bg-white/[0.06] hover:border-cyan-500/50 hover:shadow-[0_0_12px_rgba(6,182,212,0.15)] transition-all cursor-pointer shadow-xs"
                    >
                      <div className="relative z-10 text-left pl-0.5">
                        <div className="text-[10px] font-bold text-slate-900 dark:text-white leading-tight">
                          Turn Ideas <br />
                          <span className="text-blue-600 dark:text-white font-extrabold">
                            Into Powerful
                          </span>{' '}
                          <br />
                          <span className="text-slate-500 dark:text-slate-300 text-[9px] font-normal">
                            {data.title.toLowerCase().includes('mobile')
                              ? 'Mobile Apps'
                              : 'Digital Solutions'}
                          </span>
                        </div>
                        {/* Cyan progress accent line */}
                        <div className="w-5 h-0.5 bg-[#0070F3] dark:bg-[#00A3FF] rounded-full mt-1" />
                      </div>

                      {/* Right thumbnail preview with circular play button */}
                      <div className="relative w-16 h-11 rounded-md overflow-hidden shrink-0 border border-slate-300/80 dark:border-white/10 bg-slate-200 dark:bg-slate-900/80 backdrop-blur-xs">
                        <img
                          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=300&q=80"
                          alt="Preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/15 dark:bg-black/25" />
                        <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-[#00A3FF] text-white flex items-center justify-center shadow-[0_0_8px_rgba(37,99,235,0.6)] dark:shadow-[0_0_8px_rgba(0,163,255,0.8)] group-hover:scale-110 transition-transform">
                          {isPlayingTeaser ? (
                            <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />
                          ) : (
                            <Play className="w-2 h-2 fill-current ml-0.5" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Key Deliverables Section (Theme adaptive clean list) */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-3 bg-blue-600 dark:bg-blue-500 rounded-full shadow-[0_0_6px_rgba(37,99,235,0.4)] dark:shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                    <h3 className="text-[11px] font-bold text-slate-900 dark:text-white tracking-wide uppercase font-['Sora'] transition-colors duration-200">
                      Key Deliverables
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2.5 gap-y-1">
                    {deliverablesList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 py-0.5 group"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] text-slate-700 dark:text-slate-200 leading-snug font-medium truncate transition-colors duration-200">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Technology Stack Section (Theme adaptive tech pills) */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1 h-3 bg-blue-600 dark:bg-blue-500 rounded-full shadow-[0_0_6px_rgba(37,99,235,0.4)] dark:shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                    <h3 className="text-[11px] font-bold text-slate-900 dark:text-white tracking-wide uppercase font-['Sora'] transition-colors duration-200">
                      Technology Stack
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap">
                    {techList.map((tech, idx) => {
                      const badge = getTechBadge(tech);
                      const TechIcon = badge.icon;
                      return (
                        <div
                          key={idx}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-white/[0.04] backdrop-blur-md border border-slate-300/80 dark:border-white/10 ${badge.border} hover:bg-slate-200/90 dark:hover:bg-white/[0.08] transition-all duration-200 flex items-center gap-1 shadow-xs cursor-default`}
                        >
                          <TechIcon className={`w-2.5 h-2.5 ${badge.color}`} />
                          <span>{tech}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. "Why Choose Us?" Card (Theme adaptive gradient banner) */}
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-slate-50/30 dark:from-blue-950/35 dark:via-[#0B1224]/40 dark:to-transparent backdrop-blur-md border border-blue-200/80 dark:border-blue-500/20 p-2 sm:p-2.5 flex items-center gap-2.5 shadow-xs transition-colors duration-200">
                  {/* Glowing Icon Container with Lightbulb */}
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-600/25 flex items-center justify-center text-blue-600 dark:text-cyan-300 shadow-xs dark:shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-300/80 dark:border-cyan-400/30 shrink-0">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-300" />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 text-left">
                    <h4 className="text-[11px] font-bold text-slate-900 dark:text-white font-['Sora'] mb-0.5 transition-colors duration-200">
                      Why Choose Us?
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 text-[10px] leading-relaxed transition-colors duration-200">
                      {data.title.toLowerCase().includes('mobile')
                        ? 'We build mobile apps that are fast, secure, and scalable, with a strong focus on user experience, performance, and long-term support.'
                        : 'We build digital solutions that are fast, secure, and scalable, with a strong focus on user experience, performance, and long-term support.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SIDEBAR ACTION PANEL - Theme adaptive */}
              <div className="lg:col-span-4">
                <div className="rounded-xl bg-slate-50/95 dark:bg-[#080C18]/65 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 p-2.5 sm:p-3 flex flex-col justify-between gap-2 text-left shadow-md dark:shadow-lg relative overflow-hidden transition-colors duration-200">
                  {/* Ambient Glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 dark:bg-cyan-500/8 rounded-full blur-lg pointer-events-none" />

                  {/* Sidebar Header */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold font-['Sora'] text-xs transition-colors duration-200">
                      <Rocket className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span>Ready to Get Started?</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[10px] leading-relaxed transition-colors duration-200">
                      Let&apos;s discuss your requirements and turn your idea into reality.
                    </p>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    onClick={() => {
                      if (data.onPrimaryAction) {
                        data.onPrimaryAction();
                      }
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-[#00A3FF] dark:to-[#0066FF] dark:hover:from-[#1AB0FF] dark:hover:to-[#1A75FF] text-white font-semibold text-[11px] py-2 px-2.5 rounded-md shadow-md shadow-blue-500/20 dark:shadow-[0_3px_12px_rgba(0,163,255,0.35)] hover:shadow-lg dark:hover:shadow-[0_4px_16px_rgba(0,163,255,0.45)] transition-all flex items-center justify-center gap-1.5 group cursor-pointer active:scale-[0.98]"
                  >
                    <span>Enquire About This</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Secondary CTA Button: WhatsApp Chat */}
                  <a
                    href={getWhatsAppUrl(COMPANY_INFO.salesPhone, whatsappPrefill)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300/80 text-emerald-700 dark:bg-[#072016]/80 dark:hover:bg-[#0A2A1E]/90 dark:border-emerald-500/30 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium text-[10px] py-1.5 px-2.5 rounded-md backdrop-blur-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  {/* Contact Info List Matching Theme */}
                  <div className="space-y-1.5 pt-1.5 border-t border-slate-200 dark:border-white/10 transition-colors duration-200">
                    {/* Phone */}
                    <a
                      href={`tel:${COMPANY_INFO.primaryPhone}`}
                      className="flex items-center gap-2 group transition-colors"
                    >
                      <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 border border-blue-200/80 dark:bg-blue-950/50 dark:text-cyan-400 dark:border-white/5 backdrop-blur-xs flex items-center justify-center shrink-0 group-hover:bg-blue-200/80 dark:group-hover:bg-cyan-500/20 transition-all">
                        <Phone className="w-3 h-3" />
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-300 transition-colors">
                          {COMPANY_INFO.primaryPhone}
                        </div>
                        <div className="text-[8.5px] text-slate-500 dark:text-slate-400">
                          Mon - Sat: 9:30 AM - 6:30 PM
                        </div>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:${COMPANY_INFO.officialEmail}`}
                      className="flex items-center gap-2 group transition-colors"
                    >
                      <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 border border-blue-200/80 dark:bg-blue-950/50 dark:text-cyan-400 dark:border-white/5 backdrop-blur-xs flex items-center justify-center shrink-0 group-hover:bg-blue-200/80 dark:group-hover:bg-cyan-500/20 transition-all">
                        <Mail className="w-3 h-3" />
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-300 transition-colors truncate max-w-[155px]">
                          {COMPANY_INFO.officialEmail}
                        </div>
                        <div className="text-[8.5px] text-slate-500 dark:text-slate-400">
                          Quick response time
                        </div>
                      </div>
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 border border-blue-200/80 dark:bg-blue-950/50 dark:text-cyan-400 dark:border-white/5 backdrop-blur-xs flex items-center justify-center shrink-0">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-semibold text-slate-900 dark:text-white">
                          Jamshedpur, Jharkhand
                        </div>
                        <div className="text-[8.5px] text-slate-500 dark:text-slate-400">
                          On-site &amp; remote support
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trusted & Secure Badge Card */}
                  <div className="p-1.5 rounded-md bg-slate-100/80 border border-slate-200/90 hover:border-blue-400/50 dark:bg-white/[0.02] dark:border-white/5 dark:hover:border-cyan-500/30 backdrop-blur-xs transition-colors flex items-center justify-between gap-1.5 group cursor-pointer">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-cyan-400 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] font-bold text-slate-900 dark:text-white">Trusted &amp; Secure</div>
                        <div className="text-[8.5px] text-slate-500 dark:text-slate-400">
                          Data &amp; code confidentiality
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-2.5 h-2.5 text-slate-400 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


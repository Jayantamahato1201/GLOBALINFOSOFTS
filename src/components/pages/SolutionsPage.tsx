import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SOLUTIONS_DATA, COMPANY_INFO } from '../../data/companyData';
import { SoftwareSolution } from '../../types';
import { useCms } from '../../context/CmsContext';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import {
  ArrowRight,
  ShoppingCart,
  Glasses,
  GraduationCap,
  Truck,
  UtensilsCrossed,
  Plus,
  Search,
  LayoutGrid,
  Grid2X2,
  Table2,
  Printer,
  ShieldCheck,
  Zap,
  Settings2,
  MessageCircle,
  Database,
  Layers,
  Check,
  X,
  PhoneCall
} from 'lucide-react';

interface SolutionsPageProps {
  onSelectSolution: (solution: SoftwareSolution) => void;
  onOpenContact: (scope?: string) => void;
  onSelectServiceById?: (serviceId: string) => void;
  initialSelectedId?: string;
}

interface SolutionDisplayMeta {
  categoryLabel: string;
  icon: React.ElementType;
  cardImage: string;
  hardwareSpecs: string;
}

const solutionMetaMap: Record<string, SolutionDisplayMeta> = {
  'sol-retail-pos': {
    categoryLabel: 'Retail, Supermarkets & Garments',
    icon: ShoppingCart,
    cardImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=600&q=80',
    hardwareSpecs: 'Thermal 80mm • Barcode Scanner • Cash Drawer'
  },
  'sol-optical-erp': {
    categoryLabel: 'Healthcare & Optical Retail',
    icon: Glasses,
    cardImage: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
    hardwareSpecs: 'Thermal 80mm • Barcode Scanner • Cash Drawer'
  },
  'sol-school-erp': {
    categoryLabel: 'Education, Schools & Colleges',
    icon: GraduationCap,
    cardImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    hardwareSpecs: 'Thermal 80mm • Barcode Scanner • Cash Drawer'
  },
  'sol-wholesale-erp': {
    categoryLabel: 'Wholesale, Trading & Distribution',
    icon: Truck,
    cardImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    hardwareSpecs: 'Thermal 80mm • Barcode Scanner • Cash Drawer'
  },
  'sol-hotel-restaurant': {
    categoryLabel: 'Hotel, Hotels & Restaurants',
    icon: UtensilsCrossed,
    cardImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    hardwareSpecs: 'Thermal 80mm • Barcode Scanner • Cash Drawer'
  },
  'sol-pharmacy-clinic': {
    categoryLabel: 'Healthcare, Pharmacies & Clinics',
    icon: Plus,
    cardImage: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=600&q=80',
    hardwareSpecs: 'Thermal 80mm • Barcode Scanner • Cash Drawer'
  }
};

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onSelectSolution,
  onOpenContact
}) => {
  const { solutions } = useCms();
  const allSolutions: SoftwareSolution[] = (solutions && solutions.length > 0)
    ? solutions.filter((s) => s.enabled !== false).map((s) => ({
        id: s.id,
        title: s.title,
        shortDesc: s.shortDesc || s.shortDescription || '',
        fullDesc: s.fullDesc || '',
        industry: s.industry || 'Enterprise',
        iconName: s.iconName || 'Layers',
        features: s.features || s.keyFeatures || [],
        benefits: s.benefits || [],
        technologies: s.technologies || [],
        compliance: s.compliance || '',
        demoAvailable: s.demoAvailable ?? true,
        image: s.image,
        duration: s.duration
      }))
    : SOLUTIONS_DATA;

  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'dense' | 'matrix'>('grid');
  const [activeArchModal, setActiveArchModal] = useState<SoftwareSolution | null>(null);

  const industries = [
    'All',
    'Retail & Supermarkets',
    'Healthcare & Optical Retail',
    'Wholesale & Supply Chain',
    'Hotel & Restaurants',
    'Education & Academics'
  ];

  const filteredSolutions = allSolutions.filter((sol) => {
    const meta = solutionMetaMap[sol.id];
    const categoryName = meta?.categoryLabel || sol.industry;

    const selInd = (selectedIndustry || '').toLowerCase().split(' ')[0];
    const matchesIndustry =
      selectedIndustry === 'All' ||
      (categoryName || '').toLowerCase().includes(selInd) ||
      (sol.industry || '').toLowerCase().includes(selInd);

    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      (sol.title || '').toLowerCase().includes(q) ||
      (sol.shortDesc || '').toLowerCase().includes(q) ||
      (categoryName || '').toLowerCase().includes(q) ||
      (Array.isArray(sol.features) && sol.features.some((f) => (f || '').toLowerCase().includes(q)));

    return matchesIndustry && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060913] text-slate-800 dark:text-slate-200 pt-20 sm:pt-24 pb-16 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-300">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[750px] h-[450px] bg-sky-500/10 blur-[150px] pointer-events-none -z-0" />
      <div className="absolute top-[600px] right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[160px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-1/3 w-[800px] h-[400px] bg-cyan-500/10 blur-[170px] pointer-events-none -z-0" />

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-8 relative z-10">
        
        {/* =========================================================================
            1. HERO SECTION (Matching reference screenshot)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          {/* Left Column: Heading & Description & Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 space-y-4"
          >
            {/* Top Eyebrow with glowing cyan bar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-8 h-[2px] bg-cyan-500 dark:bg-cyan-400 rounded-full inline-block shadow-[0_0_8px_#22d3ee]" />
              <span className="text-[11px] font-mono tracking-[0.2em] text-cyan-700 dark:text-cyan-400 uppercase font-bold">
                TURNKEY ENTERPRISE SOFTWARE PRODUCTS
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 dark:text-white font-['Sora'] tracking-tight leading-[1.15] transition-colors"
            >
              Ready Software Solutions Catalog
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed max-w-3xl transition-colors"
            >
              Tested, production-hardened software products engineered for high throughput, sub-3-second POS billing, multi-godown inventory, GST e-invoicing, and 100% intellectual property ownership.
            </motion.p>

            {/* 3 Metric Badges */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-5 sm:gap-8 pt-2"
            >
              {/* Metric 1: 8+ Industry Engines */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-sm">
                  <Settings2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-['Sora'] transition-colors">8+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">Industry Engines</div>
                </div>
              </div>

              {/* Metric 2: 100% Data Sovereignty */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-['Sora'] transition-colors">100%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">Data Sovereignty</div>
                </div>
              </div>

              {/* Metric 3: <3s POS Checkout */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-300 shadow-sm">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-['Sora'] transition-colors">&lt;3s</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">POS Checkout</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Office Dev Workspace Mockup Card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-[#090e1b] shadow-xl dark:shadow-2xl h-[200px] sm:h-[220px] flex items-center justify-end p-6 group">
              {/* Background developer lab / multi-screen office photo */}
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
                alt="Global Infosoft Engineering Lab"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#070B16] via-[#070B16]/80 to-transparent" />
              
              {/* Floating Headline Card inside the preview */}
              <div className="relative z-10 max-w-[230px] text-left space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white font-['Sora'] leading-snug">
                  Reliable Software for Real Businesses
                </h3>
                <p className="text-xs text-slate-300 font-mono tracking-wide">
                  Scalable. Secure. Future Ready.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            2. FILTER PILLS & SEARCH BAR
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2"
        >
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {industries.map((ind) => {
              const isActive = selectedIndustry === ind;
              return (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                      : 'bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 shadow-sm'
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Search & View Modes */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search solutions or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 rounded-full bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-slate-700/80 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-colors shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-sky-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.3)]'
                    : 'bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-slate-700/70 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 shadow-sm'
                }`}
                title="Cards View"
                aria-label="Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('dense')}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === 'dense'
                    ? 'bg-sky-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.3)]'
                    : 'bg-white dark:bg-[#0B101E] border border-slate-200 dark:border-slate-700/70 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 shadow-sm'
                }`}
                title="Compact Grid"
                aria-label="Compact Grid"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            3. SOFTWARE SOLUTIONS GRID (3 COLUMNS, SPLIT HORIZONTAL CARDS)
            ========================================================================= */}
        {filteredSolutions.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-white dark:bg-[#090E1B] border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No solutions match your current filter or search criteria.</p>
            <button
              onClick={() => {
                setSelectedIndustry('All');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold hover:bg-sky-500/20 dark:hover:bg-sky-500/30 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-5 w-full ${
              viewMode === 'dense'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredSolutions.map((sol, idx) => {
              const meta = solutionMetaMap[sol.id] || {
                categoryLabel: sol.industry,
                icon: ShoppingCart,
                cardImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=600&q=80',
                hardwareSpecs: 'Thermal 80mm • Barcode Scanner • Cash Drawer'
              };
              const IconComponent = meta.icon;

              return (
                <motion.div
                  key={sol.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
                  className="rounded-2xl bg-white dark:bg-[#0B0F19]/95 border border-slate-200/90 dark:border-white/10 hover:border-cyan-500/60 transition-all duration-300 shadow-sm hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col justify-between group text-left relative"
                >
                  {/* Specular Top Edge Highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
                  {/* Split Card: Left content (62%) + Right image (38%) */}
                  <div className="flex flex-row h-full">
                    {/* Left Column */}
                    <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between space-y-3">
                      <div>
                        {/* Top Category Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#0E1528] border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-colors">
                          <IconComponent className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                          <span className="truncate max-w-[170px] sm:max-w-[200px]">{meta.categoryLabel}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Sora'] tracking-tight mt-2.5 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {sol.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-2 line-clamp-3 transition-colors">
                          {sol.shortDesc}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Hardware Compatibility */}
                        <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-2 border-t border-slate-100 dark:border-slate-800/80 transition-colors">
                          <Printer className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{meta.hardwareSpecs}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => onSelectSolution(sol)}
                            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer"
                          >
                            <span>Explore Engine</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onOpenContact(`Request Live Demo: ${sol.title}`)}
                            className="py-2 px-3.5 rounded-xl bg-slate-100 dark:bg-[#0B101E] border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors active:scale-95 cursor-pointer"
                          >
                            Book Demo
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Real-world high resolution industry photo */}
                    <div className="w-[38%] min-w-[125px] sm:min-w-[145px] relative overflow-hidden bg-slate-950 flex items-center justify-center">
                      <img
                        src={meta.cardImage}
                        alt={sol.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent dark:from-[#090E1B] dark:via-transparent dark:to-transparent opacity-70 pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            4. BOTTOM CONSULTATION BANNER (Matching reference screenshot)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1222] to-slate-950 dark:from-[#0b1222] dark:via-[#09101e] dark:to-[#0a1426] border border-slate-800 dark:border-cyan-900/40 relative overflow-hidden p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
        >
          {/* Faint Cyber City Background Silhouette */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute right-0 bottom-0 w-96 h-48 bg-cyan-500/10 blur-[100px] pointer-events-none" />

          {/* Left Text */}
          <div className="relative z-10 text-left space-y-1.5 max-w-3xl">
            <h3 className="font-['Sora'] text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
              Need a Custom Software Solution for Your Unique Workflow?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              From clinic chains and manufacturing units to regional supply houses, our Jamshedpur engineering team architects custom software matching your exact operational rules.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            {/* Consult an Architect White Button */}
            <button
              onClick={() => onOpenContact('Custom Software Engineering Requirement')}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#090D18] font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>Consult an Architect</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* WhatsApp Enquiry Green Button */}
            <a
              href={getWhatsAppUrl(
                COMPANY_INFO.salesPhone,
                'Hello Global InfoSoft, I would like to schedule a demonstration for a software solution.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#00C980] hover:bg-[#00b573] text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

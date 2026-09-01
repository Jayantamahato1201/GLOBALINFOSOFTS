import React, { useState } from 'react';
import { SOLUTIONS_DATA } from '../../data/companyData';
import { SoftwareSolution } from '../../types';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Cpu,
  ShoppingBag,
  Glasses,
  Truck,
  UtensilsCrossed,
  Stethoscope,
  GraduationCap,
  Building2,
  Calculator,
  Search
} from 'lucide-react';

interface SolutionsPageProps {
  onSelectSolution: (solution: SoftwareSolution) => void;
  onOpenContact: (scope?: string) => void;
  onSelectServiceById: (serviceId: string) => void;
  initialSelectedId?: string;
}

const iconMap: Record<string, any> = {
  ShoppingBag,
  Glasses,
  Truck,
  UtensilsCrossed,
  Stethoscope,
  GraduationCap,
  Building2,
  Calculator
};

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onSelectSolution,
  onOpenContact,
  onSelectServiceById
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const industries = ['All', 'Retail & Supermarkets', 'Healthcare & Optical Retail', 'Wholesale & Supply Chain', 'Hotel & Restaurants', 'Education & Academics', 'Financial & Accounting'];

  const filteredSolutions = SOLUTIONS_DATA.filter((sol) => {
    const matchesIndustry = selectedIndustry === 'All' || sol.industry.includes(selectedIndustry) || selectedIndustry.includes(sol.industry);
    const matchesSearch =
      !searchQuery ||
      sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesSearch;
  });

  const renderSolutionCard = (sol: SoftwareSolution, idx: number) => {
    const IconComponent = iconMap[sol.iconName] || Cpu;
    const iconColors = [
      'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
      'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
      'bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    ];

    return (
      <div
        key={sol.id}
        onClick={() => onSelectSolution(sol)}
        className="h-full p-3.5 sm:p-4 rounded-xl project-card-gradient border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-400/80 transition-all duration-200 flex flex-col justify-between group text-left cursor-pointer"
      >
        <div className="space-y-2">
          {/* Top Bar: Icon & Industry Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${iconColors[idx % 4]} group-hover:scale-105 transition-transform`}>
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 truncate max-w-[170px]">
              {sol.industry}
            </span>
          </div>

          {/* Title & Short Description */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Outfit'] leading-snug line-clamp-1">
              {sol.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-0.5 line-clamp-2">
              {sol.shortDesc}
            </p>
          </div>

          {/* Compact Key Capabilities (Top 2) */}
          <div className="space-y-1 pt-0.5">
            {sol.features.slice(0, 2).map((feature, fIdx) => (
              <div key={fIdx} className="flex items-start gap-1.5 text-[10.5px] text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips & Compliance */}
          <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-1 text-[10px]">
            <div className="flex flex-wrap gap-1">
              {sol.technologies.slice(0, 2).map((t, tIdx) => (
                <span key={tIdx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[9.5px] border border-slate-200 dark:border-slate-700">
                  {t}
                </span>
              ))}
            </div>
            <span className="text-cyan-700 dark:text-cyan-400 font-mono font-semibold truncate max-w-[120px] text-[10px]">{sol.compliance}</span>
          </div>
        </div>

        {/* Compact Actions */}
        <div className="flex items-center gap-1.5 pt-2 mt-1.5 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectSolution(sol);
            }}
            className="flex-1 py-1.5 px-2.5 rounded-lg btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenContact(`Request Live Demo: ${sol.title}`);
            }}
            className="py-1.5 px-2.5 rounded-lg glass-card text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-white font-semibold text-xs transition-colors hover:border-cyan-500/40"
          >
            <span>Demo</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-16 sm:pt-20 pb-8 mesh-bg w-full overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-3.5 relative z-10">
        {/* Page Header - Asymmetric Full-width */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 text-left">
          <div className="max-w-3xl space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
              <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>Turnkey Software Products</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Ready Software Solutions Catalog
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Tested, ready-to-deploy software products designed with lightning speed, complete GST billing, barcode scanning, multi-branch synchronization, and 100% data ownership.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-2 sm:p-2.5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-0.5 md:pb-0 scrollbar-none">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedIndustry === ind
                    ? 'btn-primary text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white glass-card'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search software products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 rounded-lg glass-input text-xs"
            />
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5 w-full">
          {filteredSolutions.map((sol, idx) => renderSolutionCard(sol, idx))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SOLUTIONS_DATA } from '../../data/companyData';
import { SoftwareSolution } from '../../types';
import { Product3DShowroomSection } from '../3d/Product3DShowroomSection';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
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
  onOpenEstimator: () => void;
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
  onOpenEstimator,
  onOpenContact,
  onSelectServiceById,
  initialSelectedId
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const industries = ['All', 'Retail & Supermarkets', 'Healthcare & Optical Retail', 'Wholesale & Supply Chain', 'Hospitality & Restaurants', 'Education & Academics', 'Financial & Accounting'];

  const filteredSolutions = SOLUTIONS_DATA.filter((sol) => {
    const matchesIndustry = selectedIndustry === 'All' || sol.industry.includes(selectedIndustry) || selectedIndustry.includes(sol.industry);
    const matchesSearch =
      !searchQuery ||
      sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-emerald-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Turnkey Enterprise Software Products</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">
            Software Solutions Catalog
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Battle-tested, ready-to-deploy enterprise solutions designed with native speed, comprehensive GST/tax compliance, multi-branch synchronization, and 100% intellectual property ownership.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedIndustry === ind
                    ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white glass-card'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-card text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        {/* Solutions Grid - Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredSolutions.map((sol) => {
            const IconComponent = iconMap[sol.iconName] || Cpu;
            return (
              <div
                key={sol.id}
                className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-3">
                  {/* Top Bar: Icon & Industry Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 truncate max-w-[170px]">
                      {sol.industry}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-['Outfit'] leading-snug">
                      {sol.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed mt-1 line-clamp-2">
                      {sol.shortDesc}
                    </p>
                  </div>

                  {/* Compact Key Capabilities (Top 3) */}
                  <div className="space-y-1.5 pt-1">
                    {sol.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips & Compliance */}
                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-1 text-[10px]">
                    <div className="flex flex-wrap gap-1">
                      {sol.technologies.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-[10px] border border-white/5">
                          {t}
                        </span>
                      ))}
                      {sol.technologies.length > 2 && (
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-mono text-[10px]">
                          +{sol.technologies.length - 2}
                        </span>
                      )}
                    </div>
                    <span className="text-emerald-400/90 font-mono font-medium truncate max-w-[130px]">{sol.compliance}</span>
                  </div>
                </div>

                {/* Compact Actions */}
                <div className="flex items-center gap-2 pt-3 mt-3 border-t border-white/5">
                  <button
                    onClick={() => onSelectSolution(sol)}
                    className="flex-1 py-2 px-3 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onOpenContact(`Request Live Demo: ${sol.title}`)}
                    className="py-2 px-3 rounded-xl glass-card text-emerald-300 hover:text-white font-semibold text-xs transition-all hover:border-emerald-500/40"
                  >
                    <span>Demo</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3D Product & Architecture Interactive Viewer Section */}
        <div className="pt-4">
          <Product3DShowroomSection
            onSelectServiceById={onSelectServiceById}
            onOpenEstimator={onOpenEstimator}
          />
        </div>
      </div>
    </div>
  );
};

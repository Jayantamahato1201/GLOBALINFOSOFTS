import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/companyData';
import { ServiceItem } from '../types';
import {
  Code2,
  Globe,
  Smartphone,
  Layers,
  Calculator,
  TrendingUp,
  Cloud,
  Sparkles,
  Headphones,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, typeof Code2> = {
  Code2,
  Globe,
  Smartphone,
  Layers,
  Calculator,
  TrendingUp,
  Cloud,
  Sparkles,
  Headphones
};

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onExplore3DModel?: (modelId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'software', label: 'Custom Software & ERP' },
    { id: 'web', label: 'Website & Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'marketing', label: 'SEO & Marketing' },
    { id: 'cloud', label: 'Cloud Hosting & Support' }
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const renderServiceCard = (service: ServiceItem, idx: number) => {
    const Icon = ICON_MAP[service.iconName] || Code2;
    const iconColors = [
      'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
      'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
      'bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    ];

    return (
      <div
        key={service.id}
        id={`service-card-${service.id}`}
        onClick={() => onSelectService(service)}
        className="h-full flex flex-col justify-between p-3.5 sm:p-4 rounded-xl project-card-gradient border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-400/80 transition-all duration-200 group cursor-pointer text-left"
      >
        <div>
          {/* Top Row: Icon & Metric Badge */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${iconColors[idx % 4]} group-hover:scale-105 transition-transform`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 shrink-0">
              {service.metrics}
            </span>
          </div>

          {/* Title & Short Description */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Outfit'] mb-1 line-clamp-1">
            {service.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed mb-2">
            {service.shortDesc}
          </p>

          {/* Deliverables Checklist */}
          <div className="space-y-1 mb-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-800">
            {service.deliverables.slice(0, 2).map((item, dIdx) => (
              <div key={dIdx} className="flex items-start gap-1.5 text-[10.5px] text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Tech Tags & Action */}
        <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex flex-wrap gap-1">
            {service.technologies.slice(0, 3).map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9.5px] font-mono text-slate-700 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
            {service.technologies.length > 3 && (
              <span className="px-1 py-0.5 text-[9.5px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                +{service.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="pt-0.5 flex items-center justify-between text-xs text-cyan-700 dark:text-cyan-400 font-bold group-hover:text-cyan-800 dark:group-hover:text-cyan-300 transition-colors">
            <span>View Specifications</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="relative py-6 sm:py-8 mesh-bg border-t border-slate-200 dark:border-slate-800/80 overflow-hidden w-full transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-3 text-left">
          <div className="max-w-3xl space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold uppercase tracking-wider font-mono border-cyan-500/25">
              Comprehensive Technology Capabilities
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              Engineered For Business Growth & Automation
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              From desktop GST billing and retail POS software to institutional portals and responsive corporate websites, we engineer complete IT solutions in Jamshedpur with zero compromises.
            </p>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 mb-3.5 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-btn-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'btn-primary text-white shadow-sm'
                    : 'glass-card text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5 w-full">
          {filteredServices.map((service, idx) => renderServiceCard(service, idx))}
        </div>
      </div>
    </section>
  );
};

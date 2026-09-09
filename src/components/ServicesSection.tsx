import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/companyData';
import { ServiceItem } from '../types';
import { useCms } from '../context/CmsContext';
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
  ArrowRight,
  Palette,
  Monitor,
  Receipt,
  Search,
  Server,
  ShieldCheck,
  Building2
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
  Headphones,
  Palette,
  Monitor,
  Receipt,
  Search,
  Server,
  ShieldCheck,
  Building2
};

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onExplore3DModel?: (modelId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService
}) => {
  const { services } = useCms();
  const allServices: ServiceItem[] = (services && services.length > 0)
    ? services.filter((s) => s.enabled !== false).map((s) => ({
        id: s.id,
        title: s.title,
        shortDesc: s.shortDesc || s.shortDescription || '',
        longDesc: s.longDesc || '',
        iconName: s.iconName || 'Code2',
        category: (s.category as any) || 'software',
        deliverables: s.deliverables || s.features || [],
        technologies: s.technologies || s.techStack || [],
        metrics: s.metrics || '',
        image: s.image,
        duration: s.duration,
        featured: s.featured
      }))
    : SERVICES_DATA;

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'software', label: 'Custom Software' },
    { id: 'erp', label: 'ERP Systems' },
    { id: 'support', label: 'Support & AMC' },
    { id: 'cloud', label: 'Cloud & Hosting' },
    { id: 'web', label: 'Web & UI/UX' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'pos', label: 'GST & POS Billing' },
    { id: 'marketing', label: 'SEO & Marketing' }
  ];

  const filteredServices = activeCategory === 'all'
    ? allServices
    : allServices.filter((s) => s.category === activeCategory);

  const renderServiceCard = (service: ServiceItem, idx: number) => {
    const Icon = ICON_MAP[service.iconName] || Code2;
    
    // Distinct vibrant color themes per card
    const cardThemes = [
      {
        iconWrap: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-400/40 dark:border-cyan-500/30 shadow-sm',
        badge: 'bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border-cyan-500/25',
        glow: 'hover:border-cyan-500/60 dark:hover:border-cyan-400/60',
        bgShine: 'from-cyan-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-indigo-500/20 to-blue-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-400/40 dark:border-indigo-500/30 shadow-sm',
        badge: 'bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/25',
        glow: 'hover:border-indigo-500/60 dark:hover:border-indigo-400/60',
        bgShine: 'from-indigo-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-teal-500/20 to-emerald-500/20 text-teal-700 dark:text-teal-300 border-teal-400/40 dark:border-teal-500/30 shadow-sm',
        badge: 'bg-teal-500/10 text-teal-800 dark:text-teal-300 border-teal-500/25',
        glow: 'hover:border-teal-500/60 dark:hover:border-teal-400/60',
        bgShine: 'from-teal-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-sky-500/20 to-blue-500/20 text-sky-700 dark:text-sky-300 border-sky-400/40 dark:border-sky-500/30 shadow-sm',
        badge: 'bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500/25',
        glow: 'hover:border-sky-500/60 dark:hover:border-sky-400/60',
        bgShine: 'from-sky-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-300 border-amber-400/40 dark:border-amber-500/30 shadow-sm',
        badge: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25',
        glow: 'hover:border-amber-500/60 dark:hover:border-amber-400/60',
        bgShine: 'from-amber-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-700 dark:text-blue-300 border-blue-400/40 dark:border-blue-500/30 shadow-sm',
        badge: 'bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-500/25',
        glow: 'hover:border-blue-500/60 dark:hover:border-blue-400/60',
        bgShine: 'from-blue-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-700 dark:text-violet-300 border-violet-400/40 dark:border-violet-500/30 shadow-sm',
        badge: 'bg-violet-500/10 text-violet-800 dark:text-violet-300 border-violet-500/25',
        glow: 'hover:border-violet-500/60 dark:group-hover:border-violet-400/60',
        bgShine: 'from-violet-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-400/40 dark:border-emerald-500/30 shadow-sm',
        badge: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/25',
        glow: 'hover:border-emerald-500/60 dark:hover:border-emerald-400/60',
        bgShine: 'from-emerald-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-400/40 dark:border-cyan-500/30 shadow-sm',
        badge: 'bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border-cyan-500/25',
        glow: 'hover:border-cyan-500/60 dark:hover:border-cyan-400/60',
        bgShine: 'from-cyan-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-rose-500/20 to-pink-500/20 text-rose-700 dark:text-rose-300 border-rose-400/40 dark:border-rose-500/30 shadow-sm',
        badge: 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/25',
        glow: 'hover:border-rose-500/60 dark:hover:border-rose-400/60',
        bgShine: 'from-rose-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 text-pink-700 dark:text-pink-300 border-pink-400/40 dark:border-pink-500/30 shadow-sm',
        badge: 'bg-pink-500/10 text-pink-800 dark:text-pink-300 border-pink-500/25',
        glow: 'hover:border-pink-500/60 dark:hover:border-pink-400/60',
        bgShine: 'from-pink-500/10 to-transparent'
      },
      {
        iconWrap: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-700 dark:text-purple-300 border-purple-400/40 dark:border-purple-500/30 shadow-sm',
        badge: 'bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/25',
        glow: 'hover:border-purple-500/60 dark:hover:border-purple-400/60',
        bgShine: 'from-purple-500/10 to-transparent'
      }
    ];

    const theme = cardThemes[idx % cardThemes.length];

    return (
      <div
        key={service.id}
        id={`service-card-${service.id}`}
        onClick={() => onSelectService(service)}
        className={`h-full flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl bg-white/95 dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-white/10 ${theme.glow} shadow-sm hover:shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_24px_rgba(6,182,212,0.12)] transition-all duration-300 group cursor-pointer text-left relative overflow-hidden`}
      >
        {/* Specular Top Edge Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Subtle Ambient Corner Glow */}
        <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${theme.bgShine} rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

        <div>
          {/* Top Row: Icon & Metric Badge */}
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${theme.iconWrap} group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-250`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold border ${theme.badge} shrink-0`}>
              {service.metrics}
            </span>
          </div>

          {/* Title & Short Description */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Outfit'] mb-1.5 line-clamp-1">
            {service.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed mb-2.5">
            {service.shortDesc}
          </p>

          {/* Deliverables Checklist */}
          <div className="space-y-1 mb-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
            {service.deliverables.slice(0, 2).map((item, dIdx) => (
              <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Tech Tags & Action */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex flex-wrap gap-1">
            {service.technologies.slice(0, 3).map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-[10px] font-mono font-medium text-slate-700 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
            {service.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                +{service.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="pt-1 flex items-center justify-between text-xs text-cyan-700 dark:text-cyan-400 font-bold group-hover:text-cyan-800 dark:group-hover:text-cyan-300 transition-colors">
            <span>View Specifications</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="relative py-6 sm:py-8 mesh-bg border-t border-slate-200 dark:border-slate-800/80 overflow-hidden w-full transition-colors duration-300">
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
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

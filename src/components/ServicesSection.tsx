import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/companyData';
import { PRODUCT_3D_MODELS } from '../data/product3DModelsData';
import { ServiceItem } from '../types';
import { Card3DTilt } from './3d/Card3DTilt';
import {
  Code2,
  Globe,
  Smartphone,
  Layers,
  Calculator,
  TrendingUp,
  Cloud,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Box
} from 'lucide-react';

const ICON_MAP: Record<string, typeof Code2> = {
  Code2,
  Globe,
  Smartphone,
  Layers,
  Calculator,
  TrendingUp,
  Cloud,
  Sparkles
};

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onExplore3DModel?: (modelId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onExplore3DModel
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Solutions' },
    { id: 'enterprise', label: 'Enterprise ERP/CRM' },
    { id: 'software', label: 'Custom Software & POS' },
    { id: 'web', label: 'Web & SaaS' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'marketing', label: 'Growth & Marketing' },
    { id: 'ai', label: 'AI & Automation' }
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="relative py-24 mesh-bg border-t border-white/10 overflow-hidden">
      {/* Abstract Blur Shape */}
      <div className="abstract-shape w-[450px] h-[450px] top-1/4 -right-20 animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
              Comprehensive Technology Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Outfit']">
              Engineered For Modern Business Evolution
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              From enterprise resource planning to high-conversion digital funnels, we provide complete lifecycle technology services without cutting corners.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-card text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>8 Specialization Practices • 100% In-House Engineers</span>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-btn-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'btn-primary text-white shadow-lg'
                    : 'glass-card text-slate-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = ICON_MAP[service.iconName] || Code2;
            const matched3D = PRODUCT_3D_MODELS.find((m) => m.serviceId === service.id);

            return (
              <Card3DTilt
                key={service.id}
                id={`service-card-${service.id}`}
                intensity={10}
                className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-card transition-all duration-300 group"
              >
                <div>
                  {/* Top Row: Icon & Metric Badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 group-hover:border-indigo-400 group-hover:text-white transition-all duration-300 shadow-md shadow-indigo-500/10">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {matched3D && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                          <Box className="w-2.5 h-2.5" />
                          <span>3D</span>
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                        {service.metrics}
                      </span>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors font-['Outfit'] mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      Key Deliverables:
                    </div>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Tech Tags & Direct Inquire Action */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectService(service)}
                      className="w-full py-2.5 px-3 rounded-xl glass-card hover:bg-indigo-600/30 text-slate-200 hover:text-white border border-white/10 hover:border-indigo-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 group/btn"
                    >
                      <span>Specs & Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>

                    {matched3D && onExplore3DModel ? (
                      <button
                        onClick={() => onExplore3DModel(matched3D.id)}
                        className="w-full py-2.5 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Box className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Explore in 3D</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectService(service)}
                        className="w-full py-2.5 px-3 rounded-xl glass-card hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all flex items-center justify-center gap-1"
                      >
                        <span>Details</span>
                      </button>
                    )}
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

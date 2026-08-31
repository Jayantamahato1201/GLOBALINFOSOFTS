import React, { useState } from 'react';
import { PRODUCT_3D_MODELS, Product3DModelConfig } from '../../data/product3DModelsData';
import {
  Layers,
  Globe,
  Smartphone,
  Sparkles,
  Cloud,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Code2
} from 'lucide-react';

interface Product3DShowroomSectionProps {
  onSelectServiceById: (serviceId: string) => void;
  onOpenEstimator?: () => void;
  onInquire?: (scope: string) => void;
}

const ICON_MAP: Record<string, typeof Layers> = {
  Layers,
  Globe,
  Smartphone,
  Sparkles,
  Cloud,
  Calculator
};

export const Product3DShowroomSection: React.FC<Product3DShowroomSectionProps> = ({
  onSelectServiceById
}) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('erp-core');

  const activeModel: Product3DModelConfig =
    PRODUCT_3D_MODELS.find((m) => m.id === selectedModelId) || PRODUCT_3D_MODELS[0];

  return (
    <section id="models-3d" className="relative py-8 sm:py-12 border-t border-white/10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Minimal Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Core Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-['Outfit']">
            Explore Key Products & Architectures
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            High-level performance benchmarks and architectural overview across our platforms.
          </p>
        </div>

        {/* Minimal Category Selector */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PRODUCT_3D_MODELS.map((model) => {
            const Icon = ICON_MAP[model.iconName] || Layers;
            const isSelected = model.id === selectedModelId;
            return (
              <button
                key={model.id}
                id={`btn-model-${model.id}`}
                onClick={() => setSelectedModelId(model.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'btn-primary text-white shadow-md'
                    : 'glass-card text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{model.category}</span>
              </button>
            );
          })}
        </div>

        {/* Minimal Information Card */}
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 shadow-xl max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                {activeModel.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit'] mt-0.5">
                {activeModel.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {activeModel.subtitle}
              </p>
            </div>
            <button
              onClick={() => onSelectServiceById(activeModel.serviceId)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl btn-primary text-white text-xs font-semibold shrink-0 self-start sm:self-auto shadow-sm"
            >
              <span>View Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed py-3">
            {activeModel.description}
          </p>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 border-y border-white/10">
            {activeModel.stats.map((stat, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-white/[0.03] text-center border border-white/5">
                <div className="text-sm sm:text-base font-extrabold text-white font-mono">{stat.value}</div>
                <div className="text-[10px] text-indigo-300 font-mono mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Highlights & Tech Badges */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap gap-2">
              {activeModel.keyFeatures.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <Code2 className="w-3 h-3 text-slate-400 mr-1 shrink-0" />
              {activeModel.hotspots[0]?.techStack?.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono text-[10px] border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



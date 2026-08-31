import React, { useState } from 'react';
import { TECHNOLOGIES_DATA } from '../data/companyData';
import { Technology } from '../types';
import { Card3DTilt } from './3d/Card3DTilt';
import {
  Cpu,
  Server,
  Smartphone,
  Cloud,
  Database,
  Sparkles,
  Zap,
  CheckCircle,
  Layers
} from 'lucide-react';

export const TechRadarSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Frontend');

  const categories: Technology['category'][] = [
    'Frontend',
    'Backend',
    'Mobile',
    'Cloud & DevOps',
    'Database',
    'AI & Analytics'
  ];

  const filteredTech = TECHNOLOGIES_DATA.filter((t) => t.category === activeCategory);

  return (
    <section id="tech-stack" className="relative py-24 mesh-bg border-t border-white/10 overflow-hidden">
      {/* Abstract Blur Shape */}
      <div className="abstract-shape w-[450px] h-[450px] top-1/3 -right-20 animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              Modern Enterprise Tooling
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Outfit']">
              Production-Grade Tech Architecture
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We engineer with cutting-edge, battle-tested frameworks chosen for type safety, sub-millisecond execution, and infinite horizontal scalability.
            </p>
          </div>

          {/* Quick badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-card text-xs text-indigo-300">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Zero Outdated Legacy Dependencies</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`tech-cat-${cat.replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'btn-primary text-white shadow-md'
                    : 'glass-card text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredTech.map((tech, idx) => (
            <Card3DTilt
              key={idx}
              intensity={12}
              className="p-6 rounded-2xl glass-card flex flex-col justify-between group transition-all duration-300 hover:border-indigo-500/50"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full glass-card text-indigo-300 font-semibold">
                    {tech.level}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{tech.experienceYears}+ Yrs Active</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors font-['Outfit'] mb-2">
                  {tech.name}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Production Ready</span>
                </span>
                <span className="text-slate-400">Tier 1</span>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
};

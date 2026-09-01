import React, { useState } from 'react';
import { TECHNOLOGIES_DATA } from '../data/companyData';
import { Technology } from '../types';
import { Card3DTilt } from './3d/Card3DTilt';
import {
  Zap,
  CheckCircle
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
    <section id="tech-stack" className="relative py-24 border-t border-slate-200/80 dark:border-white/10 overflow-hidden text-left transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
              Technology Stack
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              Robust Software Architecture
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We build with reliable, modern technologies chosen for data integrity, instant receipt printing, offline stability, and high performance.
            </p>
          </div>

          {/* Quick badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-card text-xs text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>High Reliability & Fast Speed</span>
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
                    : 'glass-card text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/10'
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
              intensity={8}
              className="p-6 rounded-2xl glass-card flex flex-col justify-between group transition-all duration-300 hover:border-cyan-500/50 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-500/30">
                    {tech.level}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{tech.experienceYears}+ Yrs</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Outfit'] mb-2">
                  {tech.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Production Ready</span>
                </span>
                <span className="text-slate-500 dark:text-slate-400">Core</span>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
};

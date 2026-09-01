import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/companyData';
import { CaseStudy } from '../types';
import { MarqueeSlider } from './MarqueeSlider';
import { ArrowUpRight, TrendingUp, SlidersHorizontal, LayoutGrid } from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenProject: (project: CaseStudy) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenProject }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');

  const industries = ['all', 'Retail & Wholesale', 'Optical & Eye Care', 'Jewelry & Gemstone', 'Education & Schools'];

  const filteredProjects = selectedIndustry === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((p) => p.industry === selectedIndustry);

  const renderProjectCard = (project: CaseStudy, isCompactMarquee = false) => {
    return (
      <div
        key={project.id}
        onClick={() => onOpenProject(project)}
        className={`${
          isCompactMarquee ? 'w-[330px] sm:w-[370px] h-[350px]' : 'h-full'
        } cursor-pointer group flex flex-col justify-between rounded-2xl project-card-gradient border border-slate-200/80 dark:border-white/15 hover:border-cyan-500/60 overflow-hidden transition-all duration-300 shadow-lg text-left`}
      >
        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between relative z-10">
          <div className="space-y-2.5">
            {/* Top Tags & Duration */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 group-hover:bg-cyan-500/25 transition-colors">
                  {project.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                  {project.duration}
                </span>
              </div>

              <div className="w-7 h-7 rounded-full glass-card flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-400 transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-wider mb-0.5">
                {project.client} • {project.industry}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors leading-snug line-clamp-1">
                {project.title}
              </h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-2">
              {project.summary}
            </p>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 group-hover:border-cyan-500/30 transition-all text-[11px] space-y-0.5">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                Software Solution:
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-tight">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Technologies footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-200/80 dark:border-white/10">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-slate-300 group-hover:text-cyan-700 dark:group-hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 group-hover:text-cyan-800 dark:group-hover:text-cyan-200 flex items-center gap-1">
              <span>Details</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="case-studies" className="relative py-20 border-t border-slate-200/80 dark:border-white/10 overflow-hidden text-left transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
              Client Deployments & Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              Delivered Software Systems in Action
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Explore how Global InfoSoft software eliminated billing delays, streamlined multi-counter inventory, and automated GST reporting.
            </p>
          </div>

          {/* Metric summary pill & Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 rounded-xl glass-card border border-slate-200 dark:border-white/10 text-xs">
              <button
                onClick={() => setViewMode('marquee')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'marquee'
                    ? 'btn-primary text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Auto-scroll horizontal marquee slider"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Auto-Scroll</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'btn-primary text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Industry Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {industries.map((ind) => (
            <button
              key={ind}
              id={`industry-btn-${ind}`}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedIndustry === ind
                  ? 'btn-primary text-white shadow-md'
                  : 'glass-card text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/10'
              }`}
            >
              {ind === 'all' ? 'All Deployments' : ind}
            </button>
          ))}
        </div>

        {/* Marquee or Grid */}
        {viewMode === 'marquee' ? (
          <MarqueeSlider<CaseStudy>
            items={filteredProjects}
            speedSeconds={32}
            renderItem={(item) => renderProjectCard(item, true)}
            showControls={true}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => renderProjectCard(project, false))}
          </div>
        )}
      </div>
    </section>
  );
};

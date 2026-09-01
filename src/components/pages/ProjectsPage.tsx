import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/companyData';
import { CaseStudy } from '../../types';
import { ProcessSection } from '../ProcessSection';
import {
  Briefcase,
  ArrowRight,
  Search
} from 'lucide-react';

interface ProjectsPageProps {
  onOpenProject: (project: CaseStudy) => void;
  onOpenContact: (scope?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Custom Software', 'Healthcare & Optical', 'Retail & POS', 'Education & ERP'];

  const filteredProjects = CASE_STUDIES.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      p.industry.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProjectCard = (project: CaseStudy, idx: number) => {
    const badgeColors = [
      'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/60',
      'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
      'bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800/60',
      'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
    ];

    return (
      <div
        key={project.id}
        onClick={() => onOpenProject(project)}
        className="h-full rounded-xl project-card-gradient border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-400/80 transition-all duration-200 overflow-hidden cursor-pointer group flex flex-col justify-between text-left"
      >
        <div className="p-3.5 sm:p-4 space-y-2 flex-1 flex flex-col justify-between">
          {/* Header & Client */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold uppercase tracking-wider border ${badgeColors[idx % 4]}`}>
                {project.industry}
              </span>
              <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-mono font-medium">
                {project.duration}
              </span>
            </div>

            <div>
              <div className="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono font-semibold uppercase tracking-wider mb-0.5">
                Client: {project.client}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Outfit'] leading-snug line-clamp-1">
                {project.title}
              </h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-2">
              {project.summary}
            </p>

            {/* Compact Solution box */}
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 text-xs space-y-0.5">
              <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-cyan-400 block">
                Delivered Solution:
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-[10.5px] line-clamp-2 leading-tight">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Footer / Tech Stack & CTA */}
          <div className="space-y-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-800/80">
            {/* Tech stack */}
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono text-[9.5px]">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-1 py-0.5 text-[9.5px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-cyan-700 dark:text-cyan-400 font-bold group-hover:text-cyan-800 dark:group-hover:text-cyan-300 transition-colors">
              <span>View Case Study</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-16 sm:pt-20 pb-8 mesh-bg w-full overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-3.5 relative z-10">
        {/* Header - Asymmetric Full-width */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 text-left">
          <div className="max-w-3xl space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
              <Briefcase className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>Proven Software Deployments</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Featured Client Projects & Case Studies
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Explore how Global InfoSoft has engineered billing systems, optical practice software, school management portals, and multi-store inventory tools for businesses in Jamshedpur and across Jharkhand.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-2 sm:p-2.5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-0.5 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'btn-primary text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white glass-card'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 rounded-lg glass-input text-xs"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full">
          {filteredProjects.map((project, idx) => renderProjectCard(project, idx))}
        </div>

        {/* 6-Stage Engineering Process Lifecycle */}
        <div className="pt-2 w-full">
          <ProcessSection />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CASE_STUDIES } from '../../data/companyData';
import { CaseStudy } from '../../types';
import { useCms } from '../../context/CmsContext';
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
  const { projects } = useCms();
  const allProjects: CaseStudy[] = (projects && projects.length > 0)
    ? projects.filter((p) => p.enabled !== false).map((p) => ({
        id: p.id,
        title: p.title,
        client: p.client,
        industry: p.industry,
        category: p.category,
        image: p.image,
        summary: p.summary || p.description || '',
        challenge: p.challenge,
        solution: p.solution,
        results: Array.isArray(p.results)
          ? p.results.map((r) => (typeof r === 'string' ? { label: 'Result', value: r } : r))
          : [],
        technologies: p.technologies || [],
        duration: p.duration || '3 months',
        liveUrl: p.liveUrl,
        featured: p.featured
      }))
    : CASE_STUDIES;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Custom Software', 'Healthcare & Optical', 'Retail & POS', 'Education & ERP'];

  const filteredProjects = allProjects.filter((p) => {
    const selCat = (selectedCategory || '').toLowerCase();
    const matchesCategory =
      selectedCategory === 'All' ||
      (p.category || '').toLowerCase().includes(selCat) ||
      (p.industry || '').toLowerCase().includes(selCat);
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      (p.title || '').toLowerCase().includes(q) ||
      (p.client || '').toLowerCase().includes(q) ||
      (p.summary || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const renderProjectCard = (project: CaseStudy, idx: number) => {
    const cardThemes = [
      {
        badge: 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-500/30',
        glow: 'group-hover:border-cyan-500/60 dark:group-hover:border-cyan-400/60',
        bgShine: 'from-cyan-500/10 to-transparent'
      },
      {
        badge: 'bg-gradient-to-r from-blue-500/15 to-indigo-500/15 text-blue-800 dark:text-blue-300 border-blue-500/30',
        glow: 'group-hover:border-blue-500/60 dark:group-hover:border-blue-400/60',
        bgShine: 'from-blue-500/10 to-transparent'
      },
      {
        badge: 'bg-gradient-to-r from-violet-500/15 to-purple-500/15 text-violet-800 dark:text-violet-300 border-violet-500/30',
        glow: 'group-hover:border-violet-500/60 dark:group-hover:border-violet-400/60',
        bgShine: 'from-violet-500/10 to-transparent'
      },
      {
        badge: 'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
        glow: 'group-hover:border-emerald-500/60 dark:group-hover:border-emerald-400/60',
        bgShine: 'from-emerald-500/10 to-transparent'
      }
    ];

    const theme = cardThemes[idx % cardThemes.length];

    return (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 35, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{
          duration: 0.45,
          delay: idx * 0.08,
          ease: [0.22, 1, 0.36, 1]
        }}
        whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
        onClick={() => onOpenProject(project)}
        className={`h-full rounded-2xl bg-white/95 dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-white/10 hover:border-cyan-500/60 shadow-sm hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between text-left relative`}
      >
        {/* Specular Top Edge Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />

        {/* Subtle Ambient Glow */}
        <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${theme.bgShine} rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

        <div className="p-4 sm:p-4.5 space-y-2 flex-1 flex flex-col justify-between relative z-10">
          {/* Header & Client */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${theme.badge}`}>
                {project.industry}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-medium">
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
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 text-xs space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 block">
                Delivered Solution:
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-snug">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Footer / Tech Stack & CTA */}
          <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
            {/* Tech stack */}
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-mono text-[10px]">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-cyan-700 dark:text-cyan-400 font-bold group-hover:text-cyan-800 dark:group-hover:text-cyan-300 transition-colors">
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-16 sm:pt-20 pb-8 mesh-bg w-full overflow-hidden transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-3.5 relative z-10">
        {/* Header - Asymmetric Full-width */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 text-left"
        >
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
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="p-2 sm:p-2.5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-2 w-full"
        >
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
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 w-full">
          {filteredProjects.map((project, idx) => renderProjectCard(project, idx))}
        </div>

        {/* 6-Stage Engineering Process Lifecycle */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pt-2 w-full"
        >
          <ProcessSection />
        </motion.div>
      </div>
    </div>
  );
};

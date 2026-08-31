import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/companyData';
import { CaseStudy } from '../../types';
import { ProcessSection } from '../ProcessSection';
import {
  Briefcase,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';

interface ProjectsPageProps {
  onOpenProject: (project: CaseStudy) => void;
  onOpenContact: (scope?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenProject, onOpenContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Enterprise Software', 'Mobile Apps', 'Healthcare', 'SaaS Growth'];

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

  return (
    <div className="pt-24 pb-20 mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-sky-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Briefcase className="w-3.5 h-3.5 text-sky-400" />
            <span>Proven Engineering Deployments</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">
            Projects & Case Studies
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Explore how Global InfoSofts has engineered mission-critical ERP platforms, high-concurrency mobile apps, and high-conversion web platforms for global enterprises.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-500/25 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white glass-card'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-card text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/50"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenProject(project)}
              className="rounded-3xl glass-panel border border-white/15 hover:border-sky-500/50 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-sky-300 border border-sky-500/30">
                    {project.industry}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-mono">Client: {project.client} • {project.duration}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors font-['Outfit']">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {project.results.map((res, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-base sm:text-lg font-bold text-white font-mono">{res.value}</div>
                        <div className="text-[11px] text-slate-400 truncate">{res.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono text-[11px]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-sky-300 font-semibold pt-2">
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 6-Stage Agile Engineering Lifecycle */}
        <div className="pt-8">
          <ProcessSection />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/companyData';
import { CaseStudy } from '../types';
import { Card3DTilt } from './3d/Card3DTilt';
import { ArrowUpRight, TrendingUp, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenProject: (project: CaseStudy) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenProject }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const industries = ['all', 'Manufacturing & Distribution', 'Financial Technology', 'Healthcare & Medicine', 'B2B Enterprise Software'];

  const filteredProjects = selectedIndustry === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((p) => p.industry === selectedIndustry);

  return (
    <section id="case-studies" className="relative py-24 mesh-bg border-t border-white/10 overflow-hidden">
      {/* Abstract Blur Shape */}
      <div className="abstract-shape w-[500px] h-[500px] -top-24 -left-24 animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              Proven Global Deliveries
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Outfit']">
              Engineered Solutions. Verified Results.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore how our architecture eliminated operational bottlenecks, scaled high-concurrency mobile users, and multiplied business valuation.
            </p>
          </div>

          {/* Metric summary pill */}
          <div className="px-5 py-3 rounded-2xl glass-card text-xs text-slate-300 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white">$14M+ Combined ROI Generated</div>
              <div className="text-[11px] text-slate-400">Across 450+ client deployments</div>
            </div>
          </div>
        </div>

        {/* Industry Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {industries.map((ind) => (
            <button
              key={ind}
              id={`industry-btn-${ind}`}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedIndustry === ind
                  ? 'btn-primary text-white shadow-md'
                  : 'glass-card text-slate-300 hover:text-white'
              }`}
            >
              {ind === 'all' ? 'All Industries' : ind}
            </button>
          ))}
        </div>

        {/* Case Studies Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card3DTilt
              key={project.id}
              intensity={6}
              onClick={() => onOpenProject(project)}
              className="cursor-pointer group flex flex-col justify-between rounded-3xl project-card-gradient border border-white/15 hover:border-indigo-400/60 overflow-hidden transition-all duration-500 shadow-xl"
            >
              {/* Card Body */}
              <div className="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between relative z-10">
                <div className="space-y-4">
                  {/* Top Tags & Duration */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 group-hover:bg-indigo-500/25 transition-colors">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/5 text-slate-300 border border-white/10">
                        {project.duration}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-400 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">
                      {project.client} • {project.industry}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] group-hover:text-indigo-200 transition-colors leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-indigo-500/30 transition-all text-xs space-y-1">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                      Engineering Solution:
                    </div>
                    <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Technologies footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 group-hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-indigo-300 group-hover:text-indigo-200 flex items-center gap-1">
                    <span>Deep-dive analysis</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>
    </section>
  );
};

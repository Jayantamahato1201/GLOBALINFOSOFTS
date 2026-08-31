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
              intensity={8}
              onClick={() => onOpenProject(project)}
              className="cursor-pointer group flex flex-col justify-between rounded-3xl glass-card overflow-hidden transition-all duration-300 hover:border-indigo-500/50"
            >
              {/* Image Preview Banner */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold glass-card text-indigo-300">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono glass-card text-slate-300">
                    {project.duration}
                  </span>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-400 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">{project.client}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Content & Results */}
              <div className="p-6 sm:p-7 space-y-6">
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {project.summary}
                </p>

                {/* Key Metrics Bento */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {project.results.map((res, idx) => (
                    <div key={idx} className="p-2.5 rounded-2xl glass-card text-center">
                      <div className="text-sm sm:text-base font-extrabold text-indigo-300 font-['Outfit']">{res.value}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">{res.label}</div>
                    </div>
                  ))}
                </div>

                {/* Technologies footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-indigo-300 group-hover:underline flex items-center gap-1">
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

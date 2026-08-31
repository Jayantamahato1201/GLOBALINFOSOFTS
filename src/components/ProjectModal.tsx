import React from 'react';
import { CaseStudy } from '../types';
import { X, CheckCircle, ExternalLink, Calendar, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: CaseStudy | null;
  onClose: () => void;
  onConsult: (summary: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onConsult
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/15 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="btn-close-project-modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-card text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gradient Headline Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-950/80 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-slate-300 border border-white/10">
              {project.industry}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono text-slate-400">
              Duration: {project.duration}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            {project.title}
          </h3>
          <div className="text-xs text-indigo-300 font-mono">Client: {project.client}</div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Summary */}
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.summary}
          </p>

          {/* Challenge & Solution */}
          <div className="space-y-4 pt-2">
            <div className="p-4.5 rounded-2xl glass-card space-y-1.5">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">The Business Challenge:</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.challenge}</p>
            </div>

            <div className="p-4.5 rounded-2xl glass-card space-y-1.5">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">The Engineering Solution:</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Technologies Stack */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Technology Stack Implemented:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl glass-card text-xs font-mono text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 sm:p-6 bg-slate-950/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Want similar architecture engineered for your organization?
          </span>
          <button
            onClick={() => {
              onClose();
              onConsult(`Inquiring about similar solution to case study: ${project.title}`);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Request Similar System Scope</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { TEAM_MEMBERS } from '../../data/companyData';
import { PageId } from '../../types';
import {
  Users,
  Code2,
  Globe,
  Smartphone,
  TrendingUp,
  Headphones,
  ArrowRight
} from 'lucide-react';

interface TeamPageProps {
  onNavigatePage: (page: PageId) => void;
  onOpenContact: (scope?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenContact }) => {
  const getTeamIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-pink-600 dark:text-pink-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-lime-400" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      default:
        return <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
    }
  };

  return (
    <div className="pt-28 pb-20 mesh-bg min-h-screen relative overflow-hidden w-full transition-colors duration-300">
      <div className="abstract-shape-blue w-[500px] h-[500px] top-1/4 -left-20 animate-pulse-glow" />
      <div className="abstract-shape-pink w-[450px] h-[450px] bottom-1/4 -right-20 animate-pulse-glow" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
            <Users className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Our Team & Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Our Development Team
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Our team of software developers, database architects, web designers, and technical support specialists is dedicated to delivering reliable software and IT solutions for our clients in Jamshedpur and across Jharkhand.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="p-6 sm:p-7 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/15 project-card-gradient transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-4">
                {/* Header with Professional Icon and Initials Pill */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl glass-card border border-slate-200 dark:border-white/15 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all duration-300">
                    {getTeamIcon(member.iconName)}
                  </div>
                  {member.initials && (
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-cyan-500/10 dark:bg-cyan-950/80 backdrop-blur-md text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                      {member.initials}
                    </span>
                  )}
                </div>

                {/* Information */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Outfit']">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-1">{member.role}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{member.department}</div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed pt-1">
                  {member.bio}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-slate-200/80 dark:border-white/10 space-y-2">
                <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Focus & Technologies:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[11px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 group-hover:border-cyan-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Culture & Consultation Banner */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-cyan-500/10 via-slate-500/5 to-pink-500/10 dark:from-cyan-950/30 dark:via-slate-900/60 dark:to-pink-950/30">
          <div className="space-y-3 max-w-2xl text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              Have a Project in Mind?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Connect directly with our team in Jamshedpur to discuss your billing software, custom ERP, or website development requirements.
            </p>
          </div>
          <button
            onClick={() => onOpenContact('Discussion with Software Team')}
            className="px-6 py-3.5 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shadow-lg shrink-0"
          >
            <span>Contact Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

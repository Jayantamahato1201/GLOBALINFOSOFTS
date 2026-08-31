import React from 'react';
import { TEAM_MEMBERS } from '../../data/companyData';
import { TeamMember, PageId } from '../../types';
import {
  Users,
  Code2,
  Globe,
  Smartphone,
  TrendingUp,
  Headphones,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface TeamPageProps {
  onNavigatePage: (page: PageId) => void;
  onOpenContact: (scope?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigatePage, onOpenContact }) => {
  const getTeamIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-indigo-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-indigo-400" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-indigo-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-indigo-400" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-indigo-400" />;
      default:
        return <Users className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="pt-24 pb-20 mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Our Team</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">
            Our Team
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our dedicated team of software developers, web designers, mobile application engineers, and technical support specialists is committed to delivering quality software and IT services for our clients.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/15 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header with Professional Icon and Initials Pill */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl glass-card border border-white/15 flex items-center justify-center group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-all duration-300 shadow-inner">
                    {getTeamIcon(member.iconName)}
                  </div>
                  {member.initials && (
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
                      {member.initials}
                    </span>
                  )}
                </div>

                {/* Information */}
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit'] group-hover:text-indigo-300 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-medium text-indigo-400 mt-1">{member.role}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{member.department}</div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-1">
                  {member.bio}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-white/10 space-y-2">
                <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Key Focus & Capabilities:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-mono text-slate-300 border border-white/10 group-hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Culture & Hiring Banner */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-indigo-950/30 to-purple-950/30">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
              Have a Project in Mind?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Connect directly with our leadership and engineering team in Jamshedpur to discuss your custom software, ERP, or web development needs.
            </p>
          </div>
          <button
            onClick={() => onOpenContact('Discussion with Engineering Team')}
            className="px-6 py-3.5 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shadow-lg"
          >
            <span>Contact Engineering Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

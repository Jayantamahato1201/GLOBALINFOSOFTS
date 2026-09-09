import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, User, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { CardSectionBackground } from '../CardSectionBackground';

interface MeetExpertsSectionProps {
  onOpenContact: (scope?: string) => void;
}

export const MeetExpertsSection: React.FC<MeetExpertsSectionProps> = ({ onOpenContact }) => {
  const { team: cmsTeam, getSection } = useCms();
  const sectionData = getSection('experts', 'home') || getSection('sec-home-experts');

  const EXPERTS = [
    {
      id: 'manoj',
      name: 'Manoj Mahato',
      role: 'Full Stack Developer',
      initials: 'MM',
      bio: 'Expert in React and Node.js ecosystems. Dedicated to crafting seamless user experiences and robust backend solutions.',
      avatar: '',
      socials: [
        { type: 'github', url: 'https://github.com/manoj-mahato' },
        { type: 'instagram', url: 'https://instagram.com' },
        { type: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    {
      id: 'shruti',
      name: 'Shruti Kumari',
      role: 'Full Stack Developer',
      initials: 'SK',
      bio: 'Passionate about building scalable web applications with modern technologies. Loves clean code and creative problem-solving.',
      avatar: '',
      socials: [
        { type: 'github', url: 'https://github.com/shruti-kumari' },
        { type: 'instagram', url: 'https://instagram.com' },
        { type: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    {
      id: 'rajnish',
      name: 'Rajnish Kumar',
      role: 'Senior Developer',
      initials: 'RK',
      bio: '10+ years of experience in software development. Specializes in system architecture and mentoring junior developers.',
      avatar: '',
      socials: [
        { type: 'github', url: 'https://github.com/rajnish-kumar' },
        { type: 'twitter', url: 'https://twitter.com' },
        { type: 'linkedin', url: 'https://linkedin.com' }
      ]
    }
  ];

  const displayExperts = cmsTeam && cmsTeam.length > 0
    ? cmsTeam.slice(0, 3).map((m, idx) => ({
        id: m.id || EXPERTS[idx]?.id || `expert-${idx}`,
        name: m.name || EXPERTS[idx]?.name,
        role: m.role || EXPERTS[idx]?.role,
        initials: m.initials || m.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
        bio: m.bio || EXPERTS[idx]?.bio,
        avatar: (m as any).avatar || '',
        socials: (m as any).socials && (m as any).socials.length > 0
          ? (m as any).socials
          : EXPERTS[idx]?.socials || [
              { type: 'github', url: 'https://github.com' },
              { type: 'linkedin', url: 'https://linkedin.com' }
            ]
      }))
    : EXPERTS;

  const sectionTitle = sectionData?.title || 'Meet the Experts';
  const sectionSubtitle = sectionData?.subtitle || 'A passionate team of developers dedicated to building innovative solutions and delivering exceptional digital experiences.';

  const renderSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
      case 'x':
        return <Twitter className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <section
      id="our-team"
      className="py-14 sm:py-20 relative z-10 border-t border-slate-200/80 dark:border-white/10 card-section-datacenter-bg overflow-hidden transition-colors duration-300"
    >
      {/* High-Tech Cloud Datacenter & Global Infrastructure Background Layer */}
      <CardSectionBackground
        opacity="opacity-35 dark:opacity-20"
        overlayOpacity="bg-slate-100/60 dark:bg-[#07090F]/85"
      />

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase font-mono block mb-2"
          >
            OUR TEAM
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-['Sora'] tracking-tight text-slate-900 dark:text-white"
          >
            Meet the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600">
              Experts
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed"
          >
            {sectionSubtitle}
          </motion.p>
        </div>

        {/* 3 Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
          {displayExperts.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="rounded-2xl sm:rounded-3xl p-7 sm:p-8 glass-card-transparent bg-white/70 dark:bg-[#080D1A]/75 border border-slate-200/80 dark:border-cyan-500/20 hover:border-cyan-500/60 dark:hover:border-cyan-500/60 shadow-lg dark:shadow-[0_0_35px_rgba(6,182,212,0.08)] backdrop-blur-2xl flex flex-col items-center text-center transition-all duration-300 group"
            >
              {/* Executive Avatar Container with Logo-themed Cyan/Sky/Blue gradient ring */}
              <div className="relative mb-5">
                {/* Ambient glow ring */}
                <div className="absolute inset-0 rounded-full blur-md bg-cyan-500/25 group-hover:bg-cyan-500/40 transition-all duration-300" />
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2.5px] bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 relative z-10 shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full rounded-full bg-slate-50 dark:bg-[#090e1a] flex flex-col items-center justify-center border border-slate-200/50 dark:border-slate-800/80 transition-colors group-hover:border-cyan-500/40 overflow-hidden">
                    <User className="w-11 h-11 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Member Name */}
              <h3 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 tracking-tight transition-colors duration-200">
                {member.name}
              </h3>

              {/* Role Pill */}
              <div className="mt-1.5 mb-4">
                <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-[11px] font-bold font-mono text-cyan-700 dark:text-cyan-400">
                  {member.role}
                </span>
              </div>

              {/* Bio Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-6 flex-1 max-w-xs">
                {member.bio}
              </p>

              {/* Social Icons Pill Container */}
              <div className="px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-[#070c16] border border-slate-200 dark:border-slate-800/80 flex items-center justify-center gap-3 shadow-sm">
                {member.socials.map((soc: any) => (
                  <a
                    key={soc.type}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center text-xs font-bold transition-all shadow-sm active:scale-95"
                    aria-label={`${member.name} ${soc.type}`}
                  >
                    {renderSocialIcon(soc.type)}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Careers Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center space-y-3"
        >
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Want to join our growing team?
          </p>
          <button
            onClick={() => onOpenContact('Career Application')}
            className="px-7 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:brightness-110 text-white font-mono font-bold text-xs sm:text-sm tracking-wide inline-flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer active:scale-95 group"
          >
            <span>View Open Positions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

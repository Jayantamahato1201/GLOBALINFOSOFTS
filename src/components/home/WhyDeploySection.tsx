import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Zap, Headphones, ArrowRight } from 'lucide-react';
import { CardSectionBackground } from '../CardSectionBackground';

interface WhyDeploySectionProps {
  onOpenContact: (scope?: string) => void;
}

export const WhyDeploySection: React.FC<WhyDeploySectionProps> = ({ onOpenContact }) => {
  const TACTICAL_CARDS = [
    {
      num: '01',
      numColor: 'text-[#00dfef]',
      numBorder: 'border-[#00dfef]/40',
      numBg: 'bg-[#00dfef]/10',
      hexBorder: '#00dfef',
      hexGlow: 'rgba(0, 223, 239, 0.25)',
      icon: ShieldCheck,
      iconColor: 'text-[#00dfef]',
      title: 'Expertise & Experience',
      titleColor: 'text-slate-900 dark:text-white',
      description: 'Years of battle-tested experience delivering high-quality, resilient software solutions.'
    },
    {
      num: '02',
      numColor: 'text-[#ec4899]',
      numBorder: 'border-[#ec4899]/40',
      numBg: 'bg-[#ec4899]/10',
      hexBorder: '#ec4899',
      hexGlow: 'rgba(236, 72, 153, 0.25)',
      icon: Target,
      iconColor: 'text-[#ec4899]',
      title: 'Mission-Focused Approach',
      titleColor: 'text-slate-900 dark:text-white',
      description: 'We prioritize your objectives, tailoring every solution to ensure mission success and satisfaction.'
    },
    {
      num: '03',
      numColor: 'text-[#f59e0b]',
      numBorder: 'border-[#f59e0b]/40',
      numBg: 'bg-[#f59e0b]/10',
      hexBorder: '#f59e0b',
      hexGlow: 'rgba(245, 158, 11, 0.25)',
      icon: Zap,
      iconColor: 'text-[#f59e0b]',
      title: 'Next-Gen Technologies',
      titleColor: 'text-slate-900 dark:text-white',
      description: 'Harnessing the latest frameworks and tools to build powerful, future-proof applications.'
    },
    {
      num: '04',
      numColor: 'text-[#10b981]',
      numBorder: 'border-[#10b981]/40',
      numBg: 'bg-[#10b981]/10',
      hexBorder: '#10b981',
      hexGlow: 'rgba(16, 185, 129, 0.25)',
      icon: Headphones,
      iconColor: 'text-[#10b981]',
      title: '24/7 Tactical Support',
      titleColor: 'text-rose-500 dark:text-[#FF2A75]',
      description: 'Our dedicated support squad is always online, ready to assist you at a moment\'s notice.',
      hasAccentLine: true
    }
  ];

  return (
    <section
      id="why-deploy"
      className="py-14 sm:py-20 relative z-10 border-t border-slate-200/80 dark:border-white/10 card-section-datacenter-bg transition-colors duration-300 overflow-hidden"
    >
      {/* High-Tech Cloud Datacenter & Global Infrastructure Background Layer */}
      <CardSectionBackground
        opacity="opacity-35 dark:opacity-20"
        overlayOpacity="bg-slate-100/60 dark:bg-[#07090F]/85"
      />

      {/* Background ambient radial tactical glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF0055]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Top Status Capsule */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/20 dark:bg-[#160b13] border border-red-500/30 text-[11px] font-bold font-['JetBrains_Mono'] text-red-600 dark:text-red-400 tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF0055] animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
        </motion.div>

        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-['Sora'] tracking-tight text-slate-900 dark:text-white"
          >
            Why <span className="text-[#FF0055] dark:text-[#FF1464]">Deploy</span> With Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed"
          >
            We are more than a vendor—we are your strategic partner in technological warfare, committed to your victory.
          </motion.p>
        </div>

        {/* 4 Tactical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {TACTICAL_CARDS.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left transition-all duration-300 group overflow-hidden border glass-card-transparent ${
                  card.hasAccentLine
                    ? 'border-emerald-500/30 dark:border-emerald-500/30 bg-white/65 dark:bg-[#0D141C]/70 shadow-lg dark:shadow-[0_0_30px_rgba(16,185,129,0.06)]'
                    : 'border-slate-200/80 dark:border-cyan-500/20 hover:border-slate-300 dark:hover:border-cyan-500/40 bg-white/60 dark:bg-[#080D1A]/65 shadow-md'
                }`}
              >
                {/* Number Diamond Badge at top right */}
                <div className="absolute top-3.5 right-3.5 flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rotate-45 flex items-center justify-center rounded-sm border ${card.numBorder} ${card.numBg}`}
                  >
                    <span className={`-rotate-45 text-[10px] font-bold font-['JetBrains_Mono'] ${card.numColor}`}>
                      {card.num}
                    </span>
                  </div>
                </div>

                {/* Hexagonal Neon Icon Container */}
                <div className="mb-6 flex items-center">
                  <div
                    className="relative w-14 h-14 flex items-center justify-center"
                    style={{
                      filter: `drop-shadow(0 0 10px ${card.hexGlow})`
                    }}
                  >
                    {/* SVG Hexagon outline */}
                    <svg viewBox="0 0 60 60" className="w-full h-full absolute inset-0">
                      <polygon
                        points="30,3 56,17 56,43 30,57 4,43 4,17"
                        fill="rgba(15, 23, 42, 0.6)"
                        stroke={card.hexBorder}
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <IconComp className={`w-6 h-6 ${card.iconColor} relative z-10`} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2.5 flex-1">
                  <h3 className={`text-base sm:text-lg font-bold font-['Sora'] tracking-tight ${card.titleColor}`}>
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Bottom accent glow bar for tactical support */}
                {card.hasAccentLine && (
                  <div className="mt-5 pt-2">
                    <div className="w-12 h-1 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Central Tactical CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 sm:mt-12 flex justify-center"
        >
          <button
            onClick={() => onOpenContact('Mission Consultation')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF0055] via-[#FF1464] to-[#E6004C] hover:brightness-110 text-white font-['JetBrains_Mono'] font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2.5 shadow-xl shadow-rose-900/30 transition-all cursor-pointer active:scale-95 group"
          >
            <span>Start Your Mission</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

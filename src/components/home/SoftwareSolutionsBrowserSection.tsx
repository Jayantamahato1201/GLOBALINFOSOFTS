import React from 'react';
import { motion } from 'motion/react';
import { Lock, ExternalLink } from 'lucide-react';
import { CardSectionBackground } from '../CardSectionBackground';
import sevenFinancialsScrollImg from '../../assets/images/seven_financials_scroll_1788501522050.jpg';
import riddhiArchitectScrollImg from '../../assets/images/riddhi_architect_scroll_1788501544006.jpg';
import kubberxGamingScrollImg from '../../assets/images/kubberx_gaming_scroll_1788501563904.jpg';

interface SoftwareSolutionsBrowserSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export const SoftwareSolutionsBrowserSection: React.FC<SoftwareSolutionsBrowserSectionProps> = ({
  onSelectProject
}) => {
  const SOLUTIONS_SHOWCASE = [
    {
      id: 'seven-financials',
      url: 'sevenfinancials.in',
      image: sevenFinancialsScrollImg,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
      externalUrl: 'https://sevenfinancials.in'
    },
    {
      id: 'riddhi-architect',
      url: 'riddhisiddhiarchitect.in',
      image: riddhiArchitectScrollImg,
      title: 'Architect Solutions',
      description: 'Secure, scalable online stores with seamless payment integration and inventory management.',
      externalUrl: 'https://riddhisiddhiarchitect.in'
    },
    {
      id: 'kubberx',
      url: 'kubberx.in',
      image: kubberxGamingScrollImg,
      title: 'Gaming Platform',
      description: 'Engaging online gaming experience with smooth gameplay, modern design, and interactive features.',
      externalUrl: 'https://kubberx.in'
    }
  ];

  return (
    <section
      id="software-solutions"
      className="py-14 sm:py-20 relative z-10 border-t border-slate-200/80 dark:border-white/10 card-section-datacenter-bg overflow-hidden transition-colors duration-300"
    >
      {/* High-Tech Cloud Datacenter & Global Infrastructure Background Layer */}
      <CardSectionBackground
        opacity="opacity-40 dark:opacity-25"
        overlayOpacity="bg-slate-50/70 dark:bg-[#07090F]/85"
      />

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-['Sora'] tracking-tight text-[#FF0055] dark:text-[#FF1464] drop-shadow-sm"
          >
            Our Software Solutions
          </motion.h2>
        </div>

        {/* 3 Browser Mockup Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 max-w-7xl mx-auto items-stretch">
          {SOLUTIONS_SHOWCASE.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => onSelectProject && onSelectProject(item.id)}
              className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 dark:border-cyan-500/20 hover:border-cyan-500/50 glass-card-transparent bg-white/60 dark:bg-[#070B14]/65 backdrop-blur-2xl shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-cyan-500/10 flex flex-col justify-between transition-all duration-300 group text-left cursor-pointer relative overflow-hidden"
            >
              {/* Subtle ambient back-glow on hover */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Browser Window Frame */}
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#070B14] flex flex-col relative z-10">
                {/* Browser Chrome Header */}
                <div className="px-3 py-2 sm:py-2.5 bg-slate-200/80 dark:bg-[#0E1322] border-b border-slate-300/70 dark:border-white/10 flex items-center gap-2">
                  {/* Traffic Light Window Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>

                  {/* Browser URL Address Bar */}
                  <div className="flex-1 mx-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#070B14] border border-slate-300/80 dark:border-white/10 text-[10px] sm:text-[11px] font-['JetBrains_Mono'] text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 shadow-inner truncate">
                    <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{item.url}</span>
                  </div>

                  {/* External preview indicator */}
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyan-400 transition-colors p-0.5"
                    aria-label={`Open ${item.url}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Viewport Image Frame */}
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-slate-950 group/screen">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full object-cover object-top transition-all duration-[2500ms] ease-in-out group-hover:scale-105"
                  />
                  {/* Subtle shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Information below the browser frame */}
              <div className="pt-4 pb-1 px-1 space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold font-['Sora'] text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
                    Details →
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

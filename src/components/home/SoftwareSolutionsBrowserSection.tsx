import React from 'react';
import { motion } from 'motion/react';
import { Lock, ExternalLink } from 'lucide-react';
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
      className="py-14 sm:py-20 relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-[#07090F] transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
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
              className="rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-slate-200 dark:border-red-950/40 hover:border-[#FF0055]/50 bg-white dark:bg-[#0D0F19] shadow-lg dark:shadow-[0_0_35px_rgba(255,0,85,0.06)] flex flex-col justify-between transition-all duration-300 group text-left"
            >
              {/* Browser Window Frame */}
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-[#121524] flex flex-col">
                {/* Browser Chrome Header */}
                <div className="px-3 py-2 sm:py-2.5 bg-slate-200/80 dark:bg-[#181B2D] border-b border-slate-300/70 dark:border-slate-800 flex items-center gap-2">
                  {/* Traffic Light Window Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>

                  {/* Browser URL Address Bar */}
                  <div className="flex-1 mx-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#0D0F19] border border-slate-300/80 dark:border-slate-800 text-[10px] sm:text-[11px] font-['JetBrains_Mono'] text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 shadow-inner truncate">
                    <Lock className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{item.url}</span>
                  </div>

                  {/* External preview indicator */}
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#FF0055] transition-colors p-0.5"
                    aria-label={`Open ${item.url}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Viewport Image Frame */}
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-slate-900 group/screen">
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
              <div className="pt-5 pb-2 px-1 space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold font-['Sora'] text-slate-900 dark:text-white group-hover:text-[#FF0055] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
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

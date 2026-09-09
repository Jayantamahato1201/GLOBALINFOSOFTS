import React from 'react';
import { motion } from 'motion/react';

interface CertificationItem {
  id: string;
  name: string;
  badgeSrc: string;
  regNumber: string;
  alt: string;
}

const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'iso',
    name: 'ISO 9001:2015 Quality Management System',
    badgeSrc: '/assets/certifications/iso-badge.svg',
    regNumber: '25-07-2016140',
    alt: 'ISO Quality Certification'
  },
  {
    id: 'uk-compliance',
    name: 'United Kingdom Compliance Original Certificate',
    badgeSrc: '/assets/certifications/uk-compliance-badge.svg',
    regNumber: '25-07-2016138',
    alt: 'United Kingdom Compliance Original Certificate'
  },
  {
    id: 'bqa',
    name: 'Business Quality Assurance Certifications',
    badgeSrc: '/assets/certifications/quality-assurance-badge.svg',
    regNumber: '25-07-2016139',
    alt: 'Business Quality Assurance Certifications'
  },
  {
    id: 'anglia',
    name: 'Anglia Compliance Enterprise Accreditation',
    badgeSrc: '/assets/certifications/anglia-compliance-badge.svg',
    regNumber: '25-07-2016140',
    alt: 'Anglia Compliance European Accreditation'
  }
];

export const FooterCertifications: React.FC = () => {
  return (
    <div className="w-full my-6 sm:my-8 select-none">
      {/* Outer Banner Frame matching website theme */}
      <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 bg-white/70 dark:bg-[#070B14]/85 border border-slate-200/90 dark:border-cyan-500/30 shadow-md dark:shadow-[0_0_40px_rgba(6,182,212,0.1)] backdrop-blur-xl overflow-hidden transition-all duration-300">
        {/* Subtle Ambient Radial Backlights matching website theme */}
        <div className="absolute top-0 left-1/4 w-80 h-32 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-32 bg-sky-400/10 rounded-full blur-[90px] pointer-events-none" />

        {/* 4 Square White Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6 relative z-10">
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="relative rounded-2xl sm:rounded-3xl p-1 bg-slate-50 dark:bg-[#0c1324] border border-slate-200/90 dark:border-cyan-500/30 shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-cyan-500/60 dark:hover:border-cyan-400 transition-all duration-300 group"
            >
              {/* Inner Pure White Badge Canvas */}
              <div className="w-full aspect-square max-h-[220px] rounded-[14px] sm:rounded-[20px] bg-white p-3 sm:p-5 flex items-center justify-center overflow-hidden transition-transform">
                <img
                  src={cert.badgeSrc}
                  alt={cert.alt}
                  title={cert.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Registration Numbers Inset Strip */}
        <div className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl py-3 px-4 sm:px-8 bg-slate-100/90 dark:bg-[#040812] border border-slate-200/80 dark:border-cyan-500/20 shadow-inner relative z-10">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-around gap-2 sm:gap-4 text-center">
            {CERTIFICATIONS_DATA.map((cert, idx) => (
              <React.Fragment key={`reg-${cert.id}`}>
                <div className="flex items-center justify-center flex-1 min-w-[130px]">
                  <span className="font-mono font-bold text-xs sm:text-sm md:text-[15px] text-cyan-600 dark:text-cyan-400 tracking-wider hover:text-cyan-500 dark:hover:text-cyan-200 transition-colors cursor-default">
                    {cert.regNumber}
                  </span>
                </div>
                {/* Dot bullet separator between items */}
                {idx < CERTIFICATIONS_DATA.length - 1 && (
                  <div className="hidden sm:flex items-center justify-center text-cyan-500/60 dark:text-cyan-400/60 text-xs select-none">
                    •
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

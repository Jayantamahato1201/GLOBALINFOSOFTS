import React from 'react';

interface CardSectionBackgroundProps {
  className?: string;
  opacity?: string;
  overlayOpacity?: string;
}

export const CardSectionBackground: React.FC<CardSectionBackgroundProps> = ({
  className = '',
  opacity = 'opacity-35 dark:opacity-20',
  overlayOpacity = 'bg-slate-50/70 dark:bg-[#070B14]/85'
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* High-Tech Cloud Datacenter & Global Network Background Asset */}
      <img
        src="/assets/datacenter-cloud-bg.svg"
        alt="Cloud Datacenter Infrastructure Background"
        referrerPolicy="no-referrer"
        loading="lazy"
        className={`w-full h-full object-cover object-center ${opacity} filter saturate-125 transition-opacity duration-500 scale-105`}
      />

      {/* Dynamic Frosted Overlay ensuring high contrast for text in both light and dark themes */}
      <div className={`absolute inset-0 backdrop-blur-[2px] ${overlayOpacity} transition-colors duration-300`} />

      {/* Cyber Ambient Radial Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px]" />

      {/* Top and bottom subtle blending fade */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[var(--bg-body)] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--bg-body)] to-transparent pointer-events-none" />
    </div>
  );
};

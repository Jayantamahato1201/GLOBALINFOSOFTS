import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-95 ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/60 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
          : 'bg-white/90 hover:bg-slate-100 text-slate-800 border border-slate-300/80 shadow-[0_2px_10px_rgba(0,0,0,0.08)]'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Animated Sun & Moon Icons */}
        <Sun
          className={`w-4 h-4 text-amber-500 transition-all duration-500 transform absolute ${
            isDark
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100 text-amber-500'
          }`}
        />
        <Moon
          className={`w-4 h-4 text-cyan-400 transition-all duration-500 transform absolute ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-cyan-400'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
        />
      </div>

      <span className="text-[11px] font-semibold tracking-wide capitalize font-mono">
        {isDark ? 'Dark' : 'Light'}
      </span>

      {/* Subtle indicator pill */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-amber-500 shadow-[0_0_6px_#f59e0b]'
        }`}
      />
    </button>
  );
};

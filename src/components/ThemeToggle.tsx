import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors duration-300 select-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer overflow-hidden backdrop-blur-md ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800/95 text-cyan-300 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
          : 'bg-white/95 hover:bg-slate-100 text-amber-500 border border-slate-200/90 shadow-[0_4px_16px_rgba(245,158,11,0.2)]'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Subtle animated inner glow circle */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: isDark ? [0.2, 0.4, 0.2] : [0.25, 0.5, 0.25],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute inset-0 rounded-full blur-[6px] pointer-events-none ${
          isDark ? 'bg-cyan-500/30' : 'bg-amber-400/40'
        }`}
      />

      {/* Animated Icon Swap (No text, strictly professional fluid icon transition) */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0.3, opacity: 0, filter: 'blur(2px)' }}
            animate={{ rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ rotate: 90, scale: 0.3, opacity: 0, filter: 'blur(2px)' }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 22,
              mass: 0.8
            }}
            className="relative z-10 flex items-center justify-center text-cyan-300"
          >
            <Moon className="w-[18px] h-[18px] stroke-[2.2] drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0.3, opacity: 0, filter: 'blur(2px)' }}
            animate={{ rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ rotate: -90, scale: 0.3, opacity: 0, filter: 'blur(2px)' }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 22,
              mass: 0.8
            }}
            className="relative z-10 flex items-center justify-center text-amber-500"
          >
            <Sun className="w-[18px] h-[18px] stroke-[2.2] drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};



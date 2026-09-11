import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  ExternalLink,
  ArrowRight,
  Bell,
  Gift,
  AlertTriangle,
  Flame,
  Maximize2,
  Calendar,
  CheckCircle2,
  Clock,
  Timer
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { CmsNotification } from '../admin/cmsTypes';

interface AnnouncementPopupProps {
  previewData?: CmsNotification | null;
  forceShowNotification?: CmsNotification | null;
  onClosePreview?: () => void;
  onNavigatePage?: (page: string) => void;
}

// Lightweight celebratory confetti particle
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  delay: number;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// Helper to parse dates with accurate hour/minute or end-of-day defaults
const parseTimestamp = (dateStr?: string, isEnd: boolean = false): number => {
  if (!dateStr || !dateStr.trim()) return NaN;
  const trimmed = dateStr.trim();
  // If string does not contain time (e.g. YYYY-MM-DD), default appropriately
  if (!trimmed.includes('T') && !trimmed.includes(':')) {
    const d = new Date(trimmed);
    if (isEnd) {
      d.setHours(23, 59, 59, 999);
    } else {
      d.setHours(0, 0, 0, 0);
    }
    return d.getTime();
  }
  return new Date(trimmed).getTime();
};

export const AnnouncementPopup: React.FC<AnnouncementPopupProps> = ({
  previewData,
  forceShowNotification,
  onClosePreview,
  onNavigatePage
}) => {
  const { activeNotification, refreshCmsData } = useCms();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [posterEnlarged, setPosterEnlarged] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [countdown, setCountdown] = useState<TimeRemaining | null>(null);

  // The notification to display is either explicit preview data or the active notification from CMS
  const activeCandidate = previewData || forceShowNotification || activeNotification || null;
  const isPreviewMode = Boolean(previewData || forceShowNotification);
  const notification: CmsNotification | null = activeCandidate;

  // Real-time countdown timer & auto-dismiss engine
  useEffect(() => {
    if (!notification || !notification.isActive) {
      setCountdown(null);
      return;
    }

    const endMs = parseTimestamp(notification.endDate, true);
    if (isNaN(endMs)) {
      setCountdown(null);
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const diff = endMs - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        // Automatically close popup when timer reaches zero!
        if (!isPreviewMode) {
          setIsVisible(false);
          // Trigger server cleanup
          fetch('/api/notifications/check-scheduler', { method: 'POST' }).catch(() => {});
          refreshCmsData?.();
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds, isExpired: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [notification, isPreviewMode, refreshCmsData]);

  useEffect(() => {
    if (!notification || !notification.isActive) {
      setIsVisible(false);
      return;
    }

    // In preview mode, always show immediately
    if (isPreviewMode) {
      setIsVisible(true);
      generateConfetti(notification.enableConfetti);
      return;
    }

    // Date range validation: if admin has marked isActive, it is live now!
    // Only block if explicitly marked as scheduled draft for the future.
    const now = Date.now();
    if (!notification.isActive && notification.isScheduled && notification.startDate) {
      const startMs = parseTimestamp(notification.startDate, false);
      if (!isNaN(startMs) && now < startMs) {
        setIsVisible(false);
        return;
      }
    }
    if (notification.endDate) {
      const endMs = parseTimestamp(notification.endDate, true);
      if (!isNaN(endMs) && now >= endMs) {
        setIsVisible(false);
        return;
      }
    }

    // Session-based dismissal check (scoped to notification ID and update timestamp)
    const sessionKey = `gis_announcement_dismissed_${notification.id}_${notification.updatedAt || 'v1'}`;
    const isDismissed = sessionStorage.getItem(sessionKey);
    if (isDismissed && !isPreviewMode) {
      setIsVisible(false);
      return;
    }

    // Trigger popup with smooth display delay (max 400ms)
    const delay = Math.min(notification.displayDelayMs !== undefined ? notification.displayDelayMs : 300, 400);
    const timer = setTimeout(() => {
      setIsVisible(true);
      generateConfetti(notification.enableConfetti);
    }, delay);

    return () => clearTimeout(timer);
  }, [notification, isPreviewMode]);

  const generateConfetti = (enabled?: boolean) => {
    if (!enabled) {
      setConfetti([]);
      return;
    }
    const colors = ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#eab308', '#ef4444'];
    const particles: ConfettiParticle[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: -10 - Math.random() * 20,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      delay: Math.random() * 0.8
    }));
    setConfetti(particles);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (notification && !isPreviewMode) {
      const sessionKey = `gis_announcement_dismissed_${notification.id}_${notification.updatedAt || 'v1'}`;
      try {
        sessionStorage.setItem(sessionKey, 'true');
      } catch {}
    }
    if (onClosePreview) {
      onClosePreview();
    }
  };

  const handleCtaClick = () => {
    if (!notification) return;
    handleDismiss();

    if (notification.ctaLink) {
      const link = notification.ctaLink.trim();
      if (link.startsWith('#')) {
        // Handle hash navigation (e.g. #contact)
        const targetId = link.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else if (onNavigatePage) {
          onNavigatePage(targetId);
        }
      } else if (link.startsWith('/')) {
        const pageRoute = link.replace(/^\//, '');
        if (onNavigatePage) {
          onNavigatePage(pageRoute);
        } else {
          window.location.href = link;
        }
      } else {
        // External URL
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  if (!notification || !isVisible) {
    return null;
  }

  // Theme styling based on type and custom themeColor
  const theme = notification.themeColor || (notification.type === 'festival' ? 'amber' : 'indigo');

  const themeConfig = {
    amber: {
      accent: 'amber',
      border: 'border-amber-500/30',
      badgeBg: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
      btnBg: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold shadow-amber-500/25',
      glow: 'from-amber-500/15 via-orange-500/5 to-transparent',
      icon: <Flame className="w-4 h-4 text-amber-400" />
    },
    emerald: {
      accent: 'emerald',
      border: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      btnBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold shadow-emerald-500/25',
      glow: 'from-emerald-500/15 via-teal-500/5 to-transparent',
      icon: <Gift className="w-4 h-4 text-emerald-400" />
    },
    rose: {
      accent: 'rose',
      border: 'border-rose-500/30',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      btnBg: 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold shadow-rose-500/25',
      glow: 'from-rose-500/15 via-pink-500/5 to-transparent',
      icon: <Sparkles className="w-4 h-4 text-rose-400" />
    },
    cyan: {
      accent: 'cyan',
      border: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      btnBg: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-cyan-500/25',
      glow: 'from-cyan-500/15 via-blue-500/5 to-transparent',
      icon: <Bell className="w-4 h-4 text-cyan-400" />
    },
    indigo: {
      accent: 'indigo',
      border: 'border-indigo-500/30',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      btnBg: 'bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold shadow-indigo-500/25',
      glow: 'from-indigo-500/15 via-violet-500/5 to-transparent',
      icon: <Bell className="w-4 h-4 text-indigo-400" />
    }
  }[theme as 'amber' | 'emerald' | 'rose' | 'cyan' | 'indigo'] || {
    accent: 'amber',
    border: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    btnBg: 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold shadow-amber-500/25',
    glow: 'from-amber-500/15 to-transparent',
    icon: <Sparkles className="w-4 h-4 text-amber-400" />
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="announcement-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={handleDismiss}
        >
          {/* Confetti particles */}
          {confetti.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                top: '-5%',
                left: `${p.x}%`,
                opacity: 1,
                rotate: p.rotation
              }}
              animate={{
                top: '105%',
                left: `${p.x + (Math.random() * 20 - 10)}%`,
                opacity: [1, 1, 0],
                rotate: p.rotation + 720
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                ease: 'easeOut',
                delay: p.delay,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="pointer-events-none fixed z-[10000] rounded-sm"
              style={{
                width: `${p.size}px`,
                height: `${p.size * 0.7}px`,
                backgroundColor: p.color
              }}
            />
          ))}

          {/* Modal Card */}
          <motion.div
            key="announcement-modal"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-xl bg-slate-900/95 border ${themeConfig.border} rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/80 overflow-hidden my-auto text-slate-100 backdrop-blur-xl flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Festive Glow Header */}
            <div
              className={`absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b ${themeConfig.glow} blur-3xl pointer-events-none`}
            />

            {/* Top Bar with Badge & Dismiss Button */}
            <div className="relative z-10 px-5 pt-5 pb-2 flex items-center justify-between">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${themeConfig.badgeBg}`}
              >
                {themeConfig.icon}
                <span>{notification.badgeText || 'Announcement'}</span>
              </div>

              <button
                type="button"
                onClick={handleDismiss}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
                title="Close notification"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Image Section (if provided) */}
            {notification.imageUrl && (
              <div className="relative px-5 pt-2">
                <div className="relative group rounded-xl sm:rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/50 shadow-inner max-h-64 sm:max-h-80 flex items-center justify-center">
                  <img
                    src={notification.imageUrl}
                    alt={notification.title}
                    className="w-full h-auto max-h-64 sm:max-h-80 object-cover object-center transform transition-transform duration-500 group-hover:scale-[1.02]"
                    onError={(e) => {
                      // Fallback if URL is invalid
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Expand Image Button */}
                  <button
                    type="button"
                    onClick={() => setPosterEnlarged(true)}
                    className="absolute bottom-2 right-2 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="View Full Poster"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className="relative z-10 p-5 sm:p-6 space-y-3">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {notification.title}
                </h3>
                {notification.subtitle && (
                  <p className="text-sm font-medium text-amber-200/90 leading-relaxed">
                    {notification.subtitle}
                  </p>
                )}
              </div>

              {notification.message && (
                <div className="text-sm text-slate-300 leading-relaxed max-h-44 overflow-y-auto pr-1 custom-scrollbar whitespace-pre-line">
                  {notification.message}
                </div>
              )}

              {/* Live Countdown Timer Banner (if scheduled with end date) */}
              {countdown && !countdown.isExpired && notification.showCountdownTimer !== false && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/25 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{notification.countdownTitle || 'Limited Time Event / Offer'}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Auto-expires when timer hits zero</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs self-start sm:self-auto">
                    {countdown.days > 0 && (
                      <div className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-center min-w-[36px]">
                        <span className="font-extrabold text-white text-sm leading-none block">
                          {String(countdown.days).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase font-sans">days</span>
                      </div>
                    )}
                    <div className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-center min-w-[36px]">
                      <span className="font-extrabold text-white text-sm leading-none block">
                        {String(countdown.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase font-sans">hrs</span>
                    </div>
                    <span className="text-slate-500 font-bold px-0.5">:</span>
                    <div className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-center min-w-[36px]">
                      <span className="font-extrabold text-white text-sm leading-none block">
                        {String(countdown.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase font-sans">min</span>
                    </div>
                    <span className="text-slate-500 font-bold px-0.5">:</span>
                    <div className="px-2 py-1 rounded-lg bg-slate-900 border border-amber-500/40 text-center min-w-[36px] shadow-sm shadow-amber-500/10">
                      <span className="font-extrabold text-amber-400 text-sm leading-none block">
                        {String(countdown.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] text-amber-400/80 uppercase font-sans">sec</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                {notification.ctaText && (
                  <button
                    type="button"
                    onClick={handleCtaClick}
                    className={`w-full sm:flex-1 py-3 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 ${themeConfig.btnBg}`}
                  >
                    <span>{notification.ctaText}</span>
                    {notification.ctaLink?.startsWith('http') ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl text-sm font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors"
                >
                  {notification.secondaryButtonText || 'Close & Continue'}
                </button>
              </div>

              {previewData && (
                <div className="text-center pt-1">
                  <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                    Admin Preview Mode Active
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Poster Full Size Lightbox */}
      {posterEnlarged && notification.imageUrl && (
        <div
          className="fixed inset-0 z-[10001] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
          onClick={() => setPosterEnlarged(false)}
        >
          <button
            type="button"
            onClick={() => setPosterEnlarged(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800 text-white hover:bg-slate-700"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={notification.imageUrl}
            alt={notification.title}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

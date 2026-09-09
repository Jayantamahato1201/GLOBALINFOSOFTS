import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import { useCms } from '../context/CmsContext';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { PageId } from '../types';
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  ChevronDown,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigatePage: (page: PageId) => void;
  onOpenSearch?: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenSearch,
  onOpenContact
}) => {
  const { navigation, settings, isPageVisible } = useCms();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main Navigation links matching reference screenshot
  const defaultMainNavLinks: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Tech Support', page: 'support' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Contact', page: 'contact' },
    { label: 'About', page: 'about' },
    { label: 'Blog', page: 'blog' },
    { label: 'Careers', page: 'careers' }
  ];

  // Secondary pages under 'More'
  const defaultSecondaryNavLinks: { label: string; page: PageId }[] = [
    { label: 'Projects', page: 'projects' },
    { label: 'Team', page: 'team' }
  ];

  const mainNavLinks: { label: string; page: PageId }[] = (navigation && navigation.length > 0)
    ? navigation
        .filter((n) => n.enabled !== false && !n.isSecondary && isPageVisible(n.page))
        .map((n) => ({
          label: n.label,
          page: (n.page as PageId) || 'home'
        }))
    : defaultMainNavLinks.filter((n) => isPageVisible(n.page));

  const secondaryNavLinks: { label: string; page: PageId }[] = (navigation && navigation.length > 0)
    ? navigation
        .filter((n) => n.enabled !== false && n.isSecondary && isPageVisible(n.page))
        .map((n) => ({
          label: n.label,
          page: (n.page as PageId) || 'projects'
        }))
    : defaultSecondaryNavLinks.filter((n) => isPageVisible(n.page));

  const allNavLinks = [...mainNavLinks, ...secondaryNavLinks];

  const handleNavClick = (page: PageId) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSecondaryActive = secondaryNavLinks.some((l) => l.page === currentPage);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/90 dark:bg-[#0B0D14]/90 backdrop-blur-2xl border-b border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between gap-6">
            {/* Brand Logo & Name */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer select-none"
              aria-label="Global InfoSoft Home"
            >
              <BrandLogo size={34} showGlow={true} className="transition-transform duration-300 group-hover:scale-105" />
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-['Sora'] transition-colors duration-300">
                {settings?.companyName || 'Global Infosoft'}
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7">
              {mainNavLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`relative text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-blue-600 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {/* Clean underline for active item matching screenshot */}
                    {isActive && (
                      <motion.div
                        layoutId="navActiveLine"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-600 dark:bg-white rounded-full"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Group: Theme Toggle, Get Started Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Single Theme Toggle for all screens */}
              <ThemeToggle />

              {/* Get Started Pill Button matching reference */}
              <button
                id="btn-nav-get-started"
                onClick={() => onOpenContact()}
                className="hidden sm:inline-flex px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#9EB8FF] dark:hover:bg-[#8AAEFF] dark:text-[#0A1026] font-semibold text-sm transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
              >
                Get Started
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                id="btn-toggle-mobile-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white lg:hidden cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                ) : (
                  <Menu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 pt-3 pb-6 glass-panel border-b border-slate-200/80 dark:border-white/10 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              {allNavLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3.5 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                    currentPage === link.page
                      ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 px-4 rounded-xl btn-primary text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                <a
                  href={getWhatsAppUrl(COMPANY_INFO.salesPhone, WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono transition-colors font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp: {COMPANY_INFO.salesPhone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

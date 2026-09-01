import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { PageId } from '../types';
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  ChevronDown
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

  const mainNavLinks: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Solutions', page: 'solutions' },
    { label: 'Projects', page: 'projects' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'About', page: 'about' }
  ];

  const secondaryNavLinks: { label: string; page: PageId }[] = [
    { label: 'Team', page: 'team' },
    { label: 'Tech Support', page: 'support' },
    { label: 'Blog', page: 'blog' },
    { label: 'Contact', page: 'contact' }
  ];

  const allNavLinks = [...mainNavLinks, ...secondaryNavLinks];

  const handleNavClick = (page: PageId) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-1.5 sm:py-2 bg-white/90 dark:bg-slate-950/85 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-xl dark:shadow-slate-950/60'
            : 'py-2 sm:py-2.5 bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group focus:outline-none text-left"
              aria-label="Global InfoSoft Home"
            >
              <div className="relative">
                <BrandLogo size={34} showGlow={true} className="transition-transform duration-300 group-hover:scale-105" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit'] group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    Global InfoSoft
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full text-[8.5px] font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    Jamshedpur
                  </span>
                </div>
                <span className="text-[9.5px] text-slate-500 dark:text-slate-400 tracking-wider block uppercase font-medium leading-none">
                  Custom Software, ERP & Web Solutions
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 glass-card px-2.5 py-0.5 rounded-full shadow-md border-slate-200/80 dark:border-white/10">
              {mainNavLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-cyan-700 dark:text-white font-semibold shadow-sm border border-cyan-500/40 dark:border-cyan-400/50'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              {/* More Dropdown for secondary pages */}
              <div className="relative">
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                    secondaryNavLinks.some((l) => l.page === currentPage)
                      ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-cyan-700 dark:text-white font-semibold border border-cyan-500/40 dark:border-cyan-400/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/5'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-44 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/15 p-1.5 shadow-2xl space-y-0.5 animate-fadeIn">
                    {secondaryNavLinks.map((link) => (
                      <button
                        key={link.page}
                        onClick={() => handleNavClick(link.page)}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                          currentPage === link.page
                            ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-200 font-semibold'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>{link.label}</span>
                        {currentPage === link.page && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Smooth Animated Dark/Light Theme Toggle */}
              <ThemeToggle />
              
              <button
                id="btn-nav-contact"
                onClick={onOpenContact}
                className="relative group/btn overflow-hidden px-3.5 py-1.5 rounded-xl btn-primary text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Actions: Theme Toggle & Menu Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />

              <button
                id="btn-toggle-mobile-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> : <Menu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 pt-2 pb-6 glass-panel border-b border-slate-200/80 dark:border-white/10 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              {allNavLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                    currentPage === link.page
                      ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-cyan-700 dark:text-white border border-cyan-500/40 font-semibold'
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
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
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

import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { PageId } from '../types';
import { FooterCertifications } from './FooterCertifications';
import {
  ArrowUp,
  Shield,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Quote
} from 'lucide-react';

interface FooterProps {
  onNavigatePage: (page: PageId) => void;
  onOpenContact?: (scope?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
  onOpenContact
}) => {
  const handleLinkClick = (page: PageId) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProposal = () => {
    if (onOpenContact) {
      onOpenContact('Project Proposal');
    } else {
      handleLinkClick('contact');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-100/90 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs backdrop-blur-xl transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-10 text-left">
        {/* 4-Column Clean Navigation Grid Matching Website Theme */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-12 max-w-6xl">
          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-bold font-['Sora'] text-cyan-600 dark:text-cyan-400 tracking-tight">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('pricing')}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={handleOpenProposal}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  Project Proposal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-bold font-['Sora'] text-cyan-600 dark:text-cyan-400 tracking-tight">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('careers')}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('projects')}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  Demos
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-bold font-['Sora'] text-cyan-600 dark:text-cyan-400 tracking-tight">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <button
                  onClick={() => handleLinkClick('support')}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  Tech Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-bold font-['Sora'] text-cyan-600 dark:text-cyan-400 tracking-tight">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <button
                  onClick={() => handleLinkClick('support')}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('support')}
                  className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer text-left block"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Thin Divider Line Matching Website Theme */}
        <div className="w-full border-t border-slate-200/80 dark:border-cyan-500/20 my-6 sm:my-8" />

        {/* Trust & Certification Badges Banner */}
        <FooterCertifications />

        {/* Bottom Bar: Copyright, Admin & Social Links */}
        <div className="pt-3 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="text-left font-normal tracking-wide flex items-center gap-3">
            <span>
              © {new Date().getFullYear()}{' '}
              <span
                className="text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                onClick={() => handleLinkClick('home')}
              >
                Global Infosoft
              </span>{' '}
              — All rights reserved.
            </span>
            <a
              href="#admin"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors font-mono text-[10.5px] ml-2"
              title="Global InfoSoft Admin & CMS Console"
            >
              <Shield className="w-3 h-3" />
              <span>Admin CMS</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            {/* Social Icons matching screenshot */}
            <a
              href={COMPANY_INFO.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="hover:text-[#1877F2] hover:scale-110 transition-all duration-200"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/globalinfosofts"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="hover:text-[#E4405F] hover:scale-110 transition-all duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_INFO.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="hover:text-[#0A66C2] hover:scale-110 transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_INFO.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
              className="hover:text-[#FF0000] hover:scale-110 transition-all duration-200"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://glassdoor.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reviews and Quotes"
              title="Client & Employee Reviews"
              className="hover:text-[#0CAA41] hover:scale-110 transition-all duration-200"
            >
              <Quote className="w-4 h-4" />
            </a>
            <a
              href="https://threads.net"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              title="Threads"
              className="hover:text-white dark:hover:text-white hover:scale-110 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.094 5.467 0 12.186 0c6.72 0 12.186 5.094 12.186 11.814 0 .61-.497 1.107-1.107 1.107-.61 0-1.107-.497-1.107-1.107 0-5.503-4.469-9.6-9.972-9.6-5.503 0-9.972 4.469-9.972 9.6 0 5.503 4.469 9.972 9.972 9.972 3.09 0 5.922-1.42 7.747-3.791.378-.49.99-.586 1.48-.208.49.378.586.99.208 1.48C19.167 22.25 15.82 24 12.186 24zm4.84-9.358c-.287 0-.57-.035-.845-.102-.676 1.705-2.022 2.802-3.792 2.802-2.18 0-3.953-1.636-3.953-4.043 0-2.408 1.773-4.044 3.953-4.044 1.83 0 3.25 1.18 3.864 2.923.498-.24 1.05-.373 1.633-.373 1.888 0 3.27 1.343 3.27 3.328 0 2.213-1.624 3.844-3.866 3.844l-.264-.435zm-4.637-.923c.01 0 .02.002.03.002.97 0 1.776-.71 2.062-1.745-.333-.94-1.135-1.577-2.092-1.577-1.164 0-2.034.904-2.034 2.14 0 1.236.87 2.14 2.034 2.14v-.96z" />
              </svg>
            </a>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg glass-card text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all ml-2"
              aria-label="Scroll to top"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};


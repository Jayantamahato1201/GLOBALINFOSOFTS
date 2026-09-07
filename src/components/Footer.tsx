import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import { BrandLogo } from './BrandLogo';
import { PageId } from '../types';
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2
} from 'lucide-react';

interface FooterProps {
  onNavigatePage: (page: PageId) => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  const handleLinkClick = (page: PageId) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-100/90 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs backdrop-blur-xl transition-colors duration-300">
      {/* Main Footer Links */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-5 sm:py-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <BrandLogo size={28} showGlow={false} />
              <span className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                Global InfoSoft
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed max-w-sm">
              {COMPANY_INFO.subTagline} Located in Jamshedpur, Jharkhand, providing retail billing POS, optical store software, customized ERP systems, and web design.
            </p>

            <div className="space-y-1.5 pt-1 text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-[10.5px] leading-tight">Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur, Jharkhand 831012</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppUrl('+919431515806', WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to enquiry on WhatsApp"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono underline decoration-emerald-500/40 underline-offset-2 text-[11px]"
                >
                  +91-9431515806
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a
                  href="mailto:info@globalinfosofts.com"
                  className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors font-mono text-[11px]"
                >
                  info@globalinfosofts.com
                </a>
              </div>
            </div>
          </div>

          {/* Solutions & Services */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Software & Solutions
            </div>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
              <li><button onClick={() => handleLinkClick('solutions')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Retail POS & Supermarket Billing</button></li>
              <li><button onClick={() => handleLinkClick('solutions')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Optical & Clinic Software</button></li>
              <li><button onClick={() => handleLinkClick('solutions')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Gemstone & Jewelry Billing</button></li>
              <li><button onClick={() => handleLinkClick('solutions')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Restaurant & Food POS</button></li>
              <li><button onClick={() => handleLinkClick('services')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Custom Software Development</button></li>
              <li><button onClick={() => handleLinkClick('services')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Website & Web Portal Design</button></li>
              <li><button onClick={() => handleLinkClick('solutions')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">GST Accounting Software</button></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Company & Support
            </div>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
              <li><button onClick={() => handleLinkClick('about')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">About Global InfoSoft</button></li>
              <li><button onClick={() => handleLinkClick('projects')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Case Studies & Deployments</button></li>
              <li><button onClick={() => handleLinkClick('pricing')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Pricing & Software Packages</button></li>
              <li><button onClick={() => handleLinkClick('team')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Leadership & Contacts</button></li>
              <li><button onClick={() => handleLinkClick('support')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Tech Support & FAQs</button></li>
              <li><button onClick={() => handleLinkClick('blog')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Articles & Software Tips</button></li>
              <li><button onClick={() => handleLinkClick('contact')} className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-left">Contact & Head Office</button></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Product Updates
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Subscribe for software updates, GST rule change notifications, and technical tutorials.
            </p>

            {subscribed ? (
              <div className="p-2 rounded-lg glass-card text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-1.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="your-email@gmail.com"
                    className="w-full pl-2.5 pr-8 py-1.5 rounded-lg glass-card text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-md bg-cyan-500 text-white dark:text-slate-950 hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-1 text-[10px] text-slate-500 dark:text-slate-500">
              Direct and authentic software support in Jamshedpur.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 mt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Jamshedpur, Jharkhand. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => handleLinkClick('support')} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleLinkClick('support')} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => handleLinkClick('support')} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              Support Policy
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/40 transition-all ml-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

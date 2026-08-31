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
  ShieldCheck,
  Zap,
  Globe,
  Send,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigatePage: (page: PageId) => void;
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
  onOpenEstimator,
  onOpenContact
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
    <footer className="relative bg-slate-950/90 border-t border-white/10 text-slate-400 text-xs backdrop-blur-xl">
      {/* Top CTA Banner */}
      <div className="border-b border-white/10 mesh-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
              Ready to Accelerate Your Digital Transformation?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Schedule an architecture discovery session or calculate your project scope in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEstimator}
              className="px-5 py-3 rounded-2xl glass-card text-indigo-300 hover:text-white text-xs font-semibold transition-all"
            >
              Interactive Estimator
            </button>
            <button
              onClick={onOpenContact}
              className="px-5 py-3 rounded-2xl btn-primary text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              Contact Engineering Team
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <BrandLogo size={36} showGlow={false} />
              <span className="text-lg font-bold text-white font-['Outfit']">
                Global InfoSofts
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {COMPANY_INFO.subTagline} Built in Jamshedpur, serving businesses with custom ERPs, billing systems, web portals & mobile apps.
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Jamshedpur 831012</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppUrl('+919431515806', WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to enquiry on WhatsApp"
                  className="hover:text-emerald-400 transition-colors font-mono underline decoration-emerald-500/40 underline-offset-2"
                >
                  +91-9431515806
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <a
                  href="mailto:kumarrajnish531@gmail.com"
                  className="hover:text-indigo-300 transition-colors font-mono"
                >
                  kumarrajnish531@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Solutions & Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Solutions & Services
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => handleLinkClick('services')} className="hover:text-indigo-300 transition-colors text-left">Enterprise ERP & CRM</button></li>
              <li><button onClick={() => handleLinkClick('solutions')} className="hover:text-indigo-300 transition-colors text-left">Retail POS & Billing</button></li>
              <li><button onClick={() => handleLinkClick('solutions')} className="hover:text-indigo-300 transition-colors text-left">Optical Store Software</button></li>
              <li><button onClick={() => handleLinkClick('solutions')} className="hover:text-indigo-300 transition-colors text-left">Gemstone & Jewelry Software</button></li>
              <li><button onClick={() => handleLinkClick('services')} className="hover:text-indigo-300 transition-colors text-left">Custom Software Development</button></li>
              <li><button onClick={() => handleLinkClick('services')} className="hover:text-indigo-300 transition-colors text-left">Mobile Apps (iOS & Android)</button></li>
              <li><button onClick={() => handleLinkClick('solutions')} className="hover:text-indigo-300 transition-colors text-left">GST Accounting Software</button></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Company & Support
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => handleLinkClick('about')} className="hover:text-indigo-300 transition-colors text-left">About Global InfoSofts</button></li>
              <li><button onClick={() => handleLinkClick('projects')} className="hover:text-indigo-300 transition-colors text-left">Case Studies & Projects</button></li>
              <li><button onClick={() => handleLinkClick('pricing')} className="hover:text-indigo-300 transition-colors text-left">Pricing & Packages</button></li>
              <li><button onClick={() => handleLinkClick('team')} className="hover:text-indigo-300 transition-colors text-left">Leadership & Team</button></li>
              <li><button onClick={() => handleLinkClick('support')} className="hover:text-indigo-300 transition-colors text-left">24/7 Tech Support & FAQs</button></li>
              <li><button onClick={() => handleLinkClick('blog')} className="hover:text-indigo-300 transition-colors text-left">Technical Insights Blog</button></li>
              <li><button onClick={() => handleLinkClick('contact')} className="hover:text-indigo-300 transition-colors text-left">Contact & Head Office</button></li>
            </ul>
          </div>

          {/* Newsletter / Insights */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Engineering Insights
            </div>
            <p className="text-slate-400 text-xs">
              Subscribe to our monthly technical whitepapers on ERP architectures, SaaS scale, and cloud optimization.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl glass-card text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed to Engineering Digest!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="engineer@company.com"
                    className="w-full pl-3 pr-10 py-2 rounded-xl glass-card text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-[11px] text-slate-500">
              Zero spam. Unsubscribe at any time with one click.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved. ISO 9001:2015 Process Compliant.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => handleLinkClick('support')} className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleLinkClick('support')} className="hover:text-slate-200 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => handleLinkClick('support')} className="hover:text-slate-200 transition-colors">
              SLA Guarantees
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl glass-card text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { SERVICES_DATA, COMPANY_INFO } from '../../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp';
import { PageId, ServiceItem } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Layers,
  Star,
  PhoneCall,
  CheckCircle2,
  Code2,
  Globe,
  Smartphone,
  Receipt,
  Headphones
} from 'lucide-react';

interface HomePageProps {
  onNavigatePage: (page: PageId, detailId?: string) => void;
  onOpenContact: (scope?: string) => void;
  onSelectService: (serviceId: string) => void;
  onSelectProject: (projectId: string) => void;
  onSelectSolution: (solutionId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigatePage,
  onOpenContact,
  onSelectService
}) => {
  const allServices = SERVICES_DATA;

  const getServiceIconConfig = (id: string) => {
    switch (id) {
      case 'custom-software':
        return {
          Icon: Code2,
          wrapperClass: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/80 group-hover:border-cyan-400 dark:group-hover:border-cyan-500'
        };
      case 'web-development':
        return {
          Icon: Globe,
          wrapperClass: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/80 group-hover:border-sky-400 dark:group-hover:border-sky-500'
        };
      case 'mobile-apps':
        return {
          Icon: Smartphone,
          wrapperClass: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/80 group-hover:border-indigo-400 dark:group-hover:border-indigo-500'
        };
      case 'accounting-pos':
        return {
          Icon: Receipt,
          wrapperClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80 group-hover:border-emerald-400 dark:group-hover:border-emerald-500'
        };
      case 'digital-marketing':
        return {
          Icon: TrendingUp,
          wrapperClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/80 group-hover:border-amber-400 dark:group-hover:border-amber-500'
        };
      case 'hosting-support':
        return {
          Icon: Headphones,
          wrapperClass: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/80 group-hover:border-cyan-400 dark:group-hover:border-cyan-500'
        };
      default:
        return {
          Icon: Code2,
          wrapperClass: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/80 group-hover:border-cyan-400 dark:group-hover:border-cyan-500'
        };
    }
  };

  const renderServiceCard = (s: ServiceItem, keyPrefix = '') => {
    const { Icon, wrapperClass } = getServiceIconConfig(s.id);

    return (
      <div
        key={`${keyPrefix}${s.id}`}
        onClick={() => onSelectService(s.id)}
        className="h-full group p-3.5 sm:p-4 rounded-xl project-card-gradient border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-400/80 transition-all cursor-pointer flex flex-col justify-between text-left"
      >
        <div>
          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${wrapperClass} mb-2 group-hover:scale-105 transition-all`}>
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Outfit'] mb-1 leading-snug line-clamp-1">
            {s.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed mb-2">
            {s.shortDesc}
          </p>
        </div>
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-cyan-700 dark:text-cyan-400 font-bold group-hover:text-cyan-800 dark:group-hover:text-cyan-300">
          <span>Explore Specifications</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-0 w-full overflow-hidden transition-colors duration-300">
      {/* 1. HERO / COMPANY INTRODUCTION - Clean Enterprise Layout */}
      <section id="hero" className="relative flex items-center pt-14 sm:pt-16 pb-6 sm:pb-8 overflow-hidden mesh-bg">
        <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-4xl text-left space-y-3">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full glass-card border border-slate-200 dark:border-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-[11px] font-semibold text-cyan-700 dark:text-cyan-400 tracking-wide uppercase font-mono">
                Global InfoSoft • Jamshedpur
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-600 dark:text-slate-400">• Custom Software & ERP</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-[1.15]">
                Architecting <span className="text-cyan-600 dark:text-cyan-400">Custom Software & ERP</span> For Growing Businesses
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-normal max-w-3xl leading-relaxed">
                Global InfoSoft engineers bespoke <strong className="text-slate-900 dark:text-white font-semibold">Custom ERP & CRM systems</strong>, mission-critical <strong className="text-slate-900 dark:text-white font-semibold">Web & Mobile software</strong>, specialized <strong className="text-slate-900 dark:text-white font-semibold">Retail POS & GST Accounting</strong>, and cloud infrastructure tailored to your business needs.
              </p>
            </div>

            {/* Primary & Secondary Action Group */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <button
                onClick={() => onNavigatePage('solutions')}
                className="px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 group"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Explore Solutions</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onOpenContact()}
                className="px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-xl glass-card text-slate-800 dark:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 hover:border-cyan-500/50"
              >
                <span>Schedule Consultation</span>
              </button>

              <a
                href={getWhatsAppUrl(COMPANY_INFO.salesPhone, WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl glass-card text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5 hover:border-emerald-500/50"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">WhatsApp Direct</span>
              </a>
            </div>

            {/* Key Trust & Quality Guarantees */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <div className="flex items-center gap-1 glass-card px-2 py-0.5 rounded-lg border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>100% IP & Code Ownership</span>
              </div>
              <div className="flex items-center gap-1 glass-card px-2 py-0.5 rounded-lg border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                <Zap className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>6 Months Free Warranty</span>
              </div>
              <div className="flex items-center gap-1 glass-card px-2 py-0.5 rounded-lg border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>24-Hour SLA Guarantee</span>
              </div>
            </div>
          </div>

          {/* Full-Width Metrics Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800 w-full">
            <div className="p-3 sm:p-3.5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 text-left">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">10+</div>
              <div className="text-[11px] font-bold text-slate-900 dark:text-white mt-0.5">Years Track Record</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Serving Jamshedpur since 2014</div>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 text-left">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">200+</div>
              <div className="text-[11px] font-bold text-slate-900 dark:text-white mt-0.5">Software Deployments</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Retail, clinics & trading</div>
            </div>

            <div className="p-3.5 sm:p-3.5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 text-left">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">100%</div>
              <div className="text-[11px] font-bold text-slate-900 dark:text-white mt-0.5">Code & Data Ownership</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Zero vendor lock-in</div>
            </div>

            <div className="p-3.5 sm:p-3.5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 text-left">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">99.5%</div>
              <div className="text-[11px] font-bold text-slate-900 dark:text-white mt-0.5">Client Satisfaction</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">Long-term IT support & SLA</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE SERVICES OVERVIEW - Horizontal Infinite Auto-Sliding Carousel */}
      <section className="py-6 sm:py-8 border-t border-slate-200 dark:border-slate-800 relative mesh-bg w-full overflow-hidden">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-3.5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5">
            <div className="text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-1 border-slate-200 dark:border-slate-800">
                <Layers className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                <span>Core Capabilities</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                Software Development & IT Solutions
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-0.5 max-w-2xl">
                High-performance software and web solutions engineered for maximum speed, security, and effortless daily business management.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <button
                onClick={() => onNavigatePage('services')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl btn-primary text-white transition-all text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Continuous Infinite Auto-Sliding Rail */}
          <div className="relative w-full overflow-hidden services-carousel-container py-0.5">
            <div className="services-carousel-track flex w-max gap-3 sm:gap-4">
              {/* Sequence 1 */}
              <div className="flex gap-3 sm:gap-4 shrink-0">
                {allServices.map((s) => (
                  <div
                    key={`seq1-${s.id}`}
                    className="w-[82vw] sm:w-[280px] md:w-[300px] lg:w-[320px] xl:w-[330px] shrink-0"
                  >
                    {renderServiceCard(s, 'seq1-')}
                  </div>
                ))}
              </div>

              {/* Sequence 2 (Cloned for seamless infinite loop) */}
              <div className="flex gap-3 sm:gap-4 shrink-0" aria-hidden="true">
                {allServices.map((s) => (
                  <div
                    key={`seq2-${s.id}`}
                    className="w-[82vw] sm:w-[280px] md:w-[300px] lg:w-[320px] xl:w-[330px] shrink-0"
                  >
                    {renderServiceCard(s, 'seq2-')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT / WHY GLOBAL INFOSOFT - Full-Width Asymmetric Layout */}
      <section className="py-6 sm:py-8 border-t border-slate-200 dark:border-slate-800 relative mesh-bg w-full">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
            <div className="lg:col-span-7 space-y-2.5 text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono border-slate-200 dark:border-slate-800">
                <Star className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                <span>10+ Years of Local & Regional Trust</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] leading-tight">
                Quality Software Development, Dedicated Support & Trusted Experience
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                Founded in 2014 in Jamshedpur, Global InfoSoft has helped over 150+ businesses streamline billing, manage multi-branch inventory, launch modern corporate websites, and scale digitally.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
                <div className="p-2.5 sm:p-3 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 text-left">
                  <div className="text-lg sm:text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">10+</div>
                  <div className="text-[10.5px] text-slate-800 dark:text-slate-200 font-medium mt-0.5">Years in Business</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 text-left">
                  <div className="text-lg sm:text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">200+</div>
                  <div className="text-[10.5px] text-slate-800 dark:text-slate-200 font-medium mt-0.5">Projects Built</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 text-left">
                  <div className="text-lg sm:text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">150+</div>
                  <div className="text-[10.5px] text-slate-800 dark:text-slate-200 font-medium mt-0.5">Active Clients</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 text-left">
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">99.5%</div>
                  <div className="text-[10.5px] text-slate-800 dark:text-slate-200 font-medium mt-0.5">Satisfaction</div>
                </div>
              </div>

              <div className="pt-0.5">
                <button
                  onClick={() => onNavigatePage('about')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-primary text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-4 sm:p-4.5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 space-y-2 text-left">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">Why Businesses Choose Global InfoSoft</h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Full Software & Database Ownership:</strong> Zero vendor lock-in. You retain 100% control of your database and data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Complimentary 6-Month Support:</strong> Every software delivery comes with 6 months of free warranty and operational training.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Prompt Local & Remote Support:</strong> Direct phone, WhatsApp, and AnyDesk remote assistance for billing and systems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Tailored Customization:</strong> We modify invoice templates, barcode formats, and tax rules to match your business.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FULL-WIDTH CTA / CONTACT BANNER */}
      <section className="py-5 sm:py-6 border-t border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60 w-full transition-colors duration-300">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 flex flex-col lg:flex-row items-center justify-between gap-3.5">
          <div className="space-y-1 text-left">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Ready to Upgrade or Build Your Business Software?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl">
              Get in touch with our team in Jamshedpur for a free live demo, software consultation, or custom quote.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={getWhatsAppUrl(COMPANY_INFO.salesPhone, 'Hello Global InfoSoft, I would like to schedule a software consultation and get a price quote.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl glass-card text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-white font-semibold text-xs transition-all flex items-center gap-1.5 hover:border-emerald-500/50"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp: {COMPANY_INFO.salesPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

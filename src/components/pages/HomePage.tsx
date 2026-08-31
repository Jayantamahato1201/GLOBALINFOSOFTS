import React from 'react';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';
import { SERVICES_DATA, SOLUTIONS_DATA, CASE_STUDIES, COMPANY_INFO } from '../../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp';
import { PageId } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  Layers,
  Cpu,
  Star,
  PhoneCall
} from 'lucide-react';

interface HomePageProps {
  onNavigatePage: (page: PageId, detailId?: string) => void;
  onOpenContact: (scope?: string) => void;
  onOpenEstimator: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectProject: (projectId: string) => void;
  onSelectSolution: (solutionId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigatePage,
  onOpenContact,
  onOpenEstimator,
  onSelectService,
  onSelectProject,
  onSelectSolution
}) => {
  // Take top 4 featured services
  const featuredServices = SERVICES_DATA.slice(0, 4);

  // Take top 2 featured solutions
  const featuredSolutions = SOLUTIONS_DATA.slice(0, 2);

  // Take top 2 case studies
  const featuredProjects = CASE_STUDIES.slice(0, 2);

  return (
    <div className="space-y-0">
      {/* 1. HERO / COMPANY INTRODUCTION */}
      <section id="hero" className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden mesh-bg">
        <Hero3DCanvas className="opacity-95" />

        <div className="abstract-shape w-[500px] h-[500px] -top-24 -left-24 animate-pulse-glow" />
        <div className="abstract-shape w-[600px] h-[600px] top-1/3 -right-32 animate-pulse-glow" style={{ animationDelay: '-4s' }} />

        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card shadow-lg shadow-indigo-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase font-mono">
                Global InfoSofts Official Platform
              </span>
              <span className="hidden sm:inline text-xs text-slate-400">• Enterprise Engineering & ERP</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.1]">
                Architecting{' '}
                <span className="hero-accent-gradient">
                  Intelligent Digital Systems
                </span>{' '}
                For Global Enterprises
              </h1>
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
                Global InfoSofts delivers bespoke <strong className="text-white font-semibold">Enterprise ERP & CRM systems</strong>, robust{' '}
                <strong className="text-white font-semibold">Web & Mobile software</strong>, specialized <strong className="text-white font-semibold">Retail & Accounting solutions</strong>, and{' '}
                <strong className="text-white font-semibold">Strategic Digital Growth</strong>.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onOpenEstimator}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl btn-primary text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 active:scale-95 group shadow-xl shadow-indigo-500/20"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Estimate Project Cost</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onOpenContact()}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card text-white font-semibold text-sm transition-all duration-200 shadow-lg flex items-center justify-center gap-2 active:scale-95 hover:border-indigo-500/50"
              >
                <span>Schedule Consultation</span>
              </button>
            </div>

            {/* Key Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-1.5 glass-card px-3 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>100% IP & Code Ownership</span>
              </div>
              <div className="flex items-center gap-1.5 glass-card px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>6 Months Free Support Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 glass-card px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Guaranteed 24-Hour SLA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHORT SERVICES OVERVIEW */}
      <section className="py-20 border-t border-white/10 relative mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono mb-3">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Core Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
                Software Engineering & Services
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                High-performance digital engineering engineered with rigorous code quality and cloud scalability.
              </p>
            </div>
            <button
              onClick={() => onNavigatePage('services')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card text-indigo-300 hover:text-white hover:border-indigo-500/50 transition-all text-xs font-bold uppercase tracking-wider self-start md:self-auto"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredServices.map((s) => (
              <div
                key={s.id}
                onClick={() => onSelectService(s.id)}
                className="group relative p-6 rounded-2xl glass-panel border border-white/10 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/25 transition-all mb-4">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors font-['Outfit'] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4">
                    {s.shortDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-indigo-300">
                  <span>Explore Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHORT SOFTWARE SOLUTIONS & PROJECTS PREVIEW */}
      <section className="py-20 border-t border-white/10 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-emerald-300 text-xs font-semibold uppercase tracking-wider font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Turnkey Platforms & Case Studies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
                Featured Solutions & Client Work
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                Ready-to-deploy enterprise software products and proven case studies across manufacturing, retail, and healthcare.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigatePage('solutions')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-emerald-300 hover:text-white hover:border-emerald-500/50 transition-all text-xs font-bold uppercase tracking-wider"
              >
                <span>All Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigatePage('projects')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-sky-300 hover:text-white hover:border-sky-500/50 transition-all text-xs font-bold uppercase tracking-wider"
              >
                <span>All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Software Solution */}
            {featuredSolutions.map((sol) => (
              <div
                key={sol.id}
                onClick={() => onSelectSolution(sol.id)}
                className="p-6 rounded-2xl glass-panel border border-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {sol.industry}
                  </span>
                  <span className="text-xs text-slate-400">Software Product</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors font-['Outfit'] mb-2">
                  {sol.title}
                </h3>
                <p className="text-slate-300 text-xs line-clamp-2 mb-4 leading-relaxed">
                  {sol.shortDesc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sol.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[11px] text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[200px]">{f}</span>
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-300 font-semibold">
                  <span>View Product Architecture</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}

            {/* Featured Case Studies */}
            {featuredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                className="p-6 rounded-2xl glass-panel border border-sky-500/20 hover:border-sky-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                    {p.industry}
                  </span>
                  <span className="text-xs text-slate-400">Client Case Study</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors font-['Outfit'] mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-300 text-xs line-clamp-2 mb-4 leading-relaxed">
                  {p.summary}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {p.results.slice(0, 2).map((r, i) => (
                    <div key={i} className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-base font-extrabold text-white font-mono">{r.value}</div>
                      <div className="text-[10px] text-slate-400 truncate">{r.label}</div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-sky-300 font-semibold">
                  <span>View Project Deliverables</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SHORT ABOUT / WHY GLOBAL INFOSOFT */}
      <section className="py-20 border-t border-white/10 relative mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
                <Star className="w-3.5 h-3.5 text-indigo-400" />
                <span>14+ Years of Proven Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] leading-tight">
                Enterprise Reliability, Engineering Craftsmanship & Global Standards
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Founded in 2012, Global InfoSofts has grown from a specialized accounting and retail software provider into an international engineering agency. We partner with fast-scaling startups and enterprise corporations across India, North America, and Europe.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl glass-card text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-indigo-400 font-mono">14+</div>
                  <div className="text-[11px] text-slate-400">Years Active</div>
                </div>
                <div className="p-3 rounded-xl glass-card text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-indigo-400 font-mono">450+</div>
                  <div className="text-[11px] text-slate-400">Deployments</div>
                </div>
                <div className="p-3 rounded-xl glass-card text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-indigo-400 font-mono">180+</div>
                  <div className="text-[11px] text-slate-400">Global Clients</div>
                </div>
                <div className="p-3 rounded-xl glass-card text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-indigo-400 font-mono">99.2%</div>
                  <div className="text-[11px] text-slate-400">Retention</div>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigatePage('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border border-white/15 space-y-4">
              <h3 className="text-lg font-bold text-white font-['Outfit']">Why Enterprises Partner With Us</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Full IP & Source Code Ownership:</strong> No vendor lock-in. You receive 100% rights to your code and databases.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Complimentary 6-Month Warranty:</strong> Every custom deployment includes free bug fixes and continuous support.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>24-Hour SLA Response:</strong> Guaranteed resolution pathways and dedicated technical support hotlines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Bespoke Architectural Engineering:</strong> Tailored specifically to your business workflows, tax compliance, and industry.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHORT CTA / CONTACT BANNER */}
      <section className="py-16 border-t border-white/10 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] max-w-2xl mx-auto">
            Ready to Build or Scale Your Enterprise Software?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Speak directly with our principal software architects for a confidential project estimate and technical roadmap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-8 py-3.5 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <span>Schedule Architecture Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={getWhatsAppUrl(COMPANY_INFO.salesPhone, 'Hello Global Infosoft, I would like to schedule an architecture discussion and get a project roadmap.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl glass-card text-emerald-300 hover:text-white font-semibold text-xs transition-all flex items-center gap-2 hover:border-emerald-500/50"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: {COMPANY_INFO.salesPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

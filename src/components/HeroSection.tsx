import React from 'react';
import { Hero3DCanvas } from './3d/Hero3DCanvas';
import { Card3DTilt } from './3d/Card3DTilt';
import { COMPANY_INFO } from '../data/companyData';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEstimator,
  onOpenContact
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden mesh-bg">
      {/* 3D WebGL Interactive Background Canvas */}
      <Hero3DCanvas className="opacity-95" />

      {/* Abstract Frosted Blur Shapes from Theme */}
      <div className="abstract-shape w-[500px] h-[500px] -top-24 -left-24 animate-pulse-glow" />
      <div className="abstract-shape w-[600px] h-[600px] top-1/3 -right-32 animate-pulse-glow" style={{ animationDelay: '-4s' }} />

      {/* Subtle Radial Gradient Overlay for crisp typography */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card shadow-lg shadow-indigo-500/10 animate-fadeDown">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase font-mono">
              Global InfoSofts Next-Gen Release
            </span>
            <span className="hidden sm:inline text-xs text-slate-400">• Accepting New Global Sprints</span>
          </div>

          {/* Main Display Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.1]">
              Architecting{' '}
              <span className="hero-accent-gradient">
                Intelligent Digital Systems
              </span>{' '}
              For Global Enterprises
            </h1>
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
              We design, engineer, and scale bespoke <strong className="text-white font-semibold">Enterprise ERP & CRM systems</strong>, high-performance{' '}
              <strong className="text-white font-semibold">Web & Mobile applications</strong>, specialized <strong className="text-white font-semibold">Accounting platforms</strong>, and{' '}
              <strong className="text-white font-semibold">Data-driven Growth funnels</strong>.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              id="hero-btn-estimator"
              onClick={onOpenEstimator}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl btn-primary text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 active:scale-95 group shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Interactive Project Estimator</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-btn-contact"
              onClick={onOpenContact}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card text-white font-semibold text-sm transition-all duration-200 shadow-lg flex items-center justify-center gap-2 active:scale-95 hover:border-indigo-500/50"
            >
              <span>Schedule Architecture Call</span>
            </button>
          </div>

          {/* Key Value Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-1.5 glass-card px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>100% IP & Source Code Ownership</span>
            </div>
            <div className="flex items-center gap-1.5 glass-card px-3 py-1 rounded-full">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>6 Months Free Warranty & Support</span>
            </div>
            <div className="flex items-center gap-1.5 glass-card px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Guaranteed 24-Hour SLA Response</span>
            </div>
          </div>
        </div>

        {/* 3D Floating Interactive Metrics Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          <Card3DTilt intensity={12} className="p-5 rounded-2xl glass-card">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              {COMPANY_INFO.yearsOfExperience}
            </div>
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mt-1">Industry Leadership</div>
            <p className="text-[11px] text-slate-400 mt-1">Engineering enterprise software solutions since 2012.</p>
          </Card3DTilt>

          <Card3DTilt intensity={12} className="p-5 rounded-2xl glass-card">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-['Outfit'] tracking-tight">
              {COMPANY_INFO.projectsCompleted}
            </div>
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mt-1">Projects Delivered</div>
            <p className="text-[11px] text-slate-400 mt-1">From high-load SaaS to custom ERP & accounting suites.</p>
          </Card3DTilt>

          <Card3DTilt intensity={12} className="p-5 rounded-2xl glass-card">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              {COMPANY_INFO.uptimeSla}
            </div>
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mt-1">Infrastructure SLA</div>
            <p className="text-[11px] text-slate-400 mt-1">Zero-downtime microservices & cloud redundancy.</p>
          </Card3DTilt>

          <Card3DTilt intensity={12} className="p-5 rounded-2xl glass-card">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Outfit'] tracking-tight">
              {COMPANY_INFO.clientSatisfaction}
            </div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-1">Client Retention</div>
            <p className="text-[11px] text-slate-400 mt-1">Serving 180+ global businesses across 8 countries.</p>
          </Card3DTilt>
        </div>

        {/* Scroll down indicator */}
        <div className="flex justify-center mt-12">
          <a
            href="#services"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors text-xs font-mono group"
            aria-label="Scroll to services"
          >
            <span>EXPLORE SERVICES</span>
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-indigo-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

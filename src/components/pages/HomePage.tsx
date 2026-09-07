import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { COMPANY_INFO } from '../../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp';
import { PageId, ServiceItem } from '../../types';
import { BrandLogo } from '../BrandLogo';
import { WavePlasmaShader } from '../WavePlasmaShader';
import { ServicesCarousel } from '../ServicesCarousel';
import { BlogsSection } from '../BlogsSection';
import { BuildPackageSection } from '../home/BuildPackageSection';
import { WhyDeploySection } from '../home/WhyDeploySection';
import { SoftwareSolutionsBrowserSection } from '../home/SoftwareSolutionsBrowserSection';
import { MeetExpertsSection } from '../home/MeetExpertsSection';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Layers,
  Star,
  PhoneCall,
  ChevronRight,
  Award,
  Headphones,
  User
} from 'lucide-react';

interface HomePageProps {
  onNavigatePage: (page: PageId, detailId?: string) => void;
  onOpenContact: (scope?: string) => void;
  onSelectService: (serviceId: string) => void;
  onSelectServiceItem?: (service: ServiceItem) => void;
  onSelectProject: (projectId: string) => void;
  onSelectSolution: (solutionId: string) => void;
}

// Neon Laser Ribbons component matching the reference screenshot exactly
const NeonLaserRibbons: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-purple-600/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[500px] bg-fuchsia-600/10 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full filter blur-[130px] pointer-events-none" />

      {/* SVG Neon Splines */}
      <svg
        viewBox="0 0 1600 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="purpleLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cyanLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="purpleLaserGrad" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#d946ef" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="cyanLaserGrad" x1="0%" y1="70%" x2="100%" y2="30%">
            <stop offset="0%" stopColor="#00dbe7" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Primary Purple Neon Curved Laser Spline */}
        <path
          d="M -100,420 C 120,490 260,260 480,310 C 700,360 760,520 950,400 C 1120,290 1280,340 1700,240"
          stroke="url(#purpleLaserGrad)"
          strokeWidth="2.8"
          fill="none"
          filter="url(#purpleLaserGlow)"
        />
        {/* Secondary Purple Echo Path */}
        <path
          d="M -80,440 C 140,510 280,240 500,320 C 720,380 780,500 970,380 C 1140,270 1300,360 1720,220"
          stroke="#f472b6"
          strokeWidth="1.2"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Outer Purple Ambient Ribbon Loop */}
        <path
          d="M -120,380 C 160,460 320,180 580,280 C 800,360 880,560 1080,420 C 1260,300 1420,380 1750,260"
          stroke="url(#purpleLaserGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.45"
          fill="none"
        />

        {/* Primary Cyan Neon Curved Laser Spline */}
        <path
          d="M -100,560 C 150,640 320,440 560,540 C 780,620 920,480 1120,420 C 1300,360 1460,460 1700,390"
          stroke="url(#cyanLaserGrad)"
          strokeWidth="2.4"
          fill="none"
          filter="url(#cyanLaserGlow)"
        />
        {/* Secondary Cyan Echo Path */}
        <path
          d="M -70,580 C 180,660 340,420 580,520 C 800,600 940,460 1140,400 C 1320,340 1480,480 1720,370"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeOpacity="0.55"
          fill="none"
        />

        {/* Graceful undulating cross-spline */}
        <path
          d="M 50,320 C 300,420 460,600 740,500 C 980,410 1150,560 1380,440 C 1520,360 1620,400 1740,350"
          stroke="#c084fc"
          strokeWidth="1"
          strokeOpacity="0.35"
          fill="none"
        />
      </svg>
    </div>
  );
};

// Reusable faceted polygon ribbon overlay matching the screenshot specification
const FacetedProjectRibbon: React.FC<{
  title: string;
  idKey: string;
  isLarge?: boolean;
}> = ({ title, idKey, isLarge = false }) => {
  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none z-20 overflow-hidden">
      {/* SVG Faceted Ribbon with 3D origami geometric folds */}
      <svg
        viewBox="0 0 500 200"
        preserveAspectRatio="none"
        className={`w-full ${isLarge ? 'h-14 sm:h-16 md:h-18' : 'h-9 sm:h-10 md:h-11'}`}
      >
        <defs>
          <linearGradient id={`gradFront-${idKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0055" />
            <stop offset="55%" stopColor="#FF1464" />
            <stop offset="100%" stopColor="#E6004C" />
          </linearGradient>
          <linearGradient id={`gradBack-${idKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D1004A" />
            <stop offset="100%" stopColor="#9E0033" />
          </linearGradient>
          <linearGradient id={`gradFacet-${idKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2A75" />
            <stop offset="100%" stopColor="#FF0055" />
          </linearGradient>
        </defs>

        {/* Back faceted polygon (peak at ~52% of width) */}
        <polygon
          points="0,85 260,18 380,48 500,75 500,200 0,200"
          fill={`url(#gradBack-${idKey})`}
          opacity="0.9"
        />

        {/* Right facet highlight */}
        <polygon
          points="350,22 500,60 500,200 350,200"
          fill={`url(#gradFacet-${idKey})`}
          opacity="0.45"
        />

        {/* Front main polygon (bright vibrant hot pink/crimson, peak at ~70%) */}
        <polygon
          points="0,75 350,22 500,60 500,200 0,200"
          fill={`url(#gradFront-${idKey})`}
        />
      </svg>

      {/* Label Content */}
      <div className={`absolute inset-x-0 bottom-0 ${isLarge ? 'p-3 sm:p-4' : 'px-3 py-1 sm:px-3.5 sm:py-1.5'} text-left`}>
        <h3
          className={`text-white font-['Sora'] font-extrabold tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
            isLarge ? 'text-sm sm:text-base md:text-lg' : 'text-xs sm:text-[13px]'
          }`}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({
  onNavigatePage,
  onOpenContact,
  onSelectService,
  onSelectServiceItem,
  onSelectProject
}) => {
  const heroRef = useRef<HTMLElement>(null);

  // Parallax scroll tracking for hero background ambient blobs
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const blobCyanY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const blobCyanX = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const blobVioletY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const blobVioletX = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <div className="space-y-0 w-full overflow-hidden transition-colors duration-300 font-['Inter']">
      {/* 1. HERO SECTION (With Flowing Digital Wave Shader Animation) */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-[90vh] flex items-center pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-[#0B0D14]"
      >
        {/* Dynamic WebGL Flowing Wave Shader Animation */}
        <WavePlasmaShader className="absolute inset-0 w-full h-full pointer-events-none z-0" intensity={1.1} />

        {/* Ambient Vignette & Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D14]/70 via-transparent to-[#0B0D14]/60 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0D14] pointer-events-none z-0" />

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col text-left">
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-bold tracking-tight text-white leading-[1.08] font-['Sora']"
              >
                Innovating the<br />
                Future with <span className="text-[#85afff]">Smart</span><br />
                <span className="text-[#00dfef]">Digital Solutions</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mt-6 font-normal"
              >
                Helping businesses grow with simple and smart digital solutions.<br className="hidden sm:inline" />
                Turning ideas into practical tools for a better, connected future.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-4 mt-8"
              >
                {/* Contact Now Button */}
                <button
                  onClick={() => onOpenContact()}
                  className="px-7 py-3 rounded-full bg-[#85AFFF] hover:bg-[#729FF9] text-[#0A1128] font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#85AFFF]/20 cursor-pointer active:scale-95"
                >
                  <span>Contact Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Our Services Button */}
                <button
                  onClick={() => {
                    const el = document.getElementById('projects') || document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else onNavigatePage('solutions');
                  }}
                  className="px-7 py-3 rounded-full border border-[#2a2f42] hover:border-slate-500 bg-transparent text-white font-mono text-xs sm:text-sm tracking-wide transition-all cursor-pointer active:scale-95"
                >
                  <span>Our Services</span>
                </button>
              </motion.div>
            </div>

            {/* Right Side "Ready to Build?" Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 35 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#131520]/90 border border-white/10 flex flex-col items-center text-center shadow-2xl relative overflow-hidden backdrop-blur-xl group"
              >
                {/* Ambient glow behind card */}
                <div className="absolute -top-12 -left-12 w-52 h-52 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Logo / Accent Image */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/25 -z-10" />
                    <BrandLogo size={56} showGlow={true} />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-['Sora']">
                    Ready to Build?
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xs leading-relaxed">
                    Let's craft your next digital breakthrough.
                  </p>
                </div>

                {/* Full-width dark button matching screenshot */}
                <button
                  onClick={() => onOpenContact('Project Proposal')}
                  className="w-full mt-8 px-5 py-3.5 rounded-xl bg-[#202434] hover:bg-[#282d42] text-slate-300 hover:text-white font-mono text-xs sm:text-sm transition-all flex items-center justify-between border border-white/5 group/btn cursor-pointer active:scale-98 relative z-10"
                >
                  <span>Start Project Proposal</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Enterprise Metrics Ribbon */}
      <section className="py-6 sm:py-8 border-y border-white/10 bg-[#0B0D14] relative z-10">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 w-full"
          >
            {/* Metric 1 */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-[#131520]/80 border border-white/10 hover:border-cyan-500/50 text-left group transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-['Sora'] text-2xl sm:text-3xl font-extrabold text-cyan-400">10+</span>
                <Award className="w-4 h-4 text-cyan-400/70" />
              </div>
              <div className="text-xs font-bold text-white mt-1">Years Track Record</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Serving Jamshedpur since 2014</div>
            </motion.div>

            {/* Metric 2 */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-[#131520]/80 border border-white/10 hover:border-purple-500/50 text-left group transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-['Sora'] text-2xl sm:text-3xl font-extrabold text-purple-400">200+</span>
                <Layers className="w-4 h-4 text-purple-400/70" />
              </div>
              <div className="text-xs font-bold text-white mt-1">Software Deployments</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Retail, clinics &amp; enterprises</div>
            </motion.div>

            {/* Metric 3 */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-[#131520]/80 border border-white/10 hover:border-blue-500/50 text-left group transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-['Sora'] text-2xl sm:text-3xl font-extrabold text-blue-400">100%</span>
                <ShieldCheck className="w-4 h-4 text-blue-400/70" />
              </div>
              <div className="text-xs font-bold text-white mt-1">Code &amp; Data Ownership</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Zero recurring vendor lock-in</div>
            </motion.div>

            {/* Metric 4 */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-[#131520]/80 border border-white/10 hover:border-emerald-500/50 text-left group transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-['Sora'] text-2xl sm:text-3xl font-extrabold text-emerald-400">99.5%</span>
                <Star className="w-4 h-4 text-emerald-400/70" />
              </div>
              <div className="text-xs font-bold text-white mt-1">Client Satisfaction</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Long-term IT support &amp; SLA</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR SERVICES (PREMIUM CENTERED SECTION WITH HORIZONTALLY AUTO-SCROLLING CAROUSEL) */}
      <ServicesCarousel
        onSelectService={(service) => {
          if (onSelectServiceItem) {
            onSelectServiceItem(service);
          } else {
            onSelectService(service.id);
          }
        }}
        onExploreAll={() => onNavigatePage('services')}
      />

      {/* 3. OUR SOFTWARE SOLUTIONS (3 LIVE BROWSER MOCKUPS) */}
      <SoftwareSolutionsBrowserSection onSelectProject={onSelectProject} />

      {/* 2. PROJECTS SECTION (COMPACT 5-CARD FACETED GRID) */}
      <section id="projects" className="py-6 sm:py-8 relative z-10 border-t border-slate-200/60 dark:border-slate-800/60 bg-[var(--bg-body)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 sm:mb-5 flex flex-col md:flex-row justify-between items-start md:items-end gap-2.5 text-left"
          >
            <div>
              <span className="font-['JetBrains_Mono'] text-xs font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-1 block">
                Our Software Solutions
              </span>
              <h2 className="font-['Sora'] text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Projects
              </h2>
            </div>

            <button
              onClick={() => onNavigatePage('projects')}
              className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1.5 transition-colors font-['JetBrains_Mono'] cursor-pointer group"
            >
              <span>View all projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* 5-Card Faceted Ribbon Grid: Compact & Balanced */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
            {/* Left Column: 1 Featured Card - "Web Development Projects" */}
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => onNavigatePage('projects')}
              className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl border border-slate-200/80 dark:border-white/10 hover:border-[#FF0055]/70 transition-all duration-300 h-[260px] sm:h-[300px] lg:h-[316px] flex flex-col select-none bg-slate-950"
            >
              {/* Browser Window Header Mockup */}
              <div className="bg-slate-900/95 dark:bg-[#060913] border-b border-white/10 px-3.5 py-1.5 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500/90" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/90" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/90" />
                </div>
                <div className="bg-slate-800/90 dark:bg-white/5 text-[10px] font-['JetBrains_Mono'] text-slate-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-white/5 truncate max-w-[190px]">
                  <span className="text-emerald-400 text-[7px] animate-pulse">●</span>
                  <span className="truncate">sevenfinancials.in</span>
                </div>
                <span className="text-[9px] font-['JetBrains_Mono'] font-bold text-cyan-400 uppercase tracking-wider">
                  LIVE DEMO
                </span>
              </div>

              <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                  alt="Web Development Projects"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>
              <FacetedProjectRibbon title="Web Development Projects" idKey="web-dev" isLarge />
            </motion.div>

            {/* Right Column: 2x2 Grid of 4 Compact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Card 1: Mobile Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => onNavigatePage('projects')}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg border border-slate-200/80 dark:border-white/10 hover:border-[#FF0055]/70 transition-all duration-300 h-[125px] sm:h-[142px] lg:h-[150px] flex flex-col select-none bg-slate-950"
              >
                <div className="bg-slate-900/95 dark:bg-[#060913] border-b border-white/10 px-2.5 py-1 flex items-center justify-between z-10 shrink-0">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/90" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/90" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/90" />
                  </div>
                  <span className="text-[9px] font-['JetBrains_Mono'] text-slate-400 truncate max-w-[120px]">app.globalinfosofts.com</span>
                  <span className="text-[8px] font-['JetBrains_Mono'] font-bold text-violet-400">APP</span>
                </div>
                <div className="relative flex-1 overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80"
                    alt="Mobile Applications"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>
                <FacetedProjectRibbon title="Mobile Applications" idKey="mobile-app" />
              </motion.div>

              {/* Card 2: Digital Marketing */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => onNavigatePage('projects')}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg border border-slate-200/80 dark:border-white/10 hover:border-[#FF0055]/70 transition-all duration-300 h-[125px] sm:h-[142px] lg:h-[150px] flex flex-col select-none bg-slate-950"
              >
                <div className="bg-slate-900/95 dark:bg-[#060913] border-b border-white/10 px-2.5 py-1 flex items-center justify-between z-10 shrink-0">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/90" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/90" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/90" />
                  </div>
                  <span className="text-[9px] font-['JetBrains_Mono'] text-slate-400 truncate max-w-[120px]">growth.analytics.io</span>
                  <span className="text-[8px] font-['JetBrains_Mono'] font-bold text-fuchsia-400">SEO</span>
                </div>
                <div className="relative flex-1 overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                    alt="Digital Marketing"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>
                <FacetedProjectRibbon title="Digital Marketing" idKey="digital-marketing" />
              </motion.div>

              {/* Card 3: E-Commerce Solutions */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => onNavigatePage('projects')}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg border border-slate-200/80 dark:border-white/10 hover:border-[#FF0055]/70 transition-all duration-300 h-[125px] sm:h-[142px] lg:h-[150px] flex flex-col select-none bg-slate-950"
              >
                <div className="bg-slate-900/95 dark:bg-[#060913] border-b border-white/10 px-2.5 py-1 flex items-center justify-between z-10 shrink-0">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/90" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/90" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/90" />
                  </div>
                  <span className="text-[9px] font-['JetBrains_Mono'] text-slate-400 truncate max-w-[120px]">store.sevenfinancials.in</span>
                  <span className="text-[8px] font-['JetBrains_Mono'] font-bold text-emerald-400">SHOP</span>
                </div>
                <div className="relative flex-1 overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80"
                    alt="E-Commerce Solutions"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>
                <FacetedProjectRibbon title="E-Commerce Solutions" idKey="ecommerce-sol" />
              </motion.div>

              {/* Card 4: UI/UX Design */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => onNavigatePage('projects')}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg border border-slate-200/80 dark:border-white/10 hover:border-[#FF0055]/70 transition-all duration-300 h-[125px] sm:h-[142px] lg:h-[150px] flex flex-col select-none bg-slate-950"
              >
                <div className="bg-slate-900/95 dark:bg-[#060913] border-b border-white/10 px-2.5 py-1 flex items-center justify-between z-10 shrink-0">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/90" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/90" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/90" />
                  </div>
                  <span className="text-[9px] font-['JetBrains_Mono'] text-slate-400 truncate max-w-[120px]">design.globalinfosofts.com</span>
                  <span className="text-[8px] font-['JetBrains_Mono'] font-bold text-sky-400">UI/UX</span>
                </div>
                <div className="relative flex-1 overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"
                    alt="UI/UX Design"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>
                <FacetedProjectRibbon title="UI/UX Design" idKey="ui-ux" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY DEPLOY WITH US? (TACTICAL CYBER SYSTEM ONLINE SECTION) */}
      <WhyDeploySection onOpenContact={onOpenContact} />

      {/* 5. WHY CHOOSE GLOBAL INFOSOFT (PRESERVED ENTERPRISE TRUST SHOWCASE) */}
      <section className="py-6 sm:py-8 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#070b14]/50">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto mb-4 sm:mb-5"
          >
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-1 block">
              Enterprise Trust &amp; Reliability
            </span>
            <h2 className="font-['Sora'] text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why Businesses Choose Global InfoSoft
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-cyan-500/60 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-2.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-['Sora'] text-base font-bold text-slate-900 dark:text-white mb-1">
                Full Code Ownership
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Zero vendor lock-in. You retain 100% intellectual property, license credentials, and encrypted database keys.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-purple-500/60 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2.5">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-['Sora'] text-base font-bold text-slate-900 dark:text-white mb-1">
                6 Months Free Support
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Complimentary post-launch warranty including staff training, bug fixes, data migration, and regular backups.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-emerald-500/60 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2.5">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="font-['Sora'] text-base font-bold text-slate-900 dark:text-white mb-1">
                Local &amp; Remote Support
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Direct phone support and instant AnyDesk remote desktop troubleshooting with guaranteed 24-hour turnaround.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-blue-500/60 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2.5">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-['Sora'] text-base font-bold text-slate-900 dark:text-white mb-1">
                Tailored Customization
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Software built around your actual business workflow, thermal printers, barcode scanners, and GST tax rules.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. MEET THE EXPERTS (OUR TEAM SECTION MATCHING SCREENSHOT 487) */}
      <MeetExpertsSection onOpenContact={onOpenContact} />

      {/* 8. BLOGS & TECHNICAL INSIGHTS SECTION */}
      <BlogsSection onNavigatePage={onNavigatePage} onOpenContact={onOpenContact} />

      {/* 9. BUILD YOUR SERVICE PACKAGE (PENULTIMATE / 2ND TO LAST SECTION) */}
      <BuildPackageSection onOpenContact={onOpenContact} />

      {/* 10. FULL-WIDTH CTA BANNER */}
      <section className="py-6 sm:py-7 border-t border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-r from-slate-100/90 via-slate-50/90 to-cyan-50/50 dark:from-slate-900/90 dark:via-[#0b1020]/90 dark:to-cyan-950/30 w-full transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col lg:flex-row items-center justify-between gap-5 relative z-10"
        >
          <div className="space-y-1 text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-['Sora'] tracking-tight">
              Ready to Upgrade or Build Your Business Software?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Get in touch with our team in Jamshedpur for a free live demo, software consultation, or custom quote.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-6 py-2.5 rounded-full btn-primary text-white font-['JetBrains_Mono'] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg group cursor-pointer active:scale-95"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={getWhatsAppUrl(COMPANY_INFO.salesPhone, 'Hello Global InfoSoft, I would like to schedule a software consultation and get a price quote.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full glass-panel text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-white font-['JetBrains_Mono'] font-semibold text-xs transition-all flex items-center gap-2 hover:border-emerald-500/60 shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp: {COMPANY_INFO.salesPhone}</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Users,
  TrendingUp,
  ShieldCheck,
  LayoutGrid,
  Compass,
  Target,
  MessageCircle,
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import { PageId } from '../types';
import { RevealOnScroll } from './common/RevealOnScroll';

interface AboutSectionProps {
  onOpenContact?: (scope?: string) => void;
  onSelectProject?: (projectId: string) => void;
  onNavigatePage?: (page: PageId) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenContact,
  onNavigatePage
}) => {
  const whatsappUrl = getWhatsAppUrl(
    COMPANY_INFO.primaryPhone,
    WHATSAPP_MESSAGES.general
  );

  return (
    <div
      id="about-us-page"
      className="w-full relative bg-slate-50 dark:bg-[#07090F] text-slate-800 dark:text-slate-200 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-300"
    >
      {/* Ambient background glow matching Tech Support & Pricing pages */}
      <div className="absolute top-16 -left-32 w-[550px] h-[550px] bg-rose-500/5 dark:bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Full-Width Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-10 space-y-12 sm:space-y-16 lg:space-y-20">

        {/* ========================================================================= */}
        {/* SECTION 1: HERO (MATCHING USER SCREENSHOT EXACTLY) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-left space-y-4 sm:space-y-5"
          >
            {/* Top Eyebrow with horizontal line */}
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-[1.5px] bg-slate-400 dark:bg-slate-500 inline-block" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase">
                ABOUT GLOBAL INFOSOFT
              </span>
            </div>

            {/* Giant Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Sora'] tracking-tight text-slate-900 dark:text-white leading-[1.08] transition-colors duration-300">
              Turning Ideas<br />
              Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-[#70A6FF] dark:via-cyan-400 dark:to-sky-300">
                Digital Success
              </span>
            </h1>

            {/* Paragraph matching exact copy */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal transition-colors duration-300">
              At Global Infosoft, we believe in empowering businesses with smart, practical, and
              innovative digital solutions. Since our inception, our mission has been simple: to help
              businesses grow online by providing high-quality services that deliver results. Whether
              you're a startup, SME, or an established company, we work closely with you to understand
              your vision and transform it into digital experiences that engage, impress, and convert.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="about-hero-get-in-touch-btn"
                onClick={() => onOpenContact && onOpenContact('General Enquiry - About Us')}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#9EB8FF] dark:hover:bg-[#8AAEFF] dark:text-[#0A1026] font-bold text-sm shadow-lg shadow-blue-500/20 dark:shadow-blue-950/40 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="about-hero-our-services-btn"
                onClick={() => {
                  if (onNavigatePage) {
                    onNavigatePage('services');
                  } else if (onOpenContact) {
                    onOpenContact('Services Consultation');
                  }
                }}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-300 hover:border-slate-400 text-slate-800 dark:bg-[#0B101D]/90 dark:hover:bg-slate-800 dark:border-slate-700/80 dark:hover:border-slate-500 dark:text-white font-semibold text-sm active:scale-95 transition-all duration-200 cursor-pointer shadow-sm dark:shadow-md"
              >
                Our Services
              </button>
            </div>
          </motion.div>

          {/* Right Column: Office Boardroom Image with Illuminated 3D Logo & Floating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[430px] rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 overflow-hidden shadow-xl dark:shadow-2xl group bg-white dark:bg-slate-950 transition-colors duration-300">
              {/* High-res Modern Corporate Boardroom Image */}
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Global Infosoft Headquarters Boardroom"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-[#07090F]/40 to-transparent pointer-events-none" />

              {/* 3D Global Infosoft Signage on the Wall */}
              <div className="absolute top-10 sm:top-14 right-6 sm:right-10 z-20 flex flex-col items-center select-none pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-500 flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.5)]">
                    <div className="w-full h-full rounded-full bg-[#090D18] flex items-center justify-center">
                      <span className="text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 to-sky-400 font-black text-base sm:text-lg">
                        G
                      </span>
                    </div>
                  </div>
                  <span className="text-lg sm:text-xl font-black font-['Sora'] text-white tracking-tight">
                    Global Infosoft
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-slate-300 mt-1 uppercase">
                  Technology &nbsp;|&nbsp; Solutions &nbsp;|&nbsp; Growth
                </div>
              </div>

              {/* Floating Card at bottom right */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 rounded-xl bg-white/95 dark:bg-[#090D18]/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700/80 p-3.5 sm:p-4 shadow-xl max-w-[240px] sm:max-w-[270px] text-left transition-colors duration-300">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Sora'] leading-snug">
                  Reliable Solutions<br />for Real Businesses
                </h4>
                <div className="h-[1.5px] bg-slate-200 dark:bg-slate-700 my-2 w-10" />
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                  Technology &nbsp;|&nbsp; People &nbsp;|&nbsp; Progress
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: OUR STORY (MATCHING USER SCREENSHOT EXACTLY) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column (7 cols) */}
          <RevealOnScroll direction="up" delay={0.05} className="lg:col-span-7 text-left space-y-4 sm:space-y-5">
            {/* Eyebrow */}
            <div className="text-xs font-mono font-bold tracking-[0.2em] text-blue-600 dark:text-cyan-400 uppercase">
              OUR STORY
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Sora'] tracking-tight text-slate-900 dark:text-white leading-tight transition-colors duration-300">
              Building Digital<br />
              Experiences{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-400 dark:to-sky-300">
                That Matter
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal transition-colors duration-300">
              At Global Infosoft, we combine creativity, technology, and strategy to deliver
              solutions that are not only visually appealing but also highly functional. Every
              project we take on is tailored to your business goals, ensuring maximum impact and
              measurable results.
            </p>

            {/* 3 Horizontal Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {/* Badge 1: Client Focused */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0B101D]/90 border border-slate-200/90 dark:border-slate-800/80 shadow-sm dark:shadow-md hover:border-blue-400 dark:hover:border-cyan-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Sora']">
                    Client Focused
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Your goals are our priority
                  </div>
                </div>
              </motion.div>

              {/* Badge 2: Innovative Solutions */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0B101D]/90 border border-slate-200/90 dark:border-slate-800/80 shadow-sm dark:shadow-md hover:border-blue-400 dark:hover:border-cyan-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Sora']">
                    Innovative Solutions
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Always a step ahead
                  </div>
                </div>
              </motion.div>

              {/* Badge 3: Long-Term Growth */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#0B101D]/90 border border-slate-200/90 dark:border-slate-800/80 shadow-sm dark:shadow-md hover:border-blue-400 dark:hover:border-cyan-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Sora']">
                    Long-Term Growth
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Building success together
                  </div>
                </div>
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Work Desk with Laptop and "Good Software Better Businesses" Mug */}
          <RevealOnScroll direction="up" delay={0.15} className="lg:col-span-5 relative">
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 overflow-hidden shadow-xl dark:shadow-2xl group bg-white dark:bg-slate-950 transition-colors duration-300">
              {/* Laptop on desk photo */}
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
                alt="Building Digital Experiences - Work Desk"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-[#07090F]/40 to-transparent pointer-events-none" />

              {/* Ceramic Mug Feature Card in foreground right */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 flex items-center gap-3">
                <div className="relative w-32 h-36 sm:w-36 sm:h-40 bg-white/95 dark:bg-gradient-to-b dark:from-[#1E2536] dark:via-[#121624] dark:to-[#0A0D15] border border-slate-200 dark:border-slate-700/80 rounded-2xl p-3 shadow-2xl flex flex-col justify-center items-center text-center backdrop-blur-md transition-colors duration-300">
                  {/* Subtle Mug Handle */}
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-14 rounded-r-xl border-2 border-slate-300 dark:border-slate-700/80 bg-white/80 dark:bg-[#121624]/60" />
                  <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-['Sora'] leading-tight tracking-tight">
                    Good<br />
                    Software<br />
                    <span className="text-blue-600 dark:text-cyan-400">Better</span><br />
                    Businesses
                  </div>
                  <div className="w-6 h-[1.5px] bg-blue-600 dark:bg-cyan-400/80 mt-2 rounded-full" />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: OUR PHILOSOPHY (MATCHING USER SCREENSHOT EXACTLY) */}
        {/* ========================================================================= */}
        <RevealOnScroll direction="up" delay={0.05} className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#090D18]/95 backdrop-blur-xl p-6 sm:p-10 lg:p-12 text-left overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header Flex Row */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div>
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-blue-600 dark:text-cyan-400 uppercase">
                OUR PHILOSOPHY
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Sora'] text-slate-900 dark:text-white mt-1.5 tracking-tight transition-colors duration-300">
                Create. Build. Grow.
              </h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg font-normal transition-colors duration-300">
              We combine creativity, technology, and strategy to create digital solutions that
              solve real business problems and create measurable value.
            </p>
          </div>

          {/* Horizontal Divider */}
          <div className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 my-8 sm:my-10" />

          {/* 3 Step Columns */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Step 01 */}
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-800 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black font-['JetBrains_Mono'] text-blue-600 dark:text-cyan-400">
                01
              </div>
              <h4 className="text-base sm:text-lg font-bold font-['Sora'] text-slate-900 dark:text-white">
                Understand
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                We listen carefully to understand your business, audience, and goals.
              </p>
            </motion.div>

            {/* Step 02 */}
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-800 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black font-['JetBrains_Mono'] text-blue-600 dark:text-cyan-400">
                02
              </div>
              <h4 className="text-base sm:text-lg font-bold font-['Sora'] text-slate-900 dark:text-white">
                Build
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                We turn ideas into reliable, scalable, and user-friendly digital experiences.
              </p>
            </motion.div>

            {/* Step 03 */}
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-800 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black font-['JetBrains_Mono'] text-blue-600 dark:text-cyan-400">
                03
              </div>
              <h4 className="text-base sm:text-lg font-bold font-['Sora'] text-slate-900 dark:text-white">
                Grow
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                We focus on long-term value, performance, and continuous improvement.
              </p>
            </motion.div>
          </div>
        </RevealOnScroll>

        {/* ========================================================================= */}
        {/* SECTION 4: WHY GLOBAL INFOSOFT? (MATCHING USER SCREENSHOT EXACTLY) */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (5 cols) */}
          <RevealOnScroll direction="up" delay={0.05} className="lg:col-span-5 text-left space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Sora'] text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-300">
              Why Global Infosoft?
            </h2>

            <p className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 transition-colors duration-300">
              Technology should solve problems — not create them.
            </p>

            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed transition-colors duration-300">
              We're here to make technology simple, effective, and impactful for your business.
            </p>

            <div className="pt-3">
              <button
                id="why-gis-lets-work-together-btn"
                onClick={() => onOpenContact && onOpenContact("Let's Work Together - Why GIS")}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#9EB8FF] dark:hover:bg-[#8AAEFF] dark:text-[#0A1026] font-bold text-sm shadow-md shadow-blue-500/20 dark:shadow-blue-950/40 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </RevealOnScroll>

          {/* Right Column: 2x2 Feature Cards Grid (7 cols) */}
          <RevealOnScroll direction="up" delay={0.15} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left">
            {/* Card 1: Expert Team */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#090D18]/90 p-5 sm:p-6 flex items-start gap-4 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-all shadow-md dark:shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold font-['Sora'] text-slate-900 dark:text-white">
                  Expert Team
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Skilled professionals with experience across web, design, and digital marketing.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Customized Solutions */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#090D18]/90 p-5 sm:p-6 flex items-start gap-4 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-all shadow-md dark:shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold font-['Sora'] text-slate-900 dark:text-white">
                  Customized Solutions
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every project is tailored to meet your specific business goals.
                </p>
              </div>
            </motion.div>

            {/* Card 3: End-to-End Services */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#090D18]/90 p-5 sm:p-6 flex items-start gap-4 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-all shadow-md dark:shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold font-['Sora'] text-slate-900 dark:text-white">
                  End-to-End Services
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  From concept to delivery and ongoing support, we handle the complete journey.
                </p>
              </div>
            </motion.div>

            {/* Card 4: Result-Oriented Approach */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#090D18]/90 p-5 sm:p-6 flex items-start gap-4 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-all shadow-md dark:shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-700/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold font-['Sora'] text-slate-900 dark:text-white">
                  Result-Oriented Approach
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Focused on helping your business grow and succeed online.
                </p>
              </div>
            </motion.div>
          </RevealOnScroll>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: BOTTOM CTA BANNER: "LET'S BUILD TOGETHER" */}
        {/* ========================================================================= */}
        <RevealOnScroll direction="up" delay={0.08} className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white dark:from-[#090D18] dark:via-[#090D18]/90 dark:to-[#090D18] text-left overflow-hidden shadow-xl dark:shadow-2xl p-6 sm:p-10 lg:p-12 transition-colors duration-300">
          {/* Architectural modern glass skyscraper background image */}
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="Global Infosoft Architectural Tower"
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-[#090D18] dark:via-[#090D18]/90 dark:to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-2.5">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-blue-600 dark:text-cyan-400 uppercase">
                LET'S BUILD TOGETHER
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Sora'] text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-300">
                Have an Idea?<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-sky-400 dark:via-cyan-300 dark:to-blue-400">
                  Let's Build It Together.
                </span>
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg font-normal transition-colors duration-300">
                Tell us what you're building and let's turn your vision into a digital
                experience that delivers results.
              </p>
            </div>

            {/* Middle Action Column (3 cols) */}
            <div className="lg:col-span-3 flex flex-col items-start sm:items-start justify-center gap-3">
              <button
                id="cta-start-a-project-btn"
                onClick={() => onOpenContact && onOpenContact('Start a Project with Global Infosoft')}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-sm shadow-xl active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="cta-talk-to-us-btn"
                onClick={() => onOpenContact && onOpenContact('Talk to Us - Global Infosoft Leadership')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-xs sm:text-sm font-semibold underline underline-offset-4 cursor-pointer transition-colors duration-200 pl-1"
              >
                Talk to Us
              </button>
            </div>

            {/* Right Typography Accent Column (2 cols) */}
            <div className="hidden lg:flex lg:col-span-2 flex-col items-start justify-center space-y-1 border-l border-slate-300 dark:border-slate-700/60 pl-6 text-left">
              <div className="text-xs font-mono font-semibold tracking-[0.2em] text-slate-500 dark:text-slate-400">
                IDEAS
              </div>
              <div className="text-xs font-mono font-semibold tracking-[0.2em] text-slate-500 dark:text-slate-400">
                SOLUTIONS
              </div>
              <div className="text-xs font-mono font-semibold tracking-[0.2em] text-slate-500 dark:text-slate-400">
                GROWTH
              </div>
              <div className="w-8 h-[2px] bg-blue-600 dark:bg-cyan-400 rounded-full mt-2" />
            </div>
          </div>
        </RevealOnScroll>

      </div>

      {/* Floating WhatsApp Enquiry Button matching screenshot at bottom right */}
      <a
        id="floating-whatsapp-enquiry-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-[0_4px_25px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="WhatsApp Enquiry"
      >
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
        <span>WhatsApp Enquiry</span>
      </a>
    </div>
  );
};

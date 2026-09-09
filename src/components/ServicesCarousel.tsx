import React, { useRef } from 'react';
import { ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/companyData';
import { useCms } from '../context/CmsContext';
import { CardSectionBackground } from './CardSectionBackground';
import {
  ArrowRight,
  Code2,
  Globe,
  Smartphone,
  Calculator,
  TrendingUp,
  Headphones,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ServicesCarouselProps {
  onSelectService: (service: ServiceItem) => void;
  onExploreAll?: () => void;
}

// Sophisticated accent configuration for each service card
const SERVICE_ACCENTS: Record<
  string,
  {
    num: string;
    gradientBorder: string;
    hoverBorder: string;
    glowShadow: string;
    iconBg: string;
    iconText: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    accentGradient: string;
    image: string;
    demoUrl: string;
  }
> = {
  'custom-software': {
    num: '01',
    gradientBorder: 'border-cyan-500/25',
    hoverBorder: 'hover:border-cyan-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(6,182,212,0.22)]',
    iconBg: 'bg-cyan-500/15 dark:bg-cyan-500/20',
    iconText: 'text-cyan-600 dark:text-cyan-300',
    badgeBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    badgeBorder: 'border-cyan-500/30',
    accentGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'erp.globalinfosofts.com'
  },
  'erp-development': {
    num: '02',
    gradientBorder: 'border-indigo-500/25',
    hoverBorder: 'hover:border-indigo-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(99,102,241,0.22)]',
    iconBg: 'bg-indigo-500/15 dark:bg-indigo-500/20',
    iconText: 'text-indigo-600 dark:text-indigo-300',
    badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    badgeBorder: 'border-indigo-500/30',
    accentGradient: 'from-indigo-500/10 via-blue-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'erp.globalinfosofts.com'
  },
  'customer-support': {
    num: '03',
    gradientBorder: 'border-teal-500/25',
    hoverBorder: 'hover:border-teal-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(20,184,166,0.22)]',
    iconBg: 'bg-teal-500/15 dark:bg-teal-500/20',
    iconText: 'text-teal-600 dark:text-teal-300',
    badgeBg: 'bg-teal-500/10 dark:bg-teal-500/15',
    badgeText: 'text-teal-700 dark:text-teal-300',
    badgeBorder: 'border-teal-500/30',
    accentGradient: 'from-teal-500/10 via-cyan-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'support.globalinfosofts.com'
  },
  'cloud-hosting': {
    num: '04',
    gradientBorder: 'border-sky-500/25',
    hoverBorder: 'hover:border-sky-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.22)]',
    iconBg: 'bg-sky-500/15 dark:bg-sky-500/20',
    iconText: 'text-sky-600 dark:text-sky-300',
    badgeBg: 'bg-sky-500/10 dark:bg-sky-500/15',
    badgeText: 'text-sky-700 dark:text-sky-300',
    badgeBorder: 'border-sky-500/30',
    accentGradient: 'from-sky-500/10 via-cyan-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'cloud.servernode.net'
  },
  'website-design': {
    num: '05',
    gradientBorder: 'border-amber-500/25',
    hoverBorder: 'hover:border-amber-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(245,158,11,0.22)]',
    iconBg: 'bg-amber-500/15 dark:bg-amber-500/20',
    iconText: 'text-amber-600 dark:text-amber-300',
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/15',
    badgeText: 'text-amber-700 dark:text-amber-300',
    badgeBorder: 'border-amber-500/30',
    accentGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'design.globalinfosofts.com'
  },
  'web-applications': {
    num: '06',
    gradientBorder: 'border-blue-500/25',
    hoverBorder: 'hover:border-blue-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.22)]',
    iconBg: 'bg-blue-500/15 dark:bg-blue-500/20',
    iconText: 'text-blue-600 dark:text-blue-300',
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    badgeText: 'text-blue-700 dark:text-blue-300',
    badgeBorder: 'border-blue-500/30',
    accentGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'portal.globalinfosofts.com'
  },
  'web-development': {
    num: '06',
    gradientBorder: 'border-blue-500/25',
    hoverBorder: 'hover:border-blue-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.22)]',
    iconBg: 'bg-blue-500/15 dark:bg-blue-500/20',
    iconText: 'text-blue-600 dark:text-blue-300',
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    badgeText: 'text-blue-700 dark:text-blue-300',
    badgeBorder: 'border-blue-500/30',
    accentGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'sevenfinancials.in'
  },
  'mobile-apps': {
    num: '07',
    gradientBorder: 'border-violet-500/25',
    hoverBorder: 'hover:border-violet-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(139,92,246,0.22)]',
    iconBg: 'bg-violet-500/15 dark:bg-violet-500/20',
    iconText: 'text-violet-600 dark:text-violet-300',
    badgeBg: 'bg-violet-500/10 dark:bg-violet-500/15',
    badgeText: 'text-violet-700 dark:text-violet-300',
    badgeBorder: 'border-violet-500/30',
    accentGradient: 'from-violet-500/10 via-purple-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'app.globalinfosofts.com'
  },
  'gst-billing': {
    num: '08',
    gradientBorder: 'border-emerald-500/25',
    hoverBorder: 'hover:border-emerald-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(16,185,129,0.22)]',
    iconBg: 'bg-emerald-500/15 dark:bg-emerald-500/20',
    iconText: 'text-emerald-600 dark:text-emerald-300',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    badgeBorder: 'border-emerald-500/30',
    accentGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'billing.globalinfosofts.com'
  },
  'pos-systems': {
    num: '09',
    gradientBorder: 'border-emerald-500/25',
    hoverBorder: 'hover:border-emerald-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(16,185,129,0.22)]',
    iconBg: 'bg-emerald-500/15 dark:bg-emerald-500/20',
    iconText: 'text-emerald-600 dark:text-emerald-300',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    badgeBorder: 'border-emerald-500/30',
    accentGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'pos.globalinfosofts.com'
  },
  'accounting-software': {
    num: '10',
    gradientBorder: 'border-cyan-500/25',
    hoverBorder: 'hover:border-cyan-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(6,182,212,0.22)]',
    iconBg: 'bg-cyan-500/15 dark:bg-cyan-500/20',
    iconText: 'text-cyan-600 dark:text-cyan-300',
    badgeBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    badgeBorder: 'border-cyan-500/30',
    accentGradient: 'from-cyan-500/10 via-teal-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'accounts.globalinfosofts.com'
  },
  'accounting-pos': {
    num: '09',
    gradientBorder: 'border-emerald-500/25',
    hoverBorder: 'hover:border-emerald-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(16,185,129,0.22)]',
    iconBg: 'bg-emerald-500/15 dark:bg-emerald-500/20',
    iconText: 'text-emerald-600 dark:text-emerald-300',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    badgeBorder: 'border-emerald-500/30',
    accentGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'pos.globalinfosofts.com'
  },
  'seo-services': {
    num: '11',
    gradientBorder: 'border-rose-500/25',
    hoverBorder: 'hover:border-rose-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(244,63,94,0.22)]',
    iconBg: 'bg-rose-500/15 dark:bg-rose-500/20',
    iconText: 'text-rose-600 dark:text-rose-300',
    badgeBg: 'bg-rose-500/10 dark:bg-rose-500/15',
    badgeText: 'text-rose-700 dark:text-rose-300',
    badgeBorder: 'border-rose-500/30',
    accentGradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'seo.globalinfosofts.com'
  },
  'digital-marketing': {
    num: '12',
    gradientBorder: 'border-fuchsia-500/25',
    hoverBorder: 'hover:border-fuchsia-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(217,70,239,0.22)]',
    iconBg: 'bg-fuchsia-500/15 dark:bg-fuchsia-500/20',
    iconText: 'text-fuchsia-600 dark:text-fuchsia-300',
    badgeBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/15',
    badgeText: 'text-fuchsia-700 dark:text-fuchsia-300',
    badgeBorder: 'border-fuchsia-500/30',
    accentGradient: 'from-fuchsia-500/10 via-pink-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'growth.analytics.io'
  },
  'hosting-support': {
    num: '04',
    gradientBorder: 'border-sky-500/25',
    hoverBorder: 'hover:border-sky-400/70',
    glowShadow: 'hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.22)]',
    iconBg: 'bg-sky-500/15 dark:bg-sky-500/20',
    iconText: 'text-sky-600 dark:text-sky-300',
    badgeBg: 'bg-sky-500/10 dark:bg-sky-500/15',
    badgeText: 'text-sky-700 dark:text-sky-300',
    badgeBorder: 'border-sky-500/30',
    accentGradient: 'from-sky-500/10 via-cyan-500/5 to-transparent',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'cloud.servernode.net'
  }
};

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code2':
      return Code2;
    case 'Globe':
      return Globe;
    case 'Smartphone':
      return Smartphone;
    case 'Calculator':
      return Calculator;
    case 'TrendingUp':
      return TrendingUp;
    case 'Headphones':
      return Headphones;
    default:
      return Sparkles;
  }
};

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({
  onSelectService,
  onExploreAll
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { services } = useCms();

  const baseServices: ServiceItem[] = (services && services.length > 0)
    ? services.filter(s => s.enabled !== false).map(s => ({
        id: s.id,
        title: s.title,
        shortDesc: s.shortDesc || s.shortDescription || '',
        longDesc: s.longDesc || '',
        iconName: s.iconName || 'Code2',
        category: (s.category as any) || 'software',
        deliverables: s.deliverables || s.features || [],
        technologies: s.technologies || s.techStack || [],
        metrics: s.metrics || '',
        image: s.image,
        duration: s.duration,
        featured: s.featured
      }))
    : SERVICES_DATA;

  // Duplicate the services into two identical sets for seamless continuous looping
  const duplicatedServices = [...baseServices, ...baseServices];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="our-services"
      className="py-6 sm:py-8 relative overflow-hidden bg-[var(--bg-body)] card-section-datacenter-bg transition-colors duration-300"
    >
      {/* High-Tech Cloud Datacenter & Global Infrastructure Background Layer */}
      <CardSectionBackground
        opacity="opacity-40 dark:opacity-25"
        overlayOpacity="bg-slate-50/65 dark:bg-[#070B14]/80"
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] bg-gradient-to-r from-cyan-500/10 via-blue-500/8 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Section Header: Centered & Premium with Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
          {/* Small Eyebrow */}
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 backdrop-blur-md mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>WHAT WE OFFER</span>
          </span>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Sora'] tracking-tight text-slate-900 dark:text-white leading-tight">
            Our Services
          </h2>

          {/* Short existing company/service description underneath */}
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            High-performance custom software engineering, enterprise ERP systems, mobile apps, e-commerce, and cloud infrastructure engineered for business growth.
          </p>

          {/* Manual Next / Prev Navigation Buttons for Desktop */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/50 transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Scroll services left"
              title="Previous Services"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/50 transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Scroll services right"
              title="Next Services"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Showcase with Left & Right Fade Masks */}
      <div className="relative w-full overflow-hidden services-carousel-container">
        {/* Left Gradient Edge Vignette */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 z-20 pointer-events-none bg-gradient-to-r from-[var(--bg-body)] via-[var(--bg-body)]/80 to-transparent" />
        
        {/* Right Gradient Edge Vignette */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 z-20 pointer-events-none bg-gradient-to-l from-[var(--bg-body)] via-[var(--bg-body)]/80 to-transparent" />

        {/* Scrollable Container with Infinite Track */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden py-4 px-4 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
        >
          <div className="services-carousel-track flex items-stretch gap-5 sm:gap-6 md:gap-7">
            {duplicatedServices.map((service, idx) => {
              const accent = SERVICE_ACCENTS[service.id] || SERVICE_ACCENTS['custom-software'];
              const IconComp = getServiceIcon(service.iconName);
              const cardImage = accent.image || service.image;

              return (
                <article
                  key={`${service.id}-${idx}`}
                  onClick={() => onSelectService(service)}
                  className={`group relative w-[310px] sm:w-[350px] md:w-[370px] shrink-0 rounded-3xl overflow-hidden glass-card-transparent bg-white/60 dark:bg-[#070b18]/60 backdrop-blur-2xl border ${accent.gradientBorder} ${accent.hoverBorder} shadow-lg dark:shadow-2xl transition-all duration-350 ease-out hover:-translate-y-2 ${accent.glowShadow} flex flex-col justify-between cursor-pointer select-none text-left`}
                >
                  {/* Subtle Card Accent Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${accent.accentGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  />

                  {/* Upper Section: Professional Service Live Browser Mockup Demo */}
                  <div className="relative w-full overflow-hidden bg-slate-950 flex flex-col">
                    {/* Live Browser Chrome Header */}
                    <div className="bg-slate-900/95 dark:bg-[#060913] border-b border-white/10 px-3.5 py-1.5 flex items-center justify-between z-20 shrink-0 select-none">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-500/90" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/90" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500/90" />
                      </div>
                      <div className="bg-slate-800/90 dark:bg-white/5 text-[10px] font-['JetBrains_Mono'] text-slate-300 dark:text-slate-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-white/5 truncate max-w-[170px]">
                        <span className="text-emerald-400 text-[8px] animate-pulse">●</span>
                        <span className="truncate">{accent.demoUrl}</span>
                      </div>
                      <span className="text-[9px] font-['JetBrains_Mono'] font-bold text-cyan-400 uppercase tracking-wider">
                        DEMO
                      </span>
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden bg-slate-950">
                      <img
                        src={cardImage}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover object-center filter brightness-95 transition-transform duration-500 ease-out group-hover:scale-108"
                      />
                      {/* Gradient overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-black/35 to-transparent pointer-events-none" />

                      {/* Top Floating Badges */}
                      <div className="absolute top-2.5 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                        {/* Service Number Badge */}
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-extrabold bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-sm">
                          #{accent.num}
                        </span>

                        {/* Category Badge */}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${accent.badgeBorder} ${accent.badgeBg} ${accent.badgeText}`}
                        >
                          {service.category}
                        </span>
                      </div>

                      {/* Icon Badge Floating above lower border */}
                      <div className="absolute bottom-2.5 left-3.5 z-10">
                        <div
                          className={`w-9 h-9 rounded-xl ${accent.iconBg} ${accent.iconText} backdrop-blur-md border border-white/15 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 relative z-10">
                    <div className="space-y-2">
                      {/* Service Title */}
                      <h3 className="text-lg sm:text-xl font-bold font-['Sora'] text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                        {service.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-normal">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Key Deliverables / Features Tags */}
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {service.deliverables.slice(0, 2).map((item, dIdx) => (
                            <div
                              key={dIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10"
                            >
                              <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                              <span className="truncate max-w-[210px]">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom CTA Row: "View Details →" */}
                    <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                        {service.duration || '2 - 4 Weeks'}
                      </span>

                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Option to Explore Full Catalog if desired */}
      {onExploreAll && (
        <div className="text-center mt-4">
          <button
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel text-xs font-['JetBrains_Mono'] font-bold text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Explore All 6 Full Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </section>
  );
};

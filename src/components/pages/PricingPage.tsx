import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Globe,
  Megaphone,
  Smartphone,
  Code2,
  ShoppingBag,
  Rocket,
  Check,
  X,
  ArrowRight,
  Shield,
  Users,
  Target,
  Zap,
  PhoneCall,
  ChevronDown
} from 'lucide-react';

interface PricingPageProps {
  onOpenContact: (scope?: string) => void;
}

type PricingCategory = 'web' | 'marketing' | 'app';
type Currency = 'USD' | 'INR';

interface PlanItem {
  id: string;
  name: string;
  icon: React.ElementType;
  badge?: string;
  isPopular?: boolean;
  desc: string;
  usdPrice: string;
  inrPrice: string;
  period: string;
  ctaText: string;
  features: {
    text: string;
    included: boolean;
  }[];
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<PricingCategory>('web');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // 1. WEB DEVELOPMENT PLANS
  const webPlans: PlanItem[] = [
    {
      id: 'web-starter',
      name: 'Starter',
      icon: Globe,
      desc: 'Perfect for small businesses needing an online presence.',
      usdPrice: '$299',
      inrPrice: '₹24,999',
      period: 'one-time',
      ctaText: 'Get Started',
      features: [
        { text: 'Single-page responsive website', included: true },
        { text: 'Mobile-friendly design', included: true },
        { text: 'Contact form integration', included: true },
        { text: 'Basic on-page SEO', included: true },
        { text: 'Google Maps integration', included: true },
        { text: '3 revision rounds', included: true },
        { text: '7-day delivery', included: true },
        { text: 'CMS / Admin panel', included: false },
        { text: 'E-commerce features', included: false },
        { text: 'Custom animations', included: false }
      ]
    },
    {
      id: 'web-pro',
      name: 'Professional',
      icon: Code2,
      badge: 'Most Popular',
      isPopular: true,
      desc: 'Multi-page site with CMS and advanced features.',
      usdPrice: '$699',
      inrPrice: '₹49,999',
      period: 'one-time',
      ctaText: 'Get Started',
      features: [
        { text: 'Up to 10 pages, fully responsive', included: true },
        { text: 'WordPress / Laravel CMS', included: true },
        { text: 'Blog & news section', included: true },
        { text: 'Advanced on-page SEO', included: true },
        { text: 'Contact & enquiry forms', included: true },
        { text: 'Social media integration', included: true },
        { text: 'Speed & performance optimisation', included: true },
        { text: '5 revision rounds', included: true },
        { text: '14-day delivery', included: true },
        { text: 'E-commerce / payment gateway', included: false }
      ]
    },
    {
      id: 'web-ecommerce',
      name: 'E-commerce',
      icon: ShoppingBag,
      desc: 'Full-featured online store ready to sell from day one.',
      usdPrice: '$1,299',
      inrPrice: '₹89,999',
      period: 'one-time',
      ctaText: 'Get Started',
      features: [
        { text: 'Unlimited product listings', included: true },
        { text: 'Payment gateway integration', included: true },
        { text: 'Order & inventory management', included: true },
        { text: 'Customer accounts & wishlist', included: true },
        { text: 'Coupon & discount system', included: true },
        { text: 'Product review module', included: true },
        { text: 'E-commerce SEO setup', included: true },
        { text: 'Mobile commerce optimised', included: true },
        { text: 'Unlimited revisions', included: true },
        { text: '21-day delivery', included: true }
      ]
    },
    {
      id: 'web-enterprise',
      name: 'Enterprise',
      icon: Rocket,
      badge: 'Custom',
      desc: 'Large-scale portals, SaaS platforms & custom web apps.',
      usdPrice: 'Custom',
      inrPrice: 'Custom',
      period: 'Get a tailored quote →',
      ctaText: 'Get a Quote',
      features: [
        { text: 'Fully custom architecture', included: true },
        { text: 'Scalable cloud infrastructure', included: true },
        { text: 'API development & integration', included: true },
        { text: 'Role-based access control', included: true },
        { text: 'Advanced analytics dashboard', included: true },
        { text: 'Dedicated project manager', included: true },
        { text: 'Ongoing maintenance support', included: true },
        { text: 'Priority 24/7 support', included: true }
      ]
    }
  ];

  // 2. DIGITAL MARKETING PLANS
  const marketingPlans: PlanItem[] = [
    {
      id: 'mkt-starter',
      name: 'Starter Social',
      icon: Megaphone,
      desc: 'Ideal for small local businesses building social credibility.',
      usdPrice: '$199',
      inrPrice: '₹14,999',
      period: 'per month',
      ctaText: 'Get Started',
      features: [
        { text: '2 Social media platforms (FB & Insta)', included: true },
        { text: '12 Curated graphic posts / month', included: true },
        { text: 'Google Business profile optimization', included: true },
        { text: 'Targeted local hashtag research', included: true },
        { text: 'Monthly performance report', included: true },
        { text: 'Community inbox monitoring', included: true },
        { text: 'Paid Meta / Google Ads setup', included: false },
        { text: 'Conversion funnel tracking', included: false },
        { text: 'Dedicated account manager', included: false }
      ]
    },
    {
      id: 'mkt-pro',
      name: 'Growth Ads Pro',
      icon: Target,
      badge: 'Most Popular',
      isPopular: true,
      desc: 'Full-funnel paid advertising and high-converting lead generation.',
      usdPrice: '$499',
      inrPrice: '₹34,999',
      period: 'per month',
      ctaText: 'Get Started',
      features: [
        { text: '4 Social platforms + Google Ads', included: true },
        { text: 'High-ROAS Meta & Google ad campaigns', included: true },
        { text: '24 Custom creative ads & reels / month', included: true },
        { text: 'Weekly budget & bid optimisation', included: true },
        { text: 'Lead capture landing page creation', included: true },
        { text: 'Technical on-page SEO & rank audits', included: true },
        { text: 'WhatsApp automation integration', included: true },
        { text: 'Bi-weekly video strategy calls', included: true },
        { text: 'Celebrity / PR influencer outreach', included: false }
      ]
    },
    {
      id: 'mkt-ecommerce',
      name: 'E-com Scale',
      icon: ShoppingBag,
      desc: 'Aggressive sales scaling for online stores and D2C brands.',
      usdPrice: '$899',
      inrPrice: '₹64,999',
      period: 'per month',
      ctaText: 'Get Started',
      features: [
        { text: 'Full catalog dynamic retargeting', included: true },
        { text: 'Google Shopping & Performance Max ads', included: true },
        { text: 'Email & SMS Klaviyo abandoned cart flows', included: true },
        { text: 'Continuous A/B checkout split testing', included: true },
        { text: 'Influencer product gifting campaigns', included: true },
        { text: 'Live ROI & attribution tracking dashboard', included: true },
        { text: 'Advanced conversion rate optimisation (CRO)', included: true },
        { text: 'Dedicated growth marketing strategist', included: true },
        { text: 'Priority 24/7 campaign support', included: true }
      ]
    },
    {
      id: 'mkt-enterprise',
      name: 'Brand Dominance',
      icon: Rocket,
      badge: 'Custom',
      desc: 'Omnichannel market leadership for regional & nationwide enterprises.',
      usdPrice: 'Custom',
      inrPrice: 'Custom',
      period: 'Tailored monthly retainer',
      ctaText: 'Get a Quote',
      features: [
        { text: 'Comprehensive 360° digital strategy', included: true },
        { text: 'Dedicated full-stack creative & media team', included: true },
        { text: 'National PR syndication & press releases', included: true },
        { text: 'Enterprise SEO & programmatic pages', included: true },
        { text: 'Custom AI chatbot & lead qualification', included: true },
        { text: 'Multi-location store attribution', included: true },
        { text: 'Executive weekly KPI presentations', included: true },
        { text: 'Guaranteed SLA & response times', included: true }
      ]
    }
  ];

  // 3. APP DEVELOPMENT PLANS
  const appPlans: PlanItem[] = [
    {
      id: 'app-starter',
      name: 'Mobile MVP',
      icon: Smartphone,
      desc: 'Quick cross-platform prototype to validate your app concept.',
      usdPrice: '$999',
      inrPrice: '₹79,999',
      period: 'one-time',
      ctaText: 'Get Started',
      features: [
        { text: 'Cross-platform iOS & Android (Flutter)', included: true },
        { text: 'Up to 6 core functional screens', included: true },
        { text: 'User auth (Email, Google & Phone OTP)', included: true },
        { text: 'Cloud database (Firebase / PostgreSQL)', included: true },
        { text: 'Basic push notifications', included: true },
        { text: 'App Store & Play Store submission guide', included: true },
        { text: '14-day delivery sprint', included: true },
        { text: 'Custom backend admin panel', included: false },
        { text: 'Offline sync & biometric login', included: false },
        { text: 'In-app subscriptions / paywalls', included: false }
      ]
    },
    {
      id: 'app-pro',
      name: 'Production App',
      icon: Code2,
      badge: 'Most Popular',
      isPopular: true,
      desc: 'Full-featured mobile application engineered for high retention.',
      usdPrice: '$1,999',
      inrPrice: '₹1,59,999',
      period: 'one-time',
      ctaText: 'Get Started',
      features: [
        { text: 'Native-feel iOS & Android application', included: true },
        { text: 'Up to 15 responsive UI/UX screens', included: true },
        { text: 'Biometrics (FaceID / Fingerprint) & OTP', included: true },
        { text: 'Payment gateway integration (Stripe / Razorpay)', included: true },
        { text: 'Web-based admin management dashboard', included: true },
        { text: 'Push notification segmentation & deep links', included: true },
        { text: 'Camera, GPS location & file upload sync', included: true },
        { text: 'Full App Store & Play Store approval guarantee', included: true },
        { text: '30-day delivery sprint', included: true },
        { text: '3 Months complimentary warranty support', included: true }
      ]
    },
    {
      id: 'app-ecommerce',
      name: 'SaaS / Market App',
      icon: ShoppingBag,
      desc: 'Scalable multi-user ecosystem with real-time operations.',
      usdPrice: '$3,499',
      inrPrice: '₹2,69,999',
      period: 'one-time',
      ctaText: 'Get Started',
      features: [
        { text: 'Dual apps (Customer + Partner/Driver apps)', included: true },
        { text: 'Real-time WebSockets & live GPS tracking', included: true },
        { text: 'In-app chat & real-time order alerts', included: true },
        { text: 'In-app subscription billing & wallets', included: true },
        { text: 'Multi-role RBAC admin portal', included: true },
        { text: 'Automated invoice generation & thermal print', included: true },
        { text: 'Offline-first database local caching', included: true },
        { text: '45-day delivery sprint', included: true },
        { text: 'Unlimited revision cycles during build', included: true },
        { text: '6 Months priority maintenance included', included: true }
      ]
    },
    {
      id: 'app-enterprise',
      name: 'Enterprise Core',
      icon: Rocket,
      badge: 'Custom',
      desc: 'Mission-critical distributed mobile solutions & legacy integrations.',
      usdPrice: 'Custom',
      inrPrice: 'Custom',
      period: 'Milestone roadmap',
      ctaText: 'Get a Quote',
      features: [
        { text: 'Microservices & high-concurrency architecture', included: true },
        { text: 'On-premise or sovereign cloud hosting', included: true },
        { text: 'Hardware IoT & BLE Bluetooth scanner drivers', included: true },
        { text: 'Enterprise SAP / Tally ERP bidirectional sync', included: true },
        { text: 'Rigorous OWASP security & penetration testing', included: true },
        { text: 'Dedicated senior iOS & Android engineering team', included: true },
        { text: '100% full source code ownership & Git repository', included: true },
        { text: 'Guaranteed 99.9% uptime SLA & 24/7 on-call help', included: true }
      ]
    }
  ];

  const currentPlans =
    activeCategory === 'web'
      ? webPlans
      : activeCategory === 'marketing'
      ? marketingPlans
      : appPlans;

  const currentCategoryTitle =
    activeCategory === 'web'
      ? 'Website Development Plans'
      : activeCategory === 'marketing'
      ? 'Digital Marketing Plans'
      : 'App Development Plans';

  // 4. WHY CHOOSE GLOBAL INFOSOFT
  const whyChooseUsCards = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      desc: 'Bank-grade encrypted architecture, verified code repositories & regular automated backups.'
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      desc: 'Certified full-stack engineers and dedicated account managers assigned to every project.'
    },
    {
      icon: Zap,
      title: 'Transparent Pricing',
      desc: 'Clear scope documents, zero hidden costs, and milestone-based sign-offs on every delivery.'
    },
    {
      icon: Target,
      title: 'Results Driven',
      desc: 'Built with conversion optimization, SEO velocity, and measurable business ROI as core goals.'
    },
    {
      icon: Code2,
      title: 'Scalable Architecture',
      desc: 'Modern tech stacks designed to support thousands of concurrent users seamlessly.'
    },
    {
      icon: Sparkles,
      title: '24/7 Priority Support',
      desc: 'Round-the-clock emergency support and proactive SLA maintenance whenever needed.'
    }
  ];

  // 5. FAQS
  const faqs = [
    {
      q: 'Can I upgrade my plan later?',
      a: 'Yes, absolutely! You can upgrade your plan at any stage as your business scales. We will seamlessly migrate your existing setup, apply the price difference, and unlock higher-tier capabilities without any service downtime.'
    },
    {
      q: 'Do you offer refunds?',
      a: 'We work with structured milestone reviews and satisfaction checkpoints. Before any project goes live, revisions and sign-offs ensure the deliverables match your expectations. If an engagement is cancelled prior to development initiation, eligible pro-rata refunds are honored as per our transparent service agreement.'
    },
    {
      q: 'What is the typical project turnaround time?',
      a: 'Standard Starter websites deliver in 7 days, Professional CMS portals in 14 days, and full-featured E-commerce setups in 21 days. Custom Enterprise architectures follow sprint-based roadmaps typically ranging from 4 to 8 weeks depending on project specifications.'
    },
    {
      q: 'Are there any hidden or recurring charges?',
      a: 'None whatsoever. All our development packages are transparent one-time investments with 100% intellectual property ownership. You only pay for your third-party domain, cloud hosting, or optional annual maintenance (AMC) if you choose ongoing retainer support.'
    },
    {
      q: 'Do you provide post-launch maintenance & support?',
      a: 'Yes! Every project includes complimentary warranty support (bug fixes, configuration updates, and staff onboarding). We also offer flexible Annual Maintenance Contracts (AMC) and priority SLA plans for ongoing 24/7 coverage.'
    },
    {
      q: 'Can I request custom features outside the plan scope?',
      a: 'Certainly. If you need bespoke third-party API integrations, custom calculators, CRM webhooks, or unique payment gateways, we can either append custom add-ons or architect an Enterprise package tailored specifically to your requirements.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 min-h-screen bg-[#F8FAFC] dark:bg-[#07090F] text-slate-900 dark:text-white relative overflow-hidden w-full font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-300">
      {/* Background ambient lighting matching Contact Us, Blog & About */}
      <div className="absolute top-20 -left-32 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-8 sm:space-y-12">

        {/* ========================================================================= */}
        {/* SECTION 1: HERO HEADER CONTAINER (Matches Blog & Contact Us Hero Card) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-[#0e1628]/90 dark:via-[#0a1020]/95 dark:to-[#070b14] p-6 sm:p-8 lg:p-10 text-left overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-5xl space-y-3">
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-cyan-950/40 border border-blue-200 dark:border-cyan-500/30 text-blue-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 animate-pulse" />
              <span>Transparent Pricing • Zero Hidden Fees</span>
            </motion.div>

            {/* Main Header Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-['Sora'] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-sky-400 dark:via-cyan-300 dark:to-blue-400 tracking-tight leading-[1.05]">
                PRICING PLANS
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-['Sora'] text-slate-900 dark:text-white mt-1 transition-colors duration-300">
                Flexible Packages for Every Business Goal
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal transition-colors duration-300"
            >
              At Global Infosoft, we offer transparent, value-packed pricing for{' '}
              <span className="text-slate-900 dark:text-white font-semibold">Website Development</span>,{' '}
              <span className="text-slate-900 dark:text-white font-semibold">Digital Marketing</span> &amp;{' '}
              <span className="text-slate-900 dark:text-white font-semibold">App Development</span> — with plans that grow alongside your business.
            </motion.p>

            {/* Category Switcher Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2 flex flex-wrap items-center gap-2"
            >
              <button
                onClick={() => setActiveCategory('web')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-['Sora'] transition-all cursor-pointer ${
                  activeCategory === 'web'
                    ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span>Website Development</span>
              </button>

              <button
                onClick={() => setActiveCategory('marketing')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-['Sora'] transition-all cursor-pointer ${
                  activeCategory === 'marketing'
                    ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Megaphone className="w-4 h-4 shrink-0" />
                <span>Digital Marketing</span>
              </button>

              <button
                onClick={() => setActiveCategory('app')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-['Sora'] transition-all cursor-pointer ${
                  activeCategory === 'app'
                    ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Smartphone className="w-4 h-4 shrink-0" />
                <span>App Development</span>
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SECTION 2: PLANS GRID & CURRENCY SWITCHER */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          {/* Section Subheading & Currency Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left border-b border-slate-200 dark:border-slate-800/80 pb-4 transition-colors duration-300"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                {currentCategoryTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-300">
                Choose the plan that fits your requirements — or{' '}
                <button
                  onClick={() => onOpenContact(`Custom Quote for ${currentCategoryTitle}`)}
                  className="font-bold text-blue-600 dark:text-cyan-400 underline underline-offset-4 hover:text-blue-700 dark:hover:text-cyan-300 cursor-pointer"
                >
                  contact us
                </button>{' '}
                for a tailored proposal.
              </p>
            </div>

            {/* Currency Switcher Pill */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0B0F19]/90 border border-slate-200 dark:border-slate-800 self-start sm:self-auto shrink-0 shadow-sm dark:shadow-lg transition-colors duration-300">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                INR (₹)
              </button>
            </div>
          </motion.div>

          {/* 4 Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch"
            >
              {currentPlans.map((plan, pIdx) => {
                const IconComponent = plan.icon;
                const isPro = plan.isPopular;
                const priceDisplay = currency === 'USD' ? plan.usdPrice : plan.inrPrice;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 35, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: pIdx * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
                    className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between text-left relative transition-all duration-300 backdrop-blur-xl bg-white dark:bg-[#0B0F19]/90 shadow-md dark:shadow-xl ${
                      isPro
                        ? 'border-2 border-blue-600 dark:border-cyan-500/80 shadow-blue-500/10 dark:shadow-cyan-950/40 ring-1 ring-blue-500/30 dark:ring-cyan-500/30'
                        : 'border border-slate-200/90 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-cyan-500/50'
                    }`}
                  >
                    {/* Top Badges */}
                    {plan.badge && (
                      <div
                        className={`absolute -top-3 right-4 px-3 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                          isPro
                            ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 text-white shadow-blue-500/20 dark:shadow-cyan-950/50'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {plan.badge}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Header: Icon + Plan Name */}
                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-800/60 text-blue-600 dark:text-cyan-400">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <h4 className="text-lg font-bold font-['Sora'] text-slate-900 dark:text-white">
                            {plan.name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[34px] leading-relaxed">
                          {plan.desc}
                        </p>
                      </div>

                      {/* Price Area */}
                      <div className="py-3 border-y border-slate-200 dark:border-slate-800/80">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-extrabold font-['Sora'] tracking-tight text-slate-900 dark:text-white">
                            {priceDisplay}
                          </span>
                          {plan.period && plan.usdPrice !== 'Custom' && (
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                              {plan.period}
                            </span>
                          )}
                        </div>
                        {plan.usdPrice === 'Custom' && (
                          <div className="text-xs text-blue-600 dark:text-cyan-400 font-mono mt-0.5">
                            {plan.period}
                          </div>
                        )}
                      </div>

                      {/* Feature Items List */}
                      <div className="space-y-2 pt-1">
                        {plan.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className={`flex items-start gap-2.5 text-xs ${
                              feat.included
                                ? 'text-slate-700 dark:text-slate-300 font-normal'
                                : 'text-slate-400 dark:text-slate-600 line-through opacity-60'
                            }`}
                          >
                            {feat.included ? (
                              <div className="w-4 h-4 rounded-full bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-800/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                                <X className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}
                            <span className="leading-snug">{feat.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80">
                      <button
                        onClick={() =>
                          onOpenContact(
                            `Inquiry for ${plan.name} (${priceDisplay}) - ${currentCategoryTitle}`
                          )
                        }
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                          isPro
                            ? 'bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white shadow-md'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-gradient-to-r dark:hover:from-cyan-500 dark:hover:to-blue-600 border border-slate-200 dark:border-slate-700/80 hover:border-transparent text-slate-800 dark:text-slate-200 dark:hover:text-white'
                        }`}
                      >
                        <span>{plan.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: WHY CHOOSE GLOBAL INFOSOFT */}
        {/* ========================================================================= */}
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto space-y-2"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
              Why Choose Global Infosoft?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
              We don&apos;t just deliver software — we build long-term partnerships that drive measurable outcomes for your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 text-left">
            {whyChooseUsCards.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-cyan-500/40 transition-colors space-y-2.5 shadow-md dark:shadow-xl backdrop-blur-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-800/60 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                    <CardIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold font-['Sora'] text-slate-900 dark:text-white">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: NOT SURE WHICH PLAN FITS BANNER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-gradient-to-b from-blue-50/70 via-indigo-50/50 to-white dark:from-[#0e1628]/90 dark:via-[#0a1020]/95 dark:to-[#070b14] shadow-xl dark:shadow-2xl backdrop-blur-xl overflow-hidden space-y-4 text-center transition-colors duration-300"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
              Not Sure Which Plan Fits Your Needs?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
              Talk directly with our solutions architect to get a personalized recommendation and free architectural review — no strings attached.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenContact('Free Plan Consultation & Tailored Recommendation')}
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Talk to an Expert</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SECTION 5: FAQS ACCORDION */}
        {/* ========================================================================= */}
        <div className="space-y-6 w-full max-w-5xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-blue-200 dark:border-cyan-500/30 bg-blue-50 dark:bg-cyan-950/40 text-blue-700 dark:text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Pricing Clarifications</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
              Got Questions? We Have Answers.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 transition-colors duration-300">
              Everything you need to know before initiating a project with Global Infosoft.
            </p>
          </motion.div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.07,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="rounded-2xl bg-white dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-slate-800/80 overflow-hidden transition-colors shadow-md dark:shadow-lg hover:border-blue-400 dark:hover:border-cyan-500/30"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold font-['Sora'] text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 text-blue-600 dark:text-cyan-400"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
